import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  Activity,
  Lock,
  Calendar,
  Pill,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const GuardianDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            Viewing: Alex (Son)
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full uppercase font-bold tracking-wide">
              Guardian View
            </span>
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Some details are hidden to respect patient privacy.
          </p>
        </div>
        <Button variant="outline" className="text-sm">
          Contact Care Team
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Wellbeing Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood Trend */}
          <Card>
            <h3 className="font-bold text-lg text-text-main mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Emotional Trend (Last 30 Days)
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[40, 50, 45, 60, 55, 70, 65, 80, 75, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-primary/20 rounded-t-lg relative group"
                >
                  <div
                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary-hover"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-text-muted mt-4">
              General mood has been improving over the last week.
            </p>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <h3 className="font-bold text-lg text-text-main mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-secondary" />
              Upcoming Care Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded shadow-sm font-bold text-center w-12">
                    <span className="block text-xs text-gray-400">OCT</span>
                    <span className="block text-lg text-text-main">28</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main">
                      Therapy Session
                    </h4>
                    <p className="text-xs text-text-muted">
                      Dr. Sarah Mitchell
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Confirmed
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Private Areas & Meds */}
        <div className="space-y-6">
          {/* Medications */}
          <Card>
            <h3 className="font-bold text-lg text-text-main mb-4 flex items-center gap-2">
              <Pill size={20} className="text-accent" />
              Medications
            </h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-100 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Sertraline</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    50mg
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Take 1 tablet daily (Morning)
                </p>
              </div>
            </div>
          </Card>

          {/* Redacted Privacy Card */}
          <Card className="bg-gray-50 border-gray-200">
            <h3 className="font-bold text-lg text-gray-500 mb-4 flex items-center gap-2">
              <Activity size={20} />
              Recent Activity
            </h3>

            <div className="space-y-3 opacity-70">
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 text-sm">
                    Chat Log (Hidden)
                  </h4>
                  <p className="text-xs text-gray-400">
                    Private conversation with AI Triage.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 text-sm">
                    Journal Entry (Hidden)
                  </h4>
                  <p className="text-xs text-gray-400">
                    Personal reflection recording.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-gray-200/50 p-2 rounded">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              MindSync protects patient trust by keeping specific contents
              private unless a safety risk is detected.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;
