import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
<<<<<<< HEAD
import {
  Mail, Lock, Eye, EyeOff, Loader2,
  ArrowRight, AlertCircle, FileText, CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { C, cardBase } from "../theme";

const pwChecks = (pw) => [
  { label: "8+ characters",    ok: pw.length >= 8 },
  { label: "Uppercase letter", ok: /[A-Z]/.test(pw) },
  { label: "Number",           ok: /[0-9]/.test(pw) },
  { label: "Symbol",           ok: /[^A-Za-z0-9]/.test(pw) },
];

const strengthMeta = [
  { label: "Too weak", color: "#ef4444" },
  { label: "Weak",     color: "#f97316" },
  { label: "Good",     color: "#eab308" },
  { label: "Strong",   color: "#22c55e" },
];

export default function AuthPage() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const { login, register, loading, error: authErr, setError } = useAuth();
  const isLogin = pathname === "/login";

  const [form,   setForm]   = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [valErr, setValErr] = useState(null);

  const emailId = isLogin ? "l-email" : "r-email";
  const passId  = isLogin ? "l-pass"  : "r-pass";
  const errId   = "auth-error";

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setValErr(null);
    setError(null);
=======
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle, FileText } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const { pathname }  = useLocation();
  const navigate      = useNavigate();
  const { login, register, loading, error: authErr, setError } = useAuth();
  const isLogin = pathname === "/login";

  const [form,   setForm]   = useState({ email:"", password:"" });
  const [showPw, setShowPw] = useState(false);
  const [valErr, setValErr] = useState(null);

  const uid   = isLogin ? "l-email" : "r-email";
  const pid   = isLogin ? "l-pass"  : "r-pass";
  const errId = "auth-err";

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setValErr(null); setError(null);
>>>>>>> origin/main
  };

  const validate = () => {
    if (!form.email.includes("@")) return "Enter a valid email address.";
    if (form.password.length < 8)  return "Password must be at least 8 characters.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setValErr(err); return; }
    const ok = isLogin
      ? await login(form.email, form.password)
      : await register(form.email, form.password);
    if (ok) navigate("/upload");
  };

  const displayErr = authErr || valErr;
<<<<<<< HEAD
  const checks     = pwChecks(form.password);
  const score      = checks.filter((c) => c.ok).length;
  const strength   = strengthMeta[score - 1];

  const inputWrap = { position: "relative" };
  const iconStyle = {
    position: "absolute", left: 12, top: "50%",
    transform: "translateY(-50%)",
    color: C.textMuted, pointerEvents: "none",
  };
  const inputStyle = {
    width: "100%", padding: "11px 40px",
    background: "rgba(18,18,26,.8)",
    border: `1px solid ${C.border}`,
    borderRadius: 9, color: C.textPrimary,
    fontSize: 14, outline: "none",
    transition: "border-color .15s, box-shadow .15s",
    boxSizing: "border-box",
  };

  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        justifyContent: "center", padding: "32px 16px",
        background: C.bg,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <Link
          to="/"
          aria-label="DocuMind AI — Home"
          style={{
            display: "flex", alignItems: "center", gap: 9,
            textDecoration: "none", justifyContent: "center", marginBottom: 28,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 36, height: 36, borderRadius: 9, background: C.grad,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <FileText size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: C.textPrimary }}>
            Docu<span style={{ color: C.info }}>Mind</span>
=======

  const inputStyle = {
    width:"100%", padding:"11px 40px",
    background:"rgba(15,20,40,.8)", border:"1px solid rgba(255,255,255,.1)",
    borderRadius:9, color:"#f1f5f9", fontSize:14, outline:"none",
    transition:"border-color .15s", boxSizing:"border-box",
  };

  return (
    <main id="main-content" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", padding:"32px 16px",
    }}>
      <div style={{ width:"100%", maxWidth:400 }}>

        {/* Logo */}
        <Link to="/" aria-label="DocuMind AI home" style={{
          display:"flex", alignItems:"center", gap:9,
          textDecoration:"none", justifyContent:"center", marginBottom:28,
        }}>
          <div style={{ width:38, height:38, borderRadius:10,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }} aria-hidden="true">
            <FileText size={17} color="#fff" />
          </div>
          <span style={{ fontWeight:800, fontSize:20, color:"#f1f5f9" }}>
            Docu<span style={{ color:"#818cf8" }}>Mind</span>
>>>>>>> origin/main
          </span>
        </Link>

        {/* Card */}
