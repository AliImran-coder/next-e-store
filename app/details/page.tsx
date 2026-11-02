
"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import Toast from "@/components/Toast";
import { products as defaultProducts } from "@/redux/features/product/productSlice";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useSearchParams } from "next/navigation";
import {
  Info,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  House,
  Package,
} from "lucide-react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

function ProductDetails() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const id = searchParams.get("id");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const products = useAppSelector((state) => state.product.Products);
  const cartItems = useAppSelector((state) => state.cart.items);

  const items = products.find((item) => item.id === Number(id));

  const defaultProduct = defaultProducts.find(
    (product) => product.id === Number(id)
  );

  const allImages = items?.images?.length
    ? items.images
    : defaultProduct?.images?.length
      ? defaultProduct.images
      : defaultProducts[0]?.images ?? [];

  const mainImage = selectedImage ?? items?.image ?? "";

  const displayImages = [
    ...(items?.image ? [items.image] : []),
    ...allImages,
  ]
    .filter(
      (img, index, arr) =>
        Boolean(img) &&
        arr.indexOf(img) === index &&
        img !== mainImage
    )
    .slice(0, 2);

  const currentProduct = products.find(
    (item) => item.id === Number(id)
  );

  const cartItem = cartItems.find(
    (item) => item.product.id === Number(id)
  );

  if (!items) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-red-100 px-4 py-10 text-center text-red-600">
        <p className="text-lg font-semibold">Product not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-red-100 px-3 py-6 sm:px-6 sm:py-8 lg:px-10">
      <Toast
        message={`${items.name} added to cart!`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <Toast
        message={`${items.name} removed from cart!`}
        show={showRemove}
        onClose={() => setShowRemove(false)}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 w-fit max-w-full rounded-xl border border-gray-400 px-3 py-3 sm:mb-8 sm:px-5"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-700 sm:gap-x-3 sm:text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 font-semibold text-black transition hover:text-gray-600 hover:underline"
            >
              <House size={15} className="shrink-0 sm:h-4 sm:w-4" />
              Home
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={15} className="text-gray-400" />
          </li>

          <li>
            <Link
              href="/products"
              className="flex items-center gap-1 font-semibold text-black transition hover:text-gray-600 hover:underline"
            >
              <Package size={15} className="shrink-0 sm:h-4 sm:w-4" />
              Products
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={15} className="text-gray-400" />
          </li>

          <li
            aria-current="page"
            className="max-w-[150px] break-words font-bold text-black sm:max-w-xs"
          >
            {items.name}
          </li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">

        <div className="flex w-full min-w-0 flex-col items-center self-start overflow-hidden rounded-2xl border border-red-200 bg-white/50 p-3 sm:p-4">

          <div className="flex h-[300px] w-full items-center justify-center sm:h-[400px] lg:h-[500px]">
            <InnerImageZoom
              key={mainImage}
              src={mainImage}
              zoomSrc={mainImage}
              zoomType="hover"
              zoomScale={1.15}
              zoomPreload
              hideHint
              className="product-image-zoom"
            />
          </div>


          {displayImages.length > 0 && (
            <div className="mt-5 flex min-h-[72px] w-full shrink-0 items-center justify-center gap-3">
              {displayImages.map((img, index) => {
                if (
                  typeof img !== "string" ||
                  !img.trim() ||
                  !img.startsWith("https://")
                ) {
                  return null;
                }

                return (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View product image ${index + 1}`}
                    className="shrink-0 cursor-pointer rounded-md border border-gray-300 bg-white p-1 hover:border-gray-700 dark:hover:border-slate-200"
                  >
                    <Image
                      src={img}
                      alt={`${items.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>


        <div className="flex min-w-0 flex-col">
          <h1 className="mb-5 text-center text-2xl font-bold leading-tight text-black sm:text-3xl md:text-left lg:text-4xl">
            {items.name}
          </h1>



          <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-5">


            <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:to-teal-950/30">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Price
              </p>

              <p className="flex flex-wrap items-baseline gap-1">
                <span className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                  $
                </span>

                <span className="text-3xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-4xl">
                  {items.price.toLocaleString("en-US")}
                </span>
              </p>

              <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/70">
                Available at this price
              </p>
            </div>


            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Product Description
              </h3>

              <p className="break-words text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                {items.detail}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700" />


            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Availability
              </span>

              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${(currentProduct?.stock ?? items.stock) > 0
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}>
                <span className={`h-2 w-2 rounded-full ${(currentProduct?.stock ?? items.stock) > 0
                  ? "bg-emerald-500"
                  : "bg-red-500"
                  }`} />

                {(currentProduct?.stock ?? items.stock) > 0
                  ? `${currentProduct?.stock ?? items.stock} In Stock`
                  : "Out of Stock"}
              </span>
            </div>


            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Category
              </span>

              <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {items.category}
              </span>
            </div>

          </div>




          <div className="mt-5 rounded-xl border border-red-300 bg-gradient-to-br from-red-100 via-rose-100 to-red-200 p-4 shadow-sm dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:mt-6 sm:p-5">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-base font-bold text-gray-900 dark:text-white sm:text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">
                <Info size={19} />
              </span>
              Shopping Benefits
            </h2>

            <p className="mb-4 text-center text-sm leading-6 text-gray-700 dark:text-gray-300">
              Enjoy a simple and convenient shopping experience. Explore
              our products and find what suits your needs.
            </p>

            <div className="space-y-3">
              <p className="flex items-center justify-center gap-2 rounded-lg border border-red-200/80 bg-white/70 px-3 py-2 text-center text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200">
                <Info size={18} className="shrink-0 text-red-600 dark:text-red-400" />
                Clear Product Information
              </p>

              <p className="flex items-center justify-center gap-2 rounded-lg border border-red-200/80 bg-white/70 px-3 py-2 text-center text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200">
                <ShoppingCart size={18} className="shrink-0 text-red-600 dark:text-red-400" />
                Easy Cart Management
              </p>

              <p className="flex items-center justify-center gap-2 rounded-lg border border-red-200/80 bg-white/70 px-3 py-2 text-center text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200">
                <CheckCircle2 size={18} className="shrink-0 text-red-600 dark:text-red-400" />
                Convenient Shopping
              </p>
            </div>
          </div>



          <div className="mt-5 rounded-xl border border-red-200 bg-red-200/60 p-4 sm:mt-6 sm:p-5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (items.stock > 0) {
                    dispatch(addToCart(items));
                    setShowToast(true);
                  }
                }}
                disabled={items.stock <= 0}
                className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:flex-none sm:text-base"
              >
                <ShoppingCart size={18} />
                {items.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2">
                <button
                  aria-label="Increase quantity"
                  disabled={
                    !cartItem ||
                    !currentProduct ||
                    cartItem.quantity >= currentProduct.stock
                  }
                  onClick={() => {
                    if (
                      cartItem &&
                      currentProduct &&
                      cartItem.quantity < currentProduct.stock
                    ) {
                      dispatch(
                        increaseQuantity({
                          id: items.id,
                          stock: currentProduct.stock,
                        })
                      );
                    }
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-black text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  +
                </button>

                <span
                  aria-live="polite"
                  className="min-w-5 text-center font-semibold text-black"
                >
                  {cartItem?.quantity || 0}
                </span>

                <button
                  aria-label="Decrease quantity"
                  disabled={!cartItem || cartItem.quantity <= 1}
                  onClick={() => dispatch(decreaseQuantity(items.id))}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-black text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  -
                </button>
              </div>

              <button
                disabled={!cartItem}
                onClick={() => {
                  if (cartItem) {
                    dispatch(
                      removeFromCart({
                        id: items.id,
                        quantity: cartItem.quantity,
                      })
                    );
                    setShowRemove(true);
                  }
                }}
                className="min-h-10 flex-1 cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:flex-none sm:text-base"
              >
                Remove
              </button>
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-gray-700 sm:text-sm">
              Manage the quantity of this product directly from here.
            </p>
          </div>
        </div>
      </div>



      <section className="mx-auto mt-10 max-w-6xl sm:mt-14">
        <h2 className="mx-auto w-fit max-w-full rounded-t-xl bg-gray-700 px-4 py-2 text-center text-xl font-bold text-white sm:px-6 sm:text-2xl">
          Why Choose Us?
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">

          
          <div className="rounded-xl border border-red-300 bg-gradient-to-br from-red-100 to-rose-200 p-5 shadow-sm transition-colors hover:border-red-400 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:hover:border-gray-500 sm:p-6">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">
                <CheckCircle2 size={25} />
              </div>
            </div>

            <h3 className="mb-2 text-center text-base font-bold text-gray-900 dark:text-white">
              Product Quality
            </h3>

            <p className="text-center text-sm leading-6 text-gray-700 dark:text-gray-300">
              Explore detailed product information and images to make informed
              shopping decisions.
            </p>
          </div>

          
          <div className="rounded-xl border border-red-300 bg-gradient-to-br from-red-100 to-rose-200 p-5 shadow-sm transition-colors hover:border-red-400 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:hover:border-gray-500 sm:p-6">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">
                <ShoppingCart size={25} />
              </div>
            </div>

            <h3 className="mb-2 text-center text-base font-bold text-gray-900 dark:text-white">
              Easy Shopping
            </h3>

            <p className="text-center text-sm leading-6 text-gray-700 dark:text-gray-300">
              Add your favorite products to the cart and manage quantities
              conveniently from one place.
            </p>
          </div>

          
          <div className="rounded-xl border border-red-300 bg-gradient-to-br from-red-100 to-rose-200 p-5 shadow-sm transition-colors hover:border-red-400 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:hover:border-gray-500 sm:col-span-2 md:col-span-1 sm:p-6">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300">
                <Package size={25} />
              </div>
            </div>

            <h3 className="mb-2 text-center text-base font-bold text-gray-900 dark:text-white">
              Stock Availability
            </h3>

            <p className="text-center text-sm leading-6 text-gray-700 dark:text-gray-300">
              Check product availability before ordering. Current stock:
              <span className="ml-1 font-bold text-gray-900 dark:text-white">
                {currentProduct?.stock ?? items.stock}
              </span>
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default ProductDetails;
