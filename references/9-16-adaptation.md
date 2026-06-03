# 9:16 (Portrait / Mobile) Adaptation

How to adapt landscape (1920×1080) scenes for portrait (1080×1920).

## The strategy

Two paths:

**Path A: Single component that branches** — scene reads `useVideoConfig()` and renders differently when `width < height`. Best for simple scenes (hero text, statements).

**Path B: Dedicated `*Mobile.tsx` variant** — copy the scene, rewrite layout for portrait. Best for complex scenes (dashboards, multi-element compositions).

## Default adaptations (apply to every scene)

| Element | Landscape | Portrait |
|---|---|---|
| Hero text font size | 120-140px | 90-100px |
| Max text width | 1600-1700px | 900-1000px |
| Padding | 80px | 60px |
| Watermark size | 56px | 64px (slightly bigger to stay legible) |
| Watermark margins | top: 44, right: 64 | top: 60, right: 56 |

## Dashboard adaptation (most important)

**Landscape**: Browser chrome (Mac-style), 1400px wide, side-by-side layout (invoice preview LEFT, extracted fields RIGHT).

**Portrait**: Phone-app UI, 980px wide, single-column stack:
1. Status bar (time, signal, battery)
2. App header (brand icon + screen name + status pill)
3. Summary card (just total / hero number)
4. Fields list (stacked vertically)
5. Big "success" card at bottom (full-width, the hero moment)

Same content, same data, same timing — just laid out vertically.

## Tile/card scatter adaptation

Landscape: tiles spread across top + bottom edges of frame, ~640px wide.
Portrait: tiles tighter at top + bottom (avoid sides), ~420px wide. Use 7-8 tiles instead of 9-10 (less crowding in narrower frame).

## Anywhere-cycler (chips in circle)

Landscape: radius 500px around center.
Portrait: radius 320-340px around center. Smaller chip padding (20px 30px vs 28px 42px).

## Caption that spans into 2 lines

Landscape: "Watch your books write themselves." — fits on one line.
Portrait: break to two lines:
- Line 1: "Watch your books"
- Line 2: "write themselves." (gradient)

## Sequence durations stay identical

The whole point is: **same video, two aspect ratios**. Music sync stays intact. Don't shift Sequence timing between landscape and portrait — just change layout inside each scene.

## Common bugs

- **Text overflowing** — drop font 20-30%, narrow max-width
- **Tiles obscuring center text** — fewer tiles, push them to edges (xPct < 20 or > 80)
- **Dashboard too wide** — go to phone-app UI instead of trying to shrink browser chrome
- **Hero text breaks awkwardly** — manually split into multiple `<div>` lines, don't rely on flexbox wrap
