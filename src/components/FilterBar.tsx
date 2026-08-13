import type { SortOption } from "../types";

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  resultCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => onCategoryChange("all")}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            activeCategory === "all"
              ? "bg-teal text-paper border-teal"
              : "border-line text-inkmute hover:border-ink hover:text-ink"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors ${
              activeCategory === cat
                ? "bg-teal text-paper border-teal"
                : "border-line text-inkmute hover:border-ink hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-inkmute">
          {resultCount} {resultCount === 1 ? "item" : "items"}
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="text-xs font-medium border border-line rounded-sm py-1.5 px-2 bg-white text-ink"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
