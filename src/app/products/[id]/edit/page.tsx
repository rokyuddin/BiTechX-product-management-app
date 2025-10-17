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
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (productError || categoriesError) {
    const error = productError || categoriesError;
    return (
      <div className="min-h-screen bg-background-light p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
            <p className="text-danger">
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
