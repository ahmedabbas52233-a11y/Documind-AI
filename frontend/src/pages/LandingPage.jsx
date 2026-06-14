import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Brain, Shield, Zap, Clock, Lock, CheckCircle, Sparkles } from "lucide-react";
import { C, cardGlass } from "../theme";

const features = [
  { icon:Zap,      color:C.teal,    bg:C.tealDim,                          title:"Instant Results",    desc:"AI insights in seconds. Upload and get structured analysis immediately." },
  { icon:Brain,    color:"#818cf8", bg:"rgba(129,140,248,.1)",              title:"GPT-4o Analysis",    desc:"Structured summaries, key points, and recommendations from state-of-the-art AI." },
  { icon:Shield,   color:"#06b6d4", bg:"rgba(6,182,212,.08)",               title:"Sentiment Detection",desc:"Understand the emotional tone and bias of any document instantly." },
  { icon:FileText, color:"#22c55e", bg:"rgba(34,197,94,.08)",               title:"PDF & Image OCR",    desc:"pdfplumber for selectable PDFs, Tesseract OCR for scanned images." },
  { icon:Clock,    color:"#f59e0b", bg:"rgba(245,158,11,.08)",              title:"Full History",       desc:"Every analysis saved. Search, revisit, and delete from your dashboard." },
  { icon:Lock,     color:"#f87171", bg:"rgba(248,113,113,.08)",             title:"Guest Mode",         desc:"No account needed. Analyse immediately, create one to save your work." },
];

const steps = [
  {n:"01",t:"Upload",   d:"Drag & drop a PDF or image. Files validated and processed securely."},
  {n:"02",t:"Extract",  d:"pdfplumber or Tesseract OCR pulls the raw text from your document."},
  {n:"03",t:"Analyse",  d:"GPT-4o reads the text and returns structured JSON in real time via SSE."},
  {n:"04",t:"Insights", d:"Review the narrative summary, sentiment score, key points, and recommendations."},
];

