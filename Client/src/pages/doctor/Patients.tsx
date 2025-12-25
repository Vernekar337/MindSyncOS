import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge"; // Using Design System
import { Avatar } from "../../components/ui/Avatar"; // Using Design System
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreHorizontal, ChevronRight } from "lucide-react";

const Patients = () => {
  const navigate = useNavigate();

  // Mock Patient Data
  const patients = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 24,
      diagnosis: "Anxiety Disorder",
      status: "Active",
      lastSession: "Oct 22",
      risk: "Low",
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 31,
      diagnosis: "Post-Partum Depression",
      status: "Active",
      lastSession: "Oct 20",
      risk: "Medium",
    },
    {
      id: 3,
      name: "James Wilson",
      age: 45,
      diagnosis: "PTSD",
      status: "Monitor",
      lastSession: "Oct 15",
      risk: "High",
    },
    {
      id: 4,
      name: "Linda Chen",
      age: 29,
      diagnosis: "Generalized Anxiety",
      status: "Active",
      lastSession: "Oct 23",
      risk: "Low",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-500">
            Manage patient records and monitor progress.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 outline-none"
            />
          </div>
          <Button variant="secondary" className="px-3">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* 2. Patient List Table (Card View) */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4 hidden md:table-cell">Diagnosis</th>
              <th className="px-6 py-4 hidden sm:table-cell">Status</th>
              <th className="px-6 py-4 hidden lg:table-cell">Risk Level</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                onClick={() => navigate(`/patients/${p.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={p.name[0]} size="sm" />
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {p.diagnosis}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                  {p.diagnosis}
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <Badge
                    variant={p.status === "Active" ? "success" : "warning"}
                  >
                    {p.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <Badge
                    variant={
                      p.risk === "High"
                        ? "danger"
                        : p.risk === "Medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {p.risk}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-secondary"
                  >
                    View <ChevronRight size={16} className="ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Patients;
