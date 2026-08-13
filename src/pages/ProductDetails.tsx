import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { useAsync } from "../hooks/useAsync";
import StarRating from "../components/StarRating";
import { Loader } from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import QuantityStepper from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const {
    data: product,
    loading,
    error,
  } = useAsync(() => fetchProductById(id ?? ""), [id]);

  if (loading) return <Loader label="Fetching product" />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => navigate(0)} />
    );
  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs font-mono text-inkmute mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-accent transition-colors">
          Shop
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="bg-panel/60 rounded-sm p-10 sm:p-16 flex items-center justify-center border border-line">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent mb-3">
            {product.category}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-tight">
            {product.title}
          </h1>

          <div className="mt-3">
            <StarRating rate={product.rating.rate} count={product.rating.count} size="md" />
          </div>

          <div className="mt-6 price-tag">
            <span className="font-mono text-3xl font-semibold text-ink pt-3 block">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="mt-6 text-sm text-inkmute leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <QuantityStepper quantity={quantity} onChange={(q) => setQuantity(Math.max(1, q))} />
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-teal text-paper text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="w-12 h-12 shrink-0 rounded-sm border border-line flex items-center justify-center hover:border-accent transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${wishlisted ? "fill-accent stroke-accent" : "fill-none stroke-ink"} stroke-2`}
              >
                <path
                  d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.3 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5c3.3 0 5.1 3.2 3.6 6.7C15.5 16.3 12 21 12 21z"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {added && (
            <p className="mt-3 text-xs font-mono text-accent">
              Added {quantity} to your cart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
