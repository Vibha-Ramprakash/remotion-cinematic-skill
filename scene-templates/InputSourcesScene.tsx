/**
 * INPUT SOURCES SCENE — Scattered notification tiles + sliding headline.
 *
 * Pattern: 8-9 tiles scattered across edges (avoiding center text),
 * SlidingSentence on top with payoff word in gradient.
 *
 * Use for "From [source A]. From [source B]. From anywhere." narratives.
 * Pair this with AnywhereCyclerScene for the third sub-beat.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FluidGradientBg, SlidingSentence, CaptionBg, INTER, C, FONT } from "../primitives";

// ============================================================
// Generic notification tile — customize for your product context
// ============================================================
type TileKind = "whatsapp" | "email" | "sms" | "slack" | "custom";

const TileColors: Record<TileKind, { bg: string; label: string }> = {
  whatsapp: { bg: "#075E54", label: "WHATSAPP" },
  email: { bg: "#1F4FD8", label: "EMAIL" },
  sms: { bg: "#34C759", label: "SMS" },
  slack: { bg: "#4A154B", label: "SLACK" },
  custom: { bg: "#6B6557", label: "SOURCE" },
};

export const NotificationTile: React.FC<{
  kind: TileKind;
  sender: string;
  preview: string;
  width?: number;
}> = ({ kind, sender, preview, width = 460 }) => {
  const c = TileColors[kind];
  return (
    <div
      style={{
        width,
        background: "#fff",
        borderRadius: 22,
        padding: "20px 26px",
        boxShadow: "0 24px 50px rgba(40,28,8,0.15)",
        display: "flex",
        alignItems: "flex-start",
        gap: 18,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: c.bg,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT.sans,
          fontWeight: 800,
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {c.label[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 14, color: "#999", letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>
          {c.label}
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 18, color: C.ink, fontWeight: 600, marginBottom: 2 }}>
          {sender}
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 16, color: C.inkSoft, fontWeight: 500 }}>
          {preview}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ScatteredTiles — drops tiles at xPct/yPct positions with spring-in
// ============================================================
type TileDef = {
  xPct: number;
  yPct: number;
  rotation: number;
  scale: number;
  z: number;
  content: React.ReactNode;
};

const ScatteredTiles: React.FC<{ tiles: TileDef[]; appearStart: number; appearStagger?: number }> = ({
  tiles,
  appearStart,
  appearStagger = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  return (
    <>
      {tiles.map((t, i) => {
        const en = spring({ frame: frame - appearStart - i * appearStagger, fps, config: { damping: 14, stiffness: 100 } });
        const op = interpolate(en, [0, 1], [0, 1]);
        const s = interpolate(en, [0, 1], [0.7, t.scale]);
        const y = interpolate(en, [0, 1], [40, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${t.xPct}%`,
              top: `${t.yPct}%`,
              transform: `translate(-50%, -50%) translateY(${y}px) rotate(${t.rotation}deg) scale(${s})`,
              opacity: op,
              zIndex: 10 + t.z,
            }}
          >
            {t.content}
          </div>
        );
      })}
    </>
  );
};

// ============================================================
// Scene template — customize tiles, copy, kind
// ============================================================
export const InputSourcesScene: React.FC = () => {
  // Example: 8 WhatsApp tiles scattered at edges of frame.
  // Replace with your kinds/copy.
  const tiles: TileDef[] = [
    { xPct: 18, yPct: 14, rotation: -6, scale: 0.95, z: 0.3, content: <NotificationTile kind="whatsapp" sender="Vendor A" preview="Please process this invoice" /> },
    { xPct: 78, yPct: 12, rotation: 5, scale: 0.95, z: 0.4, content: <NotificationTile kind="whatsapp" sender="Vendor B" preview="₹14,820 invoice" /> },
    { xPct: 22, yPct: 28, rotation: 4, scale: 0.9, z: -0.3, content: <NotificationTile kind="whatsapp" sender="Vendor C" preview="Monthly billing attached" /> },
    { xPct: 80, yPct: 32, rotation: -3, scale: 0.92, z: 0.2, content: <NotificationTile kind="whatsapp" sender="Vendor D" preview="GST verified" /> },
    { xPct: 16, yPct: 78, rotation: 3, scale: 0.95, z: 0.5, content: <NotificationTile kind="whatsapp" sender="Vendor E" preview="INV-887 ready" /> },
    { xPct: 82, yPct: 80, rotation: -5, scale: 0.92, z: -0.2, content: <NotificationTile kind="whatsapp" sender="Vendor F" preview="New invoice sent" /> },
    { xPct: 30, yPct: 92, rotation: 6, scale: 0.88, z: 0.3, content: <NotificationTile kind="whatsapp" sender="Vendor G" preview="Please confirm receipt" /> },
    { xPct: 70, yPct: 94, rotation: -4, scale: 0.88, z: 0.4, content: <NotificationTile kind="whatsapp" sender="Vendor H" preview="Photo attached" /> },
  ];

  return (
    <AbsoluteFill>
      <FluidGradientBg variant="amberCream" speed={0.9} />
      <CaptionBg corner="tr" blobColor="rgba(232,169,60,0.30)" />
      <ScatteredTiles tiles={tiles} appearStart={2} appearStagger={3} />
      <SlidingSentence
        size={120}
        centerY="50%"
        fontFamily={INTER}
        pieces={[
          { text: "Invoices", startFrame: 4 },
          { text: "from", startFrame: 12 },
          { text: "WhatsApp.", startFrame: 20, gradient: true },
        ]}
      />
    </AbsoluteFill>
  );
};

// Suggested Sequence: <Sequence from={X} durationInFrames={50}>
// For multiple sources, repeat this scene with different tile sets +
// SlidingSentence pieces, with opacity crossfades between sub-scenes.
