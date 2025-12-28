export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <div
      className={`${sizeClass} border-2 border-[var(--fg-muted)] border-t-transparent rounded-full animate-spin`}
    />
  );
}

export function LoadingPlaceholder() {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
