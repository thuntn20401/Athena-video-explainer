import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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
          stroke="#FFFFFF"
          strokeWidth={1.5}
          opacity={0.04}
        />
      ))}
    </svg>
  );
};


// ── SVG: Inbox overflowing ───────────────────────────────────────────────────
const InboxSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={240} height={200} viewBox="0 0 240 200">
      {/* tray */}
      <rect x={20} y={120} width={200} height={60} rx={4} fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={520} strokeDashoffset={d(520)} />
      {/* documents */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={40 + i * 48} y={80 - i * 14} width={36} height={48} rx={2}
          fill="none" stroke="#FF8300" strokeWidth={2.5}
          strokeDasharray={168} strokeDashoffset={d(168)} />
      ))}
    </svg>
  );
};

// ── SVG: Compass ─────────────────────────────────────────────────────────────
const CompassSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      <circle cx={100} cy={100} r={80} fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={502} strokeDashoffset={d(502)} />
      <circle cx={100} cy={100} r={8} fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={50} strokeDashoffset={d(50)} />
      <line x1={100} y1={30} x2={100} y2={170} stroke="#FF8300" strokeWidth={2} opacity={0.5}
        strokeDasharray={140} strokeDashoffset={d(140)} />
      <line x1={30} y1={100} x2={170} y2={100} stroke="#FF8300" strokeWidth={2} opacity={0.5}
        strokeDasharray={140} strokeDashoffset={d(140)} />
    </svg>
  );
};

// ── SVG: Map grid ─────────────────────────────────────────────────────────────
const MapSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {[0, 1].map((row) =>
        [0, 1].map((col) => (
          <rect key={`${row}-${col}`}
            x={30 + col * 85} y={30 + row * 85} width={70} height={70} rx={6}
            fill="none" stroke="#FF8300" strokeWidth={3}
            strokeDasharray={280} strokeDashoffset={d(280)} />
        ))
      )}
    </svg>
  );
};

// ── SVG: Lightbulb ────────────────────────────────────────────────────────────
const LightbulbSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={120} height={140} viewBox="0 0 120 140">
      <path d="M60 10 C30 10 10 30 10 55 C10 75 25 90 35 100 L35 115 L85 115 L85 100 C95 90 110 75 110 55 C110 30 90 10 60 10 Z"
        fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={500} strokeDashoffset={d(500)} />
      <line x1={40} y1={115} x2={80} y2={115} stroke="#FF8300" strokeWidth={3}
        strokeDasharray={40} strokeDashoffset={d(40)} />
      <line x1={42} y1={125} x2={78} y2={125} stroke="#FF8300" strokeWidth={3}
        strokeDasharray={36} strokeDashoffset={d(36)} />
    </svg>
  );
};

// ── SVG: 6 dots ───────────────────────────────────────────────────────────────
const SixDotsSVG: React.FC<{ scale: number }> = ({ scale }) => (
  <svg width={140} height={100} viewBox="0 0 140 100"
    style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
    {[0, 1, 2].map((col) =>
      [0, 1].map((row) => (
        <circle key={`${row}-${col}`}
          cx={25 + col * 45} cy={20 + row * 45} r={14}
          fill="none" stroke="#FF8300" strokeWidth={3} />
      ))
    )}
  </svg>
);

// ── SVG: Wrench ───────────────────────────────────────────────────────────────
const WrenchSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={120} height={140} viewBox="0 0 120 140">
      <path d="M80 10 C95 25 95 45 80 55 L35 110 C28 118 18 118 12 110 C6 102 6 92 14 86 L70 40 C80 25 65 8 80 10 Z"
        fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={600} strokeDashoffset={d(600)} />
      <circle cx={22} cy={104} r={8} fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={50} strokeDashoffset={d(50)} />
    </svg>
  );
};

