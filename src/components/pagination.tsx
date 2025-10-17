"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 9,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {totalItems !== undefined && (
        <div className="text-sm text-primary-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          products
        </div>
      )}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-primary-300 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={20} />
        </button>

        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 border border-primary-300 rounded-lg hover:bg-primary-50 transition"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-primary-400">...</span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-2 rounded-lg transition ${
              p === currentPage
                ? "bg-secondary text-white"
                : "border border-primary-300 hover:bg-primary-50"
            }`}
          >
            {p}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-primary-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 border border-primary-300 rounded-lg hover:bg-primary-50 transition"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-primary-300 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
