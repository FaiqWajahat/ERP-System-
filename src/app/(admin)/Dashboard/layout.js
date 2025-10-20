'use client';
import React, { useState } from "react";
import DashboardHeader from "@/Components/DashboardHeader";
import DashboardSidebar from "@/Components/DasboardSidebar";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(false);


  return (
    <div
      data-theme={theme ? "dark" : "light"}
      className={`${inter.className} flex h-screen w-full overflow-hidden`}
    >
      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 h-screen z-50 shadow-lg transition-all duration-700 ease-in-out flex-shrink-0
        ${sidebarOpen ? "-ml-64 lg:ml-0" : "ml-0 lg:-ml-64"}`}
      >
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main column */}
      <div className="flex flex-1 min-w-0 min-h-0 flex-col transition-all duration-700 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            theme={theme}
            setTheme={setTheme}
          />
        </header>

        {/* Content */}
        <main className="flex-1 min-w-0 min-h-0 overflow-auto lg:px-6 px-4 py-4 bg-base-200">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-10 flex items-center justify-center bg-base-100 text-xs text-gray-500 shrink-0">
          Made with love by{" "}
          <span className="text-primary ml-1 font-bold">Pixvion</span>
        </footer>
      </div>
    </div>
  );

}
