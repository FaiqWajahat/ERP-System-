import DashboardPageHeader from '@/Components/DashboardPageHeader'
import OrderDetailsTable from '@/Components/OrderDetailsTable'
import OrderOtherDetails from '@/Components/OrderOtherDetails';
import OrderSteps from '@/Components/OrderSteps';

import React from 'react'

const page = () => {
  const breadData = [
  
    { name: 'Dashboard', href: '/Dashboard' },
    {name: 'Orders', href: '/Dashboard/Orders/All' },
    { name: 'Order Details', href: '/Dashboard/Orders/OrderDetails' },
  ];

  return (
    <>
    <div className='w-full    '>
     <DashboardPageHeader  breadData={breadData}  heading={'Order Details'} />
    
    <div className='w-full gap-4 grid grid-cols-12'>
   <div className='order-2 lg:order-1 col-span-12 lg:col-span-8 h-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6'>
      <OrderDetailsTable />
      </div>
      <div className='order-1 lg:order-1 col-span-12 lg:col-span-4  '>
        <OrderSteps/>
        </div>
    </div>
    <OrderOtherDetails/>
    </div>
    </>
  )
}

export default page