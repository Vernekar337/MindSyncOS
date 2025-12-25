import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import {
  getAllDoctors,
  getDoctorDetailsAndSlots,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentDetails,
} from "../controllers/appointmentBooking.controllers.js";

const router = express.Router();

// Apply auth to all appointment routes
router.use(userAuth);

// Doctor Listing and Slots
router.get("/doctors", getAllDoctors);
router.get("/doctors/:doctorId/slots", getDoctorDetailsAndSlots);

// Appointment Management
router.post("/book", bookAppointment);
router.get("/", getUserAppointments);
router.get("/:appointmentId", getAppointmentDetails);
router.put("/:appointmentId/cancel", cancelAppointment);
router.put("/:appointmentId/reschedule", rescheduleAppointment);

export default router;
