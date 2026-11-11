import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated once at build time; no fonts or network needed.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #17151c 0%, #2a1a10 100%)",
          color: "#f2eff8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#fb9a5a",
              color: "#1c0e04",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 30, color: "#aaa5b8" }}>{profile.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, color: "#fb9a5a", marginBottom: 12 }}>{profile.name}</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{profile.title}</div>
          <div style={{ fontSize: 40, color: "#aaa5b8", marginTop: 20 }}>React · Next.js · TypeScript</div>
        </div>

        <div style={{ fontSize: 28, color: "#aaa5b8" }}>{profile.availability}</div>
      </div>
    ),
    size,
  );
}
