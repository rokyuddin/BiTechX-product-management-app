"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useDeleteProductMutation, useGetProductsQuery } from "@/services";
import React from "react";
import ProductCard from "./product-card";
import Link from "next/link";
import { Plus } from "lucide-react";
import { setSelectedProductId } from "@/slices/product-slice";

export default function ProductGrid() {
  const { searchTerm, category, offset, limit, selectedProductId } =
    useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    offset: offset,
    search: searchTerm,
    limit: limit,
    ...(category && { categoryId: category }),
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const onDelete = async (id: string) => {
    if (!id) {
      alert("Product not found");
      return;
    }

    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div>
      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            {typeof error === "object" && "data" in error
              ? (error.data as any)?.message || "An error occurred"
              : "An error occurred"}
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                showDeleteButton={true}
                onDelete={() => dispatch(setSelectedProductId(product.id))}
              />
            </div>
          ))}
        </div>
      )}

      {/* Delete Product Modal */}
      {selectedProductId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-slate-600 mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => dispatch(setSelectedProductId(null))}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={onDelete.bind(null, selectedProductId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600 mb-4">No products found</p>
          <Link
            href="/products/create"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Create first product
          </Link>
        </div>
      )}
    </div>
  );
}
