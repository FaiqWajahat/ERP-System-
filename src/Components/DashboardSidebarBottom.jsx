'use client'
import { ChevronUp } from 'lucide-react'
import React from 'react'

const DashboardSidebarBottom = () => {
  return (
    <div className='w-full   bg-base-300/60  rounded-md p-2  flex items-center '>
        <div
            tabIndex={0}
            role="button"
            className="avatar flex-items-center justify-center"
          >
            <div className="w-10 rounded-full flex items-center justify-center">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <div className='flex-1 ml-2'>
            <div className='text-sm font-semibold text-[var(--primary-color)]'>John Doe</div>
            <div className='text-xs  tracking-tight text-base-content/40 '>johndoe@gmail.com</div>
          </div>
          <div className='flex-none'>
  <div className="dropdown dropdown-top">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer avatar"
          >
            <div className=" ">
            <ChevronUp/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
          </div>

    </div>
  )
}

export default DashboardSidebarBottom