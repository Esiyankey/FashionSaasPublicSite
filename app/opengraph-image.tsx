import { ImageResponse } from "next/og";
import { getStorefrontHome } from "@/services/storefront.service";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function OpenGraphImage() {
  const { store, hero } = await getStorefrontHome();
  const primaryColor = store.primaryColor || "#7a4b2a";
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "space-between", background: `linear-gradient(135deg, #f8f5ef 0%, #f3ebdc 45%, ${primaryColor} 100%)`,
      padding: "72px", color: "#111827", fontFamily: "Arial",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 30, letterSpacing: "0.3em", textTransform: "uppercase" }}>
        <div style={{ width: 36, height: 36, borderRadius: "999px", background: primaryColor }} />
        {store.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ fontSize: 78, lineHeight: 1.05, maxWidth: "820px" }}>{hero?.headline || store.seo.title}</div>
        <div style={{ fontSize: 30, color: "#374151", maxWidth: "760px" }}>{hero?.subheadline || store.seo.description}</div>
      </div>
    </div>,
    size,
  );
}
