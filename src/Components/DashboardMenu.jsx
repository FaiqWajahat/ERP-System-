"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  Percent,
  MessageSquare,
  User,
  Layers,
} from "lucide-react";

// Menu config
const mainMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/Dashboard",
    active: true,
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    children: [
      { title: "All Orders", href: "/Dashboard/Orders/All" },
      { title: "Pending", href: "/Dashboard/Orders/Pending" },
      { title: "Delivered", href: "/Dashboard/Orders/Delivered" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", href: "/Dashboard/Users/All" },
      { title: "Admins", href: "/Dashboard/Users/Admin" },
    ],
  },
  {
    title: "Products",
    icon: Package,
    children: [
      { title: "All Products", href: "/Dashboard/Products/All" },
      { title: "Low Stock", href: "/Dashboard/Products/LowStock" },
    ],
  },
  { title: "Categories", icon:Layers , href: "/Dashboard/Categories" },
  { title: "Discounts", icon: Percent, href: "/Dashboard/Discounts/All" },
];

const accountMenu = [
  { title: "Messages", icon: MessageSquare, href: "/messages" },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/settings" },
      { title: "Security", href: "/settings/security" },
    ],
  },
  { title: "Profile", icon: User, href: "/profile" },
];

const SidebarMenu = ({ items, pathname }) => (
  <ul className="menu rounded-box w-full text-[15px] font-light">
    {items.map((item, index) => (
      <li className="" key={index}>
        {item.children ? (
          <details>
            <summary className="flex items-center gap-2 w-full hover:bg-base-200 rounded-md px-2 py-1">
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.title}</span>
            </summary>
            <ul className="ml-5 border-l pl-3 space-y-1">
              {item.children.map((child, cIndex) => (
                <li className="" key={cIndex}>
                  <Link
                    href={child.href}
                    className={`block px-2 py-1 rounded-md hover:bg-base-200 ${
                      pathname === child.href ? "text-primary font-medium " : ""
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
            className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-base-200 ${
              pathname === item.href ? "text-primary font-medium " : ""
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
