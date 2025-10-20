'use client'
import React, { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

// Data
const weeklyData = [
  { name: 'Mon', revenue: 500 },
  { name: 'Tue', revenue: 700 },
  { name: 'Wed', revenue: 600 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 750 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 650 },
]

const monthlyData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4200 },
  { name: 'Sep', revenue: 3800 },
  { name: 'Oct', revenue: 4500 },
  { name: 'Nov', revenue: 4700 },
  { name: 'Dec', revenue: 5200 },
]

export default function RevenueChart() {
  const [view, setView] = useState('month')
  const data = view === 'month' ? monthlyData : weeklyData

  return (
    <div className="w-full max-w-full mx-auto rounded-xl shadow-lg p-3 lg:p-6 bg-base-100 text-base-content text-lg transition-colors duration-300">
      {/* Header + Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-bold">
          {view === 'month' ? 'Monthly Revenue' : 'Weekly Revenue'}
        </h2>

        <div className="flex bg-base-300 dark:bg-base-200 rounded-full transition-colors duration-300">
          <button
            onClick={() => setView('week')}
            aria-pressed={view === 'week'}
            className={`px-4 py-1 rounded-full font-semibold transition-colors duration-300 text-sm ${
              view === 'week' ? 'bg-[#422ad5] text-white' : 'text-base-content'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView('month')}
            aria-pressed={view === 'month'}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base ${
              view === 'month' ? 'bg-[#422ad5] text-white' : 'text-base-content'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }} // increased margins
        >
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b5ef0" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#6b5ef0" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 6" vertical={false} strokeOpacity={0.06} />

          <XAxis
            dataKey="name"
            stroke="currentColor"
            tick={{ fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={6} // extra space below ticks
            padding={{ left: 10, right: 10 }} // spacing on both ends
          />

          <YAxis
            stroke="currentColor"
            tick={{ fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            dx={-30} // spacing from chart edge
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, #fff)',
              borderRadius: '6px',
              border: '1px solid var(--tooltip-border, #e5e7eb)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
            itemStyle={{ color: '#422ad5', fontWeight: 600 }}
            cursor={{ stroke: 'rgba(66, 42, 213, 0.12)', strokeWidth: 2 }}
          />

          <Legend verticalAlign="top" align="right" height={36} />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#422ad5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#gradRevenue)"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
