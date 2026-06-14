import React from "react";
import {Link,useLocation} from "react-router-dom";
import {ArrowLeft,FileSearch} from "lucide-react";
import {C} from "../theme";

export default function NotFoundPage(){
  const{pathname}=useLocation();
  return (
    <main id="main-content" style={{minHeight:"85vh",display:"flex",alignItems:"center",
      justifyContent:"center",padding:"32px 20px",position:"relative"}}>
      <div className="mesh-bg" aria-hidden="true"/>
      <div style={{maxWidth:420,width:"100%",textAlign:"center",position:"relative"}}>
        <p aria-hidden="true" style={{fontSize:"clamp(80px,16vw,140px)",fontWeight:900,lineHeight:1,
          letterSpacing:"-4px",background:C.gradText,WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",backgroundClip:"text",
          marginBottom:16,userSelect:"none"}}>404</p>
        <div aria-hidden="true" style={{width:56,height:56,borderRadius:14,background:C.tealDim,
          border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",
          margin:"0 auto 20px",boxShadow:`0 0 20px ${C.tealDim}`}}>
          <FileSearch size={24} color={C.teal}/>
        </div>
        <h1 style={{fontSize:24,fontWeight:800,color:C.text1,marginBottom:10,letterSpacing:"-.4px"}}>Page not found</h1>
        <p style={{fontSize:14,color:C.text3,marginBottom:32,lineHeight:1.65}}>
          The page <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.teal,
            background:C.tealDim,padding:"2px 6px",borderRadius:4}}>{pathname}</code> does not exist.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <Link to="/" style={{display:"inline-flex",alignItems:"center",gap:7,
            padding:"10px 22px",borderRadius:9,background:C.grad,color:"#fff",
            textDecoration:"none",fontWeight:700,fontSize:14,boxShadow:C.gradGlow}}>
            <ArrowLeft size={14} aria-hidden="true"/> Go home
          </Link>
          <Link to="/upload" style={{display:"inline-flex",alignItems:"center",gap:7,
            padding:"10px 22px",borderRadius:9,background:C.surface,
            border:`1px solid ${C.borderBright}`,color:C.text2,textDecoration:"none",
            fontWeight:600,fontSize:14}}>
            Upload document
          </Link>
        </div>
      </div>
    </main>
  );
}
