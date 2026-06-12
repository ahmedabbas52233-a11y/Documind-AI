import React from "react";
import { TrendingUp, TrendingDown, Minus, Lightbulb, CheckCircle2 } from "lucide-react";

const CFG = {
  positive:{ Icon:TrendingUp,  color:"#4ade80", bg:"rgba(74,222,128,0.1)",  border:"rgba(74,222,128,0.25)"  },
  negative:{ Icon:TrendingDown, color:"#f87171", bg:"rgba(248,113,113,0.1)", border:"rgba(248,113,113,0.25)" },
  neutral: { Icon:Minus,        color:"#94a3b8", bg:"rgba(148,163,184,0.1)", border:"rgba(148,163,184,0.2)"  },
};

const card = { background:"rgba(13,17,32,0.8)", border:"1px solid rgba(255,255,255,0.08)",
               borderRadius:16, padding:20, boxShadow:"0 20px 60px -15px rgba(0,0,0,0.5)" };

export default function AnalysisCard({ title, sentiment, keyPoints=[], recommendations=[] }) {
  const cfg = CFG[sentiment] ?? CFG.neutral;
  const { Icon } = cfg;
  return (
    <div style={card}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <h3 style={{ fontWeight:700, color:"#f1f5f9", fontSize:15 }}>{title}</h3>
        <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px",
                       borderRadius:99, background:cfg.bg, border:`1px solid ${cfg.border}`,
                       fontSize:12, fontWeight:600, color:cfg.color }}>
          <Icon size={11}/>{sentiment}
        </span>
      </div>
      {keyPoints.length > 0 && (
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:11, fontWeight:600, color:"#475569", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Key Points</p>
          {keyPoints.map((p,i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13, color:"#94a3b8", alignItems:"flex-start" }}>
              <CheckCircle2 size={13} color="#818cf8" style={{ marginTop:1, flexShrink:0 }}/>{p}
            </div>
          ))}
        </div>
      )}
      {recommendations.length > 0 && (
        <div>
          <p style={{ fontSize:11, fontWeight:600, color:"#475569", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Recommendations</p>
          {recommendations.map((r,i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13, color:"#94a3b8", alignItems:"flex-start" }}>
              <Lightbulb size={13} color="#fbbf24" style={{ marginTop:1, flexShrink:0 }}/>{r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
