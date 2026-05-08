import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
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
          background: "#FBF8F3",
          color: "#E85D5D",
          fontSize: 44,
          fontFamily: "Georgia, serif",
          fontWeight: 600,
          borderRadius: 14,
        }}
      >
        p
      </div>
    ),
    { ...size }
  );
}
