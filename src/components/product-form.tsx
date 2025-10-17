"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateProductMutation, useUpdateProductMutation } from "@/services";
import { Product, Category } from "@/types";
import { ArrowLeft, Trash } from "lucide-react";

interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: Product;
  categories: Category[];
  onSuccess: () => void;
}

export default function ProductForm({
  mode,
  initialData,
  categories,
  onSuccess,
}: ProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price?.toString() || "",
    description: initialData?.description || "",
    category: initialData?.category?.id || "",
    images: initialData?.images || [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isLoading = isCreating || isUpdating;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        categoryId: formData.category,
        images: formData.images,
      };

      if (mode === "create") {
        await createProduct(payload).unwrap();
      } else if (initialData?.id) {
        await updateProduct({ id: initialData.id, data: payload }).unwrap();
      }

      onSuccess();
    } catch (err: any) {
      setError(err.data?.message || "Operation failed");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Allow only numbers also do not allow negative numbers
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Link
          href="/products"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            {mode === "create" ? "Create Product" : "Edit Product"}
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price ($) *
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.price
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.category
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
                  errors.description
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Images
              </label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2 items-center mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData((prev) => ({ ...prev, images: newImages }));
                    }}
                    placeholder="https://..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({ ...prev, images: newImages }));
                    }}
                    disabled={isLoading}
                    className="w-10 h-10 flex items-center justify-center sm:w-fit sm:h-fit sm:text-base sm:px-3 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <span className="hidden sm:block">Remove</span>
                    <Trash size={18} className="sm:hidden" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ""],
                  }));
                }}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Add Image
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
              >
                {isLoading
                  ? "Saving..."
                  : mode === "create"
                  ? "Create Product"
                  : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/products")}
                disabled={isLoading}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
