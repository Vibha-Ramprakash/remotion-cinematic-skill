# Thumbnail Design

The cover frame — what people see before they tap play.

## Critical rule: NO whole-page fade in

If the page starts at `opacity: 0` and fades to 1, the **first frame is black** — and platforms auto-pick the first frame as the thumbnail. Result: empty black square in WhatsApp/iMessage previews.

✅ **DO**: bg fully visible at frame 0, only fade in individual elements (b., wordmark, hook, tagline) with staggered springs.

❌ **DON'T**: wrap the whole `<AbsoluteFill>` in an opacity interpolate.

## The composition

| Element | Position | Size (landscape / portrait) |
|---|---|---|
| Brand initial (big "b." or logo) | Centered, upper third | 220px / 180px |
| Brand wordmark (gradient) | Centered, middle | 120px / 96px |
| Hook headline (black) | Centered, lower third | 68px / 56px |
| Tagline (small mono caps) | Bottom margin | 24px / 20px |

## The transition (in-video usage)

When the thumbnail is the first ~2s of the video, it should *transform* into Scene 1 instead of cutting:

1. **Staggered entry** (0-25f): b. → wordmark → hook each spring in
2. **Hold** (25-49f): all elements readable
3. **Choreographed exit** (49-59f):
   - **b. flies to top-right corner**, scaling down to watermark size — becomes the actual watermark seamlessly
   - **wordmark collapses upward** into the b., fading
   - **hook zooms toward camera** (scale 1 → 1.8) and fades
4. **Watermark Sequence starts at frame ~T** — the b. is now "already there" as the persistent watermark

## Static (PNG) version

For Instagram/YouTube/LinkedIn where you upload a separate cover, register a `<Still>` composition with `animated={false}`. The card renders in a clean static layout (no exit motion).

```tsx
<Still id="Thumb16x9" component={ThumbnailCard} width={1920} height={1080} />
<Still id="Thumb9x16" component={ThumbnailCard} width={1080} height={1920} />
```

Render with: `npx remotion still Thumb16x9 out/thumb-16x9.png`

## Color discipline

- Brand gradient on the **wordmark only** (it's the brand mark, deserves the color)
- Hook headline in solid black/ink (deference + readability)
- Tagline in muted secondary text color
- BG: bright/warm radial-gradient palette matching the brand

Tagline + hook in plain text + only the wordmark in gradient = clear hierarchy, single payoff color.
