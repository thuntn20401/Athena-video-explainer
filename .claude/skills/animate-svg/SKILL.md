---
name: animate-svg
description: Animate an SVG asset in a Remotion scene — decision tree + per-type workflow
---

Animate the SVG file: $ARGUMENTS

## Step 0 — Read the SVG first

Read the SVG file (even if truncated). Determine type:

- **Stroke-only** (`stroke` attributes, no/minimal `fill`, few paths, usually <5 KB) → go to Path A
- **Filled illustration** (complex paths, `fill` colors, multiple `<g>` groups, >5 KB) → go to Path B

---

## Path A — Stroke-only: strokeDashoffset draw-on

1. Inline the SVG markup directly into the component JSX.
2. For each `<path>` or `<polyline>`:
   - Add `ref` → measure `getTotalLength()` in a `useEffect` or hardcode a safe large value (e.g. `2000`)
   - Set `strokeDasharray={totalLength}` and animate `strokeDashoffset`:
     ```ts
     const progress = interpolate(frame, [startFrame, endFrame], [1, 0], { extrapolateRight: "clamp" });
     strokeDashoffset = totalLength * progress
     ```
3. Stagger paths 5–6 frames apart.
4. After draw-on, apply emphasis: `scale` spring 0.8→1 with `#FF8300` accent element.

---

## Path B — Filled illustration: decide entrance vs internal animation

### B1 — Entrance only (no per-group animation needed)

Use `<Img>` with spring scale + interpolate opacity:
```tsx
import { Img, staticFile, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const { fps } = useVideoConfig();
const frame = useCurrentFrame();
const scale = spring({ fps, frame, from: 0.8, to: 1, durationInFrames: 20 });
const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

<Img src={staticFile("assets/filename.svg")} style={{ transform: `scale(${scale})`, opacity, width: 400 }} />
```

### B2 — Internal per-group animation (gears, bars, dots, etc.)

Steps:
1. **Extract groups**: Read the SVG. Identify animated groups by `id` or visual role.
   - Copy each group's inner content (everything inside `<g id="...">`) as a string constant.
2. **Create component** `src/components/[Name]Illustration.tsx`:
   ```tsx
   const GROUP_GEAR = `...raw SVG group content...`;
   const GROUP_BARS = `...`;

   export const [Name]Illustration: React.FC<{ width?: number }> = ({ width = 400 }) => {
     const frame = useCurrentFrame();
     const { fps } = useVideoConfig();
     // compute transforms per frame
     const gearAngle = (frame / fps) * 360 * 0.5; // 0.5 rotations/sec
     return (
       <svg viewBox="0 0 500 500" width={width} height={width}>
         {/* Static background groups */}
         <g dangerouslySetInnerHTML={{ __html: GROUP_BG }} />
         {/* Animated gear */}
         <g transform={`rotate(${gearAngle}, 250, 250)`}
            dangerouslySetInnerHTML={{ __html: GROUP_GEAR }} />
         {/* Bar chart growing from bottom */}
         <g dangerouslySetInnerHTML={{ __html: GROUP_BARS }}
            style={{ transform: `scaleY(${interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })})`,
                     transformOrigin: "bottom" }} />
       </svg>
     );
   };
   ```
3. **Animation recipes** (use `useCurrentFrame()` + `fps` for all):
   - **Rotate (gears)**: `rotate(angle, cx, cy)` — mesh gears: one CW, neighbors CCW, ratio = teeth count
   - **Grow bars**: `scaleY` from 0→1 with `transformOrigin: "bottom center"`, stagger each bar 5f
   - **Pulse (circles/blobs)**: `r * (1 + 0.05 * Math.sin(frame * 0.2))`
   - **Float (characters)**: `translateY(Math.sin(frame * 0.08) * 8)`
   - **Fade glow**: `opacity` via `Math.abs(Math.sin(frame * 0.1))`
   - **Entrance spring**: wrap whole component in scale spring 0.8→1 durationInFrames=20

4. **Register & use** in `SceneXX.tsx`:
   ```tsx
   import { [Name]Illustration } from "../components/[Name]Illustration";
   <[Name]Illustration width={400} />
   ```

---

## Rules for all paths

- NEVER use CSS transition or CSS animation — always `useCurrentFrame()` + `interpolate()` / `spring()`
- Brand accent: `#FF8300` for emphasis elements
- Stagger: 5–6 frames between element entrances
- Font: Nunito via `@remotion/google-fonts` (not in SVG, only for text overlays)
- After coding: run `npx tsc --noEmit --skipLibCheck` and fix all errors

## Output

Report:
- SVG type detected (stroke-only / filled-entrance / filled-internal)
- Animation groups and their effect
- Component file created (if Path B2)
- Frame timing for each animation layer
