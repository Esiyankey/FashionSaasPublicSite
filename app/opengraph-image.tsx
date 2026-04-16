import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #f8f5ef 0%, #f3ebdc 45%, #7c2d12 100%)",
          padding: "72px",
          color: "#111827",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 30,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "999px",
              background: "#7c2d12",
            }}
          />
          Fashion SaaS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 78, lineHeight: 1.05, maxWidth: "820px" }}>
            Lightweight fashion commerce with server-first performance.
          </div>
          <div style={{ fontSize: 30, color: "#374151", maxWidth: "760px" }}>
            Editorial storefront, product discovery, and SEO-ready routing for modern
            fashion teams.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
