"use client";
import useDebounce from "@/hooks/use-debounce";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetCategoriesQuery } from "@/services";
import {
  setCategory,
  setLimit,
  setSearchTerm,
  clearAll,
} from "@/slices/product-slice";
import { Plus, Search, RotateCcw } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProductFilter() {
  const [searchInput, setSearchInput] = useState("");
  const { category, limit, searchTerm } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  // Check if any filters are active
  const hasActiveFilters = searchTerm || category || limit !== 10;

  // Clear all filters
  const handleClearFilters = () => {
    setSearchInput("");
    dispatch(clearAll());
  };

  const { data: categories } = useGetCategoriesQuery(undefined);

  const query = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(setSearchTerm(query));
  }, [query]);

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const onLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "All") {
      dispatch(setLimit(0));
      return;
    }
    dispatch(setLimit(Number(e.target.value)));
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-3 text-primary-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
            />
          </div>
          <select
            value={category}
            onChange={onCategoryChange}
            className="px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={limit}
            onChange={onLimitChange}
            className="px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
          >
            <option value="All">All</option>
            {[10, 20, 30, 40, 50].map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          {/* Clear Filter Button - Only show when filters are active */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 border border-primary-300 text-primary-dark rounded-lg hover:bg-primary-50 transition-colors"
            >
              <RotateCcw size={16} />
              Clear Filters
            </button>
          )}

          {/* Add Product Button */}
          <Link
            href="/products/create"
            className="flex items-center justify-center gap-2 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium whitespace-nowrap"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}
