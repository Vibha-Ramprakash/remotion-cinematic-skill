/**
 * SOLUTION SCENE — "X does Y" declarative.
 *
 * Mirror of HookScene but with brand name as first word (gradient).
 * Use after the demo/product scene to land the value proposition.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FluidGradientBg, SlidingSentence, INTER } from "../primitives";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoomScale = interpolate(frame, [105, 122], [1, 1.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoomBlur = interpolate(frame, [109, 122], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [109, 122], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit, transform: `scale(${zoomScale})`, filter: `blur(${zoomBlur}px)` }}>
      <FluidGradientBg variant="brightSun" speed={1.1} />
      <SlidingSentence
        size={110}
        centerY="50%"
        fontFamily={INTER}
        pieces={[
          { text: "Brand", startFrame: 0, gradient: true },
          { text: "solves", startFrame: 16 },
          { text: "your", startFrame: 32 },
          { text: "problem", startFrame: 46 },
          { text: "in seconds.", startFrame: 62, gradient: true },
        ]}
      />
    </AbsoluteFill>
  );
};
