"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Tag,
  DollarSign,
  ChevronDown,
  LayoutGrid,
  Laptop,
  Shirt,
  House,
  Sparkles,
  Dumbbell,
  BookOpen,
  Check,
} from "lucide-react";
import { title } from "process";

type FilterBarProps = {
  category: string;
  setCategory: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  categories: string[];
};

function FilterBar({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
}: FilterBarProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const min = Number(minPrice || 0);
  const max = Number(maxPrice || 100000);

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("en-US")}`;

  const activeFilters =
    (category !== "All" ? 1 : 0) +
    (min > 0 ? 1 : 0) +
    (max < 100000 ? 1 : 0);

  function resetFilters() {
    setCategory("All");
    setMinPrice("0");
    setMaxPrice("100000");
    setCategoryOpen(false);
  }

  function getCategoryIcon(name: string) {
    const value = name.toLowerCase();

    if (value.includes("electronic") || value.includes("computer"))
      return Laptop;

    if (value.includes("fashion") || value.includes("cloth"))
      return Shirt;

    if (value.includes("home") || value.includes("furniture"))
      return House;

    if (value.includes("beauty") || value.includes("health"))
      return Sparkles;

    if (value.includes("sport") || value.includes("fitness"))
      return Dumbbell;

    if (value.includes("book"))
      return BookOpen;

    return Tag;
  }

  function chooseCategory(value: string) {
    setCategory(value);
    setCategoryOpen(false);
  }

  return (
    <section className="mx-auto mb-6 w-full max-w-5xl overflow-visible rounded-2xl border border-gray-200 bg-gray-100 shadow-sm sm:mb-8">
      
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 dark:bg-gray-800 dark:border-gray-700 text-blue-500">
            <SlidersHorizontal size={21} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Filter Products
            </h2>
            <p className="text-xs text-gray-500 sm:text-sm">
              Find products that match your needs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 sm:text-sm"
        >
          <RotateCcw size={15} />
          <span className="hidden sm:inline">Reset All</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 gap-5 p-4 sm:p-5 md:grid-cols-3 md:gap-5">
        
        <div className="relative min-w-0">
          <label
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <Tag size={17} className="text-gray-600" />
            Category
          </label>

          <button
            type="button"
            onClick={() => setCategoryOpen((previous) => !previous)}
            aria-expanded={categoryOpen}
            aria-controls="category-options"
            className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm font-medium text-gray-800 transition hover:border-gray-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="truncate">
              {category === "All" ? "All Categories" : category}
            </span>

            <ChevronDown
              size={18}
              className={`shrink-0 text-gray-500 transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

        
          {categoryOpen && (
            <div
              id="category-options"
              className="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Choose a category
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => chooseCategory("All")}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    category === "All"
                      ? "border-gray-700 bg-gray-700 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <LayoutGrid size={15} />
                  All
                  {category === "All" && <Check size={14} />}
                </button>

                {categories
                  .filter((item) => item !== "All")
                  .map((item) => {
                    const Icon = getCategoryIcon(item);
                    const selected = category === item;
                    
                    return (
                      <button
                        key={item}
                        title={item}
                        type="button"
                        onClick={() => chooseCategory(item)}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                          selected
                            ? "border-gray-700 bg-gray-700 text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        <Icon size={15} />
                        {item}
                        {selected && <Check size={14} />}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        
        <div className="flex min-w-0 flex-col gap-3">
          <label
            htmlFor="min-price-filter"
            className="flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <DollarSign size={17} className="text-gray-600" />
            Min Price
          </label>

          <div className="flex h-11 items-center rounded-xl border border-gray-300 bg-gray-50 px-3">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(min)}
            </span>
          </div>

          <input
            id="min-price-filter"
            type="range"
            min="0"
            max={max}
            step="1000"
            value={min}
            aria-label="Minimum price"
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-2 w-full cursor-pointer accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>{formatPrice(max)}</span>
          </div>
        </div>

        
        <div className="flex min-w-0 flex-col gap-3">
          <label
            htmlFor="max-price-filter"
            className="flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <DollarSign size={17} className="text-gray-600" />
            Max Price
          </label>

          <div className="flex h-11 items-center rounded-xl border border-gray-300 bg-gray-50 px-3">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(max)}
            </span>
          </div>

          <input
            id="max-price-filter"
            type="range"
            min={min}
            max="100000"
            step="1000"
            value={max}
            aria-label="Maximum price"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-2 w-full cursor-pointer accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatPrice(min)}</span>
            <span>$100,000</span>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col gap-2 rounded-b-2xl border-t border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Tag size={16} className="text-blue-600" />

          <span className="text-gray-500">Price range:</span>

          <span className="font-bold text-gray-900">
            {formatPrice(min)} – {formatPrice(max)}
          </span>
        </div>

        <span className="text-xs font-medium text-gray-500">
          {activeFilters === 0
            ? "No filters applied"
            : `${activeFilters} ${
                activeFilters === 1 ? "filter" : "filters"
              } selected`}
        </span>
      </div>
    </section>
  );
}

export default FilterBar;