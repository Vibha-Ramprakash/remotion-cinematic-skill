/**
 * Core primitives. Import what you need:
 *
 *   import { SlidingSentence, GradientWord, FluidGradientBg, C, FONT } from "./primitives";
 *
 * For specialty primitives (ScatteredTiles, AnywhereCycler, glass pills, etc.)
 * see examples/beeny-showstopper/ or copy from scene-templates/.
 */

import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { noise2D } from "@remotion/noise";

export {
  C,
  FONT,
  INTER,
  MONTSERRAT,
  MOTION,
  MUSIC,
  BRAND_GRADIENT,
  FRAMES_PER_BAR,
  FRAMES_PER_PHRASE,
} from "./tokens";
import { C, FONT, BRAND_GRADIENT } from "./tokens";

// ============================================================
// FluidGradientBg — Noise-driven living background.
// Three radial blobs wander via @remotion/noise + a haze layer.
// Variants tuned for common brand vibes.
// ============================================================
export const FluidGradientBg: React.FC<{
  variant?: "brightSun" | "amberCream" | "darkGold" | "custom";
  speed?: number; // 1 = default, lower = calmer
  customPalette?: {
    base: string;
    blob1: string;
    blob2: string;
    blob3: string;
    haze: string;
  };
}> = ({ variant = "brightSun", speed = 1, customPalette }) => {
  const frame = useCurrentFrame();
  const t = frame * 0.006 * speed;

  const b1x = 30 + noise2D("blob1x", t, 0) * 28;
  const b1y = 35 + noise2D("blob1y", t, 0) * 25;
  const b2x = 70 + noise2D("blob2x", t, 0) * 25;
  const b2y = 65 + noise2D("blob2y", t, 0) * 25;
  const b3x = 50 + noise2D("blob3x", t, 0) * 35;
  const b3y = 50 + noise2D("blob3y", t, 0) * 30;

  const palettes = {
    brightSun: {
      base: "linear-gradient(180deg, #FFFFFF 0%, #FFFCEB 100%)",
      blob1: "rgba(255, 235, 59, 0.55)",
      blob2: "rgba(232, 169, 60, 0.45)",
      blob3: "rgba(255, 220, 120, 0.40)",
      haze: "rgba(255, 215, 100, 0.10)",
    },
    amberCream: {
      base: "linear-gradient(180deg, #FEFCF8 0%, #FDF1D8 100%)",
      blob1: "rgba(251, 233, 184, 0.65)",
      blob2: "rgba(232, 169, 60, 0.30)",
      blob3: "rgba(255, 248, 220, 0.55)",
      haze: "rgba(232, 169, 60, 0.06)",
    },
    darkGold: {
      base: "linear-gradient(180deg, #1A1208 0%, #2A1E0C 100%)",
      blob1: "rgba(232, 169, 60, 0.35)",
      blob2: "rgba(232, 128, 79, 0.28)",
      blob3: "rgba(184, 120, 40, 0.30)",
      haze: "rgba(232, 169, 60, 0.05)",
    },
    custom: customPalette ?? {
      base: "#FFFFFF",
      blob1: "rgba(0,0,0,0.05)",
      blob2: "rgba(0,0,0,0.05)",
      blob3: "rgba(0,0,0,0.05)",
      haze: "rgba(0,0,0,0.02)",
    },
  };
  const p = palettes[variant];
  const hazeShift = noise2D("haze", t * 0.5, 0) * 100;

  return (
    <div style={{ position: "absolute", inset: 0, background: p.base, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at ${b1x}% ${b1y}%, ${p.blob1} 0%, transparent 60%)`, filter: "blur(20px)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 50% at ${b2x}% ${b2y}%, ${p.blob2} 0%, transparent 65%)`, filter: "blur(30px)", mixBlendMode: variant === "darkGold" ? "screen" : "multiply" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at ${b3x}% ${b3y}%, ${p.blob3} 0%, transparent 55%)`, filter: "blur(40px)", opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 120% 50% at ${50 + hazeShift * 0.3}% -10%, ${p.haze} 0%, transparent 70%)` }} />
    </div>
  );
};

// ============================================================
// GradientWord — text with the brand gradient fill.
// Reserve for PAYOFF words only (the punchline of each beat).
// ============================================================
export const GradientWord: React.FC<{
  children: React.ReactNode;
  gradient?: string;
}> = ({ children, gradient = BRAND_GRADIENT }) => (
  <span
    style={{
      background: gradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      display: "inline-block",
    }}
  >
    {children}
  </span>
);

// ============================================================
// SlidingSentence — big words enter from right, camera slides
// to keep the active (latest) word centered.
// ============================================================
export type SentencePiece = {
  text: string;
  startFrame: number;
  gradient?: boolean;
  color?: string;
  node?: React.ReactNode; // optional custom render (e.g., logo SVG)
};

export const SlidingSentence: React.FC<{
  pieces: SentencePiece[];
  size?: number;
  color?: string;
  centerY?: string | number;
  fontFamily?: string;
}> = ({
  pieces,
  size = 120,
  color = C.ink,
  centerY = "50%",
  fontFamily = FONT.sans,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pxPerChar = size * 0.5;
  const gap = size * 0.35;
  const widths = pieces.map((p) => p.text.length * pxPerChar);
  const positions: number[] = [];
  let cursor = 0;
  for (let i = 0; i < pieces.length; i++) {
    positions.push(cursor);
    cursor += widths[i] + gap;
  }
  let activeIdx = 0;
  for (let i = 0; i < pieces.length; i++) {
    if (frame >= pieces[i].startFrame) activeIdx = i;
  }
  const targetOffset = -positions[activeIdx] - widths[activeIdx] / 2;
  const slide = spring({
    frame: frame - pieces[activeIdx].startFrame,
    fps,
    config: { damping: 22, stiffness: 80 },
  });
  const prevIdx = Math.max(0, activeIdx - 1);
  const prevTarget = -positions[prevIdx] - widths[prevIdx] / 2;
  const currentOffset = prevTarget + (targetOffset - prevTarget) * slide;

  return (
    <div style={{ position: "absolute", top: centerY, left: "50%", transform: "translateY(-50%)", width: 0, height: 0, overflow: "visible" }}>
      <div style={{ position: "absolute", top: -size * 0.7, left: currentOffset, width: cursor, whiteSpace: "nowrap", fontFamily, fontSize: size, fontWeight: 800, letterSpacing: -3, color, lineHeight: 1.05, display: "flex", alignItems: "center", gap }}>
        {pieces.map((p, i) => {
          const appear = spring({ frame: frame - p.startFrame, fps, config: { damping: 16, stiffness: 130 } });
          const o = interpolate(appear, [0, 1], [0, 1]);
          const ty = interpolate(appear, [0, 1], [20, 0]);
          return (
            <span key={i} style={{ opacity: o, transform: `translateY(${ty}px)`, display: "inline-block", color: p.color }}>
              {p.node ?? (p.gradient ? <GradientWord>{p.text}</GradientWord> : p.text)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// TypingText — typewriter effect with optional caret
// ============================================================
export const TypingText: React.FC<{
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  showCaret?: boolean;
  style?: React.CSSProperties;
}> = ({ text, startFrame, charsPerFrame = 0.6, showCaret, style }) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, (frame - startFrame) * charsPerFrame);
  const count = Math.min(text.length, Math.floor(progress));
  const visible = text.slice(0, count);
  const caretBlink = Math.floor(frame / 8) % 2 === 0;
  const isDone = count >= text.length;
  return (
    <span style={style}>
      {visible}
      {showCaret && !isDone && caretBlink && <span style={{ opacity: 0.6 }}>▎</span>}
    </span>
  );
};

// ============================================================
// GlassCard — glassmorphism container
// ============================================================
export const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      position: "relative",
      borderRadius: 20,
      background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.42) 100%)",
      backdropFilter: "blur(40px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.4)",
      boxShadow: "0 24px 50px -10px rgba(40,28,8,0.15), inset 0 1.5px 1px rgba(255,255,255,0.85)",
      padding: "24px 36px",
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================================
// CaptionBg — soft corner blob backdrop. Pair with FluidGradientBg
// for scenes that need a specific corner emphasis.
// ============================================================
export const CaptionBg: React.FC<{
  corner?: "tr" | "tl" | "br" | "bl";
  blobColor?: string;
}> = ({ corner = "tr", blobColor = "rgba(232,169,60,0.30)" }) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.4;
  const positions = {
    tr: { x: 75 + Math.sin(drift * 0.02) * 8, y: 25 + Math.cos(drift * 0.018) * 6 },
    tl: { x: 25 + Math.sin(drift * 0.02) * 8, y: 25 + Math.cos(drift * 0.018) * 6 },
    br: { x: 75 + Math.sin(drift * 0.02) * 8, y: 75 + Math.cos(drift * 0.018) * 6 },
    bl: { x: 25 + Math.sin(drift * 0.02) * 8, y: 75 + Math.cos(drift * 0.018) * 6 },
  }[corner];
  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at ${positions.x}% ${positions.y}%, ${blobColor} 0%, transparent 55%), linear-gradient(180deg, #FEFCF8 0%, #FDF9EE 100%)` }} />
  );
};

// ============================================================
// Watermark — persistent corner brand mark.
// Default shows a single character (your brand initial). Pass `logoSrc`
// to use a static SVG/PNG from /public instead.
// ============================================================
export const Watermark: React.FC<{
  initial?: string;          // Brand initial (e.g., "b.")
  logoSrc?: string;          // Path to logo asset (overrides initial)
  hideAfterFrame?: number;   // Fade out before outro
  color?: string;
}> = ({ initial = "•", logoSrc, hideAfterFrame, color }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = hideAfterFrame !== undefined
    ? interpolate(frame, [hideAfterFrame - 10, hideAfterFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  return (
    <div style={{ position: "absolute", top: isPortrait ? 60 : 44, right: isPortrait ? 56 : 64, zIndex: 1000, opacity: fadeIn * fadeOut * 0.85, pointerEvents: "none" }}>
      {logoSrc ? (
        <Img src={staticFile(logoSrc)} style={{ height: isPortrait ? 64 : 56, width: "auto" }} />
      ) : (
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: isPortrait ? 64 : 56,
            fontWeight: 800,
            color: color ?? C.brand,
            letterSpacing: -2,
            lineHeight: 1,
            filter: "drop-shadow(0 2px 8px rgba(40,28,8,0.18))",
          }}
        >
          {initial}
        </div>
      )}
    </div>
  );
};

// ============================================================
// ThumbnailCard — cover frame with staggered entry + fly-to-watermark
// exit. Used as the first second of the video AND exported as standalone
// PNG via a <Still> composition.
// ============================================================
export const ThumbnailCard: React.FC<{
  brandInitial?: string;
  brandName?: string;
  hook?: string;
  tagline?: string;
  animated?: boolean;
}> = ({
  brandInitial = "b.",
  brandName = "brand",
  hook = "Your hook headline here.",
  tagline = "BUILT WITH PURPOSE",
  animated = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const isPortrait = height > width;
  const bSize = isPortrait ? 180 : 220;
  const wordmarkSize = isPortrait ? 96 : 120;
  const hookSize = isPortrait ? 56 : 68;
  const taglineSize = isPortrait ? 20 : 24;
  const cx = width / 2;
  const bCenterY = height / 2 - 120;
  const nameCenterY = height / 2 + 60;
  const hookCenterY = height / 2 + 180;
  const wmFontSize = isPortrait ? 64 : 56;
  const wmRight = isPortrait ? 56 : 64;
  const wmTop = isPortrait ? 60 : 44;
  const wmCenterX = width - wmRight - wmFontSize * 0.25;
  const wmCenterY = wmTop + wmFontSize * 0.5;

  if (!animated) {
    return (
      <StaticThumb bSize={bSize} wordmarkSize={wordmarkSize} hookSize={hookSize} taglineSize={taglineSize} isPortrait={isPortrait} brandInitial={brandInitial} brandName={brandName} hook={hook} tagline={tagline} />
    );
  }

  const bEnter = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const nameEnter = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 130 } });
  const hookEnter = spring({ frame: frame - 16, fps, config: { damping: 14, stiffness: 130 } });
  const exitT = interpolate(frame, [49, 59], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bX = cx + (wmCenterX - cx) * exitT;
  const bY = bCenterY + (wmCenterY - bCenterY) * exitT;
  const bScale = bEnter * (1 - exitT * (1 - wmFontSize / bSize));
  const nameY = nameCenterY + (bCenterY - nameCenterY) * exitT;
  const nameScale = nameEnter * (1 - exitT * 0.7);
  const nameOpacity = nameEnter * (1 - exitT);
  const hookScale = hookEnter * (1 + exitT * 0.8);
  const hookOpacity = hookEnter * (1 - exitT);

  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 30% 35%, rgba(255, 235, 59, 0.55) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 75% 70%, rgba(232, 169, 60, 0.50) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 220, 120, 0.40) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #FFFCEB 100%)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: bX, top: bY, transform: `translate(-50%, -50%) scale(${bScale})`, opacity: bEnter, fontFamily: FONT.display, fontSize: bSize, fontWeight: 800, color: C.brand, letterSpacing: -10, lineHeight: 0.9, filter: "drop-shadow(0 12px 40px rgba(232,169,60,0.35))" }}>
        {brandInitial}
      </div>
      <div style={{ position: "absolute", left: cx, top: nameY, transform: `translate(-50%, -50%) scale(${nameScale})`, opacity: nameOpacity, fontFamily: FONT.display, fontSize: wordmarkSize, fontWeight: 700, letterSpacing: -2, background: BRAND_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", whiteSpace: "nowrap" }}>
        {brandName}
      </div>
      <div style={{ position: "absolute", left: cx, top: hookCenterY, transform: `translate(-50%, -50%) scale(${hookScale})`, opacity: hookOpacity, fontFamily: FONT.sans, fontSize: hookSize, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: C.ink, textAlign: "center", width: isPortrait ? 900 : 1400 }}>
        {hook}
      </div>
      <div style={{ position: "absolute", bottom: isPortrait ? 110 : 70, left: 0, right: 0, textAlign: "center", fontFamily: FONT.mono, fontSize: taglineSize, fontWeight: 600, color: C.inkSoft, letterSpacing: 5, textTransform: "uppercase", opacity: hookOpacity }}>
        {tagline}
      </div>
    </div>
  );
};

const StaticThumb: React.FC<{
  bSize: number; wordmarkSize: number; hookSize: number; taglineSize: number;
  isPortrait: boolean; brandInitial: string; brandName: string; hook: string; tagline: string;
}> = ({ bSize, wordmarkSize, hookSize, taglineSize, isPortrait, brandInitial, brandName, hook, tagline }) => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 30% 35%, rgba(255, 235, 59, 0.55) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 75% 70%, rgba(232, 169, 60, 0.50) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 220, 120, 0.40) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #FFFCEB 100%)`, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: isPortrait ? 12 : 16, padding: isPortrait ? 60 : 80 }}>
      <div style={{ fontFamily: FONT.display, fontSize: bSize, fontWeight: 800, color: C.brand, letterSpacing: -10, lineHeight: 0.9, filter: "drop-shadow(0 12px 40px rgba(232,169,60,0.35))" }}>{brandInitial}</div>
      <div style={{ fontFamily: FONT.display, fontSize: wordmarkSize, fontWeight: 700, letterSpacing: -2, background: BRAND_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{brandName}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: hookSize, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: C.ink, textAlign: "center", maxWidth: isPortrait ? 900 : 1400, marginTop: isPortrait ? 16 : 24 }}>{hook}</div>
      <div style={{ position: "absolute", bottom: isPortrait ? 110 : 70, left: 0, right: 0, textAlign: "center", fontFamily: FONT.mono, fontSize: taglineSize, fontWeight: 600, color: C.inkSoft, letterSpacing: 5, textTransform: "uppercase" }}>{tagline}</div>
    </div>
  </div>
);
