export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-inkmute">
      <div className="w-8 h-8 border-2 border-line border-t-accent rounded-full animate-spin" />
      <span className="font-mono text-xs tracking-wide uppercase">{label}</span>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-line bg-white/60 rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-panel" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-panel rounded w-3/4" />
        <div className="h-3 bg-panel rounded w-1/2" />
        <div className="h-4 bg-panel rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
