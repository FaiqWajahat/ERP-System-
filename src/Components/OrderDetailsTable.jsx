'use client'
import Image from 'next/image'
import React from 'react'

const orders = [
  {
    id: '1001',
    name: "Men's tracking shoes",
    tag: '#SHOES',
    category: 'Fashion',
    price: 29,
    quantity: 3,
    amount: 87,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
  },
  {
    id: '1002',
    name: 'Coco body oil',
    tag: '#COCOOIL',
    category: 'Daily Need',
    price: 16,
    quantity: 2,
    amount: 32,
    image: 'https://images.pexels.com/photos/30229955/pexels-photo-30229955.jpeg',
  },
  {
    id: '1003',
    name: 'Freeze air',
    tag: '#FREEAIR',
    category: 'Cosmetic',
    price: 32,
    quantity: 4,
    amount: 128,
    image: 'https://images.pexels.com/photos/7926150/pexels-photo-7926150.jpeg',
  },
]

const OrderDetailsTable = () => {
  const subtotal = orders.reduce((acc, item) => acc + item.amount, 0)
  const orderId = 'ORD-98213' // ✅ Example Order ID

  return (
    <div className="w-full space-y-4 ">
     
        <div className="px-4  py-2   rounded-lg text-base-content font-medium text-sm  inline-flex items-center gap-2">
          <span className="font-semibold">Order ID:</span>
          <span className="tracking-wide">{orderId}</span>
        </div>
     

      {/* Table */}
      <div className=" h-full  overflow-x-auto  ">
        <table className="table w-full table-sm">
          {/* Table Head */}
          <thead className=''>
            <tr className="bg-base-200 text-xs text-base-content/80    uppercase ">
              <th className=" rounded-tl-md py-4">#</th>
              <th>SKU</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th className=" rounded-tr-md ">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-base-200/70 transition duration-150 "
              >
                <td className="font-medium py-2 text-base-content/80">{index + 1}</td>
                <td className="text-sm py-2 text-base-content/60">{item.id}</td>
                <td className='py-4'>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-lg overflow-hidden ring ring-base-300 ring-offset-base-100 ring-offset-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-base-content">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 ">
                        {item.tag}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-sm py-2 text-base-content/70">{item.category}</td>
                <td className="text-sm py-2 font-medium text-base-content/80">
                  ${item.price}
                </td>
                <td className="text-sm py-2 text-base-content/70">
                  {item.quantity}x
                </td>
                <td className="text-right py-2 text-sm font-semibold text-base-content">
                  ${item.amount}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table Footer */}
          <tfoot className="border-t  border-base-200">
            <tr>
              <td
                colSpan={6}
                className="text-right py-4 text-base-content font-semibold text-md"
              >
                Total
              </td>
              <td className="text-right py-4 text-base-content font-bold text-md">
                ${subtotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default OrderDetailsTable
