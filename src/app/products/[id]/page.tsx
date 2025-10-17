"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useGetProductQuery, useDeleteProductMutation } from "@/services";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

export default function ProductDetailsPage() {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: product, isLoading, error } = useGetProductQuery(id);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      router.push("/products");
    } catch (err: any) {
      console.error("Failed to delete product:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/products"
            className="flex items-center gap-2 text-secondary hover:text-secondary/80 mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
            <p className="text-danger">
              {typeof error === "object" && "data" in error
                ? (error.data as any)?.message || "An error occurred"
                : "An error occurred"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Link
          href="/products"
          className="flex items-center gap-2 text-secondary hover:text-secondary/80 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        {product && (
          <div className="bg-white rounded-lg shadow p-8">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-secondary font-semibold mb-4">
              ${Number(product.price).toFixed(2)}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm text-primary-600">Category</p>
                <p className="text-lg text-primary-dark">
                  {product.category?.name || "No Category"}
                </p>
              </div>
              <div>
                <p className="text-sm text-primary-600">Description</p>
                <p className="text-lg text-primary-dark">
                  {product.description}
                </p>
              </div>
              {product.stock !== undefined && (
                <div>
                  <p className="text-sm text-primary-600">Stock</p>
                  <p className="text-lg text-primary-dark">{product.stock}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Link
                href={`/products/${product.slug}/edit`}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium"
              >
                <Edit2 size={20} />
                Edit
              </Link>
              <button
                onClick={() => setDeleteConfirm(true)}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-danger/10 text-danger hover:bg-danger/20 disabled:opacity-50 rounded-lg transition font-medium"
              >
                <Trash2 size={20} />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

            {deleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm">
                  <h2 className="text-xl font-bold text-primary-dark mb-4">
                    Delete Product?
                  </h2>
                  <p className="text-primary-600 mb-6">
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="flex-1 px-4 py-2 border border-primary-300 rounded-lg hover:bg-primary-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
