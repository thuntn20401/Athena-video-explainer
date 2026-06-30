import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CriticalThinkingIllustration } from "../components/CriticalThinkingIllustration";
import { ProblemSolvingIllustration } from "../components/ProblemSolvingIllustration";
import { InformationIllustration } from "../components/InformationIllustration";
import { WayHandleIllustration } from "../components/WayHandleIllustration";
import { MindsetIllustration } from "../components/MindsetIllustration";
import { MethodIllustration } from "../components/MethodIllustration";
import { ToolkitIllustration } from "../components/ToolkitIllustration";
import { loadFont } from "@remotion/google-fonts/Nunito";

const { fontFamily } = loadFont();

const subtitles = [
  { from: 0, to: 118, text: "Welcome to Module 2, Critical Thinking and Problem Solving." },
  { from: 160, to: 259, text: "Every day at work, you're flooded with information" },
  { from: 274, to: 342, text: "and hit with problems that need solving." },
  { from: 371, to: 509, text: "This module gives you a way to handle both, calmly and well." },
  { from: 548, to: 575, text: "Here's the map." },
  { from: 618, to: 638, text: "Four sections." },
  { from: 667, to: 716, text: "First, the mindset." },
  { from: 740, to: 799, text: "What critical thinking really is." },
  { from: 799, to: 860, text: "Then, the method." },
  { from: 877, to: 946, text: "A six-step process for solving problems." },
  { from: 962, to: 1011, text: "Then, the toolkit." },
  { from: 1034, to: 1090, text: "Three tools for the hardest step." },
  { from: 1109, to: 1232, text: "And finally, we put it all to work on a real case." },
  { from: 1268, to: 1334, text: "Let's start at the very beginning." },
];

const Subtitle: React.FC<{ frame: number }> = ({ frame }) => {
  const active = subtitles.find((s) => frame >= s.from && frame <= s.to);
  if (!active) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        fontFamily,
        fontSize: 32,
        fontWeight: 400,
        color: "#FFFFFF",
      }}
    >
      <span
        style={{
          background: "rgba(0,0,0,0.7)",
          borderRadius: 50,
          padding: "8px 20px",
        }}
      >
        {active.text}
      </span>
    </div>
  );
};

const BgCircles: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = (seed: number) => Math.sin(frame / 180 + seed) * 20;
  const circles = [
    { cx: 300, cy: 300, r: 400, seed: 0 },
    { cx: 1620, cy: 800, r: 350, seed: 2 },
    { cx: 960, cy: 900, r: 500, seed: 4 },
  ];
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.cx + drift(c.seed)}
          cy={c.cy + drift(c.seed + 1)}
          r={c.r}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={1.5}
          opacity={0.04}
        />
      ))}
    </svg>
  );
};






