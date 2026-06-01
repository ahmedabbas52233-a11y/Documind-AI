import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FileText, LogOut, Upload, History, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
<<<<<<< HEAD
import { C } from "../theme";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate    = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive  = (p) => pathname === p;
  const handleOut = () => { logout(); navigate("/"); setOpen(false); };
=======

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const active = (p) => pathname === p;
  const handleLogout = () => { logout(); navigate("/"); setOpen(false); };
>>>>>>> origin/main

  const navLink = (to, Icon, label) => (
    <Link
      to={to}
      role="menuitem"
<<<<<<< HEAD
      aria-current={isActive(to) ? "page" : undefined}
      onClick={() => setOpen(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 7,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: "none",
        transition: "all .15s",
        color:      isActive(to) ? "#a5b4fc" : C.textMuted,
        background: isActive(to) ? "rgba(99,102,241,.1)" : "transparent",
        border:     `1px solid ${isActive(to) ? "rgba(99,102,241,.2)" : "transparent"}`,
=======
      aria-current={active(to) ? "page" : undefined}
      onClick={() => setOpen(false)}
      style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"6px 12px", borderRadius:7, fontSize:13, fontWeight:500,
        textDecoration:"none", transition:"all .15s",
        color: active(to) ? "#a5b4fc" : "#94a3b8",
        background: active(to) ? "rgba(99,102,241,.1)" : "transparent",
        border: `1px solid ${active(to) ? "rgba(99,102,241,.2)" : "transparent"}`,
>>>>>>> origin/main
      }}
    >
      <Icon size={13} aria-hidden="true" />
      {label}
    </Link>
  );

  return (
<<<<<<< HEAD
    <nav
      aria-label="Main navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(12,12,16,.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="DocuMind AI — Home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            textDecoration: "none",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: C.grad,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={14} color="#fff" />
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: 17,
              color: C.textPrimary,
              letterSpacing: "-.4px",
            }}
          >
            Docu<span style={{ color: C.info }}>Mind</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden sm:flex"
          style={{ alignItems: "center", gap: 4 }}
          role="menubar"
        >
=======
    <nav aria-label="Main navigation" style={{
      position:"sticky", top:0, zIndex:50,
      background:"rgba(8,12,24,.85)",
      backdropFilter:"blur(20px)",
      WebkitBackdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(255,255,255,.06)",
    }}>
      <div style={{
        maxWidth:1200, margin:"0 auto",
        padding:"0 24px", height:58,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        {/* Logo */}
        <Link to="/" aria-label="DocuMind AI home" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none" }}>
          <div style={{
            width:32, height:32, borderRadius:9,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }} aria-hidden="true">
            <FileText size={15} color="#fff" />
          </div>
          <span style={{ fontWeight:800, fontSize:17, color:"#f1f5f9", letterSpacing:"-.4px" }}>
            Docu<span style={{ color:"#818cf8" }}>Mind</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex" style={{ alignItems:"center", gap:4 }} role="menubar">
>>>>>>> origin/main
          {isAuthenticated ? (
            <>
              {navLink("/upload",  Upload,  "Upload")}
              {navLink("/history", History, "History")}
<<<<<<< HEAD
              <div
                aria-hidden="true"
                style={{
                  width: 1,
                  height: 18,
                  background: C.border,
                  margin: "0 8px",
                }}
              />
              {/* Avatar + email */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: C.grad,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: C.textMuted,
                    maxWidth: 150,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={user?.email}
                >
                  {user?.email}
                </span>
                <button
                  onClick={handleOut}
                  aria-label="Sign out"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.textMuted,
                    padding: 5,
                    borderRadius: 6,
                    display: "flex",
                    transition: "color .15s",
                  }}
                >
=======
              <div style={{ width:1, height:18, background:"rgba(255,255,255,.08)", margin:"0 6px" }} aria-hidden="true" />
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  width:26, height:26, borderRadius:"50%",
                  background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:700, color:"#fff",
                }} aria-hidden="true">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize:12, color:"#64748b", maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={user?.email}>
                  {user?.email}
                </span>
                <button onClick={handleLogout} aria-label="Sign out"
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#64748b",
                    padding:5, borderRadius:6, display:"flex", transition:"color .15s" }}>
