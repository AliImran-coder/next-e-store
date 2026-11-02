
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Toast from "@/components/Toast";

import {
  Package,
  ShoppingCartMinus,
  ShoppingCart,
  Trash2,
  CreditCardCheck,
} from "lucide-react";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";

import { useState } from "react";

function CartPage() {
  const dispatch = useAppDispatch();
  
  const[showRemove , setShowRemove] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);

  const products = useAppSelector((state) => state.product.Products);
 
  const total = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-red-100 px-3 py-5 sm:px-5 sm:py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl">

        <Toast
        message= {"Product Removed!"}
        show={showRemove}
        onClose={()=> setShowRemove(false)}
        />

        <h1 className="mx-auto mb-6 flex w-fit max-w-full items-center justify-center gap-2 rounded-lg border border-gray-600 px-3 py-2 text-center text-xl font-bold tracking-tight text-black sm:mb-8 sm:gap-3 sm:rounded-xl sm:px-6 sm:py-3 sm:text-3xl md:text-4xl">
          <ShoppingCart className="h-5 w-5 shrink-0 sm:h-8 sm:w-8" />
          <span><u>Shopping Cart</u></span>
        </h1>

        
        {cartItems.length === 0 ? (
          <div className="mx-auto rounded-xl border border-red-200 bg-red-200 p-5 text-center shadow-sm sm:rounded-2xl sm:p-10 md:p-14">
            <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-gray-900 sm:gap-3 sm:text-2xl">
              <ShoppingCartMinus
                className="h-5 w-5 shrink-0 text-red-700 sm:h-7 sm:w-7"
                strokeWidth={2}
              />
              Cart Empty
            </h2>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Your cart is currently empty!
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-6 sm:text-base"
            >
              <Package size={18} />
              Browse Products
            </Link>
          </div>
        ) : (
          <>
           
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.product.id}
                  className="rounded-xl border border-red-200 bg-red-200 p-3 shadow-sm transition duration-200 hover:shadow-md sm:rounded-2xl sm:p-5 md:p-6"
                >
                  <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                    
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={120}
                        height={100}
                        className="h-20 w-20 shrink-0 rounded-lg border border-red-100 bg-white p-1.5 object-contain sm:h-24 sm:w-24 sm:rounded-xl sm:p-2 md:h-28 md:w-28"
                      />

                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-base font-bold tracking-tight text-gray-900 sm:text-lg md:text-xl">
                          {item.product.name}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          ${item.product.price.toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-red-300/70 pt-3 sm:border-0 sm:pt-0 md:gap-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          onClick={() =>
                            dispatch(decreaseQuantity(item.product.id))
                          }
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-700 text-lg font-semibold text-white transition hover:bg-gray-800 sm:h-10 sm:w-10"
                        >
                          -
                        </button>

                        <span className="min-w-6 text-center text-sm font-bold tabular-nums text-gray-900 sm:min-w-8 sm:text-base">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.product.name}`}
                          disabled={
                            !products.find(
                              (product) => product.id === item.product.id
                            ) ||
                            products.find(
                              (product) => product.id === item.product.id
                            )!.stock <= 0 ||
                            item.quantity >=
                              products.find(
                                (product) => product.id === item.product.id
                              )!.stock
                          }
                          onClick={() => {
                            const currentProduct = products.find(
                              (product) => product.id === item.product.id
                            );

                            if (
                              currentProduct &&
                              item.quantity < currentProduct.stock
                            ) {
                              dispatch(
                                increaseQuantity({
                                  id: item.product.id,
                                  stock: currentProduct.stock,
                                })
                              );
                            }
                          }}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-700 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-base font-bold text-gray-900 sm:text-lg">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>

                      <button
                        type="button"
                        onClick={() =>{
                          dispatch(
                            removeFromCart({
                              id: item.product.id,
                              quantity: item.quantity,
                            })
                          );
                          setShowRemove(true)
                        }}
                        className="flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:min-h-10 sm:px-4"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            
            <section className="mx-auto mt-5 rounded-xl border border-red-200 bg-red-200 p-4 shadow-sm sm:mt-7 sm:rounded-2xl sm:p-6 md:p-8">
              <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                Order Summary
              </h2>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-red-300 pt-4 sm:mt-5 sm:pt-5">
                <p className="text-sm font-semibold text-gray-800 sm:text-lg">
                  Subtotal
                </p>

                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                  ${total.toLocaleString()}
                </p>
              </div>

              <Link
                href="/checkout"
                className=" gap-3 mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-md font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
              >
                <CreditCardCheck />
                Checkout
              </Link>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default CartPage;
