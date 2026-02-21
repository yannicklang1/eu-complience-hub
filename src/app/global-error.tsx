"use client";

/**
 * Global error boundary — catches errors in the root layout itself.
 * Must include its own <html> and <body> tags since the layout may have failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060c1a",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "white",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "800",
              color: "#0A2540",
              margin: "0 auto 24px",
            }}
          >
            EU
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "800",
              marginBottom: "16px",
            }}
          >
            Ein kritischer Fehler ist aufgetreten
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "32px",
            }}
          >
            Die Seite konnte leider nicht geladen werden. Bitte laden Sie die
            Seite neu.
          </p>

          <button
            onClick={reset}
            style={{
              padding: "12px 32px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              color: "#0A2540",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Seite neu laden
          </button>

          {error.digest && (
            <p
              style={{
                marginTop: "32px",
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "monospace",
              }}
            >
              Fehler-ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