// ── Main component ────────────────────────────────────────────────────────────
export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = (f: number, cfg?: object) =>
    spring({ frame: frame - f, fps, config: { damping: 14, ...cfg } });

  // ── Phase 1: 0–145 ──────────────────────────────────────────────────────────
  const moduleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // ── Phase 1A: Critical Thinking — starts ~frame 43 (audio: "Critical Thinking") ──
  // "Welcome to Module 2," ≈ 1.4s = 42 frames; "Critical" starts at frame 43
  const wCritical = sp(43);
  const wThinking = sp(50);

  // CT illustration entrance — same delay as text
  const illustrationProgress = sp(43, { damping: 18 });
  const illustrationScale = interpolate(illustrationProgress, [0, 1], [0.82, 1]);
  const illustrationOpacity = interpolate(illustrationProgress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  // CT exit: slide left + fade when "and" is spoken (~frame 67)
  const ctExitProg = interpolate(frame, [67, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctSlideX = interpolate(ctExitProg, [0, 1], [0, -200]);
  const ctExitOp = interpolate(ctExitProg, [0, 1], [1, 0]);

  // ── Phase 1B: Problem Solving — starts ~frame 67 (audio: "and Problem Solving") ──
  const wProblem = sp(75);
  const wSolving = sp(83);

  // PS enter: slide in from right when "and Problem Solving" starts
  const psEnterProg = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const psEnterX = interpolate(psEnterProg, [0, 1], [220, 0]);
  const psEnterOp = interpolate(psEnterProg, [0, 1], [0, 1]);


  // ── Phase 1 illustration float ───────────────────────────────────────────────
  const illustrationFloat = Math.sin(frame / 55) * 10;

  // ── Phase 1 → 2 transition ──────────────────────────────────────────────────
  const phase1ScaleProgress = interpolate(frame, [140, 170], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase1XProgress = interpolate(frame, [140, 170], [760, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase1YProgress = interpolate(frame, [140, 170], [300, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 2: 160–342 ────────────────────────────────────────────────────────
  const infoProgress = sp(200);
  const infoY = interpolate(infoProgress, [0, 1], [30, 0]);
  const infoOpacity = interpolate(infoProgress, [0, 1], [0, 1]);

  // ── Phase 2 → 3 transition ──────────────────────────────────────────────────
  const phase2Opacity = interpolate(frame, [350, 375], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 3: 371–509 ────────────────────────────────────────────────────────

  // ── Phase 3 → 4 transition ──────────────────────────────────────────────────
  const phase3Opacity = interpolate(frame, [520, 548], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 4: 548–638 ────────────────────────────────────────────────────────
  const sectionsProgress = sp(618, { damping: 10 });
  const sectionsScale = interpolate(sectionsProgress, [0, 1], [0.5, 1]);
  const sectionsOpacity = interpolate(sectionsProgress, [0, 1], [0, 1]);

  // "4 Sections" moves up-left when first section card appears
  const sectionsMoveProgress = sp(667, { damping: 14 });
  const sectionsMoveX = interpolate(sectionsMoveProgress, [0, 1], [0, -400]);
  const sectionsMoveY = interpolate(sectionsMoveProgress, [0, 1], [0, -250]);

  // Section card x positions (centered for 4 cards, 200px wide, 60px gap)
  // total width = 4*200 + 3*60 = 980, start = (1920-980)/2 = 470
  const cardPositions = [470, 730, 990, 1250];

  // ── Phase 5: section cards 667–1180 ─────────────────────────────────────────
  const sec1Visible = frame >= 667;

  // Mindset:
  //   f667–774: appears large on right side (fixed)
  //   f775+:    spring slides to card position [0] on left, shrinks
  //   f810+:    "Mindset" text fades in after arriving
  const mindsetEnterOp = interpolate(frame, [667, 680], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mindsetSlideProg = spring({ frame: frame - 775, fps, config: { damping: 18, stiffness: 70 } });
  const mindsetX = interpolate(mindsetSlideProg, [0, 1], [1170, cardPositions[0]]);
  const mindsetY = interpolate(mindsetSlideProg, [0, 1], [270, 420]);
  const mindsetW = interpolate(mindsetSlideProg, [0, 1], [540, 200]);
  const mindsetTextOp = interpolate(frame, [810, 830], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sec2Visible = frame >= 799;

  // Method: f799–876 large right, f877+ slides to card[1]
  const methodEnterOp = interpolate(frame, [799, 812], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const methodSlideProg = spring({ frame: frame - 877, fps, config: { damping: 18, stiffness: 70 } });
  const methodX = interpolate(methodSlideProg, [0, 1], [1170, cardPositions[1]]);
  const methodY = interpolate(methodSlideProg, [0, 1], [270, 420]);
  const methodW = interpolate(methodSlideProg, [0, 1], [540, 200]);
  const methodTextOp = interpolate(frame, [900, 920], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sec3Visible = frame >= 962;

  // Toolkit: f962–1033 large right, f1034+ slides to card[2]
  const toolkitEnterOp = interpolate(frame, [962, 975], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const toolkitSlideProg = spring({ frame: frame - 1034, fps, config: { damping: 18, stiffness: 70 } });
  const toolkitX = interpolate(toolkitSlideProg, [0, 1], [1170, cardPositions[2]]);
  const toolkitY = interpolate(toolkitSlideProg, [0, 1], [270, 420]);
  const toolkitW = interpolate(toolkitSlideProg, [0, 1], [540, 200]);
  const toolkitTextOp = interpolate(frame, [1060, 1080], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fade out sec1/2/3 + "4 Sections" text when Real Case takes over
  const prevSectionsFadeOp = interpolate(frame, [1109, 1125], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Real Case: 3 assets orbiting at center of screen, spring-scale entrance
  const sec4Visible = frame >= 1109;
  const rcSpringProg = spring({ frame: frame - 1109, fps, config: { damping: 14, stiffness: 80 } });
  const rcScale = interpolate(rcSpringProg, [0, 1], [0, 1]);
  const rcEnterOp = interpolate(frame, [1109, 1125, 1252, 1268], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rcContainerSize = 500;
  const rcAssetW = 130;
  const rcRadius = 150;
  const rcTextOp = interpolate(frame, [1145, 1165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rcRotRad = ((frame - 1109) * 0.35 * Math.PI) / 180;
  const rcCx = rcContainerSize / 2;
  const rcCy = rcContainerSize / 2;
  const rcPoints = [0, 1, 2].map(i => {
    const angle = rcRotRad + (i * 2 * Math.PI) / 3 - Math.PI / 2;
    return { x: rcCx + rcRadius * Math.cos(angle), y: rcCy + rcRadius * Math.sin(angle) };
  });

  // ── Phase 6: 1268–1334 — "Let's start!" per-character drop-in ──────────────
  // Delays matched to audio "Let's start at the very beginning."
  // "Let's" ≈ 7 frames, gap, "start" ≈ 8 frames, "!" emphasis delay
  const letsStartChars = ["L","e","t","'","s"," ","s","t","a","r","t","!"];
  const letsStartDelays = [0, 3, 5, 6, 7, 12, 14, 16, 18, 20, 22, 30];

  // Phase 1 visible: frames 0–170 (transitions out)
  const phase1Visible = frame < 370;
  // Phase 2 visible: 160–375
  const phase2Visible = frame >= 160 && frame < 520;
  // Phase 3 visible: 371–548
  const phase3Visible = frame >= 371 && frame < 650;
  // Phase 4 visible: 548+
  const phase4Visible = frame >= 548;

  return (
    <AbsoluteFill style={{ background: "#EAEDF5", fontFamily }}>
      <Audio src={staticFile("audio/intro.mp3")} volume={1} />

      {/* Background circles */}
      <BgCircles frame={frame} />

      {/* ── PHASE 1 — MODULE 2 badge (collapses at 140–170) ── */}
      {phase1Visible && (
        <div
          style={{
            position: "absolute",
            left: frame >= 140 ? phase1XProgress : 0,
            top: frame >= 140 ? phase1YProgress : 0,
            width: frame >= 140 ? undefined : "100%",
            transform: frame >= 140 ? `scale(${phase1ScaleProgress})` : "none",
            transformOrigin: "top left",
          }}
        >
          <div
            style={{
              position: frame >= 140 ? "relative" : "absolute",
              top: frame >= 140 ? 0 : 160,
              left: frame >= 140 ? 0 : 140,
              fontFamily,
              fontSize: 28,
              fontWeight: 400,
              color: "#53575A",
              opacity: moduleOpacity,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            MODULE 2
          </div>
        </div>
      )}

      {/* ── PHASE 1A: Critical Thinking (0→82) ── */}
      {phase1Visible && (
        <>
          {/* CT text — centered in left half */}
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 960,
              top: 490,
              display: "flex",
              justifyContent: "center",
              gap: 24,
              fontFamily,
              fontSize: 88,
              fontWeight: 900,
              color: "#1A1A1A",
              transform: `translateX(${ctSlideX}px)`,
              opacity: ctExitOp,
            }}
          >
            <span style={{ opacity: wCritical, display: "inline-block", transform: `translateY(${interpolate(wCritical, [0, 1], [40, 0])}px)` }}>Critical</span>
            <span style={{ opacity: wThinking, display: "inline-block", transform: `translateY(${interpolate(wThinking, [0, 1], [40, 0])}px)` }}>Thinking</span>
          </div>

          {/* CT illustration — centered in right half, larger */}
          <div
            style={{
              position: "absolute",
              left: 960,
              width: 960,
              top: 0,
              height: 1080,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `translateY(${illustrationFloat}px) scale(${illustrationScale})`,
              opacity: illustrationOpacity * ctExitOp,
            }}
          >
            <CriticalThinkingIllustration width={960} />
          </div>
        </>
      )}

      {/* ── PHASE 1B: Problem Solving (65→145) ── */}
      {frame >= 65 && frame < 145 && (
        <>
          {/* PS text — centered in left half, slides in from right */}
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 960,
              top: 490,
              display: "flex",
              justifyContent: "center",
              gap: 20,
              fontFamily,
              fontSize: 80,
              fontWeight: 900,
              color: "#FF8300",
              transform: `translateX(${psEnterX}px)`,
              opacity: psEnterOp,
            }}
          >
            <span style={{ opacity: wProblem, display: "inline-block", transform: `translateY(${interpolate(wProblem, [0, 1], [40, 0])}px)` }}>Problem</span>
            <span style={{ opacity: wSolving, display: "inline-block", transform: `translateY(${interpolate(wSolving, [0, 1], [40, 0])}px)` }}>Solving</span>
          </div>

          {/* PS SVG — centered in right half, slides in + springs to 1.3× */}
          <div
            style={{
              position: "absolute",
              left: 960,
              width: 960,
              top: 0,
              height: 1080,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `translateX(${psEnterX}px)`,
              opacity: psEnterOp,
            }}
          >
            <ProblemSolvingIllustration width={960} startFrame={65} />
          </div>
        </>
      )}

      {/* ── PHASE 2 ── */}
      {phase2Visible && (
        <div style={{ opacity: frame >= 350 ? phase2Opacity : 1 }}>
          {/* Information illustration — full screen centered */}
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: 1920, height: 1080,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <InformationIllustration width={1080} startFrame={160} />
          </div>

          {/* "Information" keyword — top-right */}
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 120,
              fontFamily,
              fontSize: 72,
              fontWeight: 900,
              color: "#FF8300",
              opacity: infoOpacity,
              transform: `translateY(${infoY}px)`,
            }}
          >
            Information
          </div>
        </div>
      )}

      {/* ── PHASE 3 ── */}
      {phase3Visible && (
        <div style={{ opacity: frame >= 520 ? phase3Opacity : 1 }}>
          {/* WayHandle illustration — full screen centered */}
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: 1920, height: 1080,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <WayHandleIllustration width={1080} startFrame={371} />
          </div>

        </div>
      )}

      {/* ── PHASE 4 ── */}
      {phase4Visible && (
        <div
          style={{
            position: "absolute",
            left: 0, right: 0, top: 490,
            textAlign: "center",
            fontFamily,
            fontSize: 64,
            fontWeight: 900,
            color: "#FF8300",
            opacity: sectionsOpacity * prevSectionsFadeOp,
            transform: `scale(${sectionsScale}) translate(${sectionsMoveX}px, ${sectionsMoveY}px)`,
          }}
        >
          4 Sections
        </div>
      )}

      {/* ── PHASE 5: section cards ── */}
      {sec1Visible && (
        <div style={{
          position: "absolute",
          left: mindsetX,
          top: mindsetY,
          opacity: mindsetEnterOp * prevSectionsFadeOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}>
          <MindsetIllustration width={mindsetW} startFrame={667} />
          <div style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: "#1A1A1A",
            opacity: mindsetTextOp,
            whiteSpace: "nowrap",
          }}>
            Mindset
          </div>
        </div>
      )}

      {sec2Visible && (
        <div style={{
          position: "absolute",
          left: methodX,
          top: methodY,
          opacity: methodEnterOp * prevSectionsFadeOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}>
          <MethodIllustration width={methodW} startFrame={799} />
          <div style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: "#1A1A1A",
            opacity: methodTextOp,
            whiteSpace: "nowrap",
          }}>
            Method
          </div>
        </div>
      )}

      {sec3Visible && (
        <div style={{
          position: "absolute",
          left: toolkitX,
          top: toolkitY,
          opacity: toolkitEnterOp * prevSectionsFadeOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}>
          <ToolkitIllustration width={toolkitW} startFrame={962} />
          <div style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: "#1A1A1A",
            opacity: toolkitTextOp,
            whiteSpace: "nowrap",
          }}>
            Toolkit
          </div>
        </div>
      )}

      {sec4Visible && (
        <div style={{
          position: "absolute",
          left: 960 - rcContainerSize / 2,
          top: 470 - rcContainerSize / 2,
          opacity: rcEnterOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${rcScale})`,
          transformOrigin: `${rcContainerSize / 2}px ${rcContainerSize / 2}px`,
        }}>
          <div style={{ position: "relative", width: rcContainerSize, height: rcContainerSize }}>
            {/* Dashed triangle lines + guide circle */}
            <svg width={rcContainerSize} height={rcContainerSize} style={{ position: "absolute", top: 0, left: 0 }}>
              {([0, 1, 2] as const).map(i => (
                <line key={i}
                  x1={rcPoints[i].x} y1={rcPoints[i].y}
                  x2={rcPoints[(i + 1) % 3].x} y2={rcPoints[(i + 1) % 3].y}
                  stroke="#FF8300" strokeWidth={2} strokeDasharray="8 5" opacity={0.8} />
              ))}
              <circle cx={rcCx} cy={rcCy} r={rcRadius}
                fill="none" stroke="#FF8300" strokeWidth={1.5} strokeDasharray="5 7" opacity={0.25} />
            </svg>
            {/* Mindset thumbnail */}
            <div style={{
              position: "absolute",
              left: rcPoints[0].x - rcAssetW / 2,
              top: rcPoints[0].y - rcAssetW / 2,
              width: rcAssetW, height: rcAssetW,
              borderRadius: "50%", overflow: "hidden", background: "#EAEDF5",
            }}>
              <MindsetIllustration width={rcAssetW} startFrame={667} />
            </div>
            {/* Method thumbnail */}
            <div style={{
              position: "absolute",
              left: rcPoints[1].x - rcAssetW / 2,
              top: rcPoints[1].y - rcAssetW / 2,
              width: rcAssetW, height: rcAssetW,
              borderRadius: "50%", overflow: "hidden", background: "#EAEDF5",
            }}>
              <MethodIllustration width={rcAssetW} startFrame={799} />
            </div>
            {/* Toolkit thumbnail */}
            <div style={{
              position: "absolute",
              left: rcPoints[2].x - rcAssetW / 2,
              top: rcPoints[2].y - rcAssetW / 2,
              width: rcAssetW, height: rcAssetW,
              borderRadius: "50%", overflow: "hidden", background: "#EAEDF5",
            }}>
              <ToolkitIllustration width={rcAssetW} startFrame={962} />
            </div>
          </div>
          <div style={{
            fontFamily,
            fontSize: 48,
            fontWeight: 800,
            color: "#FF8300",
            opacity: rcTextOp,
            whiteSpace: "nowrap",
            letterSpacing: 2,
          }}>
            Real Case
          </div>
        </div>
      )}

      {/* ── PHASE 6 — "Let's start!" per-character drop-in ── */}
      {frame >= 1268 && (
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          fontFamily,
          fontSize: 140,
          fontWeight: 900,
          lineHeight: 1,
        }}>
          {letsStartChars.map((char, i) => {
            const cf = frame - (1268 + letsStartDelays[i]);
            const sp6 = spring({ frame: cf, fps, config: { damping: 12, stiffness: 180 } });
            const y = interpolate(sp6, [0, 1], [-80, 0]);
            const op = interpolate(cf, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <span key={i} style={{
                display: "inline-block",
                transform: `translateY(${y}px)`,
                opacity: op,
                color: char === "!" ? "#FF8300" : "#1A1A1A",
              }}>
                {char === " " ? " " : char}
              </span>
            );
          })}
        </div>
      )}

      <Subtitle frame={frame} />
    </AbsoluteFill>
  );
};
