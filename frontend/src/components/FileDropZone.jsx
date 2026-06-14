import React, { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import apiClient from "../api/client";
import { C, cardGlass } from "../theme";

const ALLOWED=["application/pdf","image/png","image/jpeg","image/jpg","image/webp"];
const fmt=b=>b<1048576?`${(b/1024).toFixed(1)} KB`:`${(b/1048576).toFixed(2)} MB`;

export default function FileDropZone({onUploadSuccess,onUploadError}){
  const [drag,setDrag]=useState(false);
  const [file,setFile]=useState(null);
  const [uploading,setUploading]=useState(false);
  const [progress,setProgress]=useState(0);
  const [localErr,setLocalErr]=useState(null);
  const ref=useRef(null);

  const validate=useCallback(f=>{
    setLocalErr(null);onUploadError(null);
    if(!ALLOWED.includes(f.type)){const m="Unsupported type. Use PDF, PNG, JPG or WEBP.";setLocalErr(m);onUploadError(m);return false;}
    if(f.size>5*1048576){const m=`File too large (${fmt(f.size)}). Max 5 MB.`;setLocalErr(m);onUploadError(m);return false;}
    return true;
  },[onUploadError]);

  const pick=useCallback(f=>{if(validate(f))setFile(f);},[validate]);
  const clear=()=>{setFile(null);setLocalErr(null);onUploadError(null);if(ref.current)ref.current.value="";};

  const doUpload=async()=>{
    if(!file)return;
    setUploading(true);setProgress(0);
    const fd=new FormData();fd.append("file",file);
    try{
      const{data}=await apiClient.post("/upload/",fd,{
        headers:{"Content-Type":"multipart/form-data"},
        onUploadProgress:e=>{if(e.total)setProgress(Math.round(e.loaded/e.total*100));},
      });
      onUploadSuccess(data);
    }catch(err){
      const d=err.response?.data?.detail;
      const msg=typeof d==="string"?d:Array.isArray(d)?d.map(x=>x.msg).join(", "):"Upload failed. Check the server is running.";
      setLocalErr(msg);onUploadError(msg);
    }finally{setUploading(false);}
  };

  if(!file) return (
    <div role="button" tabIndex={0}
      aria-label="Upload area — drag and drop or press Enter to browse"
      onDragOver={e=>{e.preventDefault();setDrag(true);}}
      onDragLeave={e=>{e.preventDefault();setDrag(false);}}
      onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f)pick(f);}}
      onClick={()=>ref.current?.click()}
      onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ref.current?.click();}}}
      style={{
        border:`2px dashed ${drag?C.teal:C.border}`,borderRadius:14,
        padding:"52px 24px",textAlign:"center",cursor:"pointer",
        background:drag?C.tealDim:"rgba(255,255,255,.02)",
        transition:"all .2s",outline:"none",
      }}>
      <input ref={ref} id="file-input" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp"
        onChange={e=>{const f=e.target.files[0];if(f)pick(f);}}
        aria-label="Choose file" style={{display:"none"}}/>
      <div aria-hidden="true" style={{width:52,height:52,borderRadius:13,
        background:drag?C.tealDim:"rgba(255,255,255,.04)",
        display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",
        border:`1px solid ${drag?C.tealBorder:C.border}`,transition:"all .2s"}}>
        <Upload size={22} color={drag?C.teal:C.text3}/>
      </div>
      <p style={{fontWeight:700,color:C.text1,marginBottom:5}}>
        {drag?"Drop to upload":"Drag & drop your document"}
      </p>
      <p style={{fontSize:13,color:C.text3}}>
        or <span style={{color:C.teal,fontWeight:700}}>browse files</span> — PDF, PNG, JPG, WEBP up to 5 MB
      </p>
    </div>
  );

  return (
    <div style={{...cardGlass,padding:20}}>
      <div style={{display:"flex",alignItems:"center",gap:12,
        marginBottom:uploading||localErr?16:0}}>
        <div aria-hidden="true" style={{width:38,height:38,borderRadius:9,
          background:C.tealDim,border:`1px solid ${C.tealBorder}`,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <FileText size={16} color={C.teal}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontWeight:700,color:C.text1,margin:0,fontSize:14,
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={file.name}>
            {file.name}
          </p>
          <p style={{fontSize:12,color:C.text3,margin:0}}>{fmt(file.size)}</p>
        </div>
        {!uploading&&(
          <button type="button" onClick={clear} aria-label={`Remove ${file.name}`}
            style={{background:"none",border:"none",cursor:"pointer",
              color:C.text3,padding:5,borderRadius:6,display:"flex",flexShrink:0}}>
            <X size={15} aria-hidden="true"/>
          </button>
        )}
      </div>

      {uploading&&(
        <div style={{marginBottom:14}} aria-live="polite" aria-atomic="true">
          <div style={{display:"flex",justifyContent:"space-between",
            fontSize:12,color:C.text3,marginBottom:6}}>
            <span style={{display:"flex",alignItems:"center",gap:5}}>
              <Loader2 size={11} color={C.teal} aria-hidden="true"
                style={{animation:"spin .7s linear infinite"}}/>Uploading…
            </span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.teal}}
              aria-label={`${progress} percent`}>{progress}%</span>
          </div>
          <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
            aria-label="Upload progress"
            style={{height:3,background:C.border,borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:C.grad,
              borderRadius:99,transition:"width .3s"}}/>
          </div>
        </div>
      )}

      {localErr&&(
        <div role="alert" style={{display:"flex",gap:8,padding:"9px 12px",marginBottom:12,
          background:C.errorDim,border:`1px solid ${C.errorBorder}`,
          borderRadius:8,color:"#fca5a5",fontSize:13}}>
          <AlertCircle size={13} style={{flexShrink:0,marginTop:1}} aria-hidden="true"/>{localErr}
        </div>
      )}

      {!uploading&&(
        <button type="button" onClick={doUpload}
          style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",
            gap:7,padding:"11px 20px",borderRadius:9,background:C.grad,color:"#fff",
            border:"none",cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",
            boxShadow:C.gradGlow,marginTop:localErr?0:14}}>
          <CheckCircle size={14} aria-hidden="true"/> Upload &amp; Analyse
        </button>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
