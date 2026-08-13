import { Link } from "react-router-dom";
import type { Product } from "../types";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative border border-line bg-white rounded-sm overflow-hidden flex flex-col transition-shadow hover:shadow-[0_4px_24px_-4px_rgba(20,21,26,0.12)]">
      <button
        onClick={() => toggleWishlist(product)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center border border-line hover:border-accent transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${wishlisted ? "fill-accent stroke-accent" : "fill-none stroke-ink"} stroke-2`}
        >
          <path
            d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.3 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5c3.3 0 5.1 3.2 3.6 6.7C15.5 16.3 12 21 12 21z"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-panel/60 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-inkmute mb-1">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body text-sm font-medium text-ink line-clamp-2 leading-snug min-h-[2.5rem] hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2">
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between price-tag">
          <span className="font-mono text-base font-semibold text-ink pt-2">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full py-2 bg-teal text-paper text-xs font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
