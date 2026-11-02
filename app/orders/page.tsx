"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Order } from "@/types/type";
import {
  OctagonX,
  ClipboardList,
  ShoppingBag,
  House,
  RotateCcw,
} from "lucide-react";

function OrderShow() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(async (response) => {
        if (response.status === 401) return [];
        if (!response.ok) throw new Error("Could not load orders");
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-3 py-8 transition-colors duration-300 dark:bg-gray-950 sm:px-6 sm:py-10 lg:px-10">

      
      <h1 className="mx-auto mb-8 flex w-fit max-w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-2xl font-bold text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:mb-10 sm:gap-3 sm:px-7 sm:text-3xl">
        <ClipboardList className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
        <u>My Orders</u>
      </h1>

      
      {loading ? (
        <p className="text-center text-gray-600">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <p className="flex flex-col items-center justify-center gap-3 text-base font-semibold text-gray-900 dark:text-gray-100 sm:flex-row sm:text-xl">
            <OctagonX
              className="h-8 w-8 shrink-0 text-red-500 sm:h-9 sm:w-9"
              strokeWidth={3}
            />
            You haven't placed any orders yet.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 sm:mt-9 sm:w-auto"
          >
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      ) : (

        
        <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
          {orders.map((order) => (
            <section
              key={order.id}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-6"
            >

              
              <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    Order #{order.id}
                  </h2>

                  <p className="mt-1 break-words text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    Placed on: {order.createdat}
                  </p>
                </div>

                <p className="text-base font-bold text-gray-800 dark:text-gray-100 sm:text-lg">
                  Total: ${order.total}
                </p>
              </div>

              
              <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                Products
              </h3>

              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex min-w-0 flex-col gap-3 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 dark:border-gray-700 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:flex-1 sm:gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 sm:h-24 sm:w-24">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words font-semibold text-gray-900 dark:text-white sm:text-base">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Price: ${item.product.price}
                        </p>
                      </div>
                    </div>

                    <p className="pl-1 text-sm font-bold text-gray-900 dark:text-gray-100 sm:pl-0 sm:text-right sm:text-base">
                      Subtotal: ${item.product.price * item.quantity}
                    </p>
                    <Link href="/products" className="flex items-center gap-2 justify-center mx-auto w-fit rounded-xl bg-gray-600 px-5 py-2 text-md font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                       <RotateCcw size={19} />
                       Shop Again?
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      
      <div className="mx-auto mt-6 max-w-6xl sm:mt-8">
        <Link
          href="/"
          className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 sm:w-auto"
        >
          <House className="h-5 w-5" />
          Home
        </Link>
      </div>
    </main>
  );
}

export default OrderShow;