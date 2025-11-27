'use client'
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const weeklyData = [
  { name: "Mon", sales: 500 },
  { name: "Tue", sales: 700 },
  { name: "Wed", sales: 600 },
  { name: "Thu", sales: 800 },
  { name: "Fri", sales: 750 },
  { name: "Sat", sales: 900 },
  { name: "Sun", sales: 650 },
];

const monthlyData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 4200 },
  { name: "Sep", sales: 3800 },
  { name: "Oct", sales: 4500 },
  { name: "Nov", sales: 4700 },
  { name: "Dec", sales: 5200 },
];

export default function SalesChart() {
  const [view, setView] = useState("month");

  const data = view === "month" ? monthlyData : weeklyData;

  return (
    <div className="w-full max-w-full mx-auto rounded-xl shadow-lg p-4 lg:p-6 bg-base-100 text-base-content text-sm transition-colors duration-300">
      
      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold">
          {view === "month" ? "Monthly Attendance" : "Weekly Attendance"}
        </h2>

        <div className="flex bg-base-300 dark:bg-base-200 rounded-full p-1 transition-colors duration-300">
          <button
            onClick={() => setView("week")}
            className={`px-4 py-1 rounded-full font-medium text-sm transition-all ${
              view === "week" ? "bg-[#A99984] text-white shadow" : "text-base-content"
            }`}
          >
            Week
          </button>

          <button
            onClick={() => setView("month")}
            className={`px-4 py-1 rounded-full font-medium text-sm transition-all ${
              view === "month" ? "bg-[#A99984] text-white shadow" : "text-base-content"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>

          <XAxis
            dataKey="name"
            stroke="var(--text-secondary)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            stroke="var(--text-secondary)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              borderRadius: "8px",
              border: "1px solid var(--tooltip-border)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
            itemStyle={{ color: "#A99984", fontWeight: 600 }}
            cursor={{ fill: "rgba(0,0,0,0)" }}
          />

          <Bar
            dataKey="sales"
            fill="#A99984"
            radius={[8, 8, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
