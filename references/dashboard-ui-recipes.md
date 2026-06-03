# Dashboard UI Recipes

Patterns for product UI mockups inside scenes.

## Recipe 1: Browser chrome (landscape default)

The "Mac browser window" look. Use for desktop products.

```
┌─────────────────────────────────────────────┐
│ ● ● ●   [url bar with brand domain]         │  ← 52px chrome
├─────────────────────────────────────────────┤
│                                             │
│  [Invoice preview]     [Extracted fields]   │  ← side-by-side body
│  vendor, line items     field → value rows  │
│  total                  with amber glow     │
│                                             │
│                        [Green status badge] │  ← Posted to X · counter
└─────────────────────────────────────────────┘
```

Width: 1400px. Border-radius: 24. Shadow: `0 50px 100px -20px rgba(40,28,8,0.25)`.

## Recipe 2: Phone-app UI (portrait default)

The "iOS app screen" look. Use for mobile-first products.

```
┌─────────────────┐
│ 9:41    ●●●● 📶 │  ← status bar
├─────────────────┤
│ [b.] Inbox  NEW │  ← app header
│      SA-2049    │
├─────────────────┤
│ INVOICE TOTAL   │  ← summary card
│ ₹42,500    [📄] │
├─────────────────┤
│ VENDOR    Acme  │
│ INVOICE   #2049 │  ← stacked fields
│ AMOUNT    ₹42K  │
│ TAX       18%   │
│ STATUS  Verified│
├─────────────────┤
│ ✓ Posted   8s   │  ← big bottom card
│ Synced to BUSY  │
└─────────────────┘
```

Width: 980px. Border-radius: 36 (chunkier for phone). Same shadow.

NO black border around the phone — that reads as awkward bezel. Just shadow + rounded corners.

## Field reveal animation

For both recipes:

```tsx
const en = spring({ frame: frame - field.start, fps, config: { damping: 16, stiffness: 150 }});
const opacity = interpolate(en, [0, 1], [0, 1]);
const translateX = interpolate(en, [0, 1], [16, 0]);
// Amber border pulse — peaks at field.start + 18, fades by field.start + 30
const glow = interpolate(frame, [field.start + 2, field.start + 18, field.start + 30], [0, 1, 0], ...);

<div style={{
  opacity,
  transform: `translateX(${translateX}px)`,
  border: `2px solid rgba(232, 169, 60, ${glow})`,
}}>
```

Stagger fields by 10 frames each.

## Status badge with counter

The hero moment. Pops in with bouncy spring, big number counter ticks down.

```tsx
const badgePop = spring({ frame: frame - 70, fps, config: { damping: 9, stiffness: 180 }});
const counterT = interpolate(frame, [78, 102], [0, 1], { ...easing: cinematic });
const seconds = Math.max(0, Math.round(8 * (1 - counterT)));
```

Green gradient bg `linear-gradient(135deg, #2F7D4F 0%, #1E5C38 100%)`. White checkmark in a tinted circle. Big seconds counter on the right.

## Card entry motion (the "flip up" effect)

The dashboard should land like an iPhone screenshot floating in:

```tsx
const enter = spring({ frame: frame - 2, fps, config: { damping: 18, stiffness: 80 }});
const enterY = interpolate(enter, [0, 1], [500, 0]);        // from below
const enterTilt = interpolate(enter, [0, 1], [70, 4]);      // tilted → almost flat
const enterScale = interpolate(enter, [0, 1], [0.78, 1]);

transform: `translateY(${enterY}px) scale(${enterScale}) rotateX(${enterTilt}deg)`
```

With `perspective: 2400` on the parent.

## Card exit motion (zoom toward camera)

The dashboard zooms past:

```tsx
const exitT = interpolate(frame, [101, 134], [0, 1], { easing: Easing.in(Easing.cubic) });
const exitScale = interpolate(exitT, [0, 1], [1, 4.2]);
const exitOpacity = interpolate(exitT, [0, 0.55, 1], [1, 0.6, 0]);
const exitBlur = interpolate(exitT, [0, 1], [0, 12]);
```

Combine entry + exit in the same transform:
```tsx
transform: `translateY(${enterY + exitY}px) scale(${enterScale * exitScale}) rotateX(${enterTilt}deg)`
filter: `blur(${exitBlur}px)`
opacity: exitOpacity
```