// ── SVG: Briefcase ────────────────────────────────────────────────────────────
const BriefcaseSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const d = (len: number) => len * (1 - progress);
  return (
    <svg width={140} height={120} viewBox="0 0 140 120">
      <rect x={10} y={35} width={120} height={80} rx={6}
        fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={400} strokeDashoffset={d(400)} />
      <path d="M45 35 L45 20 C45 14 95 14 95 20 L95 35"
        fill="none" stroke="#FF8300" strokeWidth={3}
        strokeDasharray={130} strokeDashoffset={d(130)} />
      <line x1={10} y1={75} x2={130} y2={75} stroke="#FF8300" strokeWidth={2} opacity={0.5}
        strokeDasharray={120} strokeDashoffset={d(120)} />
    </svg>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = (f: number, cfg?: object) =>
    spring({ frame: frame - f, fps, config: { damping: 14, ...cfg } });

  // ── Phase 1: 0–118 ──────────────────────────────────────────────────────────
  const moduleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleProgress = sp(10);
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const subtitleProgress = sp(25);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [50, 0]);

  const illustrationProgress = sp(10, { damping: 18 });
  const illustrationScale = interpolate(illustrationProgress, [0, 1], [0.82, 1]);
  const illustrationOpacity = interpolate(illustrationProgress, [0, 1], [0, 1]);

  // ── Phase 1 illustration motion ─────────────────────────────────────────────
  const illustrationFloat = Math.sin(frame / 55) * 10;
  const illustrationPulse = 1 + Math.sin(frame / 40) * 0.015;
  const ringProgress = interpolate(frame, [10, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringDash = 1130; // circumference ~2π*180
  const ringOffset = ringDash * (1 - ringProgress);

  // ── Phase 1 → 2 transition ──────────────────────────────────────────────────
  const phase1ScaleProgress = interpolate(frame, [140, 170], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase1XProgress = interpolate(frame, [140, 170], [760, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase1YProgress = interpolate(frame, [140, 170], [300, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 2: 160–342 ────────────────────────────────────────────────────────
  const inboxVisible = frame >= 160;
  const inboxDrawProgress = interpolate(frame, [160, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const infoProgress = sp(230);
  const infoY = interpolate(infoProgress, [0, 1], [30, 0]);
  const infoOpacity = interpolate(infoProgress, [0, 1], [0, 1]);
  const problemProgress = sp(274);
  const problemY = interpolate(problemProgress, [0, 1], [30, 0]);
  const problemOpacity = interpolate(problemProgress, [0, 1], [0, 1]);

  // ── Phase 2 → 3 transition ──────────────────────────────────────────────────
  const phase2Opacity = interpolate(frame, [350, 375], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 3: 371–509 ────────────────────────────────────────────────────────
  const compassVisible = frame >= 380;
  const compassDrawProgress = interpolate(frame, [380, 440], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const calmProgress = sp(450);
  const calmOpacity = interpolate(calmProgress, [0, 1], [0, 1]);
  const calmY = interpolate(calmProgress, [0, 1], [30, 0]);

  // ── Phase 3 → 4 transition ──────────────────────────────────────────────────
  const phase3Opacity = interpolate(frame, [520, 548], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── Phase 4: 548–638 ────────────────────────────────────────────────────────
  const mapVisible = frame >= 548;
  const mapDrawProgress = interpolate(frame, [548, 590], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sectionsProgress = sp(618, { damping: 10 });
  const sectionsScale = interpolate(sectionsProgress, [0, 1], [0.5, 1]);
  const sectionsOpacity = interpolate(sectionsProgress, [0, 1], [0, 1]);

  const placeholderCircles = [0, 1, 2, 3].map((i) => {
    const prog = sp(615 + i * 8);
    return interpolate(prog, [0, 1], [0, 1]);
  });

  // ── Phase 5: section cards 667–1180 ─────────────────────────────────────────
  const sec1Visible = frame >= 667;
  const sec1DrawProg = interpolate(frame, [667, 710], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sec2Visible = frame >= 799;
  const sec2ScaleProg = sp(799);
  const sec2Scale = interpolate(sec2ScaleProg, [0, 1], [0, 1]);

  const sec3Visible = frame >= 962;
  const sec3DrawProg = interpolate(frame, [962, 1000], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sec4Visible = frame >= 1109;
  const sec4DrawProg = interpolate(frame, [1109, 1160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // label springs for each section
  const sec1LabelProg = sp(720);
  const sec1LabelY = interpolate(sec1LabelProg, [0, 1], [30, 0]);
  const sec1LabelOp = interpolate(sec1LabelProg, [0, 1], [0, 1]);
  const sec2LabelProg = sp(840);
  const sec2LabelY = interpolate(sec2LabelProg, [0, 1], [30, 0]);
  const sec2LabelOp = interpolate(sec2LabelProg, [0, 1], [0, 1]);
  const sec3LabelProg = sp(1010);
  const sec3LabelY = interpolate(sec3LabelProg, [0, 1], [30, 0]);
  const sec3LabelOp = interpolate(sec3LabelProg, [0, 1], [0, 1]);
  const sec4LabelProg = sp(1170);
  const sec4LabelY = interpolate(sec4LabelProg, [0, 1], [30, 0]);
  const sec4LabelOp = interpolate(sec4LabelProg, [0, 1], [0, 1]);

  // Section card x positions (centered for 4 cards, 200px wide, 60px gap)
  // total width = 4*200 + 3*60 = 980, start = (1920-980)/2 = 470
  const cardPositions = [470, 730, 990, 1250];

  // ── Phase 6: 1268–1334 ───────────────────────────────────────────────────────
  const lineProgress = sp(1268);
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 500]);
  const beginOpacity = interpolate(frame, [1290, 1310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase 1 visible: frames 0–170 (transitions out)
  const phase1Visible = frame < 370;
  // Phase 2 visible: 160–375
  const phase2Visible = frame >= 160 && frame < 520;
  // Phase 3 visible: 371–548
  const phase3Visible = frame >= 371 && frame < 650;
  // Phase 4 visible: 548+
  const phase4Visible = frame >= 548;

  return (
    <AbsoluteFill style={{ background: "#1A1A1A", fontFamily }}>
      <Audio src={staticFile("audio/intro.mp3")} volume={1} />

      {/* Background circles */}
      <BgCircles frame={frame} />

      {/* ── PHASE 1 ── */}
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
          {/* MODULE 2 label */}
          <div
            style={{
              position: frame >= 140 ? "relative" : "absolute",
              top: frame >= 140 ? 0 : 60,
              left: 0,
              right: frame >= 140 ? undefined : 0,
              textAlign: "center",
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

          {/* Critical Thinking */}
          {frame < 140 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 400,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily,
                  fontSize: 96,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  transform: `translateY(${titleY}px)`,
                  opacity: titleProgress,
                }}
              >
                Critical Thinking
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 510,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily,
                  fontSize: 96,
                  fontWeight: 900,
                  color: "#FF8300",
                  transform: `translateY(${subtitleY}px)`,
                  opacity: subtitleProgress,
                }}
              >
                & Problem Solving
              </div>
            </>
          )}
        </div>
      )}

      {/* Critical thinking illustration — phase 1 only */}
      {phase1Visible && frame < 370 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 560,
            transform: `translateX(-50%) translateY(${illustrationFloat}px) scale(${illustrationScale * illustrationPulse})`,
            transformOrigin: "top center",
            opacity: illustrationOpacity,
          }}
        >
          {/* Draw-on orange ring */}
          <svg
            width={440}
            height={440}
            viewBox="0 0 440 440"
            style={{ position: "absolute", top: -20, left: -20, pointerEvents: "none" }}
          >
            <circle
              cx={220}
              cy={220}
              r={195}
              fill="none"
              stroke="#FF8300"
              strokeWidth={3}
              strokeDasharray={ringDash}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
              opacity={0.6}
            />
          </svg>
          <Img
            src={staticFile("assets/critical-thinking.svg")}
            style={{ width: 400, height: 400 }}
          />
        </div>
      )}

      {/* ── PHASE 2 ── */}
      {phase2Visible && (
        <div style={{ opacity: frame >= 350 ? phase2Opacity : 1 }}>
          {inboxVisible && (
            <div style={{ position: "absolute", left: "50%", top: 320, transform: "translateX(-50%)" }}>
              <InboxSVG progress={inboxDrawProgress} />
            </div>
          )}
          <div
            style={{
              position: "absolute",
              left: 0, right: 0, top: 580,
              textAlign: "center",
              fontFamily,
              fontSize: 48,
              fontWeight: 700,
              color: "#FFFFFF",
              opacity: infoOpacity,
              transform: `translateY(${infoY}px)`,
            }}
          >
            Information
          </div>
          <div
            style={{
              position: "absolute",
              left: 0, right: 0, top: 650,
              textAlign: "center",
              fontFamily,
              fontSize: 48,
              fontWeight: 700,
              color: "#FF8300",
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
            }}
          >
            Problems
          </div>
        </div>
      )}

      {/* ── PHASE 3 ── */}
      {phase3Visible && (
        <div style={{ opacity: frame >= 520 ? phase3Opacity : 1 }}>
          {compassVisible && (
            <div style={{ position: "absolute", left: "50%", top: 340, transform: "translateX(-50%)" }}>
              <CompassSVG progress={compassDrawProgress} />
            </div>
          )}
          <div
            style={{
              position: "absolute",
              left: 0, right: 0, top: 590,
              textAlign: "center",
              fontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              opacity: calmOpacity,
              transform: `translateY(${calmY}px)`,
            }}
          >
            Calmly & Well
          </div>
        </div>
      )}

      {/* ── PHASE 4 ── */}
      {phase4Visible && (
        <>
          {mapVisible && (
            <div style={{ position: "absolute", left: "50%", top: 260, transform: "translateX(-50%)" }}>
              <MapSVG progress={mapDrawProgress} />
            </div>
          )}
          <div
            style={{
              position: "absolute",
              left: 0, right: 0, top: 490,
              textAlign: "center",
              fontFamily,
              fontSize: 64,
              fontWeight: 900,
              color: "#FF8300",
              opacity: sectionsOpacity,
              transform: `scale(${sectionsScale})`,
            }}
          >
            4 Sections
          </div>
          {/* placeholder circles */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 600,
              transform: "translateX(-50%)",
              display: "flex",
              gap: 40,
            }}
          >
            {placeholderCircles.map((op, i) => (
              <div
                key={i}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid #FF8300",
                  opacity: op,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── PHASE 5: section cards ── */}
      {sec1Visible && (
        <div style={{ position: "absolute", left: cardPositions[0], top: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <LightbulbSVG progress={sec1DrawProg} />
          <div style={{ fontFamily, fontSize: 40, fontWeight: 700, color: "#FFFFFF", opacity: sec1LabelOp, transform: `translateY(${sec1LabelY}px)` }}>
            Mindset
          </div>
        </div>
      )}

      {sec2Visible && (
        <div style={{ position: "absolute", left: cardPositions[1], top: 430, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <SixDotsSVG scale={sec2Scale} />
          <div style={{ fontFamily, fontSize: 40, fontWeight: 700, color: "#FFFFFF", opacity: sec2LabelOp, transform: `translateY(${sec2LabelY}px)` }}>
            Method
          </div>
        </div>
      )}

      {sec3Visible && (
        <div style={{ position: "absolute", left: cardPositions[2], top: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <WrenchSVG progress={sec3DrawProg} />
          <div style={{ fontFamily, fontSize: 40, fontWeight: 700, color: "#FFFFFF", opacity: sec3LabelOp, transform: `translateY(${sec3LabelY}px)` }}>
            Toolkit
          </div>
        </div>
      )}

      {sec4Visible && (
        <div style={{ position: "absolute", left: cardPositions[3], top: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <BriefcaseSVG progress={sec4DrawProg} />
          <div style={{ fontFamily, fontSize: 40, fontWeight: 700, color: "#FFFFFF", opacity: sec4LabelOp, transform: `translateY(${sec4LabelY}px)` }}>
            Real Case
          </div>
        </div>
      )}

      {/* ── PHASE 6 ── */}
      {frame >= 1268 && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 780,
              transform: "translateX(-50%)",
              width: lineWidth,
              height: 2,
              background: "#FF8300",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0, right: 0, top: 810,
              textAlign: "center",
              fontFamily,
              fontSize: 36,
              fontWeight: 300,
              color: "#53575A",
              opacity: beginOpacity,
            }}
          >
            Let's Begin
          </div>
        </>
      )}

      <Subtitle frame={frame} />
    </AbsoluteFill>
  );
};
