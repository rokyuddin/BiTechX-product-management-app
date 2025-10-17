"use client";
import Link from "next/link";
import {
  ShoppingCart,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  showDeleteButton?: boolean;
}

export default function ProductCard({
  product,
  onDelete,
  showDeleteButton = false,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Auto slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="h-48 bg-primary-200 overflow-hidden relative">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 hover:scale-110 transition-all duration-200 ease-in-out"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 hover:scale-110 transition-all duration-200 ease-in-out"
                >
                  <ChevronRight size={16} />
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-400">
            <ShoppingCart size={32} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-primary-dark hover:text-secondary transition line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-primary-600 line-clamp-2 my-2 flex-1">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-secondary">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">
            {product.category?.name || "No Category"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-primary-200 flex gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition text-sm font-medium"
        >
          <Edit2 size={16} />
          View
        </Link>
        {showDeleteButton && onDelete && (
          <button
            onClick={() => onDelete(product.slug as string)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition text-sm font-medium"
          >
            <Trash2 size={16} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
