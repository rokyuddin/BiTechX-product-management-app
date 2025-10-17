"use client";
import useDebounce from "@/hooks/use-debounce";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetCategoriesQuery } from "@/services";
import { setCategory, setLimit, setSearchTerm } from "@/slices/product-slice";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProductFilter() {
  const [searchInput, setSearchInput] = useState("");
  const { category, limit } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const { data: categories } = useGetCategoriesQuery(undefined);

  const query = useDebounce(searchInput, 500);

  useEffect(() => {
    if (query) {
      dispatch(setSearchTerm(query));
    }
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
      <div className="bg-white rounded-lg shadow p-6 mb-8 sm:flex justify-between items-center">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={category}
            onChange={onCategoryChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {[10, 20, 30, 40, 50].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/products/create"
          className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>
    </div>
  );
}
