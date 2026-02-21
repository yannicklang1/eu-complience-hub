import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EU Compliance Hub – Europäische Regulierungen. Klar erklärt.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060c1a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,37,64,0.6) 0%, transparent 70%)",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "800",
              color: "#0A2540",
            }}
          >
            EU
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            lineHeight: "1.2",
            maxWidth: "900px",
            padding: "0 40px",
          }}
        >
          EU Compliance Hub
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            marginTop: "16px",
            maxWidth: "700px",
          }}
        >
          Europäische Regulierungen. Klar erklärt.
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "800px",
          }}
        >
          {[
            "NISG 2026",
            "AI Act",
            "DORA",
            "DSGVO",
            "CRA",
            "CSRD",
            "BaFG",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "12px",
                background: "rgba(250,204,21,0.15)",
                color: "#FACC15",
                fontSize: "16px",
                fontWeight: "600",
                border: "1px solid rgba(250,204,21,0.2)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "2px",
          }}
        >
          eu-compliance-hub.eu
        </div>
      </div>
    ),
    { ...size },
  );
}
