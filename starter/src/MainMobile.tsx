import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Watermark, ThumbnailCard, MUSIC } from "./primitives";

// Mobile (9:16) version. Either:
//   A) Reuse the same scene components — they should read useVideoConfig()
//      width/height and adapt internally.
//   B) Build dedicated `*Mobile.tsx` scene variants for layouts that need
//      a totally different structure (e.g., phone-app UI for dashboards).
//
// See references/9-16-adaptation.md for guidance.

const T = 59;

export const MainMobile: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={0} durationInFrames={T}>
      <ThumbnailCard animated brandInitial="b." brandName="brand name" hook="Your hook here." tagline="YOUR TAGLINE" />
    </Sequence>

    {/* ===== YOUR MOBILE SCENES GO HERE ===== */}

    <Sequence from={T} durationInFrames={600}>
      <Watermark initial="b." />
    </Sequence>

    {/* <Audio src={staticFile("track.mp3")} volume={MUSIC.audioVolume} startFrom={MUSIC.audioStartFrom} /> */}
  </AbsoluteFill>
);