export default function LandingPage() {
  return (
    <main id="main-content" style={{overflowX:"hidden"}}>

      {/* Hero */}
      <section aria-labelledby="hero-h" style={{
        minHeight:"92vh",display:"flex",alignItems:"center",
        justifyContent:"center",padding:"80px 24px",
        textAlign:"center",position:"relative",
      }}>
        <div className="mesh-bg" aria-hidden="true"/>

        <div style={{maxWidth:700,position:"relative",animation:"fade-up .6s ease both"}}>
          {/* Pill */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,
            padding:"5px 16px",borderRadius:99,marginBottom:28,
            background:C.tealDim,border:`1px solid ${C.tealBorder}`}}>
            <Sparkles size={13} color={C.teal} aria-hidden="true"/>
            <span style={{fontSize:13,color:C.teal,fontWeight:700}}>Powered by GPT-4o · FastAPI · React</span>
          </div>

          <h1 id="hero-h" style={{
            fontSize:"clamp(40px,7.5vw,78px)",fontWeight:900,
            letterSpacing:"-2.5px",lineHeight:1.02,color:C.text1,marginBottom:22,
          }}>
            Understand any{" "}
            <span style={{
              background:C.gradText,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            }}>document</span>
            <br/>in seconds
          </h1>

          <p style={{fontSize:18,color:C.text2,lineHeight:1.75,maxWidth:500,margin:"0 auto 40px"}}>
            Upload any PDF or image. DocuMind extracts the text, analyses the content with GPT-4o,
            and delivers structured insights in real time.
          </p>

          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginBottom:40}}>
            <Link to="/upload" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"13px 28px",borderRadius:10,background:C.grad,
              color:"#fff",fontWeight:700,fontSize:15,textDecoration:"none",
              boxShadow:C.gradGlow,
            }}>
              Try for free <ArrowRight size={16} aria-hidden="true"/>
            </Link>
            <Link to="/register" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"13px 28px",borderRadius:10,
              background:C.surface,border:`1px solid ${C.borderBright}`,
              color:C.text1,fontWeight:600,fontSize:15,textDecoration:"none",
            }}>
              Create account
            </Link>
          </div>

          <ul style={{display:"flex",flexWrap:"wrap",justifyContent:"center",
            gap:8,listStyle:"none",padding:0,margin:0}}>
            {["No credit card required","Works without an account","Results in under 10 seconds"].map(t=>(
              <li key={t} style={{display:"inline-flex",alignItems:"center",gap:5,
                padding:"4px 12px",borderRadius:99,fontSize:12,color:C.text3,
                background:C.surface,border:`1px solid ${C.border}`}}>
                <CheckCircle size={10} color={C.success} aria-hidden="true"/>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats bar */}
      <section aria-label="Key statistics" style={{
        borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,
        background:"rgba(20,184,166,.03)"}}>
        <ul style={{maxWidth:860,margin:"0 auto",padding:"28px 24px",
          display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
          listStyle:"none"}}>
          {[{v:"GPT-4o",l:"AI model"},{v:"< 10s",l:"Avg analysis"},{v:"5 MB",l:"Max file size"},{v:"Free",l:"No credit card"}].map(({v,l},i,a)=>(
            <li key={l} style={{textAlign:"center",padding:"8px 16px",
              borderRight:i<a.length-1?`1px solid ${C.border}`:"none"}}>
              <p style={{fontSize:24,fontWeight:800,color:C.teal,letterSpacing:"-.5px",margin:0}}>{v}</p>
              <p style={{fontSize:12,color:C.text3,margin:0}}>{l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Features */}
      <section aria-labelledby="feat-h" style={{maxWidth:1200,margin:"0 auto",padding:"80px 24px"}}>
        <header style={{textAlign:"center",marginBottom:56}}>
          <h2 id="feat-h" style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,
            color:C.text1,letterSpacing:"-.6px",marginBottom:10}}>
            Everything you need
          </h2>
          <p style={{color:C.text2,fontSize:16}}>
            Built for developers, researchers, and knowledge workers
          </p>
        </header>
        <ul style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",
          gap:1,listStyle:"none",padding:0,margin:0,
          border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden"}}>
          {features.map(({icon:Icon,color,bg,title,desc})=>(
            <li key={title} style={{
              padding:28,
              background:C.surface,
              borderRight:`1px solid ${C.border}`,
              borderBottom:`1px solid ${C.border}`,
              transition:"background .2s",
            }}>
              <div aria-hidden="true" style={{width:44,height:44,borderRadius:10,background:bg,
                display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                <Icon size={20} color={color}/>
              </div>
              <h3 style={{fontWeight:700,fontSize:16,color:C.text1,marginBottom:8}}>{title}</h3>
              <p style={{color:C.text2,fontSize:14,lineHeight:1.7}}>{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-h" style={{
        background:"rgba(20,184,166,.02)",
        borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:960,margin:"0 auto",padding:"80px 24px"}}>
          <header style={{textAlign:"center",marginBottom:52}}>
            <h2 id="how-h" style={{fontSize:"clamp(26px,4vw,36px)",fontWeight:800,
              color:C.text1,letterSpacing:"-.5px",marginBottom:10}}>How it works</h2>
            <p style={{color:C.text2,fontSize:15}}>From upload to insight in four steps</p>
          </header>
          <ol style={{listStyle:"none",padding:0,margin:0,
            display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:0,
            border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden"}}>
            {steps.map(({n,t,d},i,a)=>(
              <li key={n} style={{padding:"28px 22px",
                background:C.surface,
                borderRight:i<a.length-1?`1px solid ${C.border}`:"none"}}>
                <p aria-hidden="true" style={{fontFamily:"'JetBrains Mono',monospace",
                  fontSize:11,fontWeight:500,color:C.teal,marginBottom:16,letterSpacing:".05em"}}>{n}</p>
                <h3 style={{fontWeight:700,fontSize:16,color:C.text1,marginBottom:8}}>{t}</h3>
                <p style={{color:C.text2,fontSize:13,lineHeight:1.65}}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-h" style={{maxWidth:680,margin:"0 auto",padding:"88px 24px",textAlign:"center"}}>
        <h2 id="cta-h" style={{fontSize:"clamp(26px,4vw,40px)",fontWeight:800,
          color:C.text1,letterSpacing:"-.6px",marginBottom:14}}>
          Ready to analyse your first document?
        </h2>
        <p style={{color:C.text2,fontSize:16,maxWidth:400,margin:"0 auto 36px"}}>
          No account required. Drop a file and get results in seconds.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
          <Link to="/upload" style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"13px 30px",borderRadius:10,background:C.grad,
            color:"#fff",fontWeight:700,fontSize:15,textDecoration:"none",
            boxShadow:C.gradGlow,
          }}>
            Analyse a document <ArrowRight size={16} aria-hidden="true"/>
          </Link>
          <Link to="/register" style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"13px 28px",borderRadius:10,
            background:C.surface,border:`1px solid ${C.borderBright}`,
            color:C.text1,fontWeight:600,fontSize:15,textDecoration:"none",
          }}>Create account</Link>
        </div>
      </section>
    </main>
  );
}
