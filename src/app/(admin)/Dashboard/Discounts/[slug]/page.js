"use client";
import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import DsicountsTable from "@/Components/DsicountsTable";
import DashboardSearch from "@/Components/DashboardSearch";
import AddOrder from "@/Components/AddOrder";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import AddDiscount from "@/Components/AddDiscount";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState([
        {
      id: "DISC-1001",
      code: "SUMMER10",
      type: "percentage",
      value: 10,
      appliesTo: "all",
      startDate: "2025-08-01",
      endDate: "2025-08-31",
      status: "Active",
    },
    {
      id: "DISC-1002",
      code: "SHOES20",
      type: "fixed",
      value: 20,
      appliesTo: "categories",
      startDate: "2025-09-01",
      endDate: "2025-09-15",
      status: "Expired",
    },
  ]);

  const breadData=[
     { name: 'Dashboard', href: '/Dashboard' },
    {
        name:"All Disconts",
        href:"/Dashboard/Discounts/All"
    }
  ]

  return (
  <>
  <DashboardPageHeader breadData={breadData} heading={`All Discounts`} />

      {/* Table */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
         <div className="w-full flex items-center justify-between mb-6 md:px-2">
          <div className="">
            <DashboardSearch placeholder={"Search by Order ID"} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
         <AddDiscount/>
          </div>
        </div>
       <div className="w-full overflow-x-auto">
        <DsicountsTable discounts={discounts}/> 
       </div>
      </div>
    
    </>
  );
}