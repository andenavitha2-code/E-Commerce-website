interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
}

export default function QuantityStepper({ quantity, onChange }: Props) {
  return (
    <div className="inline-flex items-center border border-line rounded-sm">
      <button
        onClick={() => onChange(quantity - 1)}
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-ink hover:bg-panel transition-colors"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-mono">{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-ink hover:bg-panel transition-colors"
      >
        +
      </button>
    </div>
  );
}
