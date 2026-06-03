# Example: Beeny Showstopper

This is the original reference build the skill was extracted from. A 24-second product video for **beeny.ai**, an AI accounting assistant for Indian MSMEs that posts WhatsApp/email invoices to BUSY/Tally/Zoho.

## What it demonstrates

| Skill primitive/template | How beeny uses it |
|---|---|
| `ThumbnailCard` (with `animated`) | 2s cover: amber "b." + "beeny ai" gradient + "Forget manual invoice entry." → flies to top-right watermark |
| `HookScene` | "Stop typing invoices into BUSY." with red BUSY SVG logo for the last word |
| `BrandRevealScene` | "Meet beeny.ai" with glass pill expanding into gradient wordmark |
| `InputSourcesScene` | WhatsApp tiles → Email tiles (8-9 scattered per sub-scene) |
| `AnywhereCyclerScene` | Format chips (WhatsApp, Email, PDF, JPG, Photo, Web) spin in circle, collapse into "anywhere." |
| `ProductDashboardScene` | Browser chrome (1920×1080) / Phone-app UI (1080×1920) with 5-field reveal + "Posted to BUSY · 8s ✓" badge |
| `SolutionScene` | "Beeny uploads your invoices into Busy." (planned) |
| `StatementScene` | "Accounting at WhatsApp speed." with speed-blur trail on "WhatsApp" |
| `OutroScene` | Typewriter "b." + gradient "beeny ai" + "BUILT FOR INDIAN MSMES" tagline |

## Tokens used

```ts
C.brand = "#E8A93C"            // amber
BRAND_GRADIENT = "linear-gradient(90deg, #FFD93D 0%, #F2B33A 50%, #E8804F 100%)"  // sun-glow
FONT.display = Fraunces
FONT.sans = Inter
MUSIC.bpm = 114.45
MUSIC.audioStartFrom = 52
```

## What's special

- **Real BUSY logo SVG** embedded inline mid-sentence (the SlidingSentence's `node` field)
- **Sub-scene crossfades within Scene 3** (WhatsApp → Email → Anywhere, each in their own opacity envelope)
- **Spanning caption** "Watch your books write themselves." that lives on top of the entire dashboard scene (Scene 4)
- **Phone-app UI for mobile dashboard** that's a complete rewrite of the desktop browser dashboard (not just a resized version)

## How to replicate

1. Copy `starter/` from this skill
2. Set `C.brand` + `BRAND_GRADIENT` tokens
3. Drop `busy.svg` (or your equivalent logo) in `public/`
4. Use `HookScene` + `InputSourcesScene` + `ProductDashboardScene` + `StatementScene` + `OutroScene`
5. Sequence with the durations from `prompts/storyboard-template.md` Beeny example
6. Tune copy + timing

Full reference code is in the original `beeny-video/` project.