<<<<<<< HEAD
        <div
          style={{
            ...cardBase,
            padding: 28,
            boxShadow: "0 24px 64px -16px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)",
          }}
        >
          <h1
            style={{
              fontWeight: 800, fontSize: 21,
              color: C.textPrimary, textAlign: "center", marginBottom: 4,
            }}
          >
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p style={{ fontSize: 13, color: C.textMuted, textAlign: "center", marginBottom: 26 }}>
            {isLogin ? (
              <>No account?{" "}
                <Link to="/register" style={{ color: C.info, fontWeight: 600 }}>
                  Sign up free →
                </Link>
              </>
            ) : (
              <>Already have one?{" "}
                <Link to="/login" style={{ color: C.info, fontWeight: 600 }}>
                  Sign in →
                </Link>
              </>
=======
        <div style={{
          background:"rgba(15,20,40,.9)",
          border:"1px solid rgba(255,255,255,.08)",
          borderRadius:18, padding:28,
          boxShadow:"0 24px 64px -16px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06)",
        }}>
          <h1 style={{ fontWeight:800, fontSize:21, color:"#fff", textAlign:"center", marginBottom:4 }}>
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p style={{ fontSize:13, color:"#94a3b8", textAlign:"center", marginBottom:24 }}>
            {isLogin ? (
              <>No account? <Link to="/register" style={{ color:"#818cf8", fontWeight:600 }}>Sign up free →</Link></>
            ) : (
              <>Already have one? <Link to="/login" style={{ color:"#818cf8", fontWeight:600 }}>Sign in →</Link></>
>>>>>>> origin/main
            )}
          </p>

          <form onSubmit={onSubmit} noValidate>
<<<<<<< HEAD

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor={emailId}
                style={{
                  display: "block", fontSize: 12, fontWeight: 600,
                  color: "#cbd5e1", marginBottom: 6,
                  textTransform: "uppercase", letterSpacing: ".05em",
                }}
              >
                Email address
              </label>
              <div style={inputWrap}>
                <Mail size={14} aria-hidden="true" style={iconStyle} />
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  aria-describedby={displayErr ? errId : undefined}
                  aria-invalid={displayErr ? "true" : "false"}
                  style={inputStyle}
                />
=======
            {/* Email */}
            <div style={{ marginBottom:14 }}>
              <label htmlFor={uid} style={{ display:"block", fontSize:12, fontWeight:600,
                color:"#cbd5e1", marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>
                Email
              </label>
              <div style={{ position:"relative" }}>
                <Mail size={14} aria-hidden="true" style={{ position:"absolute", left:12, top:"50%",
                  transform:"translateY(-50%)", color:"#64748b", pointerEvents:"none" }} />
                <input id={uid} name="email" type="email" autoComplete="email" required
                  value={form.email} onChange={onChange}
                  placeholder="you@example.com"
                  aria-describedby={displayErr ? errId : undefined}
                  aria-invalid={displayErr ? "true" : "false"}
                  style={inputStyle} />
>>>>>>> origin/main
              </div>
            </div>

            {/* Password */}
<<<<<<< HEAD
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor={passId}
                style={{
                  display: "block", fontSize: 12, fontWeight: 600,
                  color: "#cbd5e1", marginBottom: 6,
                  textTransform: "uppercase", letterSpacing: ".05em",
                }}
              >
                Password
              </label>
              <div style={inputWrap}>
                <Lock size={14} aria-hidden="true" style={iconStyle} />
                <input
                  id={passId}
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  aria-describedby={displayErr ? errId : undefined}
                  aria-invalid={displayErr ? "true" : "false"}
                  style={{ ...inputStyle, paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  aria-pressed={showPw}
                  style={{
                    position: "absolute", right: 10, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: C.textMuted, padding: 4, borderRadius: 4,
                  }}
                >
                  {showPw
                    ? <EyeOff size={14} aria-hidden="true" />
                    : <Eye    size={14} aria-hidden="true" />}
                </button>
              </div>

              {/* Password strength — register only */}
              {!isLogin && form.password && (
                <div style={{ marginTop: 10 }} aria-live="polite" aria-atomic="true">
                  {/* Bars */}
                  <div
                    aria-hidden="true"
                    style={{ display: "flex", gap: 4, marginBottom: 6 }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1, height: 3, borderRadius: 99,
                          background: i < score
                            ? strengthMeta[score - 1].color
                            : "rgba(255,255,255,.08)",
                          transition: "background .3s",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: 11, marginBottom: 8,
                    }}
                  >
                    <span style={{ color: C.textMuted }}>Password strength</span>
                    {strength && (
                      <span style={{ color: strength.color, fontWeight: 600 }}>
                        {strength.label}
                      </span>
                    )}
                  </div>
                  {/* Requirements */}
                  <ul
                    aria-label="Password requirements"
                    style={{
                      display: "flex", flexWrap: "wrap", gap: 6,
                      listStyle: "none", padding: 0, margin: 0,
                    }}
                  >
                    {checks.map(({ label, ok }) => (
                      <li
                        key={label}
                        style={{
                          fontSize: 11, display: "flex", alignItems: "center", gap: 4,
                          color: ok ? C.success : C.textMuted,
                        }}
                      >
                        <CheckCircle
                          size={10}
                          color={ok ? C.success : "#334155"}
                          aria-hidden="true"
                        />
                        {label}
                        <span className="sr-only">{ok ? " (met)" : " (not met)"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
=======
            <div style={{ marginBottom:20 }}>
              <label htmlFor={pid} style={{ display:"block", fontSize:12, fontWeight:600,
                color:"#cbd5e1", marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>
                Password
              </label>
              <div style={{ position:"relative" }}>
                <Lock size={14} aria-hidden="true" style={{ position:"absolute", left:12, top:"50%",
                  transform:"translateY(-50%)", color:"#64748b", pointerEvents:"none" }} />
                <input id={pid} name="password" type={showPw ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"} required
                  value={form.password} onChange={onChange}
                  placeholder="••••••••"
                  aria-describedby={displayErr ? errId : undefined}
                  aria-invalid={displayErr ? "true" : "false"}
                  style={{ ...inputStyle, paddingRight:42 }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  aria-pressed={showPw}
                  style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer", color:"#94a3b8", padding:4, borderRadius:4 }}>
                  {showPw
                    ? <EyeOff size={14} aria-hidden="true" />
                    : <Eye size={14} aria-hidden="true" />}
                </button>
              </div>
>>>>>>> origin/main
            </div>

            {/* Error */}
            {displayErr && (
<<<<<<< HEAD
              <div
                id={errId}
                role="alert"
                style={{
                  display: "flex", gap: 8, padding: "10px 12px",
                  marginBottom: 16,
                  background: C.errorBg,
                  border: `1px solid ${C.errorBorder}`,
                  borderRadius: 9, color: "#fca5a5", fontSize: 13,
                }}
              >
                <AlertCircle
                  size={14}
                  style={{ flexShrink: 0, marginTop: 1 }}
                  aria-hidden="true"
                />
=======
              <div id={errId} role="alert" style={{
                display:"flex", gap:8, padding:"10px 12px", marginBottom:16,
                background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)",
                borderRadius:9, color:"#fca5a5", fontSize:13,
              }}>
                <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
>>>>>>> origin/main
                {displayErr}
              </div>
            )}

            {/* Submit */}
<<<<<<< HEAD
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 7,
                padding: "12px 20px", borderRadius: 9,
                background: C.grad, color: "#fff",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700, fontSize: 14, fontFamily: "inherit",
                opacity: loading ? 0.65 : 1,
                boxShadow: loading ? "none" : "0 6px 20px -4px rgba(99,102,241,.4)",
                transition: "opacity .15s",
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={14}
                    aria-hidden="true"
                    style={{ animation: "spin .7s linear infinite" }}
                  />
                  {isLogin ? "Signing in…" : "Creating account…"}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={14} aria-hidden="true" />
                </>
              )}
=======
            <button type="submit" disabled={loading} aria-busy={loading}
              style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                padding:"12px 20px", borderRadius:9,
                background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
                color:"#fff", border:"none", cursor:"pointer",
                fontWeight:700, fontSize:14, opacity: loading ? .65 : 1,
                boxShadow:"0 8px 20px -4px rgba(99,102,241,.4)",
              }}>
              {loading
                ? <><Loader2 size={14} aria-hidden="true" style={{ animation:"spin .7s linear infinite" }} />
                    {isLogin ? "Signing in…" : "Creating account…"}</>
                : <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight size={14} aria-hidden="true" /></>
              }
>>>>>>> origin/main
            </button>
          </form>

          {/* Guest link */}
<<<<<<< HEAD
          <div
            style={{
              marginTop: 20, paddingTop: 20,
              borderTop: `1px solid ${C.border}`,
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 13, color: C.textMuted }}>
              Just want to try?{" "}
              <Link to="/upload" style={{ color: C.info, fontWeight: 600 }}>
=======
          <div style={{ marginTop:18, paddingTop:18,
            borderTop:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
            <span style={{ fontSize:13, color:"#94a3b8" }}>
              Just want to try?{" "}
              <Link to="/upload" style={{ color:"#818cf8", fontWeight:600 }}>
>>>>>>> origin/main
                Analyse as guest →
              </Link>
            </span>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus {
          border-color: rgba(99,102,241,.55) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,.1);
        }
=======
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        input:focus { border-color: rgba(99,102,241,.6) !important; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
>>>>>>> origin/main
      `}</style>
    </main>
  );
}
