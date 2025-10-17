"use client";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/services";
import ProductForm from "@/components/product-form";

export default function CreateProductPage() {
  const router = useRouter();
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">
              {typeof error === "object" && "data" in error
                ? (error.data as any)?.message || "Failed to load categories"
                : "Failed to load categories"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      mode="create"
      categories={categories || []}
      onSuccess={() => router.push("/products")}
    />
  );
}
