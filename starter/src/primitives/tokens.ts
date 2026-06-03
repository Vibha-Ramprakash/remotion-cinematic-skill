/**
 * BRAND TOKENS — customize these per project. Everything in the
 * primitives reads from here, so changing tokens here recolors/refonts
 * the entire video instantly.
 *
 * See references/brand-tokens-quickstart.md for a 5-minute guide.
 */

import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { Easing } from "remotion";

const { fontFamily: fraunces } = loadFraunces();
const { fontFamily: inter } = loadInter();
const { fontFamily: montserrat } = loadMontserrat();

// === COLOR PALETTE ===
// Replace these with your brand's palette.
export const C = {
  // Surfaces
  bg: "#F9F3E3",         // Page background
  card: "#FFFFFF",       // Cards / containers

  // Text
  ink: "#1A1A1A",        // Primary text
  inkSoft: "#6B6557",    // Secondary text

  // Brand accent
  brand: "#E8A93C",      // Primary brand color (used in watermark, accents)
  brandSoft: "#FBE9B8",  // Lighter shade
  brandLine: "#F2D58A",  // Border/line color

  // States
  success: "#2F7D4F",
  successSoft: "#D7EAD9",
  warning: "#E89070",
  danger: "#D72638",
};

// === BRAND GRADIENT ===
// The "payoff" gradient used on hero words. Reserve for emphasis only.
export const BRAND_GRADIENT =
  "linear-gradient(90deg, #FFD93D 0%, #F2B33A 50%, #E8804F 100%)";
//                  ^ start (yellow)    ^ mid (gold)      ^ end (warm tip)

// === FONTS ===
export const FONT = {
  display: `${fraunces}, 'Fraunces', Georgia, serif`,     // Hero text
  sans: `${inter}, 'Inter', -apple-system, sans-serif`,   // Body / kinetic
  sansAlt: `${montserrat}, 'Montserrat', sans-serif`,     // Alt sans option
  mono: "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace",
};

// Convenience aliases
export const INTER = FONT.sans;
export const MONTSERRAT = FONT.sansAlt;

// === MOTION CONSTANTS ===
// Use these everywhere for consistent feel.
export const MOTION = {
  // Easings
  cinematic: Easing.bezier(0.65, 0, 0.35, 1),
  easeIn: Easing.in(Easing.cubic),
  easeOut: Easing.out(Easing.cubic),

  // Spring presets — pass to spring({fps, config: SPRING.x})
  spring: {
    snappy: { damping: 14, stiffness: 150 },     // Hero word entries
    gentle: { damping: 18, stiffness: 100 },     // Card entries
    bouncy: { damping: 10, stiffness: 200 },     // Stamps / pops
    settle: { damping: 22, stiffness: 70 },      // Final landing
  },
};

// === MUSIC SYNC ===
// Set these once per project to enable bar-aligned cuts.
// See references/music-sync.md for the math.
export const MUSIC = {
  bpm: 120,
  audioStartFrom: 0,        // frames to trim from audio start (if track has silent intro)
  audioVolume: 0.75,
};

// Derived: frames per bar at the given BPM @ 30fps (4 beats per bar)
export const FRAMES_PER_BAR = Math.round((60 / MUSIC.bpm) * 4 * 30);
export const FRAMES_PER_PHRASE = FRAMES_PER_BAR * 4; // 4 bars
