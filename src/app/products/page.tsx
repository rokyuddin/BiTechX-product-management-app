import ProductGrid from "@/components/product-grid";
import ProductFilter from "@/components/product-filter";
import Header from "@/components/header";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProductFilter />
        <ProductGrid />
      </main>
    </div>
  );
}
