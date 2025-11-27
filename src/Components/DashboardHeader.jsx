"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";

import React from "react";
import CustomDropdown from "./CustomDropdown";

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
const [language, setLanguage] = React.useState('English');

const languages = [
  'English',
  'Urdu',
  'Arabic',
 
];

  return (
    <div className="navbar bg-base-100 shadow-sm px-3">
      <div className="flex-none hover:bg-base-300 p-1 rounded-sm">
       <Menu onClick={()=>setSidebarOpen(!sidebarOpen)}
        className="cursor-pointer "/>
      </div>
      <div className="flex-1 ml-4">
       <Image src={"/logo.png"} alt="Logo" width={120} height={60} />
      </div>
      <div className="navbar-end gap-4 ">
       <CustomDropdown value={language} setValue={setLanguage} dropdownMenu={languages}  />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
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
  );
};

export default DashboardHeader;
