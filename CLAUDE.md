# Athena Training Videos

## Stack
- Remotion 4.x + TypeScript + React
- Google Fonts via @remotion/google-fonts (NOT local font files)
- Run dev: npm run dev
- Render: npx remotion render src/Root.tsx [SceneName]

## Video specs
- Resolution: 1920x1080 (16:9 landscape)
- FPS: 30
- Default duration: 300 frames (10 seconds) — adjust per scene based on audio

## Brand
- Primary: #FF8300 | Black: #000000 | Grey: #53575A | White: #FFFFFF
- NO gradients, NO tints, NO opacity variations of brand colors
- Font: Nunito via @remotion/google-fonts
- Heading: weight 800–900 | Body: weight 400–500
- Import: import { loadFont } from "@remotion/google-fonts/Nunito"

## Visual philosophy
- Motion graphic first: each concept = SVG illustration or animated shapes, NOT bullet text
- Text = keywords only (1–3 words max), NEVER full sentences
- Max 1 main keyword + 1 supporting keyword per scene
- Priority: SVG illustration > animated shape > keyword text
- Generate inline SVG directly in component if no asset available

## Motion graphic patterns
- Concept entrance: SVG draw-on via strokeDashoffset animation
- Emphasis: scale spring 0.8→1 + orange #FF8300 accent
- Transition: slide out left → slide in right
- Background: subtle decorative shapes at opacity 0.05–0.1 for depth

## Animation rules
- NEVER use CSS transition or CSS animation
- Always use useCurrentFrame() and useVideoConfig() for fps
- spring() for entrances | interpolate() for opacity/translate/scale
- Stagger elements: 5–6 frames apart

## Project structure
- Each scene: src/compositions/SceneXX.tsx
- Reusable components: src/components/
- Register every scene in src/Root.tsx
- Assets: public/assets/ | Audio: public/audio/ | SRT: public/subtitles/

## Audio + subtitle
- Use <Audio src={staticFile("audio/filename.mp3")} />
- Convert SRT timestamp to frame: Math.round(seconds * fps)
- Subtitle: bottom-center, white text, semi-transparent black background

## New scene workflow
- Use /new-scene skill

## Current status

### Completed ✅
- [x] Remotion 4.x initialized (blank template), `@remotion/google-fonts` installed
- [x] Folder structure: `src/compositions/`, `src/components/`, `public/assets/`, `public/audio/`, `public/subtitles/`
- [x] `.claude/settings.json` — PostToolUse hook: `npx tsc --noEmit --skipLibCheck` on every Edit/Write
- [x] `.claude/skills/new-scene/SKILL.md` — `/new-scene` skill
- [x] `.claude/agents/scene-reviewer.md` — brand compliance reviewer agent
- [x] `src/Root.tsx` — updated to 1920×1080 30fps
- [x] `src/compositions/SceneIntro.tsx` — full 1334-frame intro scene built
- [x] Audio wired: `<Audio src={staticFile("audio/intro.mp3")} volume={1} />`
- [x] Subtitle component hardcoded from SRT (14 cues)
- [x] `critical-thinking.svg` uploaded to `public/assets/`, applied in Phase 1 via `<Img>`

### Assets present
| File | Location | Duration |
|---|---|---|
| intro.mp3 | public/audio/ | ~44.5s (1334 frames @ 30fps) |
| intro.srt | public/subtitles/ | 14 cues |
| critical-thinking.svg | public/assets/ | Phase 1 illustration |

### Next action
Kiểm tra illustration hiển thị đúng trong Remotion Studio (frame 10–118), sau đó upload thêm SVG cho các phase còn lại (Phase 2: inbox/flooding, Phase 3: compass, Phase 4: map) hoặc refine layout nếu cần.
