import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

interface OgImageParams {
  title: string;
  subtitle: string;
  accentColor?: string;
  tags?: string[];
}

export function generateOgImage({
  title,
  subtitle,
  accentColor = "#FACC15",
  tags,
}: OgImageParams) {
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
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "800",
              color: "#0A2540",
            }}
          >
            EU
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: "500",
            }}
          >
            EU Compliance Hub
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            borderRadius: "2px",
            background: accentColor,
            marginBottom: "24px",
            opacity: 0.8,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            lineHeight: "1.15",
            maxWidth: "900px",
            padding: "0 60px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            marginTop: "16px",
            maxWidth: "750px",
            lineHeight: "1.4",
            padding: "0 60px",
          }}
        >
          {subtitle}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "36px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "800px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: "10px",
                  background: `${accentColor}20`,
                  color: accentColor,
                  fontSize: "14px",
                  fontWeight: "600",
                  border: `1px solid ${accentColor}30`,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "2px",
          }}
        >
          eu-compliance-hub.eu
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
