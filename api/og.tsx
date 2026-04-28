import { ImageResponse } from "@vercel/og";
import { findReaction, type Reaction } from "../src/data/reactions";

export const config = {
  runtime: "edge",
};

const WIDTH = 1200;
const HEIGHT = 630;

function parseReactants(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/[,+\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2);
}

function pickReaction(reactants: string[]): Reaction | null {
  if (reactants.length < 2) return null;
  return findReaction(reactants);
}

function exoColor(enthalpy: number) {
  return enthalpy < 0
    ? { from: "#fb923c", to: "#ef4444", label: "EXOTHERMIC" }
    : { from: "#38bdf8", to: "#6366f1", label: "ENDOTHERMIC" };
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rRaw = searchParams.get("r") || searchParams.get("reactants");
    const reactants = parseReactants(rRaw);
    const reaction = pickReaction(reactants);

    const eq =
      searchParams.get("eq") ||
      reaction?.eq ||
      (reactants.length >= 2 ? `${reactants[0]} + ${reactants[1]} → ?` : "UN Lab — Chemistry");
    const balanced = reaction?.balanced || eq;
    const type = reaction?.type || "reaction";
    const enthalpy = reaction?.enthalpy ?? 0;
    const realUse = reaction?.realUse || "Interactive chemistry simulator with 500+ real reactions.";
    const accent = exoColor(enthalpy);

    return new ImageResponse(
      (
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background:
              "radial-gradient(ellipse at 20% 0%, #0c1437 0%, #050617 45%, #000000 100%)",
            color: "#e2e8f0",
            fontFamily: "Inter, system-ui, sans-serif",
            padding: 64,
          }}
        >
          {/* Aurora glows */}
          <div
            style={{
              position: "absolute",
              top: -160,
              left: -120,
              width: 480,
              height: 480,
              borderRadius: 9999,
              background: "rgba(56,189,248,0.30)",
              filter: "blur(120px)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -180,
              right: -140,
              width: 520,
              height: 520,
              borderRadius: 9999,
              background: "rgba(139,92,246,0.28)",
              filter: "blur(140px)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 220,
              right: 160,
              width: 320,
              height: 320,
              borderRadius: 9999,
              background: `${accent.from}33`,
              filter: "blur(110px)",
              display: "flex",
            }}
          />

          {/* Brand row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)",
                boxShadow:
                  "0 16px 36px -10px rgba(34,211,238,0.55), inset 0 0 0 1px rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: -1,
              }}
            >
              ⚛
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  background:
                    "linear-gradient(90deg, #67e8f9 0%, #93c5fd 50%, #c4b5fd 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                  letterSpacing: -0.5,
                }}
              >
                UN Lab
              </span>
              <span
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  color: "#94a3b8",
                  fontWeight: 500,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                }}
              >
                Chemistry · Interactive
              </span>
            </div>
            <div style={{ flex: 1 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                borderRadius: 9999,
                border: `1px solid ${accent.from}55`,
                background: `${accent.from}1a`,
                color: accent.from,
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 4,
              }}
            >
              {accent.label}
            </div>
          </div>

          {/* Equation card */}
          <div
            style={{
              marginTop: 56,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 28,
              padding: 44,
              borderRadius: 32,
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 30px 60px -25px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.04)",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  background: "rgba(56,189,248,0.14)",
                  color: "#67e8f9",
                  border: "1px solid rgba(56,189,248,0.35)",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                {type}
              </div>
              {reaction && (
                <div
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.05)",
                    color: "#cbd5e1",
                    border: "1px solid rgba(255,255,255,0.10)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {enthalpy > 0 ? "+" : ""}
                  {Math.round(enthalpy)} kJ/mol
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 86,
                fontWeight: 900,
                lineHeight: 1.05,
                background:
                  "linear-gradient(90deg, #ffffff 0%, #bae6fd 60%, #c4b5fd 100%)",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: -2,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                maxWidth: 1080,
              }}
            >
              {balanced}
            </div>

            {reaction && (
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#94a3b8",
                  maxWidth: 1080,
                  lineHeight: 1.4,
                }}
              >
                {realUse}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              fontSize: 18,
              color: "#94a3b8",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#22d3ee",
                boxShadow: "0 0 18px rgba(34,211,238,0.8)",
              }}
            />
            <span style={{ fontWeight: 600, color: "#e2e8f0" }}>
              Open in UN Lab — instantly run this reaction
            </span>
            <div style={{ flex: 1 }} />
            <span style={{ fontWeight: 700, letterSpacing: 4 }}>
              UN-LAB.APP
            </span>
          </div>
        </div>
      ),
      {
        width: WIDTH,
        height: HEIGHT,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (err) {
    return new Response(`OG render error: ${String(err)}`, { status: 500 });
  }
}
