"use client";

import * as React from "react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "1rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>
            <p style={{ fontSize: "3rem", fontWeight: 600 }}>500</p>
            <p style={{ fontSize: "1.125rem", fontWeight: 500, marginTop: "0.5rem" }}>
              Something went seriously wrong
            </p>
            <p style={{ fontSize: "0.875rem", color: "#6b6354", marginTop: "0.25rem" }}>
              Please refresh the page or try again shortly.
            </p>
          </div>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              background: "#e8a33d",
              color: "#14120f",
              border: "none",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
