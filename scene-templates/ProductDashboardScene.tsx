/**
 * PRODUCT DASHBOARD SCENE — Browser/phone UI with field-by-field reveal.
 *
 * The hero scene. Shows the product doing its magic.
 * Pattern: card flips up from below → fields populate with amber border-glow
 * → status badge pops with counter → card zooms toward camera.
 *
 * Plus an overlay headline ("Watch the magic happen.").
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FluidGradientBg, GradientWord, INTER, C, MOTION } from "../primitives";

export const ProductDashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry — flip up from below
  const enter = spring({ frame: frame - 2, fps, config: { damping: 18, stiffness: 80 } });
  const enterY = interpolate(enter, [0, 1], [500, 0]);
  const enterTilt = interpolate(enter, [0, 1], [70, 4]);
  const enterScale = interpolate(enter, [0, 1], [0.78, 1]);

  // Exit — zoom toward camera + blur + fade (frames 101-134)
  const exitT = interpolate(frame, [101, 134], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const exitScale = interpolate(exitT, [0, 1], [1, 4.2]);
  const exitOpacity = interpolate(exitT, [0, 0.55, 1], [1, 0.6, 0]);
  const exitBlur = interpolate(exitT, [0, 1], [0, 12]);
  const exitY = interpolate(exitT, [0, 1], [0, 60]);

  const fields = [
    { label: "Vendor", value: "Acme Corp", start: 18 },
    { label: "Invoice", value: "INV-2049", start: 28 },
    { label: "Amount", value: "₹42,500", start: 38, accent: true },
    { label: "Tax", value: "18% (₹6,483)", start: 48 },
    { label: "Status", value: "Verified", start: 58 },
  ];

  // "Posted" badge pop at frame 70
  const badgePop = spring({ frame: frame - 70, fps, config: { damping: 9, stiffness: 180 } });
  const counterT = interpolate(frame, [78, 102], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: MOTION.cinematic });
  const seconds = Math.max(0, Math.round(8 * (1 - counterT)));

  return (
    <AbsoluteFill>
      <FluidGradientBg variant="amberCream" speed={0.6} />

      {/* Overlay caption */}
      <Caption frame={frame} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "200px 60px 60px",
          perspective: 2400,
          opacity: exitOpacity,
          filter: `blur(${exitBlur}px)`,
        }}
      >
        <div
          style={{
            width: 1400,
            background: "#fff",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 50px 100px -20px rgba(40,28,8,0.25), 0 4px 12px rgba(40,28,8,0.08)",
            transform: `translateY(${enterY + exitY}px) scale(${enterScale * exitScale}) rotateX(${enterTilt}deg)`,
            transformOrigin: "center center",
          }}
        >
          {/* Browser chrome */}
          <div style={{ height: 52, background: "#FAF6EC", display: "flex", alignItems: "center", padding: "0 20px", gap: 14, borderBottom: "1px solid #F0E8D2" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Dot color="#FF5F57" /><Dot color="#FEBC2E" /><Dot color="#28C840" />
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 999, height: 30, display: "flex", alignItems: "center", padding: "0 18px", fontFamily: INTER, fontSize: 13, fontWeight: 500, color: C.inkSoft }}>
              app.example.com/inbox/INV-2049
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, color: C.inkSoft, letterSpacing: 2 }}>
              EXTRACTED AUTOMATICALLY · VERIFIED
            </div>
            {fields.map((f, i) => {
              const en = spring({ frame: frame - f.start, fps, config: { damping: 16, stiffness: 150 } });
              const op = interpolate(en, [0, 1], [0, 1]);
              const x = interpolate(en, [0, 1], [20, 0]);
              const glow = interpolate(frame, [f.start + 2, f.start + 18, f.start + 30], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: op, transform: `translateX(${x}px)`, padding: "12px 18px", background: "#FBF7EC", borderRadius: 12, border: `2px solid rgba(232, 169, 60, ${glow})`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: INTER, fontSize: 12, fontWeight: 600, color: C.inkSoft, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 20, fontWeight: 800, color: f.accent ? C.brand : C.ink }}>{f.value}</span>
                </div>
              );
            })}

            {/* Posted-to-X badge */}
            <div
              style={{
                marginTop: 8,
                transform: `scale(${badgePop})`,
                opacity: badgePop,
                background: `linear-gradient(135deg, ${C.success} 0%, #1E5C38 100%)`,
                borderRadius: 14,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 16px 32px rgba(47,125,79,0.35)",
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 900, fontSize: 24, color: "#fff" }}>✓</div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontFamily: INTER, fontSize: 19, fontWeight: 800, color: "#fff" }}>Done</div>
                <div style={{ fontFamily: INTER, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)", letterSpacing: 1 }}>Synced to your system</div>
              </div>
              <div style={{ fontFamily: INTER, fontSize: 44, fontWeight: 900, color: "#fff", minWidth: 60, textAlign: "right" }}>{seconds}s</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: 12, height: 12, borderRadius: 999, background: color }} />
);

const Caption: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const words = [
    { text: "Watch", start: 16 },
    { text: "the", start: 28 },
    { text: "magic", start: 40, gradient: true },
    { text: "happen.", start: 56, gradient: true },
  ];
  const out = interpolate(frame, [101, 121], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", fontFamily: INTER, fontSize: 75, fontWeight: 800, letterSpacing: -2, color: C.ink, display: "flex", justifyContent: "center", gap: 22, opacity: out, zIndex: 50, pointerEvents: "none" }}>
      {words.map((w, i) => {
        const a = spring({ frame: frame - w.start, fps, config: { damping: 16, stiffness: 140 } });
        const o = interpolate(a, [0, 1], [0, 1]);
        const ty = interpolate(a, [0, 1], [16, 0]);
        return (
          <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${ty}px)` }}>
            {w.gradient ? <GradientWord>{w.text}</GradientWord> : w.text}
          </span>
        );
      })}
    </div>
  );
};
