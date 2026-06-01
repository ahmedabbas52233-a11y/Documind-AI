import React from "react";
import { TrendingUp, TrendingDown, Minus, Lightbulb, CheckCircle2 } from "lucide-react";

const CFG = {
  positive: {
    Icon: TrendingUp,
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.25)",
    label: "Positive sentiment",
  },
  negative: {
    Icon: TrendingDown,
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.25)",
    label: "Negative sentiment",
  },
  neutral: {
    Icon: Minus,
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.2)",
    label: "Neutral sentiment",
  },
};

const card = {
  background: "rgba(13,17,32,0.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)",
};

const sectionLabel = {
  fontSize: 11, fontWeight: 600, color: "#94a3b8",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8,
};

export default function AnalysisCard({ title, sentiment, keyPoints = [], recommendations = [] }) {
  const cfg = CFG[sentiment] ?? CFG.neutral;
  const { Icon } = cfg;

  return (
    <section style={card} aria-label={`${title} — ${cfg.label}`}>
      <div
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 16,
        }}
      >
        <h2 style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 15 }}>{title}</h2>
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 99,
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            fontSize: 12, fontWeight: 600, color: cfg.color,
          }}
          aria-label={cfg.label}
        >
          <Icon size={11} aria-hidden="true" />
          {sentiment}
        </span>
      </div>

      {keyPoints.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <h3 style={sectionLabel}>Key Points</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {keyPoints.map((p, i) => (
              <li
                key={i}
                style={{
                  display: "flex", gap: 8, marginBottom: 6,
                  fontSize: 13, color: "#cbd5e1", alignItems: "flex-start",
                }}
              >
                <CheckCircle2
                  size={13}
                  color="#818cf8"
                  aria-hidden="true"
                  style={{ marginTop: 1, flexShrink: 0 }}
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3 style={sectionLabel}>Recommendations</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {recommendations.map((r, i) => (
              <li
                key={i}
                style={{
                  display: "flex", gap: 8, marginBottom: 6,
                  fontSize: 13, color: "#cbd5e1", alignItems: "flex-start",
                }}
              >
                <Lightbulb
                  size={13}
                  color="#fbbf24"
                  aria-hidden="true"
                  style={{ marginTop: 1, flexShrink: 0 }}
                />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
