interface Props {
  rate: number;
  count: number;
  size?: "sm" | "md";
}

export default function StarRating({ rate, count, size = "sm" }: Props) {
  const stars = [0, 1, 2, 3, 4];
  const dim = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {stars.map((i) => {
          const filled = i < Math.round(rate);
          return (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={`${dim} ${filled ? "fill-accent" : "fill-line"}`}
            >
              <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 6-5.2-2.8-5.2 2.8 1-6L1.5 7.7l5.9-.8L10 1.5z" />
            </svg>
          );
        })}
      </div>
      <span className="text-xs text-inkmute font-mono">
        {rate.toFixed(1)} ({count})
      </span>
    </div>
  );
}
