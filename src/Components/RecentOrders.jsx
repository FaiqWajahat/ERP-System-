import React from 'react'
import OrdersTable from './OrdersTable'

const RecentOrders = () => {

     const recentOrders = [
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
    
  ];

  return (
   <div className="w-full bg-base-100 rounded-xl overflow-x-auto shadow-lg p-4 lg:p-6">
    <h3 className='text-lg font-semibold mb-6'>Recent Order</h3>
    <OrdersTable orders={recentOrders}/>
   </div>
  )
}

export default RecentOrders