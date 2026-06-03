# Brand Tokens Quickstart (5 min)

Customize `starter/src/primitives/tokens.ts` — that's it. Everything in the skill reads from there.

## Step 1: Set the brand color palette

In `tokens.ts`, update the `C` object:

```ts
export const C = {
  bg: "#YOUR_PAGE_BG",         // Usually a warm/light or dark neutral
  card: "#FFFFFF",             // Surface for cards
  ink: "#YOUR_TEXT_DARK",      // Primary text — high contrast
  inkSoft: "#YOUR_TEXT_MUTED", // Secondary text — labels, taglines
  brand: "#YOUR_BRAND_HEX",    // Primary brand accent (watermark, badges)
  brandSoft: "#LIGHTER_TINT",  // ~30% opacity version
  brandLine: "#MID_TINT",      // Borders / dividers
  success: "#GREEN",
  danger: "#RED",
};
```

## Step 2: Set the brand gradient

The single most important visual decision. This goes on payoff words.

```ts
export const BRAND_GRADIENT =
  "linear-gradient(90deg, #COLOR_1 0%, #COLOR_2 50%, #COLOR_3 100%)";
```

**Recipes** that tend to look good:
- **Sun-glow**: `#FFD93D → #F2B33A → #E8804F` (yellow → gold → warm tip)
- **Sunset**: `#FF6B6B → #FF8E53 → #FFC857` (coral → orange → yellow)
- **Cyber**: `#9B5DE5 → #F15BB5 → #FEE440` (purple → pink → yellow)
- **Ocean**: `#00BBF9 → #00F5D4 → #C8FFE0` (cyan → teal → mint)
- **Mono-warm**: `#FFE066 → #E8A93C → #D8763C` (all golds, most editorial)

**Pick by feel**: sun-glow = approachable warm brand, cyber = tech/edgy, ocean = SaaS/clean.

## Step 3: Set fonts

```ts
export const FONT = {
  display: `${fraunces}, Georgia, serif`,        // Hero text — pick a display serif or chunky sans
  sans: `${inter}, sans-serif`,                  // Body / dashboard UI
  sansAlt: `${montserrat}, sans-serif`,          // Alternative bold sans
  mono: "ui-monospace, 'JetBrains Mono', monospace",  // Code-style labels
};
```

Swap in any [@remotion/google-fonts](https://www.remotion.dev/docs/google-fonts) package — Inter, Fraunces, Montserrat, Manrope, Outfit, Geist all work.

## Step 4: Set music BPM

```ts
export const MUSIC = {
  bpm: 120,             // ← match your track
  audioStartFrom: 52,   // ← frames to trim silent intro (see music-sync.md)
  audioVolume: 0.75,
};
```

## Step 5: Set a project total

In `starter/src/Root.tsx`:

```ts
const TOTAL_FRAMES = 660; // 22 seconds @ 30fps
```

This must equal the sum of all your scene Sequence durations.

## That's it

Run `npm start` to preview. Every scene template uses these tokens — so changing them recolors and refonts the entire video instantly.
