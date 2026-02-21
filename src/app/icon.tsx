import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FACC15, #EAB308)",
          borderRadius: "96px",
        }}
      >
        <div
          style={{
            fontSize: "240px",
            fontWeight: "800",
            color: "#0A2540",
            letterSpacing: "-8px",
            lineHeight: 1,
          }}
        >
          EU
        </div>
      </div>
    ),
    { ...size },
  );
}
