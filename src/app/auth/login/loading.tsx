export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center">
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #FACC15, #EAB308)",
            animation: "loading-bar 1.5s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
