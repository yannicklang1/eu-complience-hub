export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c1a]">
      <div className="text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FACC15] to-[#EAB308] animate-pulse mb-6" />
        <p className="text-white/40 text-sm font-mono tracking-wide">
          Admin-Dashboard wird geladen&hellip;
        </p>
        <div className="w-48 h-1 rounded-full bg-white/[0.06] overflow-hidden mt-4 mx-auto">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FACC15] to-[#EAB308]"
            style={{
              animation: "loading-slide 1.2s ease-in-out infinite",
              width: "40%",
            }}
          />
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes loading-slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(350%); }
              }
            `,
          }}
        />
      </div>
    </div>
  );
}
