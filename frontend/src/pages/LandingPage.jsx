import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Brain, Shield, Zap, Clock, Lock, CheckCircle } from "lucide-react";

const G = {
  page:    { overflowX:"hidden" },
  section: { padding:"0 24px" },
};

const features = [
  { icon:Zap,      color:"#818cf8", bg:"rgba(99,102,241,.1)",   title:"Instant Results",    desc:"Get AI-powered document insights in seconds — no waiting, no queue." },
  { icon:Brain,    color:"#c084fc", bg:"rgba(192,132,252,.1)",  title:"Smart Summaries",    desc:"GPT-4o reads your document and produces structured, human-quality analysis." },
  { icon:Shield,   color:"#22d3ee", bg:"rgba(34,211,238,.08)",  title:"Sentiment Analysis", desc:"Instantly understand whether a document is positive, negative, or neutral." },
  { icon:FileText, color:"#4ade80", bg:"rgba(74,222,128,.08)",  title:"PDF & Image OCR",    desc:"Upload PDFs or scanned images. Tesseract extracts text from any format." },
  { icon:Clock,    color:"#fbbf24", bg:"rgba(251,191,36,.08)",  title:"Full History",       desc:"Every analysis saved to your account. Search, review, and re-analyse anytime." },
  { icon:Lock,     color:"#f87171", bg:"rgba(248,113,113,.08)", title:"Guest Mode",         desc:"No account required. Upload and analyse immediately, create one to save." },
];

export default function LandingPage() {
  return (
    <main id="main-content" style={G.page}>

      {/* ── Hero ── */}
      <section aria-labelledby="hero-h" style={{
        minHeight:"90vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding:"72px 24px", textAlign:"center", position:"relative",
      }}>
        {/* Orb decorations */}
        <div aria-hidden="true" style={{ position:"absolute", top:-60, left:"15%", width:520, height:520,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(79,70,229,.18) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div aria-hidden="true" style={{ position:"absolute", bottom:40, right:"5%", width:380, height:380,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:700, position:"relative", animation:"fade-up .5s ease both" }}>
          {/* Eyebrow */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:7,
            padding:"5px 14px", borderRadius:99, marginBottom:28,
            background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.2)",
          }}>
            <span aria-hidden="true" style={{ width:6, height:6, borderRadius:"50%", background:"#818cf8", display:"inline-block" }} />
            <span style={{ fontSize:13, color:"#a5b4fc", fontWeight:600 }}>Powered by GPT-4o · FastAPI · React</span>
          </div>

          {/* Heading */}
          <h1 id="hero-h" style={{
            fontSize:"clamp(38px,7vw,72px)", fontWeight:900, letterSpacing:"-2px",
            lineHeight:1.05, color:"#fff", marginBottom:22,
          }}>
            Understand every{" "}
            <span style={{
              background:"linear-gradient(135deg,#818cf8,#c084fc,#22d3ee)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>document</span>
            <br />in seconds
          </h1>

          <p style={{ fontSize:18, color:"#94a3b8", lineHeight:1.7, maxWidth:520, margin:"0 auto 36px" }}>
            Upload any PDF or image. DocuMind AI extracts the text, analyses the content,
            and delivers structured insights instantly.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:36 }}>
            <Link to="/upload" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"13px 28px", borderRadius:10,
              background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
              color:"#fff", fontWeight:700, fontSize:15, textDecoration:"none",
              boxShadow:"0 8px 28px -4px rgba(99,102,241,.5)",
            }}>
              Try it free <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/register" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"13px 28px", borderRadius:10,
              background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)",
              color:"#cbd5e1", fontWeight:600, fontSize:15, textDecoration:"none",
            }}>
              Create account
            </Link>
          </div>

          {/* Trust pills */}
          <ul style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, listStyle:"none", padding:0, margin:0 }}>
            {["No credit card required","Works without signup","5 MB file limit","Guest mode available"].map(t => (
              <li key={t} style={{
                display:"inline-flex", alignItems:"center", gap:5,
                padding:"4px 12px", borderRadius:99, fontSize:12, color:"#94a3b8",
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
              }}>
                <CheckCircle size={10} color="#4ade80" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section aria-labelledby="feat-h" style={{ ...G.section, maxWidth:1160, margin:"0 auto", paddingBottom:80 }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <h2 id="feat-h" style={{ fontSize:34, fontWeight:800, color:"#f1f5f9", letterSpacing:"-.5px", marginBottom:10 }}>
            Everything you need
          </h2>
          <p style={{ color:"#94a3b8", fontSize:16 }}>Built for developers, researchers, and knowledge workers</p>
        </div>

        <ul style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",
          gap:16, listStyle:"none", padding:0, margin:0,
        }}>
          {features.map(({ icon:Icon, color, bg, title, desc }) => (
            <li key={title} style={{
              background:"rgba(15,20,40,.8)",
              border:"1px solid rgba(255,255,255,.07)",
              borderRadius:16, padding:24,
              transition:"border-color .2s, transform .2s",
            }}>
              <div style={{
                width:42, height:42, borderRadius:10, background:bg,
                display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14,
              }} aria-hidden="true">
                <Icon size={19} color={color} />
              </div>
              <h3 style={{ fontWeight:700, fontSize:16, color:"#f1f5f9", marginBottom:7 }}>{title}</h3>
              <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.65 }}>{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Steps ── */}
      <section aria-labelledby="how-h" style={{ ...G.section, maxWidth:640, margin:"0 auto", paddingBottom:96 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h2 id="how-h" style={{ fontSize:30, fontWeight:800, color:"#f1f5f9", letterSpacing:"-.4px", marginBottom:8 }}>
            How it works
          </h2>
          <p style={{ color:"#94a3b8" }}>Three steps from upload to insight</p>
        </div>

        <ol style={{
          listStyle:"none", padding:0, margin:"0 0 32px",
          background:"rgba(15,20,40,.8)",
          border:"1px solid rgba(255,255,255,.07)", borderRadius:16,
        }}>
          {[
            ["Upload",   "Drag & drop a PDF or image. Files processed securely, never stored beyond your session (guest mode) or account."],
            ["Analyse",  "Our backend extracts text via pdfplumber or Tesseract OCR, then streams it to GPT-4o for analysis."],
            ["Insights", "Review a structured breakdown: narrative summary, sentiment score, key points, and concrete recommendations."],
          ].map(([t, d], i, arr) => (
            <li key={t}>
              <div style={{ display:"flex", gap:14, padding:"20px 24px" }}>
                <div style={{
                  width:34, height:34, borderRadius:9,
                  background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:800, color:"#fff", fontSize:14, flexShrink:0,
                }} aria-hidden="true">{i+1}</div>
                <div>
                  <p style={{ fontWeight:700, color:"#f1f5f9", marginBottom:3 }}>{t}</p>
                  <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.6 }}>{d}</p>
                </div>
              </div>
              {i < arr.length-1 && <div style={{ height:1, background:"rgba(255,255,255,.05)", margin:"0 24px" }} aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div style={{ textAlign:"center" }}>
          <Link to="/upload" style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"13px 28px", borderRadius:10,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            color:"#fff", fontWeight:700, fontSize:15, textDecoration:"none",
            boxShadow:"0 8px 28px -4px rgba(99,102,241,.5)",
          }}>
            Analyse your first document <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
