export default function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-display text-lg font-semibold text-ink">Field&Ware</span>
        <p className="text-xs text-inkmute font-mono">
          Demo storefront built on the Fake Store API — no real orders are placed.
        </p>
      </div>
    </footer>
  );
}
