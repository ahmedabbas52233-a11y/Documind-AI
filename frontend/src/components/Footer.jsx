import React from "react";
import { Link } from "react-router-dom";
import { FileText, Github } from "lucide-react";
import { C } from "../theme";

const yr = new Date().getFullYear();

export default function Footer() {
  return (
    <footer aria-label="Site footer"
      style={{borderTop:`1px solid ${C.border}`,background:"rgba(8,8,8,.96)",marginTop:"auto"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px 28px",
        display:"grid",gridTemplateColumns:"1fr auto auto",gap:48,alignItems:"start"}}
        className="footer-grid">

        {/* Brand */}
        <div>
          <Link to="/" aria-label="DocuMind AI home"
            style={{display:"inline-flex",alignItems:"center",gap:9,
              textDecoration:"none",marginBottom:12}}>
            <div aria-hidden="true" style={{width:28,height:28,borderRadius:7,
              background:C.grad,display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:`0 0 10px ${C.tealBorder}`}}>
              <FileText size={12} color="#fff"/>
            </div>
            <span style={{fontWeight:800,fontSize:15,color:C.text1}}>
              Docu<span style={{color:C.teal}}>Mind</span>
            </span>
          </Link>
          <p style={{fontSize:13,color:C.text3,lineHeight:1.7,maxWidth:220,margin:"0 0 16px"}}>
            AI-powered document analysis. Upload any PDF or image and get structured insights instantly.
          </p>
          <a href="https://github.com/ahmedabbas52233-a11y/Documind-AI"
            target="_blank" rel="noopener noreferrer" aria-label="GitHub repository"
            style={{width:30,height:30,borderRadius:7,background:C.surface,
              border:`1px solid ${C.border}`,display:"inline-flex",
              alignItems:"center",justifyContent:"center",color:C.text2,textDecoration:"none"}}>
            <Github size={13} aria-hidden="true"/>
          </a>
        </div>

        {/* Product */}
        <nav aria-label="Product links">
          <p style={{fontSize:11,fontWeight:700,color:C.text2,textTransform:"uppercase",
            letterSpacing:".08em",marginBottom:14}}>Product</p>
          <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10}}>
            {[["Upload Document","/upload"],["Analysis History","/history"],["Create Account","/register"]].map(([l,h])=>(
              <li key={h}><Link to={h} style={{fontSize:13,color:C.text3,textDecoration:"none"}}>{l}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Account */}
        <nav aria-label="Account links">
          <p style={{fontSize:11,fontWeight:700,color:C.text2,textTransform:"uppercase",
            letterSpacing:".08em",marginBottom:14}}>Account</p>
          <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10}}>
            {[["Sign In","/login"],["Register","/register"]].map(([l,h])=>(
              <li key={h}><Link to={h} style={{fontSize:13,color:C.text3,textDecoration:"none"}}>{l}</Link></li>
            ))}
          </ul>
        </nav>
      </div>

      <div style={{borderTop:`1px solid ${C.border}`,maxWidth:1200,margin:"0 auto",
        padding:"14px 24px",display:"flex",flexWrap:"wrap",
        alignItems:"center",justifyContent:"space-between",gap:10}}>
        <p style={{fontSize:12,color:C.text3}}>© {yr} DocuMind AI. All rights reserved.</p>
        <p style={{fontSize:12,color:C.text3}}>Built with React, FastAPI &amp; OpenAI</p>
      </div>

      <style>{`@media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;gap:28px!important}}`}</style>
    </footer>
  );
}
