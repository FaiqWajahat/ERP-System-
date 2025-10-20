"use client";
import React from "react";
import { Search } from "lucide-react";

const DashboardSearch = ({ placeholder }) => {
  return (
    <>
      <label className="input text-sm  h-8">
        <Search stroke="currentColor" className="w-5 h-5 " />
        <input type="search" placeholder={placeholder} className="text-sm w-full " />
      </label>
    </>
  );
};

export default DashboardSearch;
