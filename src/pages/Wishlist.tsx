import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-ink">Your wishlist is empty</p>
        <p className="text-sm text-inkmute mt-2">
          Tap the heart on any product to save it for later.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-teal text-paper text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">
        Saved for later
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
