import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "pinka — Doniraj podcastu jednim skenom";
export const size = { width: 1200, height: 630 };
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
          padding: "72px",
          background:
            "linear-gradient(135deg, #FBF8F3 0%, #F5EFE6 60%, #F0E6D2 100%)",
          color: "#1A1A1A",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(232, 93, 93, 0.20)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: -140,
            left: -120,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "rgba(15, 76, 92, 0.16)",
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 56, color: "#E85D5D", lineHeight: 1 }}>p</span>
          <span style={{ fontSize: 56, color: "#1A1A1A", lineHeight: 1 }}>inka</span>
          <span style={{ fontSize: 36, color: "#E85D5D", marginLeft: 4 }}>.</span>
        </div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexDirection: "column",
            maxWidth: 880,
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 14px",
              background: "rgba(232, 93, 93, 0.12)",
              color: "#A93535",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
              borderRadius: 999,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Pre-launch · Pilot Q3 2026
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: "#1A1A1A",
            }}
          >
            Doniraj podcastu
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: "#E85D5D",
            }}
          >
            jednim skenom.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#3A3A3A",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 880,
            }}
          >
            SEPA Instant + Monerium EURe. Bez kartičnih provizija. U sekundi.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6B6B6B",
            fontSize: 22,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>pinka.finance</div>
          <div style={{ display: "flex" }}>Made in Croatia 🇭🇷</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
