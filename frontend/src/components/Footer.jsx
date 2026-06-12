import React from "react";
import { Link } from "react-router-dom";
import { FileText, Github } from "lucide-react";
import { C } from "../theme";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer aria-label="Site footer"
      style={{ borderTop:`1px solid ${C.border}`, background:"rgba(12,12,16,.97)", marginTop:"auto" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"44px 24px 32px",
        display:"grid", gridTemplateColumns:"1fr auto auto", gap:48, alignItems:"start" }}
        className="footer-grid">
        {/* Brand */}
        <div>
          <Link to="/" aria-label="DocuMind AI home"
            style={{ display:"inline-flex", alignItems:"center", gap:9,
              textDecoration:"none", marginBottom:14 }}>
            <div aria-hidden="true" style={{ width:30, height:30, borderRadius:8,
              background:C.grad, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <FileText size={13} color="#fff" />
            </div>
            <span style={{ fontWeight:800, fontSize:16, color:C.textPrimary }}>
              Docu<span style={{ color:C.info }}>Mind</span>
            </span>
          </Link>
          <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.7, maxWidth:230, margin:"0 0 18px" }}>
            AI-powered document analysis. Upload any PDF or image and get structured insights instantly.
          </p>
          <a href="https://github.com/ahmedabbas52233-a11y/Documind-AI"
            target="_blank" rel="noopener noreferrer" aria-label="GitHub repository"
            style={{ width:32, height:32, borderRadius:8,
              background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              color:C.textMuted, textDecoration:"none" }}>
            <Github size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Product links */}
        <nav aria-label="Product links">
          <p style={{ fontSize:11, fontWeight:700, color:C.textSecondary,
            textTransform:"uppercase", letterSpacing:".08em", marginBottom:14 }}>Product</p>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10 }}>
            {[["Upload Document","/upload"],["Analysis History","/history"],["Create Account","/register"]].map(([l,h]) => (
              <li key={h}>
                <Link to={h} style={{ fontSize:14, color:C.textMuted, textDecoration:"none" }}>{l}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account links */}
        <nav aria-label="Account links">
          <p style={{ fontSize:11, fontWeight:700, color:C.textSecondary,
            textTransform:"uppercase", letterSpacing:".08em", marginBottom:14 }}>Account</p>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10 }}>
            {[["Sign In","/login"],["Register","/register"]].map(([l,h]) => (
              <li key={h}>
                <Link to={h} style={{ fontSize:14, color:C.textMuted, textDecoration:"none" }}>{l}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:`1px solid ${C.border}`, maxWidth:1160, margin:"0 auto",
        padding:"16px 24px", display:"flex", flexWrap:"wrap",
        alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <p style={{ fontSize:12, color:C.textMuted }}>© {year} DocuMind AI. All rights reserved.</p>
        <p style={{ fontSize:12, color:C.textMuted }}>Built with React, FastAPI &amp; OpenAI</p>
      </div>

      <style>{`
        @media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;gap:28px!important}}
      `}</style>
    </footer>
  );
}
