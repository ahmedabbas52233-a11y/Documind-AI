import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, FileText, Info, Sparkles } from "lucide-react";
import FileDropZone from "../components/FileDropZone";
import { useAuth } from "../contexts/AuthContext";
import { C } from "../theme";

export default function UploadPage(){
  const navigate=useNavigate(); const {isAuthenticated}=useAuth();
  const [error,setError]=useState(null);
  const onSuccess=data=>{setError(null);navigate("/analysis",{state:{documentId:data.document_id,filename:data.filename}});};

  return (
    <main id="main-content" style={{maxWidth:600,margin:"0 auto",padding:"60px 20px 80px"}}>
      <header style={{textAlign:"center",marginBottom:40}}>
        <div aria-hidden="true" style={{width:52,height:52,borderRadius:13,
          background:C.tealDim,border:`1px solid ${C.tealBorder}`,
          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",
          boxShadow:`0 0 20px ${C.tealDim}`}}>
          <FileText size={22} color={C.teal}/>
        </div>
        <h1 style={{fontSize:28,fontWeight:800,color:C.text1,letterSpacing:"-.5px",marginBottom:8}}>
          Upload a Document
        </h1>
        <p style={{color:C.text2,fontSize:15}}>Drop a PDF or image to start AI-powered analysis</p>
      </header>

      {error&&(
        <div role="alert" style={{display:"flex",gap:10,padding:"12px 14px",marginBottom:18,
          background:C.errorDim,border:`1px solid ${C.errorBorder}`,
          borderRadius:10,color:"#fca5a5",fontSize:13}}>
          <AlertCircle size={15} style={{flexShrink:0,marginTop:1}} aria-hidden="true"/>
          <div><strong style={{color:C.error}}>Upload failed</strong><br/>{error}</div>
        </div>
      )}

      <FileDropZone onUploadSuccess={onSuccess} onUploadError={setError}/>

      <aside aria-label="File requirements" style={{marginTop:14,padding:"12px 16px",
        background:C.surface,border:`1px solid ${C.border}`,
        borderRadius:10,display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"}}>
        <Info size={13} color={C.teal} aria-hidden="true" style={{flexShrink:0}}/>
        <span style={{fontSize:13,color:C.text3,flex:1}}>
          <strong style={{color:C.text2}}>Accepted:</strong> PDF, PNG, JPG, JPEG, WEBP · Max 5 MB
        </span>
        {!isAuthenticated&&(
          <span style={{fontSize:12,color:C.text3}}>
            <Link to="/register" style={{color:C.teal,fontWeight:700}}>Sign up</Link> to save history
          </span>
        )}
      </aside>

      {!isAuthenticated&&(
        <div style={{marginTop:20,padding:"16px 18px",
          background:C.tealDim,border:`1px solid ${C.tealBorder}`,
          borderRadius:12,display:"flex",gap:12,alignItems:"flex-start"}}>
          <Sparkles size={16} color={C.teal} aria-hidden="true" style={{flexShrink:0,marginTop:1}}/>
          <div>
            <p style={{fontSize:13,fontWeight:700,color:C.teal,marginBottom:3}}>Create a free account to unlock</p>
            <p style={{fontSize:13,color:C.text2,lineHeight:1.6}}>
              Full analysis history · Revisit any previous report · Manage and delete documents
            </p>
            <Link to="/register" style={{display:"inline-flex",alignItems:"center",gap:5,
              marginTop:10,fontSize:13,fontWeight:700,color:C.teal,textDecoration:"none"}}>
              Get started free →
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
