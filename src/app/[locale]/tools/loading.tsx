export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6fc]">
      {/* Header placeholder */}
      <div className="h-16 bg-white/50" />

      {/* Hero skeleton */}
      <div className="bg-[#040a18] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="h-4 w-32 bg-white/10 rounded mx-auto mb-6 animate-pulse" />
          <div className="h-10 w-80 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-64 bg-white/5 rounded mx-auto animate-pulse" />
        </div>
      </div>

      {/* Tool card skeleton */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-[#e8ecf4] bg-white p-8 animate-pulse">
          <div className="h-6 w-56 bg-[#e8ecf4] rounded mb-4" />
          <div className="h-4 w-96 bg-[#f0f2f8] rounded mb-8" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-[#f4f6fc]" />
            ))}
          </div>
          <div className="h-12 w-full rounded-xl bg-[#f0f2f8] mt-6" />
        </div>
      </div>
    </div>
  );
}
