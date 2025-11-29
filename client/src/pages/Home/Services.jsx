import React from "react";
import { NotepadText, Clock, Umbrella, ChartSpline } from "lucide-react";

// SERVICES DATA ARRAY
const servicesData = [
  {
    icon: NotepadText,
    title: "Smart Scheduling",
    desc: "AI-powered scheduling that automatically optimizes shifts based on availability, skills, and business needs.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    desc: "Accurate time tracking with clock-in/out, break management, and automated overtime calculations.",
  },
  {
    icon: Umbrella,
    title: "Leave Management",
    desc: "Streamlined leave requests, approval workflows, and automatic balance tracking for all leave types.",
  },
  {
    icon: ChartSpline,
    title: "Reports & AI Insights",
    desc: "Comprehensive analytics and AI-generated insights that optimize workforce performance and reduce costs.",
  },
];

const Services = () => {
  return (
    <>
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="font-bold text-3xl md:text-4xl mt-12 leading-tight text-gray-900">
          Everything You Need for Modern Workforce Management
        </h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Streamline operations, boost productivity, and make data-driven
          decisions with our comprehensive platform.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14 p-6 md:p-10">
        {servicesData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="bg-linear-to-r from-sky-600 to-sky-800 w-14 h-14 rounded-xl flex items-center justify-center shadow-md">
                <Icon className="text-white" size={28} />
              </div>

              <h1 className="mt-5 font-semibold text-xl text-gray-900">
                {item.title}
              </h1>

              <p className="mt-2 text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Services;
