'use client';
import React from 'react'
import Link from 'next/link'
import { Search, Bell, LogOut, Settings, User, Menu } from 'lucide-react'
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useUserStore();
  const router = useRouter();

  // Handle Logout Logic
  const handleLogout = async () => {
    // 1. Call your logout API here (delete cookie)
    // await axios.post('/api/auth/logout');
    
    // 2. Clear store (if you have a clearUser method)
    // clearUser();

    // 3. Redirect
    // router.push('/login');
    console.log("Logging out...");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40 border-b border-base-200 px-4">
      
      {/* LEFT: Brand & Mobile Menu */}
      <div className="flex-1 gap-2">
        {/* Mobile Menu Trigger (Optional - if you have a sidebar drawer) */}
        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle lg:hidden">
          <Menu size={20} />
        </label>
        
        <Link href="/dashboard" className="btn btn-ghost text-xl font-bold text-[var(--primary-color)]">
          ERP System
        </Link>
      </div>

      {/* RIGHT: Search, Notifications, Profile */}
      <div className="flex gap-2 items-center">
        
        {/* Search Bar (Hidden on mobile, visible on md+) */}
        <div className="form-control hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="input input-bordered input-sm w-24 md:w-auto pl-9 rounded-full focus:outline-none focus:border-primary" 
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
          </div>
        </div>

        {/* Search Icon (Mobile Only) */}
        <button className="btn btn-ghost btn-circle md:hidden">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={20} />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar ring-offset-2 hover:ring-2 ring-[var(--primary-color)] transition-all"
          >
            <div className="w-9 rounded-full">
              <img
                alt="User Profile"
                src={user?.profilePic || "https://i.pravatar.cc/300"} 
                className="object-cover"
              />
            </div>
          </div>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow-lg border border-base-200"
          >
            {/* User Info Header */}
            <li className="menu-title px-4 py-2 text-base-content">
              <span>{user?.name || 'User'}</span>
            </li>
            
            <div className="divider my-0"></div>

            <li>
              <Link href="/dashboard/profile" className="py-2">
                <User size={16} />
                Profile
                <span className="badge badge-sm badge-ghost ml-auto">New</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="py-2">
                <Settings size={16} />
                Settings
              </Link>
            </li>
            
            <div className="divider my-0"></div>
            
            <li>
              <button onClick={handleLogout} className="py-2 text-error hover:bg-error/10">
                <LogOut size={16} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar