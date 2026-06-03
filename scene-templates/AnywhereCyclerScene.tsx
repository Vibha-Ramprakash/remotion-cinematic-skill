/**
 * ANYWHERE CYCLER SCENE — Format chips spin in a circle, then collapse
 * inward as the payoff word ("anywhere.") fades in.
 *
 * Use as the third sub-beat of an Input Sources sequence — after the
 * specific sources (WhatsApp, Email) have been named, this generalizes:
 * "...from anywhere."
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CaptionBg, GlassCard, FONT, C, INTER } from "../primitives";

// Customize this list — each item is a format/source you support
const FORMATS = [
  { icon: "💬", label: "WhatsApp" },
  { icon: "✉", label: "Email" },
  { icon: "📄", label: "PDF" },
  { icon: "🖼", label: "JPG" },
  { icon: "📷", label: "Photo" },
  { icon: "🌐", label: "Web" },
];

export const AnywhereCyclerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  // === Phase timing (75-90f recommended) ===
  const SPAWN_PER_CHIP = 4;     // frames between each chip spawning
  const SPIN_START = 36;         // when chips start spinning around the circle
  const COLLAPSE_START = 56;
  const COLLAPSE_END = 72;
  const TEXT_REVEAL = 28;

  // Smaller radius for portrait
  const RADIUS_START = isPortrait ? 340 : 500;

  return (
    <AbsoluteFill>
      <CaptionBg corner="tr" blobColor="rgba(232,169,60,0.3)" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Center text — first line static, second line revealed at collapse */}
        <div
          style={{
            fontFamily: INTER,
            fontSize: isPortrait ? 96 : 130,
            fontWeight: 800,
            letterSpacing: -3,
            textAlign: "center",
            lineHeight: 1.05,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: C.ink,
              opacity: interpolate(frame, [TEXT_REVEAL, TEXT_REVEAL + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [TEXT_REVEAL, TEXT_REVEAL + 12], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            Invoices from
          </div>
          <div
            style={{
              color: C.brand,
              marginTop: 8,
              opacity: interpolate(frame, [COLLAPSE_END - 4, COLLAPSE_END + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `scale(${interpolate(frame, [COLLAPSE_END - 4, COLLAPSE_END + 8], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              filter: `drop-shadow(0 8px 30px rgba(232,169,60,0.5))`,
            }}
          >
            anywhere.
          </div>
        </div>

        {/* Chips spawn → spin → collapse */}
        {FORMATS.map((f, i) => {
          const spawnFrame = i * SPAWN_PER_CHIP;
          const baseAngle = (i / FORMATS.length) * 360 - 90;
          const spawn = spring({ frame: frame - spawnFrame, fps, config: { damping: 14, stiffness: 140 } });
          const spinAngle = interpolate(frame, [SPIN_START, COLLAPSE_END], [0, 360], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          const radius = interpolate(frame, [COLLAPSE_START, COLLAPSE_END], [RADIUS_START, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          const collapseScale = interpolate(frame, [COLLAPSE_START, COLLAPSE_END], [1, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          const collapseOpacity = interpolate(frame, [COLLAPSE_END - 6, COLLAPSE_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const angleDeg = baseAngle + spinAngle;
          const rad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={f.label}
              style={{
                position: "absolute",
                transform: `translate(${x}px, ${y}px) scale(${spawn * collapseScale})`,
                opacity: spawn * collapseOpacity,
              }}
            >
              <GlassCard
                style={{
                  padding: isPortrait ? "20px 30px" : "28px 42px",
                  display: "flex",
                  alignItems: "center",
                  gap: isPortrait ? 16 : 22,
                }}
              >
                <span style={{ fontSize: isPortrait ? 38 : 56 }}>{f.icon}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: isPortrait ? 26 : 36, color: C.ink, fontWeight: 600 }}>
                  {f.label}
                </span>
              </GlassCard>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Suggested Sequence: <Sequence from={X} durationInFrames={90}>
