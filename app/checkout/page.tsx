
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addOrder } from "@/redux/features/order/orderSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import type { Order } from "@/types/type";

const LocationMap = dynamic(
  () => import("@/components/LocationMap"),
  {
    ssr: false,
    loading: () => <p className="p-5 text-center">Loading map...</p>,
  }
);

export default function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(Boolean(data.loggedIn));
        if (data.customer?.email) setEmail(data.customer.email);
        if (data.customer?.name) setName(data.customer.name);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  async function handlePlaceOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const session = await fetch("/api/auth/me").then((response) => response.json());
    if (!session.loggedIn) {
      alert("Login first to place your order.");
      router.push("/login?redirect=/checkout");
      return;
    }
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      customerid: "",
      items: cartItems.map((item) => ({ product: item.product, quantity: item.quantity })),
      total,
      createdat: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || "Could not place your order.");
      return;
    }

    dispatch(addOrder(order));
    dispatch(clearCart(cartItems));
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [] }),
    });
    router.push("/order-success");
  }

  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10 sm:px-3.5 sm:py-3 sm:text-base";

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-red-100 px-4 py-6 sm:gap-4">
        <h1 className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Your cart is empty
        </h1>

        <Link
          href="/products"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-6 sm:py-3 sm:text-base"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-200 px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-4 sm:gap-6 md:grid-cols-2 md:gap-5 lg:gap-8">


        {loggedIn ? (
          <form
            onSubmit={handlePlaceOrder}
            className="min-w-0 space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm sm:space-y-5 sm:rounded-2xl sm:p-6"
          >
            <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Checkout
            </h1>

            <p className="text-center text-sm text-gray-600 sm:text-base">
              Enter your details to complete your order.
            </p>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="checkout-name"
                className="mb-1.5 block text-sm font-medium text-gray-800 sm:mb-2"
              >
                Full Name
              </label>
              <input
                id="checkout-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-email"
                className="mb-1.5 block text-sm font-medium text-gray-800 sm:mb-2"
              >
                Email
              </label>
              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="mb-1.5 block text-sm font-medium text-gray-800 sm:mb-2"
              >
                Phone
              </label>
              <input
                id="checkout-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
                placeholder="Enter your phone"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-address"
                className="mb-1.5 block text-sm font-medium text-gray-800 sm:mb-2"
              >
                Delivery Address
              </label>

              <textarea
                id="checkout-address"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Enter your delivery address"
              />

              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="mt-3 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
              >
                <MapPin size={18} />
                Select Location on Map
              </button>
            </div>

            <button
              type="submit"
              className="min-h-11 w-full cursor-pointer rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:py-3 sm:text-base"
            >
              Place Order
            </button>
          </form>
        ) : (
          <section className="h-fit min-w-0 space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm sm:rounded-2xl sm:p-6 md:mt-0">
            <h1 className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
              Login Required
            </h1>

            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Please log in to continue with checkout and place your order.
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="min-h-11 w-full cursor-pointer rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:py-3 sm:text-base"
            >
              Login as User
            </button>
          </section>
        )}


        <section className="h-fit min-w-0 rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm sm:rounded-2xl sm:p-6">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:mb-5 sm:text-2xl">
            Order Summary
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex min-w-0 items-center gap-3 border-b border-gray-200 pb-3 sm:gap-4 sm:pb-4"
              >
                <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="(max-width: 639px) 64px, 80px"
                    className="rounded-lg border border-gray-100 bg-white p-1 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-gray-900 sm:text-base">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>


          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-gray-700 px-3 py-3 text-white sm:mt-5 sm:px-4 sm:py-4">
            <span className="text-sm font-semibold sm:text-base">
              Total
            </span>

            <span className="text-base font-bold sm:text-xl">
              ${total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/cart"
            className="mx-auto mt-4 flex min-h-10 w-full items-center justify-center rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-5 sm:w-fit sm:px-6 sm:py-3 sm:text-base"
          >
            Back to Cart
          </Link>
        </section>
      </div>
      {showMap && (
        <LocationMap
          onClose={() => setShowMap(false)}
          onConfirm={(selectedAddress) => {
            setAddress(selectedAddress);
            setShowMap(false);
          }}
        />
      )}
    </main>
  );
}
