import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blueprinter — Turn signals into action";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#FFFFFF",
          color: "#000000",
          fontFamily: "Montserrat, sans-serif",
          backgroundImage:
            "linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "-1px -1px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Blueprinter
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            Turn signals into action.
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "#808080",
              maxWidth: "820px",
              lineHeight: 1.3,
            }}
          >
            Realtime e-commerce data. Unified, structured pipelines from across the web.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "#1A1A1A",
            fontWeight: 500,
          }}
        >
          <div>blueprinter.io</div>
          <div style={{ color: "#808080" }}>AI-first web data extraction</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
