import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api/products";
import { useAsync } from "../hooks/useAsync";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import ErrorMessage from "../components/ErrorMessage";
import { ProductGridSkeleton } from "../components/Loader";
import type { SortOption } from "../types";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useAsync(fetchProducts, []);

  const { data: categories } = useAsync(fetchCategories, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products;

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (query) {
      list = list.filter((p) => p.title.toLowerCase().includes(query));
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return sorted;
  }, [products, category, query, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
          Everyday goods, honestly priced
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-xl">
          {query ? `Results for "${query}"` : "Shop the full catalog"}
        </h1>
      </div>

      {productsLoading && <ProductGridSkeleton />}

      {productsError && (
        <ErrorMessage
          message={productsError}
          onRetry={() => window.location.reload()}
        />
      )}

      {!productsLoading && !productsError && products && (
        <>
          <FilterBar
            categories={categories ?? []}
            activeCategory={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-ink">No products found</p>
              <p className="text-sm text-inkmute mt-1">
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
