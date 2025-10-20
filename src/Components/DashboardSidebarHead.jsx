'use client'
import {  PanelRightOpen } from 'lucide-react';
import React from 'react'

const DashboardSidebarHead = ({sidebarOpen ,setSidebarOpen}) => {
  return (
      <div className='flex w-full justify-between items-center     ' > 
      <h1 className='text-4xl font-extrabold  text-primary'>Pixvion</h1>
         <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className=" p-1.5 cursor-pointer hover:bg-base-300 rounded-md flex items-center justify-center"
        >
         
            <PanelRightOpen className=" cursor-pointer text-base-content w-5 h-5   stroke-[1.3px] " />
          
        </div>
        
      </div>
  )
}

export default DashboardSidebarHead