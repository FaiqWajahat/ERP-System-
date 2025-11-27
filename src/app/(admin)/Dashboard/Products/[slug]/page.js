"use client";
import AddProduct from "@/Components/AddProduct";

import DashboardPageHeader from "@/Components/DashboardPageHeader";
import DashboardSearch from "@/Components/DashboardSearch";
import ProductsTable from "@/Components/ProductTable";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = () => {
// Dummy product data
const allProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
    category: "Electronics",
    subCategory:"Laptop",
    price: 999.99,
    rating: 4.8,
    reviewCount: 1245,
    orders: 3420,
    stock: 45,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "MacBook Air M3",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop",
    category: "Computers",
     subCategory:"Laptop",
    price: 1199.00,
    rating: 4.9,
    reviewCount: 892,
    orders: 1876,
    stock: 23,
    createdAt: "2024-02-08"
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    category: "Footwear",
     subCategory:"Laptop",
    price: 150.00,
    rating: 4.5,
    reviewCount: 567,
    orders: 2341,
    stock: 3,
    createdAt: "2024-01-22"
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    category: "Audio",
     subCategory:"Laptop",
    price: 399.99,
    rating: 4.7,
    reviewCount: 1089,
    orders: 1654,
    stock: 67,
    createdAt: "2024-03-12"
  },
  {
    id: 5,
    name: "Samsung 4K Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop",
    category: "Electronics",
     subCategory:"Laptop",
    price: 549.99,
    rating: 4.6,
    reviewCount: 324,
    orders: 987,
    stock: 12,
    createdAt: "2024-02-28"
  },
  {
    id: 6,
    name: "Adidas Ultraboost 22",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop",
    category: "Footwear",
     subCategory:"Laptop",
    price: 180.00,
    rating: 4.4,
    reviewCount: 456,
    orders: 1432,
    stock: 0,
    createdAt: "2024-01-30"
  },
  {
    id: 7,
    name: "Canon EOS R5",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop",
    category: "Cameras",
     subCategory:"Laptop",
    price: 2499.99,
    rating: 4.9,
    reviewCount: 234,
    orders: 567,
    stock: 8,
    createdAt: "2024-03-05"
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop",
    category: "Wearables",
    subCategory:"Laptop",
    price: 399.00,
    rating: 4.7,
    reviewCount: 789,
    orders: 2103,
    stock: 34,
    createdAt: "2024-02-14"
  }
];

  const pathname = usePathname();
  const [slug, setSlug] = useState("All");
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    const pathSlug = pathname.split("/")[3] || "All";
    setSlug(pathSlug);

    if (pathSlug !== "All") {
      const filteredData = allProducts.filter(
        (v) => v.stock <= 5
      );
    const sortProducts = filteredData.sort((a, b) => a.stock - b.stock);

      setProducts(sortProducts);
    } else {
      setProducts(allProducts);
    }
  }, [pathname]);

  const breadData = [
     { name: 'Dashboard', href: '/Dashboard' },
    {
      name: `Assets`,
      href: `/Dashboard/Products/All`,
    },
  ];

  return (
    <>
     <DashboardPageHeader breadData={breadData} heading={`Assets`} />

<div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
  {/* Header Section */}
  <div className="flex flex-row justify-between gap-3 mb-6">
    {/* Search */}
    <div className="w-full md:w-1/2">
      <DashboardSearch placeholder="Search by ID or Name" />
    </div>

    {/* Add Product Button */}
    <div className="w-full md:w-auto flex justify-end">
      <AddProduct/>
    </div>
  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto rounded-lg border border-base-200">
    <ProductsTable products={products}  />
  </div>
</div>

    </>
  );
};

export default UserPage;
