---
name: remotion-cinematic-product-video
description: Build premium, kinetic product/brand videos in Remotion — like the Teamble/zelios/Linear aesthetic. Includes word-by-word sliding text, fluid noise-driven backgrounds, glassmorphism cards, product UI mockups with field-by-field reveal, brand-gradient payoffs, music-synced scene cuts, and 16:9 / 9:16 / 1:1 adaptations. Use when the user says "make me a brand video", "Remotion video", "product launch video", "cinematic motion graphics video", "explainer video like beeny / teamble / zelios", or supplies a product they want a polished motion-graphics video for. Produces video files plus matching thumbnail PNGs ready for Instagram/LinkedIn/YouTube upload.
---

# Remotion Cinematic Product Video

You help users build premium, kinetic Remotion videos using a battle-tested motion language. This skill ships with reusable primitives, narrative scene templates, motion-language docs, and a starter project. Your job: run the intake → scaffold → compose scenes → iterate.

## When to use

Trigger this skill when the user wants:
- A brand video / product video / launch video / explainer video
- "Cinematic motion graphics" or references like Teamble, zelios, Linear, Notion's product videos
- A Remotion project from scratch with motion-graphics polish
- 9:16 / 16:9 / 1:1 versions of the same video
- A landing/cover thumbnail to go with the video

Do NOT trigger for: simple slideshow videos, text overlays on stock footage, or video editing tasks (this is for **generative** motion graphics built in code).

## The workflow

### 1. Run the intake (always)

Read `prompts/intake-template.md` and ask the user the questions. Capture: brand name, tagline, product description, target audience, primary brand color, secondary color, font preference, video length, aspect ratios needed, hook (the pain), payoff (the magic), music BPM (or "I'll provide later"). Don't skip this — every downstream decision flows from these answers.

### 2. Plan the scene arc

Read `references/scene-arc-structure.md`. Default arc: **Hook → Brand reveal → Setup → Demo → Solution → Statement → Outro**. Show the user a storyboard table (use `storyboard-template.md`) with proposed scenes, frame durations, key copy lines, and total video length. Iterate until they sign off.

### 3. Scaffold the project

Copy `starter/` into the user's project folder. Run `npm install`. Customize `src/primitives/tokens.ts` with the brand's colors, fonts, BPM. Update `src/Root.tsx` with the chosen compositions (16:9, 9:16, thumbnail Still).

### 4. Compose scenes

For each scene in the storyboard, copy the matching template from `scene-templates/` into `src/scenes/`. Customize the copy + timing per the storyboard. Wire them into `Root.tsx` with proper Sequence `from` and `durationInFrames`. Consult `references/motion-language.md` for spring configs and easings.

### 5. Iterate with the user

Start the studio (`npm start`), let user preview at localhost:3000. Common requests + how to handle:
- "Hold longer on X" → bump that Sequence's `durationInFrames` + shift all downstream Sequences by the delta. Update Root composition total.
- "Move this to top-right / fly to corner" → use the pattern in `ThumbnailCard.tsx` (linear interpolate position from current → target over exit frames)
- "Mobile version" → see `references/9-16-adaptation.md`. Most scenes copy with smaller fonts, narrower tile widths, vertical-stack dashboards
- "Custom thumbnail" → modify `ThumbnailCard.tsx` content. Render via `npm run thumbs`

### 6. Render

`npm run all` renders MP4 + thumbnail PNG for every registered composition.

## Critical patterns (don't skip)

### Music sync
Audio at root with `<Audio startFrom={...}/>` to trim silent intro. Scene cuts should land on musical bars where possible. See `references/music-sync.md` for BPM → frame math.

### Motion DNA
- Springs: `damping: 14-16, stiffness: 130-150` for entries
- Easing: `Easing.bezier(0.65, 0, 0.35, 1)` for cinematic moves
- All `interpolate()` calls use `extrapolateRight: "clamp"`
- Word-by-word stagger: 10-15 frames between words
- Scene crossfades: 8-frame opacity ramp at boundaries (no black flash)

### Gradient discipline
The brand gradient is reserved for **payoff words only** — the punchline of each beat. Body text is plain `ink` color. Overuse kills impact.

### Mobile adaptation
Read `useVideoConfig()` width/height. Cap text widths in portrait. Phone-app UI replaces browser chrome for dashboards. Hero text drops ~20-30% in size. Tiles narrow + reposition top/bottom of frame.

### Thumbnail = first frame visible
The cover frame must be visible at frame 0 (no whole-page fade in) so auto-thumbnail catches it. Stagger fade-in *individual elements* instead. Exit transitions can fly the logo to the watermark position for a seamless handoff into Scene 1.

## File map

```
SKILL.md                              ← you are here
README.md                             ← GitHub-facing docs
starter/                              ← copy this to user's project
  package.json
  remotion.config.ts
  tsconfig.json
  src/
    index.ts
    Root.tsx                          ← Composition registry (customize per project)
    primitives/
      tokens.ts                       ← Brand colors, fonts, motion constants
      FluidGradientBg.tsx
      SlidingSentence.tsx
      GradientWord.tsx
      TypingText.tsx
      GlassCard.tsx
      ScatteredTiles.tsx
      ThumbnailCard.tsx
      Watermark.tsx
      index.ts
    scenes/                           ← Empty — populate from scene-templates/
  public/                             ← Drop logo SVGs + music tracks here
scene-templates/                      ← Reusable narrative beats
  HookScene.tsx                       ← Painpoint sliding sentence
  BrandRevealScene.tsx                ← Glass pill → wordmark reveal
  InputSourcesScene.tsx               ← Scattered tile mosaic
  AnywhereCyclerScene.tsx             ← Chips in circle → collapse
  ProductDashboardScene.tsx           ← Browser/phone UI with field reveals
  SolutionScene.tsx                   ← "X does Y" declarative
  StatementScene.tsx                  ← Emotional payoff sentence
  OutroScene.tsx                      ← Logo + tagline outro
references/                           ← Pattern docs you consult
  motion-language.md
  scene-arc-structure.md
  music-sync.md
  9-16-adaptation.md
  thumbnail-design.md
  brand-tokens-quickstart.md
  dashboard-ui-recipes.md
prompts/
  intake-template.md
  storyboard-template.md
examples/
  beeny-showstopper/                  ← Real reference example
LICENSE
```

## Defaults if user is undecided
- Length: 22-24 seconds (sweet spot for social)
- Aspect ratios: 16:9 + 9:16 (mobile-first audience usually means 9:16 is the primary)
- Music: 110-120 BPM, 1-bar-per-beat scene cuts
- Hook → Brand → 1 input scene → 1 demo scene → 1 solution scene → Statement → Outro
- Thumbnail: logo center + tagline + hook headline + brand gradient bg

## What NOT to do
- ❌ Don't generate scenes without confirming the storyboard first
- ❌ Don't change `Root.tsx` composition total without summing all Sequence end frames
- ❌ Don't put the brand gradient on every word — reserve for payoffs
- ❌ Don't introduce black flashes between scenes (extend with opacity crossfade)
- ❌ Don't whole-page fade the thumbnail — stagger fade individual elements

## Roadmap (v1.1+)
- Multi-brand example library (consumer / SaaS / fintech / fashion variants)
- Caption/subtitle generator (accessibility)
- Color palette extractor (paste a logo → get tokens)
- npm-publishable component package
- AI hook generator (paste product description → 5 hook variations)
