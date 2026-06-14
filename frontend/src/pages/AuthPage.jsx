import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle, FileText, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { C, cardGlass } from "../theme";

const pwChecks = (pw) => [
  {label:"8+ characters",  ok:pw.length>=8},
  {label:"Uppercase",      ok:/[A-Z]/.test(pw)},
  {label:"Number",         ok:/[0-9]/.test(pw)},
  {label:"Symbol",         ok:/[^A-Za-z0-9]/.test(pw)},
];
const SM = [{label:"Too weak",color:"#ef4444"},{label:"Weak",color:"#f97316"},
            {label:"Good",color:"#eab308"},{label:"Strong",color:"#22c55e"}];

export default function AuthPage() {
  const {pathname}=useLocation(); const navigate=useNavigate();
  const {login,register,loading,error:authErr,setError}=useAuth();
  const isLogin=pathname==="/login";
  const [form,setForm]=useState({email:"",password:""});
  const [showPw,setShowPw]=useState(false);
  const [valErr,setValErr]=useState(null);
  const emailId=isLogin?"l-e":"r-e"; const passId=isLogin?"l-p":"r-p";
  const onChange=e=>{setForm(p=>({...p,[e.target.name]:e.target.value}));setValErr(null);setError(null);};
  const validate=()=>{if(!form.email.includes("@"))return "Enter a valid email.";if(form.password.length<8)return "Password needs 8+ characters.";return null;};
  const onSubmit=async e=>{e.preventDefault();const err=validate();if(err){setValErr(err);return;}
    const ok=isLogin?await login(form.email,form.password):await register(form.email,form.password);
    if(ok)navigate("/upload");};
  const displayErr=authErr||valErr;
  const checks=pwChecks(form.password); const score=checks.filter(c=>c.ok).length; const strength=SM[score-1];
  const iS={width:"100%",padding:"11px 40px",background:"rgba(255,255,255,.04)",
    border:`1px solid ${C.border}`,borderRadius:9,color:C.text1,fontSize:14,outline:"none",
    transition:"border-color .15s,box-shadow .15s",boxSizing:"border-box"};
  const iIcon={position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",
    color:C.text3,pointerEvents:"none"};

  return (
    <main id="main-content" style={{minHeight:"100vh",display:"flex",alignItems:"center",
      justifyContent:"center",padding:"32px 16px",background:C.bg,position:"relative"}}>
      <div className="mesh-bg" aria-hidden="true"/>
      <div style={{width:"100%",maxWidth:400,position:"relative"}}>
        <Link to="/" aria-label="DocuMind AI home"
          style={{display:"flex",alignItems:"center",gap:9,textDecoration:"none",
            justifyContent:"center",marginBottom:28}}>
          <div aria-hidden="true" style={{width:36,height:36,borderRadius:9,background:C.grad,
            display:"flex",alignItems:"center",justifyContent:"center",boxShadow:C.gradGlow}}>
            <FileText size={16} color="#fff"/>
          </div>
          <span style={{fontWeight:800,fontSize:20,color:C.text1}}>
            Docu<span style={{color:C.teal}}>Mind</span>
          </span>
        </Link>

        <div style={{...cardGlass,padding:28,
          boxShadow:"0 24px 64px -16px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)"}}>
          <h1 style={{fontWeight:800,fontSize:21,color:C.text1,textAlign:"center",marginBottom:4}}>
            {isLogin?"Welcome back":"Create your account"}
          </h1>
          <p style={{fontSize:13,color:C.text3,textAlign:"center",marginBottom:26}}>
            {isLogin
              ?<>No account? <Link to="/register" style={{color:C.teal,fontWeight:700}}>Sign up free →</Link></>
              :<>Already have one? <Link to="/login" style={{color:C.teal,fontWeight:700}}>Sign in →</Link></>}
          </p>

          <form onSubmit={onSubmit} noValidate>
            <div style={{marginBottom:14}}>
              <label htmlFor={emailId} style={{display:"block",fontSize:12,fontWeight:700,
                color:"#d4d4d8",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>
                Email address
              </label>
              <div style={{position:"relative"}}>
                <Mail size={14} aria-hidden="true" style={iIcon}/>
                <input id={emailId} name="email" type="email" autoComplete="email" required
                  value={form.email} onChange={onChange} placeholder="you@example.com"
                  aria-describedby={displayErr?"auth-err":undefined}
                  aria-invalid={displayErr?"true":"false"} style={iS}/>
              </div>
            </div>

            <div style={{marginBottom:18}}>
              <label htmlFor={passId} style={{display:"block",fontSize:12,fontWeight:700,
                color:"#d4d4d8",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>
                Password
              </label>
              <div style={{position:"relative"}}>
                <Lock size={14} aria-hidden="true" style={iIcon}/>
                <input id={passId} name="password" type={showPw?"text":"password"}
                  autoComplete={isLogin?"current-password":"new-password"} required
                  value={form.password} onChange={onChange} placeholder="••••••••"
                  aria-describedby={displayErr?"auth-err":undefined}
                  aria-invalid={displayErr?"true":"false"}
                  style={{...iS,paddingRight:42}}/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  aria-label={showPw?"Hide password":"Show password"} aria-pressed={showPw}
                  style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",
                    background:"none",border:"none",cursor:"pointer",color:C.text3,padding:4,borderRadius:4}}>
                  {showPw?<EyeOff size={14} aria-hidden="true"/>:<Eye size={14} aria-hidden="true"/>}
                </button>
              </div>
              {!isLogin&&form.password&&(
                <div style={{marginTop:10}} aria-live="polite" aria-atomic="true">
                  <div aria-hidden="true" style={{display:"flex",gap:4,marginBottom:6}}>
                    {[0,1,2,3].map(i=>(
                      <div key={i} style={{flex:1,height:3,borderRadius:99,transition:"background .3s",
                        background:i<score?SM[score-1].color:"rgba(255,255,255,.08)"}}/>
                    ))}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:8}}>
                    <span style={{color:C.text3}}>Password strength</span>
                    {strength&&<span style={{color:strength.color,fontWeight:700}}>{strength.label}</span>}
                  </div>
                  <ul aria-label="Password requirements"
                    style={{display:"flex",flexWrap:"wrap",gap:6,listStyle:"none",padding:0,margin:0}}>
                    {checks.map(({label,ok})=>(
                      <li key={label} style={{fontSize:11,display:"flex",alignItems:"center",gap:4,
                        color:ok?C.success:C.text3}}>
                        <CheckCircle size={10} color={ok?C.success:"#3f3f46"} aria-hidden="true"/>
                        {label}<span className="sr-only">{ok?" (met)":" (not met)"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {displayErr&&(
              <div id="auth-err" role="alert" style={{display:"flex",gap:8,padding:"10px 12px",
                marginBottom:16,background:C.errorDim,border:`1px solid ${C.errorBorder}`,
                borderRadius:9,color:"#fca5a5",fontSize:13}}>
                <AlertCircle size={14} style={{flexShrink:0,marginTop:1}} aria-hidden="true"/>
                {displayErr}
              </div>
            )}

            <button type="submit" disabled={loading} aria-busy={loading}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                padding:"12px 20px",borderRadius:9,background:C.grad,color:"#fff",
                border:"none",cursor:loading?"not-allowed":"pointer",fontWeight:700,fontSize:14,
                fontFamily:"inherit",opacity:loading?.65:1,
                boxShadow:loading?"none":C.gradGlow}}>
              {loading
                ?<><Loader2 size={14} aria-hidden="true" style={{animation:"spin .7s linear infinite"}}/>
                    {isLogin?"Signing in…":"Creating account…"}</>
                :(<>{isLogin?"Sign In":"Create Account"}<ArrowRight size={14} aria-hidden="true"/></>)}
            </button>
          </form>

          <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${C.border}`,textAlign:"center"}}>
            <span style={{fontSize:13,color:C.text3}}>
              Just want to try?{" "}
              <Link to="/upload" style={{color:C.teal,fontWeight:700}}>Analyse as guest →</Link>
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} input:focus{border-color:${C.teal}!important;box-shadow:0 0 0 3px ${C.tealDim}}`}</style>
    </main>
  );
}
