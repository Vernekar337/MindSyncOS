import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Activity,
  MessageSquare,
  Video,
  MoreHorizontal,
  Clock,
} from "lucide-react";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Single Patient Data (In a real app, fetch by ID)
  const patient = {
    id: 1,
    name: "Alex Johnson",
    age: 24,
    email: "alex.j@example.com",
    diagnosis: "Anxiety Disorder",
    nextSession: "Tomorrow, 4:00 PM",
    notes: "Patient is responding well to CBT. Reported improved sleep.",
    medications: ["Sertraline 50mg"],
    riskHistory: [30, 45, 40, 35, 25], // Mock chart data
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* 1. Top Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/patients")}
          className="pl-0 gap-2 text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={20} /> Back to List
        </Button>
      </div>

      {/* 2. Patient Profile Header */}
      <Card className="border-l-4 border-l-secondary">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-bold text-2xl">
              {patient.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{patient.age} years</span>
                <span>•</span>
                <span>{patient.diagnosis}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">
              <MessageSquare size={18} className="mr-2" /> Message
            </Button>
            <Button className="flex-1 md:flex-none bg-secondary hover:bg-secondary-hover">
              <Video size={18} className="mr-2" /> Start Session
            </Button>
          </div>
        </div>
      </Card>

      {/* 3. Detailed Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Clinical Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-secondary" /> Clinical
              Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                  Current Risk Level
                </p>
                <Badge variant="success">Low Risk</Badge>
                <p className="text-xs text-gray-400 mt-2">
                  Last assessment: 2 days ago
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                  Next Session
                </p>
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  <Calendar size={16} className="text-secondary" />{" "}
                  {patient.nextSession}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                Latest Session Notes
              </h4>
              <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 text-sm text-gray-700 italic">
                "{patient.notes}"
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FileText size={18} className="text-gray-500" /> History & Logs
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <Video size={14} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">
                        Weekly Therapy Session
                      </p>
                      <p className="text-xs text-gray-500">
                        Oct {20 - i} • 45 min
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Actions & Meds */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Medications</h3>
            {patient.medications.map((med, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg mb-2"
              >
                <span className="font-medium text-sm">{med}</span>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-secondary"
            >
              + Add Prescription
            </Button>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Care Plan Tools</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-sm h-auto py-3"
              >
                <Activity size={16} className="mr-2 text-gray-400" /> Assign
                Homework
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-sm h-auto py-3"
              >
                <Clock size={16} className="mr-2 text-gray-400" /> View Mood
                Logs
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-sm h-auto py-3 text-red-600 border-red-100 hover:bg-red-50"
              >
                <Activity size={16} className="mr-2" /> Report Crisis
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
