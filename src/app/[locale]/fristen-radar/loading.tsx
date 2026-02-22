export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6fc]">
      {/* Header placeholder */}
      <div className="h-16 bg-white/50" />

      {/* Hero skeleton */}
      <div className="bg-[#040a18] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-4 w-40 bg-white/10 rounded mb-8 animate-pulse" />
          <div className="h-10 w-96 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-6 w-80 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filter chips */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[95, 112, 85, 105, 90, 115].map((w, i) => (
            <div
              key={i}
              className="h-9 rounded-full bg-white/60 animate-pulse"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-white animate-pulse border border-[#e8ecf4]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
