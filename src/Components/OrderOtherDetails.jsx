'use client'
import React from 'react'
import { CreditCard, User, MapPin, ArrowRight } from 'lucide-react'

const OrderOtherDetails = () => {
  return (
    <div className="w-full grid gap-4 mt-4 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Payment Information */}
      <div className="bg-base-100 rounded-xl border border-base-200 shadow-sm p-5">
        <h2 className="text-sm w-full text-center mb-6 font-semibold text-base-content bg-base-200 py-2 px-3 rounded-sm block">
          Payment Information
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-base-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-base-content" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-base-content">Ends with 2487</p>
              <p className="text-xs text-base-content/60 mt-0.5">Expired at 08/27</p>
            </div>
            <div className="px-6 py-1 bg-success/10 border-2 border-dashed  border-success/30 rounded-sm flex-shrink-0">
              <span className="text-xs font-medium text-success">Paid</span>
            </div>
          </div>
          
         
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-base-100 rounded-xl border border-base-200 shadow-sm p-5">
        <h2 className="text-sm w-full text-center mb-6 font-semibold text-base-content bg-base-200 py-2 px-3 rounded-sm block">
          Customer Details
        </h2>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-base-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-base-content" strokeWidth={2} />
          </div>
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-sm font-semibold text-base-content">Samuel E. Clark</p>
            <div className="space-y-1">
              <p className="text-xs text-base-content/70">
                <span className="font-medium">Email:</span> samuel.clark@email.com
              </p>
              <p className="text-xs text-base-content/70">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-base-100 rounded-xl border border-base-200 shadow-sm p-5">
        <h2 className="text-sm w-full text-center mb-6 font-semibold text-base-content bg-base-200 py-2 px-3 rounded-sm block">
          Delivery Address
        </h2>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-base-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-base-content" strokeWidth={2} />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm font-semibold text-base-content">Home Address</p>
            <p className="text-xs text-base-content/70 leading-relaxed">
              742 Evergreen Terrace,
              Springfield, IL 62704<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderOtherDetails