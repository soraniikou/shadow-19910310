import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import whiteFlowerImg from "@/assets/white-flower.png";

function isMarch10inJST() {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  return jst.getMonth() === 2 && jst.getDate() === 10;
}

const MESSAGES_NIGHT = [
  "その疲れは、いつか花を咲かせるための\n大切な土壌になります。\nいまはゆっくり休んでください。",
  "影があるということは、\nあなたが光の中にいる証拠です。\nそのままでいい。",
  "言葉にできただけで、もう十分勇気があります。\n今日もよく生きました。",
  "重さを感じるのは、\nそれだけ真剣に生きているから。\n少しだけ荷物を下ろして。",
  "春は、冬の土の中でしか育ちません。\nあなたの中にも、静かに芽が育っています。",
  "淋しさは、誰かを大切にできる心の証。\nその優しさを、まず自分にも向けてください。",
  "深夜に目が覚めても、\n朝はちゃんとやってきます。\nあなたのそばに、静かにいます。",
];

const MESSAGES_DAY = [
  "今日もここまで来られましたね。\nそれだけで、十分すごいことです。",
  "朝の光の中に、\nあなたへの小さな贈り物が隠れています。\nゆっくり探してみて。",
  "疲れたら、空を見上げてみてください。\n雲はいつも、自由に流れています。",
  "今日の重さは、\n明日の自分への手紙になります。\n急がなくていい。",
  "やさしくいられない日も、\nそれがあなたの正直さです。\n責めないで。",
  "お茶を一杯、ゆっくり飲んでください。\nそれだけで今日は十分です。",
];

const MESSAGES_BIRTHDAY = [
  "その影が、今日を祝福する花になります。\n生まれてきてくれてありがとう。",
  "春雷が、あなたの重さを弾き飛ばしました。\n今日だけは、軽やかに。",
  "白い花が、あなたの誕生日を静かに祝っています。\nここにいてくれてよかった。",
];

const FLOWERS_ANIM = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  delay: Math.random() * 1.4,
  size: 1.0 + Math.random() * 1.6,
  drift: (Math.random() - 0.5) * 80,
}));

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.8 + Math.random() * 3.2,
  type: i % 3,
  duration: 1.5 + Math.random() * 4,
  delay: Math.random() * 6,
}));

const COMETS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  startX: 10 + Math.random() * 40,
  startY: 5 + Math.random() * 30,
  delay: i * 3.5 + Math.random() * 2,
  length: 80 + Math.random() * 60,
}));

const DUST = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 5 + Math.random() * 8,
  duration: 5 + Math.random() * 6,
  delay: Math.random() * 4,
}));

function WhiteFlowerSVG() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 55 55)`}>
          <ellipse cx="55" cy="28" rx="11" ry="22" fill="white" opacity="0.95" />
        </g>
      ))}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={`s${i}`} transform={`rotate(${angle} 55 55)`}>
          <ellipse cx="55" cy="30" rx="7" ry="14" fill="rgba(180,220,180,0.18)" />
        </g>
      ))}
      <circle cx="55" cy="55" r="13" fill="#5aaa5a" />
      <circle cx="55" cy="55" r="9" fill="#7acc7a" />
      <circle cx="55" cy="55" r="5" fill="#a8e6a8" />
    </svg>
  );
}

function SproutSVG() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <path d="M45 80 Q45 50 45 30" stroke="#6b9e5e" strokeWidth="3" strokeLinecap="round" />
      <path d="M45 50 Q28 38 22 24 Q36 22 45 38" fill="#7bbe6e" opacity="0.9" />
      <path d="M45 44 Q62 32 68 18 Q54 18 45 34" fill="#8dd47c" opacity="0.9" />
      <ellipse cx="45" cy="82" rx="18" ry="5" fill="#a08060" opacity="0.5" />
    </svg>
  );
}

function OpalStoneSVG() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="opalBase" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e8f8ff" />
          <stop offset="25%" stopColor="#c8eeff" />
          <stop offset="50%" stopColor="#b0d8f0" />
          <stop offset="75%" stopColor="#a0c8e8" />
          <stop offset="100%" stopColor="#88b4d8" />
        </radialGradient>
        <radialGradient id="opalSheen1" cx="30%" cy="25%" r="50%">
          <stop offset="0%" stopColor="rgba(200,240,255,0.8)" />
          <stop offset="60%" stopColor="rgba(160,210,240,0.2)" />
          <stop offset="100%" stopColor="rgba(120,180,220,0)" />
        </radialGradient>
        <radialGradient id="opalSheen2" cx="65%" cy="55%" r="40%">
          <stop offset="0%" stopColor="rgba(220,200,255,0.5)" />
          <stop offset="100%" stopColor="rgba(180,160,230,0)" />
        </radialGradient>
        <radialGradient id="opalSheen3" cx="50%" cy="70%" r="35%">
          <stop offset="0%" stopColor="rgba(180,240,220,0.4)" />
          <stop offset="100%" stopColor="rgba(140,210,190,0)" />
        </radialGradient>
        <radialGradient id="opalHighlight" cx="35%" cy="30%" r="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="opalBlur">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {/* Outer glow */}
      <path d="M60 10 Q90 30 95 60 Q90 90 60 110 Q30 90 25 60 Q30 30 60 10Z" fill="rgba(160,210,240,0.15)" filter="url(#opalBlur)" />
      {/* Pointed opal body */}
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="url(#opalBase)" />
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="url(#opalSheen1)" />
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="url(#opalSheen2)" />
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="url(#opalSheen3)" />
      {/* Internal shimmer */}
      <ellipse cx="45" cy="48" rx="14" ry="8" fill="rgba(200,230,255,0.3)" transform="rotate(-20 45 48)" />
      <ellipse cx="72" cy="65" rx="10" ry="6" fill="rgba(200,180,255,0.25)" transform="rotate(15 72 65)" />
      <ellipse cx="55" cy="72" rx="12" ry="5" fill="rgba(160,230,210,0.25)" transform="rotate(-10 55 72)" />
      {/* Highlight */}
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="url(#opalHighlight)" />
      {/* Surface sparkles */}
      <circle cx="42" cy="38" r="3" fill="rgba(255,255,255,0.8)" />
      <circle cx="50" cy="32" r="1.5" fill="rgba(255,255,255,0.9)" />
      <circle cx="75" cy="50" r="2" fill="rgba(255,255,255,0.6)" />
      {/* Edge highlight */}
      <path d="M60 14 Q86 32 90 60 Q86 88 60 106 Q34 88 30 60 Q34 32 60 14Z" fill="none" stroke="rgba(200,235,255,0.4)" strokeWidth="1.5" />
    </svg>
  );
}

export default function Index() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("idle");
  const [stone, setStone] = useState("");
  const [message, setMessage] = useState("");
  const [showFlower, setShowFlower] = useState(false);
  const [showComet, setShowComet] = useState(false);
  const [showOpal, setShowOpal] = useState(false);

  useEffect(() => {
    const birthday = isMarch10inJST();
    setIsBirthday(birthday);
    if (birthday) setIsDark(true);
  }, []);

  const handleDeliver = () => {
    if (!text.trim()) return;
    setStone(text.trim());
    setText("");
    setShowFlower(false);
    setShowComet(false);
    setShowOpal(false);
    setPhase("sinking");

    setTimeout(() => {
      if (isBirthday) {
        const msg = MESSAGES_BIRTHDAY[Math.floor(Math.random() * MESSAGES_BIRTHDAY.length)];
        setMessage(msg);
        setPhase("flash");
        setTimeout(() => setPhase("blooming"), 600);
        setTimeout(() => setPhase("message"), 2400);
      } else if (isDark) {
        const msg = MESSAGES_NIGHT[Math.floor(Math.random() * MESSAGES_NIGHT.length)];
        setMessage(msg);
        setPhase("message");
        setShowComet(true);
        setTimeout(() => setShowComet(false), 3500);
        setTimeout(() => setShowOpal(true), 4000);
      } else {
        const msg = MESSAGES_DAY[Math.floor(Math.random() * MESSAGES_DAY.length)];
        setMessage(msg);
        setPhase("message");
        setTimeout(() => setShowFlower(true), 3000);
      }
    }, 4000);
  };

  const handleReset = () => {
    setPhase("idle");
    setStone("");
    setMessage("");
    setShowFlower(false);
    setShowComet(false);
    setShowOpal(false);
  };

  const theme = {
    bg: isDark
      ? "radial-gradient(ellipse at 25% 20%, #1e1b4b 0%, #0d0d1e 55%, #060612 100%)"
      : "radial-gradient(ellipse at 65% 25%, #fff8f0 0%, #faf0e0 40%, #f0e8d5 100%)",
    title: isDark ? "rgba(255,255,255,0.85)" : "#4a4030",
    sub: isDark ? "rgba(255,255,255,0.28)" : "#b0a090",
    inputBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)",
    inputBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(180,160,130,0.4)",
    inputColor: isDark ? "rgba(255,255,255,0.85)" : "#5a4f40",
    btnBg: isDark ? "rgba(255,255,255,0.1)" : "#5a4f40",
    btnColor: isDark ? "rgba(255,255,255,0.75)" : "white",
    btnBorder: isDark ? "rgba(255,255,255,0.15)" : "transparent",
    stoneBg: isDark ? "rgba(255,255,255,0.07)" : "rgba(90,79,64,0.07)",
    stoneColor: isDark ? "rgba(255,255,255,0.55)" : "#8a7a68",
    msgColor: isDark ? "rgba(255,255,255,0.82)" : "#5a4f40",
    resetBorder: isDark ? "rgba(255,255,255,0.15)" : "rgba(180,160,130,0.5)",
    resetColor: isDark ? "rgba(255,255,255,0.3)" : "#b0a090",
    footer: isDark ? "rgba(255,255,255,0.45)" : "rgba(90,79,64,0.5)",
    toggleBg: isDark ? "rgba(255,255,255,0.08)" : "rgba(90,79,64,0.08)",
    toggleColor: isDark ? "rgba(255,255,255,0.5)" : "#9a8a78",
    toggleBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(180,160,130,0.4)",
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.bg,
        overflow: "hidden",
        position: "relative",
        padding: "24px 16px",
        boxSizing: "border-box",
        transition: "background 1.2s ease",
      }}
    >
      {/* Night stars */}
      {isDark &&
        STARS.map((s) => (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background:
                s.type === 2
                  ? "rgba(255,255,255,1)"
                  : s.type === 1
                  ? "rgba(220,235,255,0.9)"
                  : "rgba(180,200,255,0.7)",
              pointerEvents: "none",
              boxShadow:
                s.type === 2
                  ? `0 0 ${s.size * 3}px ${s.size}px rgba(200,220,255,0.8), 0 0 ${s.size * 6}px rgba(180,200,255,0.4)`
                  : s.type === 1
                  ? `0 0 ${s.size * 2}px rgba(200,220,255,0.5)`
                  : "none",
            }}
            animate={
              s.type === 2
                ? { opacity: [0.1, 1, 0.3, 1, 0.1], scale: [0.8, 1.4, 0.9, 1.3, 0.8] }
                : s.type === 1
                ? { opacity: [0.2, 0.9, 0.2] }
                : { opacity: [0.05, 0.4, 0.05] }
            }
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}

      {/* Star crosses */}
      {isDark &&
        STARS.filter((s) => s.type === 2 && s.size > 2.5).map((s) => (
          <motion.div
            key={`cross-${s.id}`}
            style={{
              position: "absolute",
              left: `calc(${s.x}% - 12px)`,
              top: `calc(${s.y}% - 1px)`,
              width: 24,
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(220,235,255,0.8), transparent)",
              pointerEvents: "none",
            }}
            animate={{ opacity: [0, 0.8, 0], scaleX: [0.5, 1.2, 0.5] }}
            transition={{
              duration: s.duration * 0.8,
              repeat: Infinity,
              delay: s.delay + 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Shooting stars - realistic comet effect */}
      {isDark &&
        showComet &&
        COMETS.map((c) => (
          <motion.div
            key={c.id}
            style={{
              position: "absolute",
              left: `${c.startX}%`,
              top: `${c.startY}%`,
              pointerEvents: "none",
              transformOrigin: "right center",
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 30 }}
            animate={{ opacity: [0, 1, 1, 0], x: 260, y: 180 }}
            transition={{ duration: 1.8, delay: c.delay * 0.3, ease: "easeOut" }}
          >
            {/* Comet head - bright white core */}
            <div style={{
              position: "absolute",
              right: 0,
              top: -3,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 8px 4px rgba(255,255,255,0.9), 0 0 20px 8px rgba(200,220,255,0.6), 0 0 40px 16px rgba(150,180,255,0.3)",
            }} />
            {/* Main tail */}
            <div style={{
              width: c.length,
              height: 2,
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(180,200,255,0.15) 20%, rgba(200,220,255,0.5) 60%, rgba(240,248,255,0.9) 90%, rgba(255,255,255,1) 100%)",
              borderRadius: 1,
            }} />
            {/* Wider diffuse tail */}
            <div style={{
              position: "absolute",
              top: -2,
              width: c.length * 0.7,
              height: 5,
              right: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(180,200,255,0.08) 40%, rgba(200,220,255,0.2) 80%, rgba(220,240,255,0.4) 100%)",
              borderRadius: 3,
              filter: "blur(2px)",
            }} />
          </motion.div>
        ))}

      {/* Day dust particles */}
      {!isDark &&
        DUST.map((d) => (
          <motion.div
            key={d.id}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,200,80,0.8) 0%, rgba(255,160,40,0.2) 100%)",
              pointerEvents: "none",
              filter: "blur(2.5px)",
            }}
            animate={{ y: [-14, 14, -14], opacity: [0.3, 0.85, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          />
        ))}

      {/* Glow ring */}
      <motion.div
        style={{
          position: "absolute",
          width: "min(600px, 130vw)",
          height: "min(600px, 130vw)",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(255,180,60,0.14) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mode toggle */}
      {!isBirthday && (
        <motion.button
          onClick={() => {
            setIsDark((d) => !d);
            handleReset();
          }}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            padding: "7px 18px",
            borderRadius: 999,
            background: theme.toggleBg,
            border: `1px solid ${theme.toggleBorder}`,
            color: theme.toggleColor,
            fontSize: 13,
            letterSpacing: "0.15em",
            cursor: "pointer",
            fontFamily: "sans-serif",
            backdropFilter: "blur(8px)",
            transition: "all 0.6s ease",
          }}
          whileTap={{ scale: 0.94 }}
        >
          {isDark ? "☀️ 昼" : "🌙 夜"}
        </motion.button>
      )}

      {/* Birthday indicator */}
      {isBirthday && (
        <motion.div
          style={{
            position: "absolute",
            top: 20,
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "sans-serif",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          03-10 &nbsp;•&nbsp; Born
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "clamp(32px, 8vw, 56px)", zIndex: 1 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
      >
        <h1
          style={{
            fontSize: "clamp(22px, 6vw, 34px)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: theme.title,
            fontFamily: "var(--font-serif-jp)",
            margin: "0 0 10px",
            lineHeight: 1.4,
            transition: "color 1s ease",
          }}
        >
          影を、届ける
        </h1>
        <p
          style={{
            fontSize: "clamp(10px, 2.5vw, 12px)",
            letterSpacing: "0.2em",
            color: theme.sub,
            margin: 0,
            fontFamily: "sans-serif",
            transition: "color 1s ease",
          }}
        >
          疲れも、淋しさも、ここに置いていける
        </p>
      </motion.div>

      {/* Main area */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          zIndex: 1,
          minHeight: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Input */}
          {phase === "idle" && (
            <motion.div
              key="input"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: "100%",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7 }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDeliver()}
                placeholder="今日の影を、言葉にしてみて"
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 20,
                  border: `1px solid ${theme.inputBorder}`,
                  background: theme.inputBg,
                  color: theme.inputColor,
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  outline: "none",
                  backdropFilter: "blur(12px)",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-sans-jp)",
                  transition: "all 0.8s ease",
                }}
              />
              <motion.button
                onClick={handleDeliver}
                whileTap={{ scale: 0.94 }}
                style={{
                  padding: "11px 36px",
                  borderRadius: 999,
                  background: theme.btnBg,
                  color: theme.btnColor,
                  border: `1px solid ${theme.btnBorder}`,
                  fontSize: "clamp(12px, 3vw, 14px)",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  transition: "all 0.8s ease",
                }}
              >
                届ける
              </motion.button>
            </motion.div>
          )}

          {/* Stone sinking */}
          {phase === "sinking" && (
            <motion.div
              key="stone"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: 230, scale: 0.58 }}
              transition={{ duration: 3.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ rotate: [0, -3, 3, -2, 0] }}
                transition={{ duration: 0.9, repeat: 4 }}
                style={{
                  padding: "12px 22px",
                  borderRadius: 16,
                  background: theme.stoneBg,
                  color: theme.stoneColor,
                  border: `1px solid ${theme.inputBorder}`,
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  fontFamily: "sans-serif",
                  maxWidth: "80vw",
                  wordBreak: "break-all",
                }}
              >
                {stone}
              </motion.div>
              <span
                style={{
                  fontSize: 11,
                  color: theme.sub,
                  letterSpacing: "0.15em",
                  fontFamily: "sans-serif",
                }}
              >
                深く、沈んでいく…
              </span>
            </motion.div>
          )}

          {/* Thunder flash */}
          {phase === "flash" && (
            <motion.div
              key="flash"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                background: "rgba(210,225,255,0.85)",
                pointerEvents: "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.2, 0.9, 0] }}
              transition={{ duration: 0.5, times: [0, 0.1, 0.3, 0.5, 1] }}
            />
          )}

          {/* Birthday blooming */}
          {phase === "blooming" && (
            <motion.div
              key="bloom"
              style={{
                position: "relative",
                width: "100%",
                height: 200,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {FLOWERS_ANIM.map((f) => (
                <motion.span
                  key={f.id}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: `${f.x}%`,
                    fontSize: `${f.size}rem`,
                    userSelect: "none",
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: -220,
                    opacity: [0, 1, 1, 0],
                    x: f.drift,
                    rotate: f.drift * 2.5,
                  }}
                  transition={{ duration: 1.8, delay: f.delay, ease: "easeOut" }}
                >
                  🌼
                </motion.span>
              ))}
              <motion.p
                style={{
                  position: "absolute",
                  bottom: 0,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.12em",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                春雷が、石を弾いた
              </motion.p>
            </motion.div>
          )}

          {/* Message */}
          {phase === "message" && (
            <motion.div
              key="message"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: "0 8px",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
            >
              {/* Icon area */}
              <div
                style={{
                  position: "relative",
                  width: 130,
                  height: 130,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Night: comet → opal */}
                {isDark && !isBirthday && (
                  <>
                    <AnimatePresence>
                      {showComet && (
                        <motion.div
                          key="comet-icon"
                          style={{ position: "absolute" }}
                          initial={{ opacity: 0, x: -60, y: -40, scale: 0.5 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            x: [-60, 0, 40],
                            y: [-40, 0, 30],
                            scale: [0.5, 1.1, 0.8],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2.5, ease: "easeInOut" }}
                        >
                          {/* Realistic comet icon */}
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            background: "white",
                            boxShadow: "0 0 12px 6px rgba(255,255,255,0.8), 0 0 30px 12px rgba(200,220,255,0.5), 0 0 50px 20px rgba(150,180,255,0.2)",
                          }} />
                          <div style={{
                            position: "absolute", top: 6, right: 14, width: 60, height: 4,
                            background: "linear-gradient(90deg, rgba(200,220,255,0.6), transparent)",
                            borderRadius: 2, filter: "blur(1.5px)", transform: "rotate(15deg)",
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showOpal && (
                        <motion.div
                          key="opal"
                          style={{ position: "absolute" }}
                          initial={{ opacity: 0, scale: 0.3, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 2.5, ease: "easeOut" }}
                        >
                          <OpalStoneSVG />
                          <motion.div
                            style={{
                              position: "absolute",
                              inset: -10,
                              borderRadius: "50%",
                              background:
                                "radial-gradient(circle, rgba(160,220,255,0.3) 0%, transparent 70%)",
                              pointerEvents: "none",
                            }}
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.95, 1.05, 0.95],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!showComet && !showOpal && (
                      <motion.div
                        style={{
                          fontSize: 16,
                          color: "rgba(255,255,255,0.15)",
                          letterSpacing: "0.2em",
                        }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✦
                      </motion.div>
                    )}
                  </>
                )}

                {/* Day: sprout → flower */}
                {!isDark && (
                  <AnimatePresence mode="wait">
                    {!showFlower ? (
                      <motion.div
                        key="sprout"
                        style={{ position: "absolute" }}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, y: 10 }}
                        transition={{ duration: 1.5 }}
                      >
                        <SproutSVG />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="flower"
                        style={{ position: "absolute" }}
                        initial={{ opacity: 0, scale: 0.2, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 2.7, ease: "easeOut" }}
                      >
                        <img
                          src={whiteFlowerImg}
                          alt="白い花"
                          style={{
                            width: 130,
                            height: 130,
                            objectFit: "cover",
                            borderRadius: "50%",
                            boxShadow: "0 0 30px 10px rgba(255,255,255,0.2)",
                          }}
                        />
                        <motion.div
                          style={{
                            position: "absolute",
                            inset: -15,
                            borderRadius: "50%",
                            background:
                              "radial-gradient(circle, rgba(255,220,80,0.4) 0%, transparent 70%)",
                            pointerEvents: "none",
                          }}
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 3.5, opacity: 0 }}
                          transition={{ duration: 2.7 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Birthday */}
                {isBirthday && (
                  <motion.div
                    style={{ fontSize: 64 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    🌼
                  </motion.div>
                )}
              </div>

              <p
                style={{
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  lineHeight: 2.2,
                  color: theme.msgColor,
                  fontFamily: "var(--font-serif-jp)",
                  letterSpacing: "0.08em",
                  whiteSpace: "pre-line",
                  margin: 0,
                  transition: "color 1s ease",
                }}
              >
                {message}
              </p>

              <motion.button
                onClick={handleReset}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginTop: 8,
                  padding: "8px 24px",
                  borderRadius: 999,
                  background: "transparent",
                  border: `1px solid ${theme.resetBorder}`,
                  color: theme.resetColor,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                }}
              >
                もう一度
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.p
        style={{
          position: "absolute",
          bottom: 20,
          fontSize: 15,
          letterSpacing: "0.25em",
          color: theme.footer,
          fontFamily: "var(--font-serif-jp)",
          margin: 0,
          transition: "color 1s ease",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        白い花は、いつも咲いている
      </motion.p>
    </div>
  );
}
