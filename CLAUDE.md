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
- [x] `.claude/skills/animate-svg/SKILL.md` — project skill: decision tree + workflow cho SVG animation
- [x] `.claude/agents/scene-reviewer.md` — brand compliance reviewer agent
- [x] `src/Root.tsx` — updated to 1920×1080 30fps
- [x] `src/compositions/SceneIntro.tsx` — full 1334-frame intro scene built
- [x] Audio wired: `<Audio src={staticFile("audio/intro.mp3")} volume={1} />`
- [x] Subtitle component hardcoded from SRT (14 cues)
- [x] `critical-thinking.svg` uploaded to `public/assets/`
- [x] `src/components/CriticalThinkingIllustration.tsx` — inline animated SVG component (13 animation layers)
- [x] `SceneIntro.tsx` Phase 1 tách thành Phase 1A (Critical Thinking only) / Phase 1B (Problem Solving only) với slide transition
- [x] Phase 1A: "Critical Thinking" căn giữa nửa trái, CT illustration width=960 fill nửa phải (frame 43–66, audio-synced)
- [x] Phase 1B: "Problem Solving" căn giữa nửa trái (bỏ "&"), PS illustration width=960 fill nửa phải (frame 67–145)
- [x] Slide transition CT→PS: CT exit slide-left (frame 67–85), PS enter slide-right (frame 65–85)
- [x] Audio sync: "Welcome to Module 2" (f0–42) → chỉ MODULE 2 label; "Critical" (f43), "Thinking" (f50); "and Problem Solving" (f68–83)
- [x] `public/assets/problem-solving.svg` — added (60KB, Freepik filled illustration, 7 layers)
- [x] `src/components/ProblemSolvingIllustration.tsx` — 7-layer animated component, prop `startFrame` (default 0): BG breathe, Floor slide, Plant sway, Labyrinth spring+pulse+orange Lissajous nav dot, Character float+horizontal sway, Line fade+pulse, Speech bubble spring pop+bob
- [x] `public/assets/information.svg` — added (97KB, Freepik filled illustration, 14 groups: Floor, Shadows, Gears, Device/Laptop, Tab/Window, Pencil, Plant, 3 speech bubbles, 4 characters)
- [x] `src/components/InformationIllustration.tsx` — 14-layer animated component (100KB), prop `startFrame`: Floor/Shadows fade, Gears rotate, Device spring-up, Tab slide-right, 4 characters staggered spring, 3 bubbles staggered pop, Plant sway, Pencil pop
- [x] Phase 2 (f160–342) refactored: InboxSVG bỏ → InformationIllustration full screen (width=1080 centered) + "Information" keyword top-right (#FF8300, 72px, weight 900)
- [x] `public/assets/way-handle.svg` — added (inject-12: background, Plants, Gears, light-bulb, hand-1/2/3)
- [x] `src/components/WayHandleIllustration.tsx` — 7-layer animated component: BG fade, Plants sway, Gears rotate, light-bulb spring pop+pulse, hand-1/2/3 staggered spring up from below
- [x] Phase 3 (f371–509) refactored: CompassSVG + "Calmly & Well" bỏ → WayHandleIllustration full screen (width=1080, startFrame=371), không có keyword text
- [x] Phase 4 (f548–638) cleanup: MapSVG removed, 4 placeholder circles removed; "4 Sections" text xuất hiện f618, spring lên trên-trái khi sec1 xuất hiện f667 (translateX -400, translateY -250)
- [x] `public/assets/mindset.svg` — added (inject-28: background-complete, Symbol, puzzle-pieces, Pencil, Numbers, musical-notes, Heart, light-bulb, speech-bubble, brain-side-1/2)
- [x] `src/components/MindsetIllustration.tsx` — 11-layer animated component: brain-side-1/2 converge từ 2 phía (sp delay 0), bulb float+pop (delay 12), bubble pop (delay 18), puzzle rotate spring (delay 10), heart beat pulse, notes float (delay 22), pencil/numbers spring, symbol pop
- [x] Phase 5 Mindset section: LightbulbSVG removed → MindsetIllustration; f667–774 xuất hiện lớn bên phải (x=1170, y=270, w=540); f775+ spring slide sang card position trái (x=470, y=420, w=200); "Mindset" text fade in f810–830
- [x] `src/components/MethodIllustration.tsx` — 10-layer animated component từ method.svg (kanban columns spring up, 2 characters, clock/calendar slide in, plants sway, speech bubble pop, graphics fade)
- [x] Phase 5 Method section (sec2): f799–876 xuất hiện lớn phải (x=1170, y=270, w=540); f877+ spring slide to card[1] (x=730, y=420, w=200); "Method" text f900–920
- [x] `src/components/ToolkitIllustration.tsx` — 14-layer animated component từ toolkit.svg (character spring up, 9 tools staggered pop, gears rotate, speech bubbles pop, dashed lines fade)
- [x] Phase 5 Toolkit section (sec3): f962–1033 xuất hiện lớn phải; f1034+ spring slide to card[2] (x=990, y=420, w=200); "Toolkit" text f1060–1080
- [x] Real Case section (sec4, f1109+): 3 asset thumbnails (Mindset/Method/Toolkit) trong vòng tròn xoay CW (0.35°/frame), dashed orange triangle + guide circle, spring-scale entrance tại CENTER màn hình (left=710, top=220, container=500px); prevSectionsFadeOp ẩn 3 card trước + "4 Sections" text tại f1109–1125; rcEnterOp fade out f1252–1268
- [x] SixDotsSVG, WrenchSVG, BriefcaseSVG đã XÓA khỏi SceneIntro — không còn inline SVG placeholder nào
- [x] Phase 6 (f1268–1334): "Let's start!" per-character drop animation, 12 ký tự stagger khớp audio, "!" màu #FF8300, font 140px weight 900

### Assets present
| File | Location | Notes |
|---|---|---|
| intro.mp3 | public/audio/ | ~44.5s (1334 frames @ 30fps) |
| intro.srt | public/subtitles/ | 14 cues |
| critical-thinking.svg | public/assets/ | Phase 1A — CT illustration |
| problem-solving.svg | public/assets/ | Phase 1B — PS illustration (7 layers) |
| information.svg | public/assets/ | Phase 2 — Information illustration (14 layers) |
| way-handle.svg | public/assets/ | Phase 3 — 7 layers inject-12 |
| mindset.svg | public/assets/ | Phase 5 sec1 — 11 layers inject-28 |
| method.svg | public/assets/ | Phase 5 sec2 — MethodIllustration (10 layers) |
| toolkit.svg | public/assets/ | Phase 5 sec3 — ToolkitIllustration (14 layers) |

### Next action
Mở Remotion Studio (`npm run dev`), scrub qua toàn bộ SceneIntro: kiểm tra Phase 5 Method (f799–960), Toolkit (f962–1108), Real Case rotating circle (f1109–1267), Phase 6 "Let's start!" drop animation (f1268–1334). Nếu visual ok → commit toàn bộ session này. Sau đó bắt đầu Scene 02 (dùng `/new-scene` skill).
