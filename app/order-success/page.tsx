"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";

export default function Order() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-red-200 px-3 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-lg rounded-2xl border border-red-300 bg-red-100 p-4 text-center shadow-md sm:p-7 md:p-8">
        
        <div className="mb-4 flex justify-center overflow-hidden text-green-600">
          <CircleCheck className="h-14 w-14 animate-[slideIn_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] will-change-transform sm:h-16 sm:w-16" />
        </div>

        
        <h1 className="text-2xl font-bold leading-tight text-green-600 sm:text-3xl">
          Order Placed Successfully!
        </h1>

        
        <p className="mt-4 text-sm leading-6 text-gray-700 sm:text-base">
          Thank you for your order.
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-base">
          Your order has been received and is being processed.
        </p>

        
        <div className="mt-5 rounded-xl border border-red-200 bg-red-200/60 p-3 sm:p-4">
          <p className="text-sm leading-6 text-gray-800 sm:text-base">
            <strong>Note:</strong>
            <i>
              You will receive your product at your given delivery address!
            </i>
          </p>
        </div>

        
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <Link
            href="/products"
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-gray-700 sm:w-auto sm:text-base"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-400 bg-gray-500 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-gray-600 sm:w-auto sm:text-base"
          >
            View Orders
          </Link>
        </div>
      </div>

      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translate3d(-80px, 0, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideIn_0\\.9s_cubic-bezier\\(0\\.22\\,1\\,0\\.36\\,1\\)_forwards\\] {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}