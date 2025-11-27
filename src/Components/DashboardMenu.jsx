"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Package,
  
  Percent,

  Settings,

  BadgeCheck,
  Warehouse,
} from "lucide-react";

// Main Menu Config (corrected icons)
const mainMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/Dashboard",
    active: true,
  },
  {
    title: "Projects",
    icon: Warehouse,
    href: "/Dashboard/Projects",
  },
  {
    title: "Employees",
    icon: Users, // 👈 Changed from ShoppingBag
    children: [
      { title: "Profile", href: "/Dashboard/Employees" },
      { title: "Expenses", href: "/Dashboard/Employees/Expense" },
      { title: "Tracking", href: "/Dashboard/Employees/Tracking" },
    ],
  },
  {
    title: "Attendance",
    icon: ClipboardCheck, 
    children: [
      { title: "Mark Attendance", href: "/Dashboard/Attendance/Mark" },
      { title: "View Record", href: "/Dashboard/Attendance" },
      
    ],
  },
  {
    title: "Salary",
    icon: Percent,
    href: "/Dashboard/Salary",
  },
  {
    title: "Assets",
    icon: Package,
    href: "/Dashboard/Products/All",
  },
  
  
];

// Account Menu Config (fine-tuned)
const accountMenu = [
   { title: "Profile", icon: BadgeCheck, href: "/Dashboard/Profile" }, 
 
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Themes", href: "/Dashboard/Setting/Theme" },
      { title: "Fonts", href: "/Dashboard/Setting/Fonts" },
    ],
  },
  { title: "Users", icon: BadgeCheck, href: "/Dashboard/Users" }, 
 
];

const SidebarMenu = ({ items, pathname }) => (
  <ul className="menu rounded-box w-full text-[15px] font-light">
    {items.map((item, index) => (
      <li key={index}>
        {item.children ? (
          <details>
            <summary className="flex items-center gap-2 w-full hover:bg-base-200 rounded-md px-2 py-1">
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.title}</span>
            </summary>
            <ul className="ml-5 border-l pl-3 space-y-1">
              {item.children.map((child, cIndex) => (
                <li key={cIndex}>
                  <Link
                    href={child.href}
                    className={`block px-2 py-1  rounded-md hover:bg-base-200 ${
                      pathname === child.href ? "text-[var(--primary-color)] font-medium" : ""
                    }`}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <Link
            href={item.href || "#"}
            className={`flex items-center  text-md gap-2 w-full px-2 py-1 rounded-md hover:bg-base-200 ${
              pathname === item.href ? "text-[var(--primary-color)] font-medium" : ""
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{item.title}</span>
          </Link>
        )}
      </li>
    ))}
  </ul>
);

const DashboardMenu = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex flex-col justify-between py-4">
      {/* Main Menu */}
      <div>
        <p className="px-4 mb-2 uppercase text-xs text-gray-500">Main</p>
        <SidebarMenu items={mainMenu} pathname={pathname} />
      </div>

      {/* Account Menu */}
      <div>
        <p className="px-4 mt-6 mb-2 uppercase text-xs text-gray-500">
          Account
        </p>
        <SidebarMenu items={accountMenu} pathname={pathname} />
      </div>
    </div>
  );
};

export default DashboardMenu;
