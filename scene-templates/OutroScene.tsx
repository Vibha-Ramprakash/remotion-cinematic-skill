/**
 * OUTRO SCENE — Typewriter logo + wordmark + tagline.
 *
 * Final scene. Warm-dark background, the brand initial types in with
 * cursor blink, then wordmark fades in, then tagline.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TypingText, FONT, C, BRAND_GRADIENT } from "../primitives";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const TYPE_START = 20;
  const wordmark = interpolate(frame, [50, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagline = interpolate(frame, [66, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Warm dark background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeIn,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,169,60,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,128,79,0.25) 0%, transparent 60%),
            radial-gradient(ellipse at center, #2A1A08 0%, #15090A 50%, #08040B 100%)
          `,
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 36 }}>
        {/* Big typewriter brand initial */}
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 240,
            fontWeight: 800,
            color: C.brand,
            letterSpacing: -10,
            lineHeight: 1,
            minWidth: 200,
            filter: `drop-shadow(0 0 50px ${C.brand}55)`,
          }}
        >
          <TypingText text="b." startFrame={TYPE_START} charsPerFrame={0.18} showCaret />
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            opacity: wordmark,
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          brand name
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 36,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: 6,
            opacity: tagline,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Your tagline here
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
