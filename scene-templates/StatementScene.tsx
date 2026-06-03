/**
 * STATEMENT SCENE — Emotional payoff sentence.
 *
 * Words land one-by-one, key word gets gradient + speed-blur trail.
 * Use as the second-to-last scene before outro.
 */
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FluidGradientBg, GradientWord, INTER, C } from "../primitives";

export const StatementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = [
    { t: "Magic", s: 6 },
    { t: "happens", s: 14 },
    { t: "at", s: 22 },
    { t: "lightning", s: 30, gradient: true, speed: true },
    { t: "speed.", s: 44 },
  ];

  const exit = interpolate(frame, [65, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <FluidGradientBg variant="brightSun" speed={1.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <div
          style={{
            fontFamily: INTER,
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1.04,
            color: C.ink,
            textAlign: "center",
            maxWidth: 1700,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 30px",
          }}
        >
          {words.map((w, i) => {
            const en = spring({ frame: frame - w.s, fps, config: { damping: 14, stiffness: 130 } });
            const op = interpolate(en, [0, 1], [0, 1]);
            const y = interpolate(en, [0, 1], [30, 0]);
            const blur = w.speed ? interpolate(frame, [38, 44, 50], [0, 8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            const x = w.speed ? interpolate(frame, [38, 44, 50], [0, -14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            return (
              <span key={i} style={{ display: "inline-block", opacity: op, transform: `translateY(${y}px) translateX(${x}px)`, filter: blur ? `blur(${blur}px)` : undefined, whiteSpace: "nowrap" }}>
                {w.gradient ? <GradientWord>{w.t}</GradientWord> : w.t}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
