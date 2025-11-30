'use client'
import {  PanelRightOpen } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const DashboardSidebarHead = ({sidebarOpen ,setSidebarOpen}) => {
  return (
      <div className='flex w-full justify-between items-center     ' > 
    <Image src={"/logo.png"} width={150} height={150} alt="Logo" className='ml-2 '/>
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