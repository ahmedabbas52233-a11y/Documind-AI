import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer aria-label="Site footer" style={{
      borderTop:"1px solid rgba(255,255,255,.06)",
      background:"rgba(8,12,24,.6)",
    }}>
      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"22px 24px",
        display:"flex", flexWrap:"wrap", gap:14,
        alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:26, height:26, borderRadius:7,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            display:"flex", alignItems:"center", justifyContent:"center" }}
            aria-hidden="true">
            <FileText size={12} color="#fff" />
          </div>
          <span style={{ fontWeight:700, color:"#e2e8f0", fontSize:14 }}>
            Docu<span style={{ color:"#818cf8" }}>Mind</span>
            <span style={{ color:"#64748b", fontWeight:400, fontSize:11, marginLeft:5 }}>v2.0</span>
          </span>
        </div>

        <nav aria-label="Footer links">
          <ul style={{ display:"flex", gap:18, listStyle:"none", padding:0, margin:0 }}>
            {[["Upload","/upload"],["History","/history"],["Register","/register"]].map(([l,h])=>(
              <li key={h}>
                <Link to={h} style={{ color:"#64748b", textDecoration:"none", fontSize:13,
                  transition:"color .15s" }}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p style={{ fontSize:12, color:"#475569" }}>
          FastAPI · React · GPT-4o
        </p>
      </div>
    </footer>
  );
}
