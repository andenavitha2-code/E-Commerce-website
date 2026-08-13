import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center">
      <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-inkmute mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block mt-6 px-6 py-3 bg-teal text-paper text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
      >
        Back to shop
      </Link>
    </div>
  );
}
