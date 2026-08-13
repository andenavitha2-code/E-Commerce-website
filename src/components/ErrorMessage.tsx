interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center px-6">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-accent stroke-2">
          <path d="M12 8v5M12 16h.01M12 3l9 16H3L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="font-display text-lg text-ink">Something didn't load</p>
        <p className="text-sm text-inkmute mt-1 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-5 py-2 bg-teal text-paper text-sm font-medium rounded-sm hover:bg-tealsoft transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
