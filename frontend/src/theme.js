export const C = {
  // Base
  bg:      "#080808",
  surface: "rgba(255,255,255,.04)",
  surfaceHov: "rgba(255,255,255,.07)",
  border:  "rgba(255,255,255,.08)",
  borderBright: "rgba(255,255,255,.14)",

  // Text
  text1: "#f4f4f5",
  text2: "#a1a1aa",
  text3: "#71717a",

  // Teal accent (not indigo - stands out from 99% of dark portfolios)
  teal:     "#14b8a6",
  tealDark: "#0d9488",
  tealDim:  "rgba(20,184,166,.12)",
  tealBorder:"rgba(20,184,166,.3)",
  grad:     "linear-gradient(135deg,#0d9488,#14b8a6)",
  gradGlow: "0 8px 28px -4px rgba(20,184,166,.35)",
  gradText: "linear-gradient(135deg,#14b8a6,#06b6d4,#818cf8)",

  // Semantic
  success: "#22c55e", successDim:"rgba(34,197,94,.1)",
  error:   "#ef4444", errorDim:"rgba(239,68,68,.08)", errorBorder:"rgba(239,68,68,.2)",
  warn:    "#f59e0b", warnDim:"rgba(245,158,11,.08)",
  info:    "#818cf8", infoDim:"rgba(129,140,248,.1)",
};

export const card = {
  background:   C.surface,
  border:       `1px solid ${C.border}`,
  borderRadius: 16,
};

export const cardGlass = {
  background:         "rgba(255,255,255,.03)",
  border:             `1px solid ${C.border}`,
  borderRadius:       16,
  backdropFilter:     "blur(12px)",
  WebkitBackdropFilter:"blur(12px)",
  boxShadow:          "inset 0 1px 0 rgba(255,255,255,.06)",
};
