"use client";
import AddOrder from "@/Components/AddOrder";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import DashboardSearch from "@/Components/DashboardSearch";
import ItemsCount from "@/Components/ItemsCount";
import OrdersTable from "@/Components/OrdersTable";
import Pagination from "@/Components/Pagination";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const allOrders = [
    {
      id: "#21001",
      name: "5 Items",
      customer: "Emily Johnson",
      price: 342,
      payment: "Paid",
      status: "Ordered",
      orderedAt: "29 May 2024",
    },
    {
      id: "#21001",
      name: "9 Items",
      customer: "Sarah Johnson",
      price: 342,
      payment: "Pending",
      status: "Ordered",
      orderedAt: "29 May 2025",
    },
    {
      id: "#21002",
      name: "3 Items",
      customer: "Alex Thompson",
      price: 578,
      payment: "Paid",
      status: "Pending",
      orderedAt: "29 Sep 2023",
    },
    {
      id: "#21003",
      name: "6 Items",
      customer: "Sarah Davis",
      price: 215,
      payment: "Pending",
      status: "On the Way",
      orderedAt: "29 Jan 2024",
    },
    {
      id: "#21004",
      name: "2 Items",
      customer: "Michael Wilson",
      price: 769,
      payment: "Pending",
      status: "Delivered",
      orderedAt: "29 Jul 2023",
    },
    {
      id: "#21005",
      name: "7 Items",
      customer: "Jessica Miller",
      price: 431,
      payment: "Paid",
      status: "Delivered",
      orderedAt: "29 Apr 2024",
    },
    {
      id: "#21006",
      name: "4 Items",
      customer: "Daniel Green",
      price: 299,
      payment: "Refund",
      status: "Refund",
      orderedAt: "10 Jan 2024",
    },
  ];

  const pathname = usePathname();
  const [slug, setSlug] = useState("All");
  const [orders, setOrders] = useState(allOrders);

  useEffect(() => {
    const pathSlug = pathname.split("/")[3] || "All";
    setSlug(pathSlug);

    if (pathSlug !== "All") {
      const filteredData = allOrders.filter(
        (v) => v.status.toLowerCase() === pathSlug.toLowerCase()
      );
      setOrders(filteredData);
    } else {
      setOrders(allOrders);
    }
  }, [pathname]);

  const breadData = [
    {
      name: `${slug} Orders`,
      href: `/Dashboard/Orders/${slug}`,
    },
  ];

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading={`${slug} Orders`} />
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <div className="w-full flex items-center justify-between mb-6 md:px-2">
          <div className="">
            <DashboardSearch placeholder={"Search by Order ID"} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <AddOrder />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <OrdersTable orders={orders} />
        </div>
        <div className="w-full flex items-center justify-between mt-6 md:px-2 ">
         <div className="w-full ">
           <ItemsCount/>
         </div>
         <div className="w-full md:w-auto flex justify-end">
<Pagination/>
         </div>
          
        </div>
      </div>
    </>
  );
};

export default OrderPage;
