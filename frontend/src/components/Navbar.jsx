import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FileText, LogOut, Upload, History, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { C } from "../theme";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const active = (p) => pathname === p;
  const out = () => { logout(); navigate("/"); setOpen(false); };

  const link = (to, Icon, label) => (
    <Link to={to} role="menuitem" aria-current={active(to)?"page":undefined}
      onClick={()=>setOpen(false)}
      style={{
        display:"flex",alignItems:"center",gap:6,padding:"6px 12px",
        borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none",
        color: active(to)?C.teal:C.text2,
        background: active(to)?C.tealDim:"transparent",
        border:`1px solid ${active(to)?C.tealBorder:"transparent"}`,
        transition:"all .15s",
      }}>
      <Icon size={13} aria-hidden="true"/>{label}
    </Link>
  );

  return (
    <nav aria-label="Main navigation" style={{
      position:"sticky",top:0,zIndex:50,
      background:"rgba(8,8,8,.85)",
      backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:56,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>

        {/* Logo */}
        <Link to="/" aria-label="DocuMind AI home"
          style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <div style={{
            width:30,height:30,borderRadius:8,
            background:C.grad,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:`0 0 12px ${C.tealBorder}`,
          }} aria-hidden="true">
            <FileText size={14} color="#fff"/>
          </div>
          <span style={{fontWeight:800,fontSize:17,color:C.text1,letterSpacing:"-.3px"}}>
            Docu<span style={{color:C.teal}}>Mind</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex" style={{alignItems:"center",gap:4}} role="menubar">
          {isAuthenticated ? (
            <>
              {link("/upload",Upload,"Upload")}
              {link("/history",History,"History")}
              <div aria-hidden="true" style={{width:1,height:18,background:C.border,margin:"0 8px"}}/>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div aria-hidden="true" style={{
                  width:28,height:28,borderRadius:"50%",background:C.grad,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:700,color:"#fff",
                  boxShadow:`0 0 10px ${C.tealBorder}`,
                }}>
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <span style={{fontSize:12,color:C.text3,maxWidth:140,overflow:"hidden",
                  textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={user?.email}>
                  {user?.email}
                </span>
                <button onClick={out} aria-label="Sign out"
                  style={{background:"none",border:"none",cursor:"pointer",
                    color:C.text3,padding:5,borderRadius:6,display:"flex"}}>
                  <LogOut size={14} aria-hidden="true"/>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                padding:"6px 14px",borderRadius:8,fontSize:13,fontWeight:600,
                color:C.text2,textDecoration:"none",border:`1px solid ${C.border}`,
                transition:"border-color .15s",
              }}>Sign In</Link>
              <Link to="/register" style={{
                padding:"7px 16px",borderRadius:8,fontSize:13,fontWeight:700,
                background:C.grad,color:"#fff",textDecoration:"none",marginLeft:4,
                boxShadow:C.gradGlow,
              }}>Get Started</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="sm:hidden" onClick={()=>setOpen(!open)}
          aria-label={open?"Close menu":"Open menu"}
          aria-expanded={open} aria-controls="mobile-menu"
          style={{background:"none",border:"none",cursor:"pointer",color:C.text2,padding:4}}>
          {open?<X size={20} aria-hidden="true"/>:<Menu size={20} aria-hidden="true"/>}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" role="menu" className="sm:hidden"
          style={{borderTop:`1px solid ${C.border}`,padding:"12px 20px 16px",
            background:"rgba(8,8,8,.98)"}}>
          {isAuthenticated ? (
            <>
              {link("/upload",Upload,"Upload")}
              <div style={{marginTop:4}}>{link("/history",History,"History")}</div>
              <div style={{borderTop:`1px solid ${C.border}`,marginTop:10,paddingTop:10,
                display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:12,color:C.text3}}>{user?.email}</span>
                <button onClick={out} style={{
                  background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",
                  borderRadius:6,color:C.error,cursor:"pointer",padding:"5px 10px",
                  fontSize:12,display:"flex",gap:4,alignItems:"center"}}>
                  <LogOut size={11} aria-hidden="true"/> Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" role="menuitem" onClick={()=>setOpen(false)}
                style={{display:"block",padding:"8px 12px",color:C.text2,
                  textDecoration:"none",fontSize:14,fontWeight:600,marginBottom:6}}>Sign In</Link>
              <Link to="/register" role="menuitem" onClick={()=>setOpen(false)}
                style={{display:"block",padding:"9px 12px",background:C.grad,
                  color:"#fff",textDecoration:"none",fontSize:14,fontWeight:700,
                  borderRadius:8,textAlign:"center"}}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
