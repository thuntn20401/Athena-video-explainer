---
name: new-scene
description: Create a new Remotion scene — motion graphic first
---
Create a new scene from script content: $ARGUMENTS

Steps:
1. READ script: identify main concept, supporting concepts, keywords (max 3 words each)
2. PLAN visuals:
   - What SVG illustration or shape represents the main concept?
   - Animation sequence: visual first → keyword after
3. CHECK public/assets/ for existing SVGs
4. If none, generate inline SVG shapes in the component
5. Create src/compositions/SceneXX.tsx:
   - SVG/illustration animates first (strokeDashoffset or spring scale)
   - Keywords appear after visual
   - Brand colors + Nunito font
   - width=1920 height=1080 fps=30 via useVideoConfig()
6. Register in src/Root.tsx with width={1920} height={1080} fps={30} durationInFrames={300}
7. Run: npx tsc --noEmit --skipLibCheck
8. Report: visual elements, animation sequence, duration in frames
