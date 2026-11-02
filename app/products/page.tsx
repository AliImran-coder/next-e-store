
"use client";

import { useAppSelector } from "@/redux/hooks";
import ProductCard from "@/components/ProductCards";
import FilterBar from "@/components/FilterBar";
import MuiPagination from "@/components/MuiPagination";
import { Package, GalleryVerticalEnd } from "lucide-react";
import { useState, useEffect } from "react";

function ProductsPage() {
  const products = useAppSelector(
    (state) => state.product.Products
  );

  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const categories = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Bags",
    "Accessories",
    "Beauty",
    "Home & Kitchen",
    "Sports",
    "Toys",
    "Grocery",
    "Books & Stationery",
    "Furniture",
    "Home Appliances",
    "Pet Supplies",
    "Fitness & Exercise",
    "Travel & Luggage",
    "Food & Beverages",
    "Art",
    "Office",
    "Digital Products",
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice))
    );
  });


  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );


  const startIndex = (currentPage - 1) * productsPerPage;


  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );


  useEffect(() => {
    setCurrentPage(1);
  }, [category, minPrice, maxPrice]);

  return (
    <main className="min-h-screen bg-red-100 px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      <h1 className="mx-auto mb-6 flex w-fit max-w-full items-center justify-center gap-2 rounded-xl border border-gray-600 px-4 py-3 text-center text-2xl font-bold text-gray-800 sm:mb-8 sm:gap-3 sm:px-7 sm:text-3xl">
        <Package className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
        <u>Products</u>
      </h1>

      <section className="mx-auto mb-6 w-full max-w-7xl sm:mb-8">
        <FilterBar
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={categories}
        />
      </section>

      <div className="mb-4 flex">
        <p
          aria-live="polite"
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3 sm:text-base"
        >
          <span>Showing</span>
          <span>{filteredProducts.length}</span>
          <span>
            product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[50vh]">
          <Package className="mb-4 h-16 w-16 text-gray-800 sm:h-20 sm:w-20" />

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            No Products Found!
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-700 sm:text-base">
            Try changing your category or price filters.
          </p>
        </div>
      ) : (
        <>
          <section
            aria-label="Product list"
            className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 rounded-2xl border border-red-300 bg-red-200 p-3 shadow-sm sm:grid-cols-2 sm:gap-5 sm:p-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>

          <MuiPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <p className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-center text-sm font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">

            <Package size={17} className="shrink-0 text-blue-600 dark:text-blue-400" />

            <span>
              Showing{" "}
              <strong className="font-bold text-gray-900 dark:text-white">
                {startIndex + 1}–
                {Math.min(startIndex + productsPerPage, filteredProducts.length)}
              </strong>{" "}
              of{" "}
              <strong className="font-bold text-gray-900 dark:text-white">
                {filteredProducts.length}
              </strong>{" "}
              products
            </span>

          </p>
        </>
      )}
    </main>
  );
}

export default ProductsPage;
