"use client";
import { useRouter, useParams } from "next/navigation";
import { useGetProductQuery, useGetCategoriesQuery } from "@/services";
import ProductForm from "@/components/product-form";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductQuery(id);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery(undefined);

  const isLoading = productLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (productError || categoriesError) {
    const error = productError || categoriesError;
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">
              {error && typeof error === "object" && "data" in error
                ? (error as any).data?.message || "Failed to load data"
                : "Failed to load data"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      initialData={product}
      categories={categories || []}
      onSuccess={() => router.push(`/products`)}
    />
  );
}
