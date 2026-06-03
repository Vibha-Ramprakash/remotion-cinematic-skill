import React from "react";
import { Composition, Still } from "remotion";
import { Main } from "./Main";
import { MainMobile } from "./MainMobile";
import { ThumbnailCard } from "./primitives";

// Adjust durationInFrames to match the sum of all your scene Sequences
const TOTAL_FRAMES = 660; // 22s @ 30fps — UPDATE PER PROJECT

export const Root: React.FC = () => (
  <>
    <Composition
      id="Main"
      component={Main}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="MainMobile"
      component={MainMobile}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
    <Still id="Thumb16x9" component={ThumbnailCard} width={1920} height={1080} />
    <Still id="Thumb9x16" component={ThumbnailCard} width={1080} height={1920} />
  </>
);
