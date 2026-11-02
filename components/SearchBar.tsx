
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShieldAlert } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

function SearchBar() {
  const [query, setQuery] = useState("");

  const products = useAppSelector(
    (state) => state.product.Products
  );

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-md">
      
      <div className="flex min-h-10 items-center gap-2 rounded-xl border border-gray-400 bg-gradient-to-r from-blue-50 via-white to-purple-50 px-3 py-2 shadow-sm transition focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-gray-300 dark:border-gray-600 dark:from-gray-800 dark:via-gray-900 dark:to-slate-800 dark:focus-within:border-gray-400 dark:focus-within:ring-gray-600 sm:gap-3 sm:px-4">
        <Search
          size={18}
          className="shrink-0 text-gray-800 dark:text-gray-200"
          aria-hidden="true"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Discover E-Store..."
          aria-label="Search products by name or category"
          aria-expanded={query.trim() !== ""}
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-xs placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400 sm:placeholder:text-sm"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-md font-semibold text-gray-700 transition hover:bg-gray-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ✖
          </button>
        )}
      </div>

      
      {query.trim() !== "" && (
        <div className="search-dropdown-scroll absolute left-0 right-0 top-full z-[100] mt-2 max-h-[min(20rem,60vh)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-gray-200/80 bg-white/95 shadow-2xl shadow-gray-900/15 ring-1 ring-black/5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 dark:border-gray-700/80 dark:bg-gray-900/95 dark:shadow-black/40 dark:ring-white/10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/details?id=${product.id}`}
                onClick={() => setQuery("")}
                className="group flex min-w-0 items-center justify-between gap-3 border-b border-gray-100/80 px-3 py-3 text-gray-900 transition-all duration-200 last:border-b-0 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50/70 hover:shadow-sm focus-visible:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 dark:border-gray-700/70 dark:text-gray-100 dark:hover:from-gray-800 dark:hover:to-slate-800 dark:focus-visible:bg-gray-800 sm:gap-3 sm:px-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-gray-200/70 bg-gray-50 transition-all duration-200 group-hover:scale-105 group-hover:border-orange-300 group-hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:bg-gray-700 sm:h-12 sm:w-12">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 sm:text-base ">
                      {product.name}
                    </p>

                    <p className="mt-1 break-words text-xs text-gray-500 dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 whitespace-nowrap text-xs font-bold text-gray-800 dark:text-gray-200 sm:text-sm">
                  ${product.price}
                </span>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center gap-3 bg-red-50 px-3 py-5 text-center text-md font-medium text-red-600 dark:bg-gray-700 dark:text-slate-200 sm:px-4 sm:text-base">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <ShieldAlert className="h-6 w-6" />
              </span>

              <span className="break-words">
                Product does not exist.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
