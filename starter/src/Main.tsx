import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Watermark, ThumbnailCard, MUSIC } from "./primitives";

// Compose your scenes here. Import from src/scenes/ — populate that folder
// by copying templates from ../scene-templates/ then customizing copy/timing.
//
// Example pattern (after copying HookScene.tsx into src/scenes/):
//
//   import { HookScene } from "./scenes/HookScene";
//   ...
//   <Sequence from={59} durationInFrames={130}>
//     <HookScene />
//   </Sequence>

const T = 59; // thumbnail intro duration

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {/* Thumbnail intro */}
    <Sequence from={0} durationInFrames={T}>
      <ThumbnailCard animated brandInitial="b." brandName="brand name" hook="Your hook here." tagline="YOUR TAGLINE" />
    </Sequence>

    {/* ===== YOUR SCENES GO HERE ===== */}
    {/* <Sequence from={T} durationInFrames={130}><HookScene /></Sequence> */}
    {/* ... */}

    {/* Persistent watermark */}
    <Sequence from={T} durationInFrames={600}>
      <Watermark initial="b." />
    </Sequence>

    {/* Music — drop a track in public/ and update the path */}
    {/* <Audio src={staticFile("track.mp3")} volume={MUSIC.audioVolume} startFrom={MUSIC.audioStartFrom} /> */}
  </AbsoluteFill>
);
