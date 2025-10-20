"use client";

import { Edit, Trash } from "lucide-react";
import Image from "next/image";

export default function UsersTable({users}) {
   

  return (
    <table className="table w-full table-md">
      {/* head */}
      <thead className="text-xs font-semibold text-base-content/70 bg-base-200 uppercase tracking-wide">
        <tr>
          <th>User ID</th>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
         
          <th className="hidden md:table-cell">Joined At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={idx} className="hover:bg-base-200/40 transition">
            {/* User ID */}
            <td className="font-medium">{user.id}</td>

            {/* User (Profile Pic + Name) */}
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-md overflow-hidden ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <Image
                      src={user.profilePic}
                      alt={user.name}
                      width={50}
                      height={50}
                      className="object-cover"  
                    />
                  </div>
                </div>
                <div className="flex h-full flex-col ">
                  <div >
                    <h3 className="font-medium ">{user.name}</h3>
                    <div>{user.active?<span className="text-success text-xs">Online</span>:<span className="text-error text-xs">Offline</span>}</div>
                    </div></div>
              </div>
            </td>

            {/* Email */}
            <td>{user.email}</td>

            {/* Role (no badge) */}
            <td>{user.role}</td>

            

            {/* Joined At */}
            <td className="hidden md:table-cell">{user.joinedAt}</td>

            {/* Actions */}
            <td className="flex items-center gap-1">
              <button className="btn btn-ghost btn-circle btn-xs hover:bg-base-300 p-1">
                <Edit className="h-4 w-4" />
              </button>
              <button className="btn btn-ghost btn-circle btn-xs hover:bg-base-300 p-1">
                <Trash className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
