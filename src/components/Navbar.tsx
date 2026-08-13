import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { items: wishItems } = useWishlist();
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the search box in sync with the URL — so clearing the query
  // (e.g. via the logo, browser back, or the clear button) also clears the input.
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    navigate(`/?${params.toString()}`);
    setMenuOpen(false);
  }

  function handleClearSearch() {
    setQuery("");
    navigate("/");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link
            to="/"
            onClick={() => setQuery("")}
            className="flex items-center gap-2 shrink-0"
          >
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Field&Ware
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-panel/70 border border-line rounded-sm py-2 pl-9 pr-3 text-sm placeholder:text-inkmute focus:bg-white transition-colors"
            />
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-inkmute stroke-2 absolute left-3 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-inkmute hover:text-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 hover:bg-panel rounded-sm transition-colors"
              aria-label="Wishlist"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-ink stroke-2">
                <path
                  d="M12 21s-7.5-4.7-10-9.3C.5 8.2 2.3 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5c3.3 0 5.1 3.2 3.6 6.7C15.5 16.3 12 21 12 21z"
                  strokeLinejoin="round"
                />
              </svg>
              {wishItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-mono flex items-center justify-center">
                  {wishItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-panel rounded-sm transition-colors"
              aria-label="Cart"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-ink stroke-2">
                <path
                  d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-mono flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2 pl-2">
                <span className="text-xs font-mono text-inkmute">{username}</span>
                <button
                  onClick={logout}
                  className="text-xs font-medium px-3 py-2 border border-line rounded-sm hover:border-accent hover:text-accent transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block text-xs font-medium px-3 py-2 border border-line rounded-sm hover:border-accent hover:text-accent transition-colors ml-1"
              >
                Log in
              </Link>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-ink stroke-2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-panel/70 border border-line rounded-sm py-2 pl-9 pr-3 text-sm"
              />
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-none stroke-inkmute stroke-2 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-inkmute hover:text-accent transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </form>
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-inkmute">{username}</span>
                <button
                  onClick={logout}
                  className="text-xs font-medium px-3 py-2 border border-line rounded-sm"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-xs font-medium px-3 py-2 border border-line rounded-sm"
              >
                Log in
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
