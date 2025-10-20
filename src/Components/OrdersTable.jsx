"use client";

import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";



export default function OrdersTable({orders}) {
  const router=useRouter()
  return (
     
      <table className="table w-full table-md ">
        {/* head */}
        <thead className="text-xs font-semibold text-base-content/70 bg-base-200 uppercase tracking-wide">
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th className="hidden sm:table-cell">Price</th>
            <th>Payment</th>
            <th>Status</th>
            <th className="hidden md:table-cell">Ordered At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="hover:bg-base-200/40 transition">
              <td className="font-medium">{order.id}</td>
              <td>{order.name}</td>
              <td>{order.customer}</td>
              <td className="hidden sm:table-cell font-semibold">
                ${order.price}
              </td>

              {/* Payment Badge */}
              <td>
                {order.payment === "Paid" ? (
                  <span className="text-success">
                    Paid
                  </span>
                ) : order.payment === "Pending" ? (
                  <span className="text-warning ">
                    Pending
                  </span>
                ) : (
                  <span className="text-error">
                    Refund
                  </span>
                )}
              </td>

              {/* Status (no badge colors) */}
              <td>{order.status}</td>

              <td className="hidden md:table-cell">{order.orderedAt}</td>

              {/* Action Buttons */}
              <td className="flex items-center gap-1">
                <button onClick={()=>router.push("/Dashboard/Orders/OrderDetails")}
                 className="btn btn-ghost btn-circle p-1 btn-xs hover:bg-base-300">
                  <Eye className="h-4 w-4" />
                </button>
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
