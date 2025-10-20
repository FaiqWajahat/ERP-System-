import AddCategory from '@/Components/AddCategory';
import AddProduct from '@/Components/AddProduct';
import CategoriesTable from '@/Components/CategoriesTable';
import DashboardPageHeader from '@/Components/DashboardPageHeader';
import DashboardSearch from '@/Components/DashboardSearch';
import React from 'react'

const DashboardCategories = () => {
    const categories = [
  {
    id: "C1001",
    name: "Men’s Clothing",
    description: "Shirts, trousers, jackets",
    status: "Active",
    createdAt: "2025-01-12",
    subcategories: ["Shirts", "Trousers", "Jackets"],
  },
  {
    id: "C1002",
    name: "Women’s Clothing",
    description: "Dresses, abayas",
    status: "Active",
    createdAt: "2025-01-15",
    subcategories: ["Dresses", "Abayas"],
  },
  {
    id: "C1003",
    name: "Accessories",
    description: "Watches, belts, wallets",
    status: "Inactive",
    createdAt: "2025-02-05",
    subcategories: [],
  },
];

  const breadData = [
     { name: 'Dashboard', href: '/Dashboard' },
    {
      name: "Categories",
      href: `/Dashboard/Categories`,
    },
  ];

  return (
    <>
     <DashboardPageHeader breadData={breadData} heading={"Categories"} />
    <div className='w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6'>
         <div className="flex flex-row justify-between gap-3 mb-6">
    {/* Search */}
    <div className="w-full md:w-1/2">
      <DashboardSearch placeholder="Search by ID or Name" />
    </div>

    {/* Add Product Button */}
    <div className="w-full md:w-auto flex justify-end">
      <AddCategory/>
    </div>
  </div>
 <CategoriesTable categories={categories}/>
    </div>
   
    </>
  )
}

export default DashboardCategories;