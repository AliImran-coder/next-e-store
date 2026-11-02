"use client";

import Image from "next/image";
import Link from "next/link";
import Product from "@/types/type";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import Toast from "./Toast";
import { Eye, ShoppingCart } from "lucide-react";

type Typed = {
  product: Product;
  isNew?: boolean;
};

function ProductCard({ product, isNew = false }: Typed) {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const products = useAppSelector((state) => state.product.Products);
  const currentProduct = products.find((item) => item.id === product.id);

  const dispatch = useAppDispatch();
  const stock = currentProduct?.stock ?? product.stock;

  return (
    <>
      <article
        onClick={() => router.push(`/details?id=${product.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/details?id=${product.id}`);
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        className="group relative flex h-full w-full max-w-sm cursor-pointer flex-col rounded-2xl border border-gray-200 bg-red-100 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30 dark:hover:shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:p-5">
        {isNew && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
            NEW
          </span>
        )}

        <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-gray-100 bg-white sm:h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 350px"
            className="object-contain p-2 transition duration-300 hover:scale-105"
          />
        </div>

        <h2 className="mb-3 line-clamp-2 min-h-12 break-words text-center text-base font-bold leading-6 text-gray-900 dark:text-white sm:text-lg">
          {product.name}
        </h2>

        <div className="flex flex-col gap-2 text-sm text-gray-800 sm:text-base">
          <p className="flex items-center justify-between gap-2 rounded-lg bg-white/60 px-3 py-2 dark:bg-gray-900/40">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Price
            </span>

            <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
              ${product.price.toLocaleString("en-US")}
            </span>
          </p>

          <p className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Availability
            </span>

            <span className={`font-semibold ${stock > 0
              ? "text-green-700 dark:text-green-400"
              : "text-red-600"
              }`}>
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Category:
            </span>

            <span className="rounded-full border border-gray-200 bg-white/70 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
              {product.category}
            </span>
          </div>

          <p className="mb-2 line-clamp-3 min-h-[72px] break-words text-sm leading-6 text-gray-600 dark:text-gray-300">
            {product.detail}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:pt-5">

          <Link
            href={`/details?id=${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:text-base">
            <Eye
              size={19}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0"
            />
            <span>View Details</span>
          </Link>


          <button
            type="button"
            disabled={stock <= 0}
            onClick={(e) => {
              e.stopPropagation();

              if (stock <= 0) return;

              dispatch(addToCart(product));
              setShowToast(true);
            }}
            className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-base"
          >
            {stock <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart
                  size={19}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="shrink-0"
                />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </article>

      <Toast
        message={`${product.name} added to cart!`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

export default ProductCard;