import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            fontSize: "86px",
            fontWeight: "800",
            color: "#0A2540",
            letterSpacing: "-3px",
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
