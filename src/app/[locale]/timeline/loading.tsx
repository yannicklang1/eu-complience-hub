export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6fc]">
      {/* Header placeholder */}
      <div className="h-16 bg-white/50" />

      {/* Hero skeleton */}
      <div className="bg-[#040a18] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-4 w-40 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="h-10 w-96 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-6 w-80 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Year label */}
        <div className="h-8 w-20 bg-[#e8ecf4] rounded-lg mb-6 animate-pulse" />

        {/* Timeline entries */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 items-start"
            >
              {/* Date column */}
              <div className="w-20 flex-shrink-0">
                <div className="h-5 w-16 bg-[#e8ecf4] rounded animate-pulse" />
              </div>
              {/* Line */}
              <div className="w-px h-20 bg-[#e8ecf4] flex-shrink-0" />
              {/* Card */}
              <div className="flex-1 h-20 rounded-2xl bg-white animate-pulse border border-[#e8ecf4]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
