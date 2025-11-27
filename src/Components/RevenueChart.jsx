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

// Your Primary Color
const primaryColor = "#A99984"

// Weekly Data
const weeklyData = [
  { name: 'Mon', revenue: 500 },
  { name: 'Tue', revenue: 700 },
  { name: 'Wed', revenue: 600 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 750 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 650 },
]

// Monthly Data
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
    <div className="w-full max-w-full mx-auto rounded-xl shadow-lg p-4 lg:p-6 bg-base-100 text-base-content transition-colors duration-300">

      {/* Header + Switch */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-bold">
          {view === 'month' ? 'Monthly Revenue' : 'Weekly Revenue'}
        </h2>

        <div className="flex bg-base-300 rounded-full p-1">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-1 rounded-full font-semibold text-sm transition-all 
              ${view === 'week' ? 'text-white' : 'text-base-content'}`}
            style={view === 'week' ? { backgroundColor: primaryColor } : {}}
          >
            Week
          </button>

          <button
            onClick={() => setView('month')}
            className={`px-4 py-1 rounded-full font-semibold text-sm transition-all 
              ${view === 'month' ? 'text-white' : 'text-base-content'}`}
            style={view === 'month' ? { backgroundColor: primaryColor } : {}}
          >
            Month
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 6" vertical={false} strokeOpacity={0.08} />

          <XAxis
            dataKey="name"
            stroke="currentColor"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />

          <YAxis
            stroke="currentColor"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
            cursor={{ stroke: `${primaryColor}20`, strokeWidth: 2 }}
            itemStyle={{ color: primaryColor, fontWeight: 600 }}
          />

          <Legend verticalAlign="top" align="right" height={36} />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={primaryColor}
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
