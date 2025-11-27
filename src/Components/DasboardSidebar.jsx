'use client';

import React from 'react'
import DashboardMenu from './DashboardMenu';
import DashboardSidebarHead from './DashboardSidebarHead';
import DashboardSidebarBottom from './DashboardSidebarBottom';



const DashboardSidebar = ({sidebarOpen,setSidebarOpen}) => {
  return (
    <div className='w-full h-screen max-h-screen bg-base-100   flex flex-col justify-between pt-4 pb-2 '>
       <div className='px-4 flex-none'>
          <DashboardSidebarHead  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       </div>
        <div className='flex-1 w-full p-2 mt-4 overflow-y-auto'>
           <DashboardMenu/>
        </div>
          
          {/* <div className='flex-none px-2 pt-2 border-t border-base-300'>
           <DashboardSidebarBottom/>
          </div> */}
       
    </div>
  )
}

export default DashboardSidebar