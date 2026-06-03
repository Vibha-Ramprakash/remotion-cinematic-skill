/**
 * HOOK SCENE — Painpoint declaration (opens the video).
 *
 * Pattern: SlidingSentence with word-by-word reveal, camera pans to
 * keep latest word centered, zoom-blur exit into next scene.
 *
 * Copy into src/scenes/, customize the pieces array + duration.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FluidGradientBg, SlidingSentence, INTER, C } from "../primitives";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom-blur exit (last 17 frames)
  const zoomScale = interpolate(frame, [110, 127], [1, 1.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoomBlur = interpolate(frame, [114, 127], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [114, 127], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        opacity: exit,
        transform: `scale(${zoomScale})`,
        filter: `blur(${zoomBlur}px)`,
      }}
    >
      <FluidGradientBg variant="brightSun" speed={1.2} />

      <SlidingSentence
        size={120}
        centerY="50%"
        fontFamily={INTER}
        pieces={[
          { text: "Your", startFrame: 0 },
          { text: "painful", startFrame: 18 },
          { text: "status quo", startFrame: 38 },
          { text: "stops", startFrame: 60 },
          { text: "today.", startFrame: 76, gradient: true },
        ]}
      />
    </AbsoluteFill>
  );
};

// Suggested Sequence: <Sequence from={X} durationInFrames={127}>
