"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useDeleteProductMutation, useGetProductsQuery } from "@/services";
import React from "react";
import ProductCard from "./product-card";
import Link from "next/link";
import { Plus } from "lucide-react";
import { setSelectedProductId } from "@/slices/product-slice";
import { ConfirmModal } from "./modal";

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
      dispatch(setSelectedProductId(null));
    } catch (err: any) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div>
      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg">
          <p className="text-danger">
            {typeof error === "object" && "data" in error
              ? (error.data as any)?.message || "An error occurred"
              : "An error occurred"}
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
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
      <ConfirmModal
        isOpen={!!selectedProductId}
        onClose={() => dispatch(setSelectedProductId(null))}
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={() => onDelete(selectedProductId!)}
        isLoading={isDeleting}
        variant="danger"
      />

      {/* Empty State */}
      {!isLoading && products && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-primary-600 mb-4">No products found</p>
          <Link
            href="/products/create"
            className="inline-flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
          >
            <Plus size={20} />
            Create first product
          </Link>
        </div>
      )}
    </div>
  );
}
