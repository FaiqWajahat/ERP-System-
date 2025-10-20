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

  const toggleView = (selected) => {
    setView(selected);
  };

  const data = view === "month" ? monthlyData : weeklyData;

  return (
    <div className="w-full max-w-full  mx-auto rounded-xl  shadow-lg p-3 lg:p-6 bg-base-100 text-base-content text-lg transition-colors duration-300">
      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-bold">
          {view === "month" ? "Monthly Sales" : "Weekly Sales"}
        </h2>
        <div className="flex bg-base-300 dark:bg-base-200 rounded-full  transition-colors duration-300">
          <button
            onClick={() => toggleView("week")}
            className={`px-4 py-1 rounded-full font-semibold transition-colors duration-300 text-sm ${
              view === "week" ? "bg-[#422ad5] text-white" : "text-base-content"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => toggleView("month")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base ${
              view === "month" ? "bg-[#422ad5] text-white" : "text-base-content"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={320} minHeight={300}>
        <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="name"
            stroke="currentColor"
            tick={{ fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="currentColor"
            tick={{ fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
         <Tooltip
  contentStyle={{
    backgroundColor: "var(--tooltip-bg)", // we define this in Tailwind
    borderRadius: "6px",
    border: "1px solid var(--tooltip-border)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
  itemStyle={{ color: "#422ad5", fontWeight: 600 }}
  cursor={{ fill: "rgba(0, 0, 0, 0 )" }}
/>


          <Bar dataKey="sales" fill="#422ad5" radius={[8, 8, 0, 0]} barSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}