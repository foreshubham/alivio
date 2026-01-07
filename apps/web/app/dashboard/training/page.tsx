"use client";

import React from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
} from "lucide-react";

/* =============================
   Types
============================= */

type TrainingStatus = "REQUIRED" | "IN_PROGRESS" | "COMPLETED";

type TrainingModule = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
};

/* =============================
   Page
============================= */

export default function TrainingPage() {
  // Later this will come from API
  const trainingStatus = "IN_PROGRESS" as TrainingStatus;

  const modules: TrainingModule[] = [
    {
      id: 1,
      title: "Company Introduction & Policies",
      duration: "15 mins",
      completed: true,
    },
    {
      id: 2,
      title: "Service Quality & Safety Guidelines",
      duration: "25 mins",
      completed: true,
    },
    {
      id: 3,
      title: "Customer Handling & Escalations",
      duration: "20 mins",
      completed: false,
    },
    {
      id: 4,
      title: "Field Operations & SOP",
      duration: "30 mins",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-xl border border-slate-200/70 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="text-slate-600" />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Training & Certification
                </h1>
                <p className="text-sm text-slate-500">
                  Complete mandatory training to start working
                </p>
              </div>
            </div>

            <StatusBadge status={trainingStatus} />
          </div>
        </div>

        {/* ================= MODULES ================= */}
        <div className="bg-white rounded-xl border border-slate-200/70 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">
              Training Modules
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {modules.map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  {module.completed ? (
                    <CheckCircle className="text-emerald-600" size={20} />
                  ) : (
                    <PlayCircle className="text-slate-400" size={20} />
                  )}

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {module.title}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock size={12} />
                      {module.duration}
                    </p>
                  </div>
                </div>

                <button
                  className={`text-sm font-medium px-4 py-1.5 rounded-md transition
                    ${
                      module.completed
                        ? "text-emerald-700 bg-emerald-50 cursor-default"
                        : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    }`}
                >
                  {module.completed ? "Completed" : "Start"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        {trainingStatus !== "COMPLETED" && (
          <div className="bg-white rounded-xl border border-slate-200/70 p-6 text-center">
            <p className="text-sm text-slate-600">
              Please complete all training modules to proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =============================
   Small Components
============================= */

const StatusBadge = ({
  status,
}: {
  status: TrainingStatus;
}) => {
  const map: Record<
    TrainingStatus,
    { text: string; className: string }
  > = {
    REQUIRED: {
      text: "Training Required",
      className: "bg-red-50 text-red-600",
    },
    IN_PROGRESS: {
      text: "In Progress",
      className: "bg-yellow-50 text-yellow-700",
    },
    COMPLETED: {
      text: "Completed",
      className: "bg-emerald-50 text-emerald-700",
    },
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${map[status].className}`}
    >
      {map[status].text}
    </span>
  );
};
