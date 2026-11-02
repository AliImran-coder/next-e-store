
"use client";

import Link from "next/link";
import {
  House,
  Package,
  ShoppingCart,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
  FileText,
  SquareArrowOutUpRight,
  Toolbox,
  SquareMousePointer,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { EnvelopeIcon, HeadsetIcon, GlobeIcon } from "@phosphor-icons/react";
import ThemeImage from "@/components/ThemeImage";

function FooterNavbar() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-800 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-12">


        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <Link
            href="/"
            aria-label="E-Store home"
            className="mb-4 inline-flex items-center gap-2"
          >
            <ThemeImage
              lightSrc="/logoed1.png"
              darkSrc="/logoed2.jpg"
              alt="E-Store logo"
              className="h-auto w-28 shrink-0 object-contain sm:w-24 lg:w-28"
            />
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-700 dark:text-gray-300">
            Discover quality products at great prices.
            Enjoy a simple and convenient shopping experience with us.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-5 py-2.5 font-semibold text-white transition duration-200 hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 sm:mt-8"
          >
            <KeyRound size={20} />
            Login
          </Link>
        </div>


        <div className="flex flex-col items-center">
          <h3 className="mb-4 flex w-fit items-center justify-center gap-2 rounded-t-xl bg-gray-600 px-4 py-2 text-center text-base font-bold text-white sm:text-lg">
            <SquareArrowOutUpRight size={18} />
            Quick Links
          </h3>

          <ul className="space-y-3 text-center text-sm text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <House size={16} strokeWidth={3} />
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <Package size={16} strokeWidth={3} />
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <ShoppingCart size={16} strokeWidth={3} />
                Shopping Cart
              </Link>
            </li>

            <li>
              <Link
                href="/orders"
               className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <ClipboardList size={16} strokeWidth={3} />
                My Orders
              </Link>
            </li>
          </ul>
        </div>


        <div className="flex flex-col items-center">
          <h3 className="mb-4 flex w-fit items-center justify-center gap-2 rounded-t-xl bg-gray-600 px-4 py-2 text-center text-base font-bold text-white sm:text-lg">
            <Toolbox size={18} />
            Customer Service
          </h3>

          <ul className="space-y-3 text-center text-sm text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <MessageCircle size={16} strokeWidth={3} />
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <ShieldCheck size={16} strokeWidth={3} />
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/terms"
                className="flex items-center justify-center gap-2 font-bold underline-offset-4 transition-colors duration-200 hover:text-black hover:underline dark:hover:text-white"
              >
                <FileText size={16} strokeWidth={3} />
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>


        <div className="flex flex-col items-center">
          <h3 className="mb-4 flex w-fit items-center justify-center gap-2 rounded-t-xl bg-gray-600 px-4 py-2 text-center text-base font-bold text-white sm:text-lg">
            <SquareMousePointer size={18} strokeWidth={3} />
            Get in Touch
          </h3>

          <div className="w-full space-y-4 text-sm">
            <p className="flex flex-wrap items-center justify-center gap-2 font-bold text-gray-800 transition hover:text-black dark:text-gray-200 dark:hover:text-white">
              <EnvelopeIcon size={17} className="shrink-0" weight="bold" />
              <span className="break-all">support@estore.com</span>
            </p>

            <p className="flex flex-wrap items-center justify-center gap-2 font-bold text-gray-800 transition hover:text-black dark:text-gray-200 dark:hover:text-white">
              <HeadsetIcon size={17} className="shrink-0" weight="bold" />
              <span>+92 311 0516857</span>
            </p>

            <p className="flex items-center justify-center gap-2 font-bold text-gray-800 transition hover:text-black dark:text-gray-200 dark:hover:text-white">
              <GlobeIcon size={17} className="shrink-0" weight="bold" />
              Pakistan
            </p>
          </div>
        </div>
      </div>


      
      <div className="relative overflow-hidden border-t border-gray-300/70 bg-red-200 px-4 py-5 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
        
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-red-500 via-pink-500 to-violet-500" />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm font-medium text-gray-800 dark:text-gray-200 sm:flex-row sm:gap-4 sm:text-left">

         
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="transition-colors duration-300 hover:text-red-600 dark:hover:text-red-400">
              © {new Date().getFullYear()}
            </span>

            <span className="h-5 w-px bg-red-400 dark:bg-gray-600" />

            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-extrabold tracking-wide text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/40 hover:shadow-md dark:text-red-400 dark:hover:bg-gray-700/70"
            >
              
              <ShoppingCart
                size={21}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              />

              <span className="relative bg-gradient-to-r from-red-600 via-pink-600 to-violet-600 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-violet-400">
                &lt; E-Store /&gt;

                
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-violet-500 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <span className="text-gray-600 dark:text-gray-400">
              All rights reserved.
            </span>
          </div>

         
          <p className="group flex items-center gap-2 text-xs font-medium transition-colors duration-300 hover:text-red-600 dark:hover:text-red-400 sm:text-sm">
            <span className="inline-flex items-center justify-center text-pink-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 dark:text-pink-400">
              <Sparkles size={18} />
            </span>

            <span>Built for the best shopping experience.</span>
          </p>

        </div>
      </div>
     
    </footer>
  );
}

export default FooterNavbar;
