export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6fc]">
      {/* Header placeholder */}
      <div className="h-16 bg-white/50" />

      {/* Hero skeleton */}
      <div className="bg-[#040a18] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-4 w-48 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="h-10 w-80 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Branchen grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-white animate-pulse border border-[#e8ecf4]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