>>>>>>> origin/main
                  <LogOut size={14} aria-hidden="true" />
                </button>
              </div>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <Link
                to="/login"
                style={{
                  padding: "6px 14px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.textMuted,
                  textDecoration: "none",
                  border: `1px solid ${C.border}`,
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  padding: "7px 16px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 600,
                  background: C.grad,
                  color: "#fff",
                  textDecoration: "none",
                  marginLeft: 4,
                  boxShadow: "0 4px 14px -3px rgba(99,102,241,.4)",
                }}
              >
                Get Started
              </Link>
=======
              <Link to="/login" style={{
                padding:"6px 14px", borderRadius:7, fontSize:13, fontWeight:500,
                color:"#94a3b8", textDecoration:"none",
                border:"1px solid rgba(255,255,255,.08)",
              }}>Sign In</Link>
              <Link to="/register" style={{
                padding:"7px 16px", borderRadius:7, fontSize:13, fontWeight:600,
                background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
                color:"#fff", textDecoration:"none", marginLeft:4,
              }}>Get Started</Link>
>>>>>>> origin/main
            </>
          )}
        </div>

        {/* Hamburger */}
<<<<<<< HEAD
        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.textMuted,
            padding: 4,
          }}
        >
          {open
            ? <X    size={20} aria-hidden="true" />
            : <Menu size={20} aria-hidden="true" />}
=======
        <button className="sm:hidden" onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open} aria-controls="mobile-menu"
          style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", padding:4 }}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
>>>>>>> origin/main
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
<<<<<<< HEAD
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
          className="sm:hidden"
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: "12px 20px 16px",
            background: "rgba(12,12,16,.98)",
          }}
        >
          {isAuthenticated ? (
            <>
              {navLink("/upload",  Upload,  "Upload")}
              <div style={{ marginTop: 4 }}>
                {navLink("/history", History, "History")}
              </div>
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  marginTop: 10,
                  paddingTop: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 12, color: C.textMuted }}>
                  {user?.email}
                </span>
                <button
                  onClick={handleOut}
                  style={{
                    background: "rgba(248,113,113,.08)",
                    border: "1px solid rgba(248,113,113,.15)",
                    borderRadius: 6,
                    color: C.error,
                    cursor: "pointer",
                    padding: "5px 10px",
                    fontSize: 12,
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
=======
        <div id="mobile-menu" role="menu" aria-label="Mobile navigation" className="sm:hidden"
          style={{ borderTop:"1px solid rgba(255,255,255,.06)", padding:"12px 20px 16px",
            background:"rgba(8,12,24,.97)" }}>
          {isAuthenticated ? (
            <>
              {navLink("/upload",  Upload,  "Upload")}
              <div style={{ marginTop:4 }}>{navLink("/history", History, "History")}</div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", marginTop:10, paddingTop:10,
                display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:12, color:"#64748b" }}>{user?.email}</span>
                <button onClick={handleLogout}
                  style={{ background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.15)",
                    borderRadius:6, color:"#f87171", cursor:"pointer", padding:"5px 10px",
                    fontSize:12, display:"flex", gap:4, alignItems:"center" }}>
>>>>>>> origin/main
                  <LogOut size={11} aria-hidden="true" /> Sign out
                </button>
              </div>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <Link
                to="/login"
                role="menuitem"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  color: C.textMuted,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 6,
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                role="menuitem"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "9px 12px",
                  background: C.grad,
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
=======
              <Link to="/login" onClick={() => setOpen(false)} role="menuitem"
                style={{ display:"block", padding:"8px 12px", color:"#94a3b8", textDecoration:"none",
                  fontSize:14, fontWeight:500, marginBottom:6 }}>Sign In</Link>
              <Link to="/register" onClick={() => setOpen(false)} role="menuitem"
                style={{ display:"block", padding:"9px 12px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
                  color:"#fff", textDecoration:"none", fontSize:14, fontWeight:600, borderRadius:8, textAlign:"center" }}>
>>>>>>> origin/main
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
