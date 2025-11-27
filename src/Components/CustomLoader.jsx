'use client'
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function CustomLoader({text, brandName = "Seven Directions"}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-secondary-100/30">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning loader icon */}
        <Loader2 className="w-12 h-12 text-[var(--primary-color)] animate-spin" />
        
        {/* Brand name with animation */}
        <h2 className="text-2xl font-bold text-[var(--primary-color)] animate-pulse">
          {brandName}
        </h2>
        
       
      </div>
    </div>
  );
}