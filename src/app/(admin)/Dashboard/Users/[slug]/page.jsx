"use client";
import AddOrder from "@/Components/AddOrder";
import AddUser from "@/Components/AddUser";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import DashboardSearch from "@/Components/DashboardSearch";
import UsersTable from "@/Components/UserTable";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = () => {
   const Allusers = [
  {
    id: "#U1001",
    name: "Ali Khan",
    profilePic: "https://i.pravatar.cc/100?img=1",
    email: "ali.khan@example.com",
    role: "Admin",
    active: true,
    joinedAt: "2025-01-12",
  },
  {
    id: "#U1002",
    name: "Sara Ahmed",
    profilePic: "https://i.pravatar.cc/100?img=2",
    email: "sara.ahmed@example.com",
    role: "User",
    active: false,
    joinedAt: "2025-02-03",
  },
  {
    id: "#U1003",
    name: "Bilal Hussain",
    profilePic: "https://i.pravatar.cc/100?img=3",
    email: "bilal.hussain@example.com",
    role: "Admin",
    active: true,
    joinedAt: "2025-01-28",
  },
  {
    id: "#U1004",
    name: "Fatima Noor",
    profilePic: "https://i.pravatar.cc/100?img=4",
    email: "fatima.noor@example.com",
    role: "User",
    active: true,
    joinedAt: "2025-03-10",
  },
  {
    id: "#U1005",
    name: "Usman Raza",
    profilePic: "https://i.pravatar.cc/100?img=5",
    email: "usman.raza@example.com",
    role: "User",
    active: false,
    joinedAt: "2025-02-20",
  },
  {
    id: "#U1006",
    name: "Ayesha Malik",
    profilePic: "https://i.pravatar.cc/100?img=6",
    email: "ayesha.malik@example.com",
    role: "Admin",
    active: true,
    joinedAt: "2025-01-05",
  },
  {
    id: "#U1007",
    name: "Hamza Siddiqui",
    profilePic: "https://i.pravatar.cc/100?img=7",
    email: "hamza.siddiqui@example.com",
    role: "User",
    active: true,
    joinedAt: "2025-03-02",
  },
  {
    id: "#U1008",
    name: "Zara Iqbal",
    profilePic: "https://i.pravatar.cc/100?img=8",
    email: "zara.iqbal@example.com",
    role: "User",
    active: true,
    joinedAt: "2025-02-15",
  },
  {
    id: "#U1009",
    name: "Imran Qureshi",
    profilePic: "https://i.pravatar.cc/100?img=9",
    email: "imran.qureshi@example.com",
    role: "Admin",
    active: false,
    joinedAt: "2025-01-22",
  },
  {
    id: "#U1010",
    name: "Hira Sheikh",
    profilePic: "https://i.pravatar.cc/100?img=10",
    email: "hira.sheikh@example.com",
    role: "User",
    active: true,
    joinedAt: "2025-03-18",
  },
];
  const pathname = usePathname();
  const [slug, setSlug] = useState("All");
  const [users, setUsers] = useState(Allusers);

  useEffect(() => {
    const pathSlug = pathname.split("/")[3] || "All";
    setSlug(pathSlug);

    if (pathSlug !== "All") {
      const filteredData = Allusers.filter(
        (v) => v.role.toLowerCase() === pathSlug.toLowerCase()
      );
      setUsers(filteredData);
    } else {
      setUsers(Allusers);
    }
  }, [pathname]);

  const breadData = [
     { name: 'Dashboard', href: '/Dashboard' },
    {
      name: `${slug} Users`,
      href: `/Dashboard/Users/${slug} Users`,
    },
  ];

  return (
    <>
     <DashboardPageHeader breadData={breadData} heading={`${slug} Users`} />

<div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
  {/* Header Section */}
  <div className="flex flex-row justify-between gap-3 mb-6">
    {/* Search */}
    <div className="w-full md:w-1/2">
      <DashboardSearch placeholder="Search by Name or Email" />
    </div>

    {/* Add User Button */}
    <div className="w-full md:w-auto flex justify-end">
      <AddUser />
    </div>
  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto rounded-lg border border-base-200">
    <UsersTable users={users} />
  </div>
</div>

    </>
  );
};

export default UserPage;
