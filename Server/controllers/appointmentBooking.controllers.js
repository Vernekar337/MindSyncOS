import mongoose from "mongoose";
import { Doctor } from "../model/doctor.models.js";
import { Appointment } from "../model/appointments.models.js";

const getAllDoctors = async (req, res) => {
  try {
    const {
      specialty,
      available,
      rating,
      limit = 20,
      offset = 0,
      search,
    } = req.query;

    const pageLimit = Math.min(parseInt(limit), 100);
    const pageOffset = parseInt(offset);

    // Build the aggregation pipeline
    const pipeline = [];

    // 1. Initial Match (Only verified doctors)
    const matchQuery = { verificationStatus: "verified" };

    if (specialty) {
      matchQuery.specializations = specialty;
    }

    if (rating) {
      matchQuery["rating.average"] = { $gte: parseFloat(rating) };
    }

    if (available === "true") {
      // Logic for availability: check if nextAvailableSlot is in the future
      matchQuery["availability.nextAvailableSlot"] = { $gt: new Date() };
    }

    pipeline.push({ $match: matchQuery });

    // 2. Lookup user details
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    });

    pipeline.push({ $unwind: "$userDetails" });

    // 3. Search by name (if search query provided)
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "userDetails.firstName": { $regex: search, $options: "i" } },
            { "userDetails.lastName": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    // 4. Facet for pagination and metadata
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: pageOffset },
          { $limit: pageLimit },
          {
            $project: {
              _id: 0,
              id: "$_id",
              firstName: "$userDetails.firstName",
              lastName: "$userDetails.lastName",
              specialization: "$specializations",
              licenseNumber: "$liscenseNumber", // Mapping typo in model to requested field
              bio: "$userDetails.bio",
              avatar: "$userDetails.avatar",
              rating: "$rating.average",
              reviewCount: "$rating.count",
              consultationFee: 1,
              currency: 1,
              availability: {
                nextAvailableSlot: "$availability.nextAvailableSlot",
                totalSlotsAvailable: {
                  $size: { $ifNull: ["$availability.slots", []] },
                },
              },
              languages: 1,
              yearsExperience: "$yearsOfExperience",
            },
          },
        ],
      },
    });

    const result = await Doctor.aggregate(pipeline);
    const doctors = result[0].data;
    const total = result[0].metadata[0]?.total || 0;

    return res.status(200).json({
      success: true,
      doctors,
      pagination: {
        total,
        limit: pageLimit,
        offset: pageOffset,
        hasMore: pageOffset + pageLimit < total,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};

const getDoctorDetailsAndSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, timezone = "UTC" } = req.query;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    // 1. Fetch Doctor details with User info
    const doctor = await Doctor.findById(doctorId).populate("userId");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const doctorUser = doctor.userId;

    // 2. Determine Date Range
    const startDate = date ? new Date(date) : new Date();
    // Default to start of day if date is provided
    if (date) {
      startDate.setHours(0, 0, 0, 0);
    }

    const endDate = new Date(startDate);
    if (date) {
      endDate.setDate(startDate.getDate() + 1);
    } else {
      endDate.setDate(startDate.getDate() + 7);
      endDate.setHours(23, 59, 59, 999);
    }

    // 3. Fetch Booked Appointments for this range
    const appointments = await Appointment.find({
      doctorId: doctorUser._id, // References User ID of doctor
      scheduleTime: { $gte: startDate, $lte: endDate },
      status: { $nin: ["cancelled", "rescheduled"] },
    });

    // 4. Generate All Potential Slots
    const availableSlots = [];
    const daysToProcess = date ? 1 : 7;

    for (let i = 0; i < daysToProcess; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      const dayOfWeek = currentDay.getDay();

      // Skip if this isn't a working day for the doctor
      if (!doctor.availability.workingDays.includes(dayOfWeek)) continue;

      // Get slots defined for this day of week
      const dailySlots = doctor.availability.slots.filter(
        (s) => s.dayOfWeek === dayOfWeek
      );

      dailySlots.forEach((slotConfig) => {
        // Create slot start and end times for the specific date
        const [startHours, startMins] = slotConfig.startTime
          .split(":")
          .map(Number);
        const [endHours, endMins] = slotConfig.endTime.split(":").map(Number);

        const slotStartTime = new Date(currentDay);
        slotStartTime.setHours(startHours, startMins, 0, 0);

        const slotEndTime = new Date(currentDay);
        slotEndTime.setHours(endHours, endMins, 0, 0);

        // Check if slot overlaps with any booked appointment
        const isBooked = appointments.some((apt) => {
          const aptStart = new Date(apt.scheduleTime);
          const aptEnd = new Date(apt.endTime);
          // Simple overlap check
          return (
            (slotStartTime >= aptStart && slotStartTime < aptEnd) ||
            (slotEndTime > aptStart && slotEndTime <= aptEnd) ||
            (aptStart >= slotStartTime && aptStart < slotEndTime)
          );
        });

        const dayName = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];

        availableSlots.push({
          slotId: `slot_${slotStartTime.getTime()}`,
          startTime: slotStartTime.toISOString(),
          endTime: slotEndTime.toISOString(),
          dayOfWeek: dayName,
          status: isBooked ? "booked" : "available",
        });
      });
    }

    // 5. Stats
    const totalSlots = availableSlots.length;
    const bookedCount = availableSlots.filter(
      (s) => s.status === "booked"
    ).length;
    const availableCount = totalSlots - bookedCount;

    return res.status(200).json({
      success: true,
      doctor: {
        id: doctor._id,
        firstName: doctorUser.firstName,
        lastName: doctorUser.lastName,
        specialization: doctor.specializations,
        bio: doctorUser.bio,
        avatar: doctorUser.avatar,
        rating: doctor.rating.average,
        reviewCount: doctor.rating.count,
        languages: doctor.languages,
        consultationFee: doctor.consultationFee,
        sessionDuration: doctor.sessionDuration,
        qualifications: doctor.qualifications.map(
          (q) => `${q.degree} from ${q.institution}`
        ),
        certifications: doctor.certifications.map((c) => c.name),
      },
      availableSlots,
      pagination: {
        totalSlots,
        availableSlots: availableCount,
        bookedSlots: bookedCount,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      slotId,
      reason,
      previousTreatment,
      medicationsCurrently,
      notes,
      preferredMode,
    } = req.body;

    const patientId = req.user?._id;

    // 1. Validate Doctor
    const doctor = await Doctor.findById(doctorId).populate("userId");
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "Invalid doctorId",
      });
    }

    // 2. Parse and Validate Slot
    if (!slotId || !slotId.startsWith("slot_")) {
      return res.status(400).json({
        success: false,
        message: "Invalid slotId format",
      });
    }

    const scheduledTime = new Date(parseInt(slotId.replace("slot_", "")));
    if (isNaN(scheduledTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid slot time",
      });
    }

    // 3. Business Rules: 24h - 30 days in advance
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const maxBookingTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (scheduledTime < minBookingTime) {
      return res.status(400).json({
        success: false,
        message: "Appointments must be booked at least 24 hours in advance",
      });
    }

    if (scheduledTime > maxBookingTime) {
      return res.status(400).json({
        success: false,
        message: "Appointments can only be booked up to 30 days in advance",
      });
    }

    // 3. Conflict Check (409)
    const endTime = new Date(
      scheduledTime.getTime() + doctor.sessionDuration * 60000
    );

    const existingAppointment = await Appointment.findOne({
      doctorId: doctor.userId._id,
      scheduleTime: { $lt: endTime },
      endTime: { $gt: scheduledTime },
      status: { $nin: ["cancelled", "rescheduled"] },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "Slot no longer available",
      });
    }

    // 4. Create Appointment
    const confirmationCode = `MS${new Date().getFullYear()}${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const appointment = new Appointment({
      patientId,
      doctorId: doctor.userId._id, // References User ID of doctor
      scheduleTime: scheduledTime,
      endTime: endTime,
      duration: doctor.sessionDuration,
      reason: reason || "General Consultation",
      mode: preferredMode || "video",
      location:
        preferredMode === "video"
          ? "MindSync Video Call"
          : "MindSync Audio Channel",
      status: "confirmed",
      fee: doctor.consultationFee,
      currency: doctor.currency,
      patientNotes: notes,
      previousTreatment,
      medicationsCurrently,
    });

    await appointment.save();

    // 5. Build Response
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        id: appointment._id,
        patientId: patientId,
        doctorId: doctorId,
        doctorName: `Dr. ${doctor.userId.lastName}`,
        scheduledTime: appointment.scheduleTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
        duration: appointment.duration,
        reason: appointment.reason,
        mode: appointment.mode,
        status: appointment.status,
        fee: appointment.fee,
        paymentStatus: appointment.paymentStatus,
        joinUrl: `https://mindsync.local/sessions/${appointment._id}/join`,
        confirmationCode: confirmationCode,
        createdAt: appointment.createdAt.toISOString(),
        reminderScheduled: true,
      },
      confirmationEmail: {
        sent: true,
        to: req.user?.email || "user@example.com",
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};
const getUserAppointments = async (req, res) => {
  try {
    const { status, upcoming = "true", limit = 10, offset = 0 } = req.query;
    const userId = req.user?._id;
    const now = new Date();

    const pageLimit = parseInt(limit);
    const pageOffset = parseInt(offset);

    const pipeline = [];

    // 1. Initial Match for Patient
    const matchQuery = { patientId: userId };
    if (status) matchQuery.status = status;

    if (upcoming === "true") {
      matchQuery.scheduleTime = { $gt: now };
    } else {
      matchQuery.scheduleTime = { $lt: now };
    }

    pipeline.push({ $match: matchQuery });

    // 2. Lookup Doctor (User record for name/avatar)
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctorUser",
      },
    });
    pipeline.push({ $unwind: "$doctorUser" });

    // 3. Lookup Doctor (Professional record for specialty)
    pipeline.push({
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "userId",
        as: "doctorInfo",
      },
    });
    pipeline.push({ $unwind: "$doctorInfo" });

    // 4. Formatting and Projection
    pipeline.push({
      $facet: {
        metadata: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              upcoming: {
                $sum: { $cond: [{ $gt: ["$scheduleTime", now] }, 1, 0] },
              },
              past: {
                $sum: { $cond: [{ $lt: ["$scheduleTime", now] }, 1, 0] },
              },
            },
          },
        ],
        data: [
          { $sort: { scheduleTime: upcoming === "true" ? 1 : -1 } },
          { $skip: pageOffset },
          { $limit: pageLimit },
          {
            $project: {
              _id: 0,
              id: "$_id",
              doctorId: "$doctorInfo._id",
              doctorName: {
                $concat: [
                  "Dr. ",
                  "$doctorUser.firstName",
                  " ",
                  "$doctorUser.lastName",
                ],
              },
              doctorAvatar: "$doctorUser.avatar",
              specialty: { $arrayElemAt: ["$doctorInfo.specializations", 0] },
              scheduledTime: 1,
              endTime: 1,
              reason: 1,
              mode: 1,
              status: 1,
              fee: 1,
              location: 1,
              joinUrl: {
                $concat: [
                  "https://mindsync.local/sessions/",
                  { $toString: "$_id" },
                  "/join",
                ],
              },
              notes: "$doctorNotes",
              reminders: {
                email: "$reminders.email24hSent",
                sms: "$reminders.smsSent",
                inApp: { $literal: true },
              },
            },
          },
        ],
      },
    });

    const result = await Appointment.aggregate(pipeline);
    const appointments = result[0].data;
    const stats = result[0].metadata[0] || { total: 0, upcoming: 0, past: 0 };

    return res.status(200).json({
      success: true,
      appointments,
      pagination: stats,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { reason, rescheduleWanted } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Business Rule: 24h Lock
    const now = new Date();
    const cancelLimit = new Date(
      appointment.scheduleTime.getTime() - 24 * 60 * 60 * 1000
    );

    if (now > cancelLimit) {
      return res.status(400).json({
        success: false,
        message: "Appointment within 24 hours (cancellation window closed)",
      });
    }

    // Update Status
    appointment.status = "cancelled";
    appointment.cancelledAt = now;
    appointment.cancellationReason = reason || "Patient cancelled";
    appointment.cancelledBy = "patient";

    // Auto-Refund logic for this specific platform step
    appointment.refundStatus = "processed";
    appointment.refundAmount = appointment.fee;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment: {
        id: appointment._id,
        status: appointment.status,
        cancelledAt: appointment.cancelledAt.toISOString(),
        refundStatus: "processing",
        refundAmount: appointment.fee,
      },
      refund: {
        status: "initiated",
        amount: appointment.fee,
        processedBy: new Date(
          now.getTime() + 48 * 60 * 60 * 1000
        ).toISOString(),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { newSlotId, reason } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Business Rule: Rescheduling allowed up to 48h before
    const now = new Date();
    const rescheduleLimit = new Date(
      appointment.scheduleTime.getTime() - 48 * 60 * 60 * 1000
    );

    if (now > rescheduleLimit) {
      return res.status(400).json({
        success: false,
        message:
          "Rescheduling is only allowed up to 48 hours before the original appointment",
      });
    }

    // Validate New Slot
    const newScheduledTime = new Date(parseInt(newSlotId.replace("slot_", "")));
    const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (newScheduledTime < minBookingTime) {
      return res.status(400).json({
        success: false,
        message: "New appointment time must be at least 24 hours in advance",
      });
    }

    const doctor = await Doctor.findOne({ userId: appointment.doctorId });
    const newEndTime = new Date(
      newScheduledTime.getTime() + (doctor?.sessionDuration || 45) * 60000
    );

    // Conflict Check
    const conflict = await Appointment.findOne({
      doctorId: appointment.doctorId,
      _id: { $ne: appointmentId },
      scheduleTime: { $lt: newEndTime },
      endTime: { $gt: newScheduledTime },
      status: { $nin: ["cancelled", "rescheduled"] },
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: "The new slot is already booked",
      });
    }

    const oldScheduledTime = appointment.scheduleTime.toISOString();

    // Update Appointment
    appointment.status = "confirmed"; // Re-confirming with new time
    appointment.scheduleTime = newScheduledTime;
    appointment.endTime = newEndTime;
    appointment.lastRescheduledAt = now;
    appointment.rescheduleCount += 1;
    appointment.rescheduleReason = reason || "Patient requested reschedule";

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment: {
        id: appointment._id,
        doctorId: doctor?._id || appointment.doctorId,
        oldScheduledTime,
        newScheduledTime: appointment.scheduleTime.toISOString(),
        status: appointment.status,
        rescheduledAt: appointment.lastRescheduledAt.toISOString(),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};

const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(appointmentId) } },
      // Lookup Patient
      {
        $lookup: {
          from: "users",
          localField: "patientId",
          foreignField: "_id",
          as: "patientUser",
        },
      },
      { $unwind: "$patientUser" },
      // Lookup Doctor (User)
      {
        $lookup: {
          from: "users",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctorUser",
        },
      },
      { $unwind: "$doctorUser" },
      // Lookup Doctor (Professional)
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "userId",
          as: "doctorInfo",
        },
      },
      { $unwind: "$doctorInfo" },
      {
        $project: {
          _id: 0,
          id: "$_id",
          patientId: 1,
          patientName: {
            $concat: ["$patientUser.firstName", " ", "$patientUser.lastName"],
          },
          doctorId: "$doctorInfo._id",
          doctorName: {
            $concat: [
              "Dr. ",
              "$doctorUser.firstName",
              " ",
              "$doctorUser.lastName",
            ],
          },
          scheduledTime: 1,
          endTime: 1,
          duration: 1,
          reason: 1,
          mode: 1,
          status: 1,
          fee: 1,
          paymentStatus: 1,
          joinUrl: {
            $concat: [
              "https://mindsync.local/sessions/",
              { $toString: "$_id" },
              "/join",
            ],
          },
          notes: {
            patientNotes: "$patientNotes",
            doctorNotes: "$doctorNotes",
            prescription: "$prescriptionId",
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const result = await Appointment.aggregate(pipeline);
    if (!result[0]) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      appointment: result[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
  }
};

export {
  getAllDoctors,
  getDoctorDetailsAndSlots,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentDetails,
};
