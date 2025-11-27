'use client';
import { FolderKanban, Users2, Package, CalendarCheck } from 'lucide-react';
import React from 'react'
import CountUp from 'react-countup';

const DashboardTopStats = () => {
  return (
    <div className="stats bg-base-100 w-full stats-vertical md:stats-horizontal overflow-hidden shadow">
      
      {/* Projects */}
      <div className="stat">
        <div className="stat-figure bg-base-300 rounded-md p-2">
          <FolderKanban className="w-8 h-8 text-[var(--primary-color)]" />
        </div>
        <div className="pb-1">Projects</div>
        <div className="stat-value">
          <CountUp start={0} end={11} duration={2.75} />
        </div>
      </div>

      {/* Employees */}
      <div className="stat">
        <div className="stat-figure bg-base-300 rounded-md p-2">
          <Users2 className="w-8 h-8 text-[var(--primary-color)]" />
        </div>
        <div className="pb-1">Employees</div>
        <div className="stat-value">
          <CountUp start={0} end={110} duration={2.75} />
        </div>
      </div>

      {/* Assets */}
      <div className="stat">
        <div className="stat-figure bg-base-300 rounded-md p-2">
          <Package className="w-8 h-8 text-[var(--primary-color)]" />
        </div>
        <div className="pb-1">Assets</div>
        <div className="stat-value">
          <CountUp start={0} end={20} duration={2.75} />
        </div>
      </div>

      {/* Today Attendance */}
      <div className="stat">
        <div className="stat-figure bg-base-300 rounded-md p-2">
          <CalendarCheck className="w-8 h-8 text-[var(--primary-color)]" />
        </div>
        <div className="pb-1">Today Attendance</div>
        <div className="stat-value">
          <CountUp start={0} end={80} duration={2.75} />
        </div>
      </div>

    </div>
  )
}

export default DashboardTopStats;
