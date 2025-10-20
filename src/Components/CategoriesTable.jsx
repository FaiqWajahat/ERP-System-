"use client";

import { Edit, Trash } from "lucide-react";

export default function CategoriesTable() {
  const categories = [
    {
      id: "C-101",
      name: "Clothing",
      subcategories: ["T-Shirts", "Jeans", "Jackets"],
      status: "Active",
    },
    {
      id: "C-102",
      name: "Footwear",
      subcategories: ["Sneakers", "Boots", "Sandals"],
      status: "Active",
    },
    {
      id: "C-103",
      name: "Accessories",
      subcategories: ["Belts", "Hats", "Watches"],
      status: "Inactive",
    },
    {
      id: "C-104",
      name: "Sports",
      subcategories: ["Football", "Cricket", "Tennis"],
      status: "Active",
    },
    {
      id: "C-105",
      name: "Electronics",
      subcategories: ["Mobiles", "Laptops", "Headphones"],
      status: "Inactive",
    },
    {
      id: "C-106",
      name: "Furniture",
      subcategories: ["Chairs", "Tables", "Beds"],
      status: "Active",
    },
    {
      id: "C-107",
      name: "Beauty",
      subcategories: ["Makeup", "Skincare", "Haircare"],
      status: "Active",
    },
    {
      id: "C-108",
      name: "Groceries",
      subcategories: ["Fruits", "Vegetables", "Snacks"],
      status: "Active",
    },
    {
      id: "C-109",
      name: "Books",
      subcategories: ["Novels", "Comics", "Education"],
      status: "Inactive",
    },
    {
      id: "C-110",
      name: "Toys",
      subcategories: ["Action Figures", "Puzzles", "Dolls"],
      status: "Active",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-md">
        {/* Table Head */}
        <thead className="text-sm font-semibold text-base-content/70 bg-base-200 uppercase tracking-wide">
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Sub Categories</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-base-200/40 transition">
              <td className="font-medium whitespace-nowrap">{cat.id}</td>
              <td>{cat.name}</td>
              <td className="text-sm text-base-content/80">
                {cat.subcategories.join(" , ")}
              </td>
              <td>
                <span
                  className={`  ${
                    cat.status === "Active" ? "text-success" : "text-error"
                  }`}
                >
                  {cat.status}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <button className="btn btn-ghost btn-circle btn-xs hover:bg-base-300 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="btn btn-ghost btn-circle btn-xs hover:bg-base-300 hover:text-error p-1">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

