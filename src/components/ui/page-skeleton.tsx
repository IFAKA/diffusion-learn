export function PageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-16 bg-[var(--border)] rounded animate-pulse" />
        <span className="text-[var(--fg-muted)]">/</span>
        <div className="h-4 w-24 bg-[var(--border)] rounded animate-pulse" />
      </div>
      {/* Header */}
      <div className="mb-8">
        <div className="h-3 w-24 bg-[var(--border)] rounded animate-pulse mb-4" />
        <div className="h-8 w-64 bg-[var(--border)] rounded animate-pulse mb-2" />
        <div className="h-4 w-48 bg-[var(--border)] rounded animate-pulse" />
      </div>
      {/* Content */}
      <div className="space-y-4">
        <div className="h-32 w-full bg-[var(--border)] rounded-lg animate-pulse" />
        <div className="h-32 w-full bg-[var(--border)] rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
