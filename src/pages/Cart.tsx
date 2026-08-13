import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantityStepper from "../components/QuantityStepper";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-ink">Your cart is empty</p>
        <p className="text-sm text-inkmute mt-2">
          Nothing here yet — go find something worth carrying.
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink">Your cart</h1>
        <button
          onClick={clearCart}
          className="text-xs font-mono text-inkmute hover:text-accent transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 divide-y divide-line border-y border-line">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 py-5">
              <Link
                to={`/product/${product.id}`}
                className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-panel/60 rounded-sm flex items-center justify-center border border-line"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-16 max-w-16 object-contain mix-blend-multiply"
                />
              </Link>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-ink line-clamp-2 hover:text-accent transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <span className="text-xs font-mono text-inkmute capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <QuantityStepper
                    quantity={quantity}
                    onChange={(q) => updateQuantity(product.id, q)}
                  />
                  <span className="font-mono text-sm font-semibold text-ink w-16 text-right">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                    className="text-inkmute hover:text-accent transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-2">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-line rounded-sm p-6 bg-panel/40 sticky top-24">
            <h2 className="font-display text-lg font-semibold text-ink mb-4">Order summary</h2>
            <div className="flex justify-between text-sm text-inkmute mb-2">
              <span>Items ({totalItems})</span>
              <span className="font-mono">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-inkmute mb-4">
              <span>Shipping</span>
              <span className="font-mono">Free</span>
            </div>
            <div className="border-t border-line pt-4 flex justify-between items-baseline">
              <span className="font-medium text-ink">Total</span>
              <span className="font-mono text-xl font-semibold text-ink">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="mt-6 w-full py-3 bg-teal text-paper text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors">
              Checkout
            </button>
            <p className="text-[11px] text-inkmute font-mono mt-3 text-center">
              Demo checkout — no payment is processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
