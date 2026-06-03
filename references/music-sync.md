# Music Sync

Aligning scene cuts to musical bars makes a video feel like it was *cut to* the music, not laid over it.

## Frame math (30fps)

```
Frames per bar = (60 / BPM) × 4 beats × 30fps
Frames per phrase = Frames per bar × 4 bars
```

| BPM | Frames per bar | Frames per phrase | Vibe |
|---|---|---|---|
| 90 | 80 | 320 | Calm, deliberate |
| 110 | 65 | 261 | Comfortable, mid-energy |
| 120 | 60 | 240 | Energetic standard |
| 128 | 56 | 225 | Dance/upbeat |
| 140 | 51 | 206 | Driving, aggressive |

The skill exports `FRAMES_PER_BAR` and `FRAMES_PER_PHRASE` from `tokens.ts` based on your set BPM.

## Trimming silent intro

Most tracks have 1-3 seconds of dead air or a count-in before the first downbeat. Use `Audio startFrom` to trim so the first downbeat = video frame 0.

```tsx
<Audio
  src={staticFile("track.mp3")}
  startFrom={52}  // trim 52 frames = 1.73s
/>
```

How to find the right `startFrom`:
1. Drop track in `public/`
2. Add `<Audio>` at root with `startFrom={0}`
3. Scrub Remotion timeline, find frame where first downbeat hits
4. Set `startFrom` to that frame

## Snap scene cuts to bars

Identify bar boundaries: 0, `FRAMES_PER_BAR`, `2×FRAMES_PER_BAR`, etc.

Place scene Sequences so their `from + durationInFrames` lands on (or within 4-6 frames of) a bar boundary. The 4-6 frame tolerance is masked by the 8-frame scene crossfade.

## Phrase-level cuts (bigger transitions)

For major narrative shifts (problem→solution, demo→payoff), cut on **phrase** boundaries (every 4 bars). The audience feels these as natural breath points.

## What "music-aware" doesn't mean

- ❌ Animating to every kick drum — over-cutting, distracting
- ❌ Synchronizing word reveals to lyrics — too fiddly, breaks if music changes
- ✅ Major scene cuts on bars
- ✅ Word stagger feels rhythmic at the chosen BPM (~2-3 words per bar)
