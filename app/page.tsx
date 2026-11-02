"use client";

import ProductCard from "@/components/ProductCards";
import { useAppSelector } from "@/redux/hooks";
import { Sparkles, Radar } from "lucide-react";
import Link from "next/link";
import ThemeImage from "@/components/ThemeImage";

function MainScreen() {
  const products = useAppSelector(
    (state) => state.product.Products
  );

  return (
    <main className="min-h-screen bg-white">

      <section className="relative h-[340px] w-full overflow-hidden sm:h-[380px] md:h-[420px] lg:h-[450px]">

        <ThemeImage
          lightSrc="/bannerid1.jpg"
          darkSrc="/bannerid2.jpg"
          alt="E-Store featured products banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Subtle overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center px-3 py-5 sm:px-6">

          <div className="w-full max-w-2xl rounded-2xl border border-white/30 bg-white/35 px-4 py-5 text-center shadow-lg backdrop-blur-[2px] dark:border-white/10 dark:bg-black/30 sm:px-10 sm:py-8">

            <p className="mx-auto mb-2 w-fit rounded-full border-2 border-yellow-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white sm:mb-3 sm:px-5 sm:py-2 sm:text-xs md:text-sm">
              Discover • Shop • Enjoy
            </p>

            <h1 className="mb-3 font-serif text-xl font-extrabold leading-tight tracking-tight text-black drop-shadow-sm sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
              Find Your Next Favorite
            </h1>

            <p className="mx-auto mb-5 max-w-xl text-xs font-medium leading-relaxed text-gray-900 dark:text-white sm:mb-5 sm:text-sm md:text-base">
              Explore quality products, discover great deals, and enjoy a seamless shopping experience.
            </p>

            <Link href="/products" className="inline-flex w-full max-w-[200px] flex-row flex-nowrap items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gray-700 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-colors duration-200 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:w-auto sm:px-6 sm:py-3 sm:text-sm">
              <Radar size={20} className="shrink-0" />
              <span>Explore Collection</span>
            </Link>

          </div>
        </div>
      </section>


      <section className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10">
        <div className="mb-2 text-center">
          <h2 className="mx-auto flex w-fit items-center justify-center gap-2 rounded-t-lg bg-gray-800 px-5 py-3 text-center text-lg font-bold tracking-wide text-white sm:px-7 sm:text-2xl">
            <Sparkles size={21} className="text-white/100" />
            Featured Products
          </h2>

          <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            Explore our latest products and popular picks
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 justify-items-center gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-3">
          {[...products].slice(-12).reverse().map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isNew={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainScreen;