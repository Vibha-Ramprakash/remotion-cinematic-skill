/**
 * BRAND REVEAL SCENE — "Meet [brand]."
 *
 * Pattern: glassmorphic pill with typed text → pill dissolves while content
 * scales up to become the giant wordmark.
 *
 * Use as Scene 2, right after the Hook.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  FluidGradientBg,
  GradientWord,
  TypingText,
  CaptionBg,
  INTER,
  C,
  FONT,
} from "../primitives";

const BRAND_NAME = "brand"; // customize: "beeny.", "linear.", etc.
const BRAND_SUFFIX = "ai"; // optional second word (gradient) — set "" to skip

export const BrandRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Phase timing (110f recommended) ===
  const PILL_IN = 4;
  const TYPE_START = 14;
  const PILL_DISSOLVE = 90;
  const BIG_REVEAL = 100;

  const entryScale = interpolate(frame, [0, 12], [1.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const entryBlur = interpolate(frame, [0, 12], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pillIn = spring({ frame: frame - PILL_IN, fps, config: { damping: 18 } });

  const dissolve = interpolate(frame, [PILL_DISSOLVE, BIG_REVEAL + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pillBgOpacity = 1 - dissolve;
  const contentScale = interpolate(dissolve, [0, 1], [1, 2.5]);

  return (
    <AbsoluteFill style={{ transform: `scale(${entryScale})`, filter: `blur(${entryBlur}px)` }}>
      {/* Choose either CaptionBg (lighter, corner blob) or FluidGradientBg */}
      <CaptionBg corner="tr" blobColor="rgba(232,169,60,0.35)" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ opacity: pillIn, position: "relative" }}>
          {/* Glass pill background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.42) 100%)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow:
                "0 24px 50px -10px rgba(40,28,8,0.15), inset 0 1.5px 1px rgba(255,255,255,0.85), inset 0 -1.5px 1px rgba(40,28,8,0.06), inset 0 0 30px rgba(255,255,255,0.25)",
              opacity: pillBgOpacity,
            }}
          />
          {/* Content (scales up + persists) */}
          <div
            style={{
              position: "relative",
              padding: "36px 80px",
              fontFamily: FONT.sans,
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              textAlign: "center",
              minWidth: 760,
              transform: `scale(${contentScale})`,
              transformOrigin: "center center",
            }}
          >
            <span style={{ color: C.ink }}>
              <TypingText text="Meet " startFrame={TYPE_START} charsPerFrame={0.7} />
            </span>
            <GradientWord>
              <TypingText text={BRAND_NAME} startFrame={TYPE_START + 12} charsPerFrame={0.7} />
            </GradientWord>
            {BRAND_SUFFIX && (
              <GradientWord>
                <TypingText
                  text={BRAND_SUFFIX}
                  startFrame={TYPE_START + 26}
                  charsPerFrame={0.7}
                  showCaret
                />
              </GradientWord>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Suggested Sequence: <Sequence from={X} durationInFrames={110}>
