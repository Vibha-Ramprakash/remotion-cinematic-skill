# Motion Language

Standards for everything that moves. Consistency = polish.

## Spring presets (from `tokens.ts → MOTION.spring`)

| Use case | Damping | Stiffness | Feel |
|---|---|---|---|
| Hero word entries | 14-16 | 130-150 | Snappy, confident |
| Card / container entries | 18-22 | 80-100 | Gentle settle |
| Stamps / pops (badges, accents) | 8-10 | 180-200 | Bouncy, attention-grabbing |
| Final landings (after motion stops) | 22 | 70 | Slow settle |

```ts
spring({ frame: frame - startFrame, fps, config: MOTION.spring.snappy })
```

## Easings

| Easing | When |
|---|---|
| `MOTION.cinematic` = `Easing.bezier(0.65, 0, 0.35, 1)` | Most "filmic" moves — pans, scales, drifts |
| `Easing.in(Easing.cubic)` | Exits accelerating off-screen |
| `Easing.out(Easing.cubic)` | Slow-in entrances (less common, springs preferred) |

## Always-true rules

1. **Always pass `extrapolateLeft: "clamp", extrapolateRight: "clamp"`** to `interpolate()` — prevents values racing past their range when scrubbing/seeking.
2. **Word-by-word stagger: 10-15 frames** between words. Less = unreadable jumble. More = drags.
3. **Animate `transform` + `opacity` only** — not `width`/`height`/`top`/`left`. GPU-accelerated, smooth at 30/60fps.
4. **8-frame opacity crossfade at scene boundaries** — never let the dark root background flash through.
5. **Spring entries, easing exits** — springs feel alive coming in, deterministic easings feel cinematic going out.

## Scene boundary formula

```
Scene N ends at frame X.
Scene N+1's Sequence starts at frame X - 8 (8-frame overlap).
Scene N has internal opacity fade from frame X-8 to X.
Scene N+1 has internal opacity fade from 0 to 8.
```

## Anti-patterns (don't)

- ❌ Linear interpolation on hero entries (looks robotic)
- ❌ Multiple springs on the same element (compounds messily — chain via internal `dissolve` progress instead)
- ❌ `position: absolute` shifting via `top`/`left` (use `transform: translate()`)
- ❌ Black flash at scene cuts (you forgot the 8f crossfade)
- ❌ All words entering simultaneously (no stagger = no narrative)
