# Remotion Cinematic Product Video — Claude Code Skill

> Build premium, kinetic product videos like Teamble, zelios, Linear, Notion's launch videos — but for **your** brand, in code, in an afternoon.

A complete Claude Code skill that scaffolds a Remotion project with battle-tested motion-graphics primitives, narrative scene templates, and a problem→solution→payoff video arc. Outputs MP4 in 16:9 + 9:16 (mobile-first social) **plus thumbnail PNGs** ready for Instagram / LinkedIn / YouTube / WhatsApp upload.

![demo gif placeholder — drop a 6-second loop of your output here]

---

## Table of Contents

1. [What you get](#what-you-get)
2. [Why use this](#why-use-this)
3. [Install](#install)
4. [The full experience (workflow)](#the-full-experience-workflow)
5. [What's inside](#whats-inside)
6. [Customization (5-minute path)](#customization-5-minute-path)
7. [Rendering](#rendering)
8. [Caveats & limitations](#caveats--limitations)
9. [Troubleshooting](#troubleshooting)
10. [Examples](#examples)
11. [Roadmap](#roadmap)
12. [Contributing](#contributing)
13. [Credits & License](#credits--license)

---

## What you get

### 🎬 8 reusable scene templates
Pre-built narrative beats that follow the **problem → solution → payoff** arc:

| Template | What it does | Typical duration |
|---|---|---|
| `HookScene` | Painpoint declaration with sliding camera + zoom-blur exit | 4s |
| `BrandRevealScene` | Glass pill types your brand name → dissolves into giant wordmark | 3-4s |
| `InputSourcesScene` | Scattered notification tiles (WhatsApp/email/Slack/etc.) + sliding headline | 1.5-2s each |
| `AnywhereCyclerScene` | Format chips spin in a circle, collapse into the payoff word "anywhere." | 2.5-3s |
| `ProductDashboardScene` | Browser/phone UI with field-by-field reveal + status badge with counter | 4-5s |
| `SolutionScene` | "Brand does Y" declarative — mirror of HookScene | 3-4s |
| `StatementScene` | Word-by-word emotional payoff with speed-blur trail on key word | 2.5s |
| `OutroScene` | Typewriter brand initial + gradient wordmark + tagline | 3s |

### ⚙️ 10 motion primitives
The building blocks behind the scenes. All token-driven, all reusable independently:

- **FluidGradientBg** — noise-driven living backgrounds (4 palette variants)
- **SlidingSentence** — word-by-word camera-centering text reveal
- **GradientWord** — brand-gradient payoff word treatment
- **TypingText** — typewriter with optional cursor
- **GlassCard** — glassmorphism container
- **CaptionBg** — soft corner blob backdrop
- **NotificationTile** + **ScatteredTiles** — message tile mosaic system
- **Watermark** — persistent corner brand mark (text initial or logo PNG/SVG)
- **ThumbnailCard** — cover frame with staggered entry + fly-to-watermark exit
- **Color/Font/Motion tokens** — change once, recolors entire video

### 📐 7 reference docs
Pattern guides Claude consults when making decisions (and you can read directly):

- **motion-language.md** — spring configs, easing curves, timing standards
- **scene-arc-structure.md** — narrative templates and pacing rules
- **music-sync.md** — BPM → frame math, scene cuts on bars
- **9-16-adaptation.md** — how to make portrait versions
- **thumbnail-design.md** — the no-black-flash cover frame rules
- **brand-tokens-quickstart.md** — 5-minute brand customization
- **dashboard-ui-recipes.md** — browser chrome vs phone-app UI patterns

### 📋 2 prompts
- **intake-template.md** — 5-round brand/product questionnaire
- **storyboard-template.md** — fillable scene table with Beeny example

### 🎁 Plus
- **Starter Remotion project** (all 5 packages pinned, Composition registry pre-wired)
- **Render scripts** — `npm run all` outputs MP4 + PNG for every composition
- **Standalone PNG thumbnails** via `<Still>` compositions for explicit upload covers
- **Real-world example** — the [Beeny showstopper](./examples/beeny-showstopper/) this skill was extracted from

---

## Why use this

### ✅ Use this if you want to...
- Make a polished product video that doesn't look AI-generated
- Reuse one set of source files for 16:9 + 9:16 + thumbnails (no After Effects re-export hell)
- Iterate on copy/timing in seconds (it's code — change a number, refresh studio)
- Build something a designer would approve of
- Hand it to a developer (or Claude) and have it just work

### ❌ Don't use this if you want to...
- Edit existing video footage (this is *generative* motion graphics, not video editing)
- Avoid all code (the starter is dead-simple but you still need `npm` and a terminal)
- Make a slideshow with text overlays (overkill — use Canva)
- Stock-footage-driven content (no built-in stock footage workflows)

---

## Install

### Prerequisites
- Node.js 18+
- ~500MB disk space for `node_modules`
- macOS / Linux / Windows (Remotion renders identically on all)

### Option 1: Use as a Claude Code skill (recommended)

```bash
# Clone to your Claude Code skills folder
git clone https://github.com/YOUR_USERNAME/remotion-cinematic-skill \
  ~/.claude/skills/remotion-cinematic-product-video
```

Then in any Claude Code session, say:
> *"Make me a cinematic product video for [your brand]"*

The skill activates automatically. Claude runs the intake → storyboard → scaffold → compose → iterate flow.

### Option 2: Use the starter directly (no Claude required)

```bash
git clone https://github.com/YOUR_USERNAME/remotion-cinematic-skill
cp -r remotion-cinematic-skill/starter my-video
cd my-video
npm install
npm start    # → http://localhost:3000
```

Then customize `src/primitives/tokens.ts` (see [Customization](#customization-5-minute-path)) and copy scenes from `../scene-templates/` into `src/scenes/`.

---

## The full experience (workflow)

Here's exactly what happens when you build a video with this skill, end-to-end:

### Step 1: Intake (~5 min)
Claude asks you 12-15 questions across 5 rounds:
- Brand name, tagline, product description, target audience
- Primary brand color, gradient direction, font preference, tone
- Video length, aspect ratios needed, music BPM
- The hook (what pain you're naming), the payoff (what magic you're showing)
- Confirms your answers before doing anything

→ See [`prompts/intake-template.md`](./prompts/intake-template.md)

### Step 2: Storyboard (~5 min)
Claude generates a table like this, you tweak copy + durations, sign off:

| # | Scene | Time | Copy |
|---|---|---|---|
| 0 | Thumbnail | 0–2s | "[brand] / Forget [pain]." |
| 1 | Hook | 2–6s | "Stop [verb] [thing]." |
| ... | | | |

→ See [`prompts/storyboard-template.md`](./prompts/storyboard-template.md)

### Step 3: Scaffold (~30 sec)
Claude:
- Copies `starter/` into your project folder
- Customizes `src/primitives/tokens.ts` with your colors/fonts/BPM
- Updates `src/Root.tsx` total frame count + Composition registry
- Runs `npm install`

### Step 4: Compose (~15-30 min)
For each scene in the storyboard, Claude:
- Copies the matching template from `scene-templates/` → `src/scenes/`
- Customizes the copy + timing per your storyboard
- Wires into `Main.tsx` / `MainMobile.tsx` with proper Sequence `from` and `durationInFrames`

### Step 5: Iterate (the fun part — ~30 min)
Studio runs at `http://localhost:3000`. Common requests Claude handles in seconds:

- *"Hold longer on X"* → bumps Sequence duration, shifts downstream, updates Root total
- *"Move this to top-right / fly to corner"* → uses the position-interpolate pattern from ThumbnailCard
- *"Make BUSY red"* → swaps the `color` field on that SentencePiece
- *"Add a slash through BUSY"* → wraps logo in a relative span with an absolute strikethrough child
- *"Build the 9:16 version"* → copies scenes, applies the [9-16-adaptation patterns](./references/9-16-adaptation.md)
- *"Custom thumbnail with X visual"* → edits `ThumbnailCard.tsx` content

### Step 6: Render (~3-10 min depending on length)
```bash
npm run all
# → out/video-16x9.mp4
# → out/video-9x16.mp4
# → out/thumb-16x9.png
# → out/thumb-9x16.png
```

Upload to your platforms. Use the standalone PNGs as explicit covers on Instagram Reels / YouTube / LinkedIn.

**Total time, fresh project**: 1.5-2 hours for a polished 22-second 2-aspect video.
**With Claude doing the work**: ~45 min real-time (most of it watching the studio).

---

## What's inside

```
remotion-cinematic-skill/
│
├── SKILL.md                              # Claude's orchestrator
├── README.md                             # This file
├── LICENSE                               # MIT
│
├── starter/                              # The Remotion project you copy
│   ├── package.json                      # All 5 packages pinned to same version
│   ├── remotion.config.ts                # Render config
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                      # Remotion entry
│       ├── Root.tsx                      # Composition registry — UPDATE TOTAL_FRAMES per project
│       ├── Main.tsx                      # 16:9 composition scaffold
│       ├── MainMobile.tsx                # 9:16 composition scaffold
│       └── primitives/
│           ├── tokens.ts                 # ⭐ THE FILE — colors, fonts, motion, music
│           └── index.tsx                 # All 10 primitives, exported
│
├── scene-templates/                      # Copy into starter/src/scenes/ as needed
│   ├── HookScene.tsx                     # Painpoint hook with sliding camera
│   ├── BrandRevealScene.tsx              # Glass pill → wordmark reveal
│   ├── InputSourcesScene.tsx             # Scattered tiles + sliding headline
│   ├── AnywhereCyclerScene.tsx           # Chips spin in circle → collapse
│   ├── ProductDashboardScene.tsx         # Browser/phone UI with field reveals
│   ├── SolutionScene.tsx                 # "X solves Y" declarative
│   ├── StatementScene.tsx                # Emotional payoff with speed-blur
│   └── OutroScene.tsx                    # Typewriter logo + tagline
│
├── references/                           # Pattern docs (Claude reads these)
│   ├── motion-language.md
│   ├── scene-arc-structure.md
│   ├── music-sync.md
│   ├── 9-16-adaptation.md
│   ├── thumbnail-design.md
│   ├── brand-tokens-quickstart.md
│   └── dashboard-ui-recipes.md
│
├── prompts/
│   ├── intake-template.md                # 5-round questionnaire
│   └── storyboard-template.md            # Fillable storyboard table
│
└── examples/
    └── beeny-showstopper/                # Real reference build (links to source)
        └── README.md
```

---

## Customization (5-minute path)

Edit one file: `starter/src/primitives/tokens.ts`. Everything in the skill reads from here.

```ts
// 1. Brand color palette
export const C = {
  brand: "#YOUR_BRAND_HEX",
  ink: "#YOUR_TEXT_DARK",
  // ... etc
};

// 2. The brand gradient (used on payoff words)
export const BRAND_GRADIENT =
  "linear-gradient(90deg, #COLOR_1 0%, #COLOR_2 50%, #COLOR_3 100%)";

// 3. Fonts (Google Fonts via @remotion/google-fonts)
export const FONT = {
  display: `${fraunces}, serif`,   // hero text
  sans: `${inter}, sans-serif`,    // body / kinetic
  mono: "...",                     // labels
};

// 4. Music BPM
export const MUSIC = {
  bpm: 120,
  audioStartFrom: 0,
  audioVolume: 0.75,
};
```

Five recommended gradient recipes:
- **Sun-glow**: `#FFD93D → #F2B33A → #E8804F` (warm, approachable)
- **Sunset**: `#FF6B6B → #FF8E53 → #FFC857` (coral → orange → yellow)
- **Cyber**: `#9B5DE5 → #F15BB5 → #FEE440` (purple → pink → yellow, edgy)
- **Ocean**: `#00BBF9 → #00F5D4 → #C8FFE0` (cyan → teal → mint, clean SaaS)
- **Mono-warm**: `#FFE066 → #E8A93C → #D8763C` (all golds, editorial)

→ Full guide in [`references/brand-tokens-quickstart.md`](./references/brand-tokens-quickstart.md)

---

## Rendering

The starter's `package.json` ships with these npm scripts:

```bash
npm start              # Open Remotion Studio at localhost:3000
npm run render         # → out/video-16x9.mp4
npm run render:mobile  # → out/video-9x16.mp4
npm run thumbs         # → out/thumb-16x9.png + out/thumb-9x16.png
npm run all            # All four (MP4 ×2 + PNG ×2)
```

Rendering times (M-series Mac, 30fps, default concurrency 4):
- 22s video at 1920×1080: ~3-4 min
- 22s video at 1080×1920: ~3-4 min
- PNG still: ~1-2 sec

For long videos or batch renders, use the [Remotion Lambda](https://www.remotion.dev/lambda) cloud renderer.

---

## Caveats & limitations

Honest list. Read this before getting frustrated.

### 1. SlidingSentence width estimation is rough
The `SlidingSentence` primitive estimates word widths as `text.length × fontSize × 0.5` to compute the camera pan. This is approximate — it ignores actual character widths, kerning, ligatures, and especially custom node renders (logos, icons).

**Symptom**: a word with a custom `node` (like a brand logo SVG) might not land exactly centered.

**Workaround**: place the slash/strikethrough/overlay *inside* the node itself rather than as a separate absolute element relying on the sentence's center calc. (See how the Beeny example handles the BUSY logo with its slash.)

### 2. Mid-sequence cuts aren't supported by Remotion
You can't "skip" frames 30-50 of a Sequence and play 0-29 then 51+. The Sequence renders contiguously from frame 0.

**Workaround**: to cut "dead time" inside a scene, shorten the Sequence's `durationInFrames` (which clips the tail). If you really need a mid-cut, split the scene into two Sequences and lose 8-15 frames to a crossfade.

### 3. WhatsApp/Telegram auto-thumbnails pick the *middle* frame
Most platforms (Instagram, YouTube, LinkedIn) let you upload an explicit cover image — use the standalone PNGs from `npm run thumbs`. But WhatsApp and Telegram pick the middle frame of the video automatically with no override.

**Workaround**: there is none. Live with it, or design your middle frame to be presentable (which usually means a strong product-demo moment).

### 4. Custom fonts must be loaded via @remotion/google-fonts
Browser-default fonts (`-apple-system`, `Inter`, etc.) may render inconsistently between Remotion Studio (browser preview) and the renderer (headless Chromium). Always load via `@remotion/google-fonts/X` for predictable output.

**Symptom**: text looks like a serif in studio but renders as sans in MP4 (or vice versa).

### 5. Audio sync depends on `startFrom`
If your music track has any silent intro / count-in, scene cuts won't land on bars unless you trim it. Get the right `startFrom` by scrubbing the timeline and watching when the first downbeat hits.

→ See [`references/music-sync.md`](./references/music-sync.md)

### 6. The ThumbnailCard fly-to-watermark exit is fragile if you reposition the watermark
The exit coordinates `(wmCenterX, wmCenterY)` are computed from the watermark's top/right defaults. If you change `Watermark`'s position, also update the thumbnail's target calculations in `ThumbnailCard`.

### 7. Mobile dashboard ≠ resized landscape dashboard
Don't try to use the same dashboard component for both aspects. The browser-chrome wrapper at 1400px just doesn't fit 1080px wide. Build a dedicated phone-app UI variant for portrait.

→ See [`references/dashboard-ui-recipes.md`](./references/dashboard-ui-recipes.md)

### 8. Three.js / 3D scenes are not included
The skill is pure 2D/CSS. If you want 3D product shots, install `@remotion/three` separately. Generally adds significant render time and complexity — usually not worth it for short-form social videos.

### 9. No automatic captions/subtitles (yet)
Accessibility-wise this is the biggest v1.0 gap. Adding subtitles for Reels is on the v1.1 roadmap.

**Workaround**: burn captions in manually using the existing `SlidingSentence` or `Caption` primitives, positioned at the bottom of frame.

### 10. Brand gradient is hardcoded in some scenes
A few scene templates (StatementScene, OutroScene) have brand gradient stops inline. If you change `BRAND_GRADIENT` in `tokens.ts`, you may need to grep for the original hex codes and replace them in the scene files too. v1.1 will refactor everything to read from the token.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Studio shows "ReferenceError: X is not defined" | You renamed something in tokens.ts but missed an import in a scene. Check the studio error trace — it points to the file:line. |
| Render is super slow | Lower concurrency in `remotion.config.ts` (try 2). Or check if you accidentally imported Three.js (it adds 5-10x render time). |
| Text looks blocky / serif when expected sans | Font isn't loaded. Use `@remotion/google-fonts/X` explicitly, don't rely on system font stacks alone. |
| Black flash between scenes | Missing 8-frame opacity crossfade. Each scene needs internal `fadeIn` / `fadeOut` interpolates. |
| Mobile composition shows landscape layout | The scene component isn't reading `useVideoConfig()`. Add the branch: `const { width, height } = useVideoConfig(); const isPortrait = height > width;` |
| Audio out of sync with scene cuts | Wrong `startFrom` value. Scrub to first downbeat, set `startFrom` to that frame. |
| Thumbnail PNG is blank | The `<Still>` composition's component requires no `useCurrentFrame` calls that error at frame 0. Make sure `animated={false}` for Still mode. |
| `npm install` errors on M1/M2/M3 Mac | Update Node to 20+. Some older Remotion deps had M-series issues at 18. |

---

## Examples

### Beeny Showstopper
The reference build this skill was extracted from. 24-second product video for an Indian AI accounting assistant. Demonstrates: BUSY logo SVG embedded mid-sentence, phone-app UI for mobile, spanning caption pattern, sun-glow gradient.

→ [`examples/beeny-showstopper/README.md`](./examples/beeny-showstopper/README.md)

### Coming in v1.1
- Generic SaaS dashboard (cyber palette, code-screenshot scenes)
- Consumer fashion/lifestyle brand (sunset palette, lookbook-style scenes)
- Fintech (ocean palette, animated charts via `@remotion/shapes`)

---

## Roadmap

### v1.0 (current) ✅
- 10 primitives (FluidGradientBg, SlidingSentence, GradientWord, TypingText, GlassCard, CaptionBg, NotificationTile, ScatteredTiles, Watermark, ThumbnailCard)
- 8 scene templates
- 7 reference docs
- Intake + storyboard prompts
- 1 example (Beeny)
- Starter project with render scripts
- MIT license, GitHub-ready

### v1.1 (next)
- 2-3 additional brand examples (SaaS, consumer, fintech)
- Caption/subtitle generator for accessibility
- Brand-gradient extraction from token (no more hardcoded hex in scene files)
- More tile templates (Slack, Discord, SMS, generic)
- BrowserChrome and PhoneChrome as standalone primitives (currently inlined in scene templates)

### v1.2
- Color palette extractor (paste a logo PNG → get tokens.ts)
- AI hook generator (paste product description → 5 hook variations)
- Music BPM detector (drop a track → get bpm + startFrom)
- Stock music library suggestions (royalty-free tracks by BPM/vibe)

### v2.0
- `npx create-cinematic-video` CLI scaffolder (no Claude needed)
- `@vibha/remotion-cinematic` npm package — primitives publishable separately
- Lambda render preset config

### Wishlist
- AfterEffects-style timeline GUI for non-coders
- Pre-built music library bundled with the skill
- Caption translation (auto-localize copy to 5+ languages)

---

## Contributing

Pull requests welcome. The skill is structured so you can contribute:
- **New scene templates** — drop a `.tsx` file in `scene-templates/`, document the pattern in the file header
- **New primitives** — add to `starter/src/primitives/index.tsx`, export, update SKILL.md file map
- **New examples** — add a folder under `examples/[brand-name]/` with a README explaining what it demonstrates
- **Better reference docs** — patterns that confused you that aren't covered? Open a PR or issue.

Code style: TypeScript strict mode, React function components, Remotion 4.0+ APIs, no class components.

---

## Credits & License

**Built by** [@vibha.in.progress](https://instagram.com/vibha.in.progress) for the heyfixit.ai content stack.

**Motion language inspired by:** Teamble AI's product demos, zelios' landing page videos, Linear's launch videos, Notion's product launches, Aesop's brand films, YCloud's product walkthroughs.

**Built with:**
- [Remotion](https://www.remotion.dev/) — programmatic video framework
- [@remotion/google-fonts](https://www.remotion.dev/docs/google-fonts) — Inter, Fraunces, Montserrat
- [@remotion/noise](https://www.remotion.dev/noise) — fluid gradient backgrounds
- [@remotion/transitions](https://www.remotion.dev/transitions), [@remotion/shapes](https://www.remotion.dev/shapes), [@remotion/paths](https://www.remotion.dev/paths) — utility packages

**License:** MIT — use commercially, fork freely. Attribution appreciated, not required.

---

⭐ **If this helped you ship a video that landed**, star the repo and tag [@vibha.in.progress](https://instagram.com/vibha.in.progress) on the post. Always love seeing what people build.

## Edit videos with Claude: the Hop Studio family

**[Hop Studio, the AI video editor that lives inside Claude](https://vibha.is/ai-video-studio?source=remotion-cinematic-skill-repo)**: 220+ video effects, 47 caption styles, 190+ sound effects and creator-style templates for Instagram Reels, TikTok and YouTube Shorts, in one plugin. One payment, live setup with me.

Free tools:
- **[51 free video effects for Claude](https://github.com/Vibha-Ramprakash/claude-video-effects)**: orbit, spotlight, glass widgets and more. Type `/effects orbit`
- **[7 free caption styles for Claude](https://github.com/Vibha-Ramprakash/claude-caption-styles)**: animated captions timed to your voice. Type `/captions pop-sticker`
- **[7 motion style prompts for Claude Code](https://github.com/Vibha-Ramprakash/claude-motion-styles)**: copy-paste starters for motion graphics
- **[The Claude video editor setup](https://github.com/Vibha-Ramprakash/claude-video-editor-setup)**: the exact 7 steps and 4 prompts
- **[Free masterclass guide](https://github.com/Vibha-Ramprakash/masterclass)**: edit your videos with Claude, step by step
- **[Fable 5.2 video editing prompts](https://github.com/Vibha-Ramprakash/fable-video-editing-guide)**: the 4 prompts from the reel
- **[Free video editing masterclass](https://vibha.is/free-masterclass?source=remotion-cinematic-skill-repo)**: set up your editing studio in Claude with me

New effects every week on Instagram: [@vibha.in.progress](https://instagram.com/vibha.in.progress)
