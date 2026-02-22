export default function PortalLoading() {
  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-mono">Portal wird geladen…</p>
      </div>
    </div>
  );
}
