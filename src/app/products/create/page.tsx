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
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
            <p className="text-danger">
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
