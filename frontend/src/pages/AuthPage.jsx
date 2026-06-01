import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
          </span>
        </Link>

        {/* Card */}
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
            )}
          </p>

          <form onSubmit={onSubmit} noValidate>
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
              </div>
            </div>

            {/* Password */}
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
            </div>

            {/* Error */}
            {displayErr && (
              <div id={errId} role="alert" style={{
                display:"flex", gap:8, padding:"10px 12px", marginBottom:16,
                background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)",
                borderRadius:9, color:"#fca5a5", fontSize:13,
              }}>
                <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
                {displayErr}
              </div>
            )}

            {/* Submit */}
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
            </button>
          </form>

          {/* Guest link */}
          <div style={{ marginTop:18, paddingTop:18,
            borderTop:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
            <span style={{ fontSize:13, color:"#94a3b8" }}>
              Just want to try?{" "}
              <Link to="/upload" style={{ color:"#818cf8", fontWeight:600 }}>
                Analyse as guest →
              </Link>
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        input:focus { border-color: rgba(99,102,241,.6) !important; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
      `}</style>
    </main>
  );
}
