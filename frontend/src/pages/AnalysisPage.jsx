import React,{useState,useEffect,useRef} from "react";
import {useLocation,useNavigate,Link} from "react-router-dom";
import {ArrowLeft,Download,FileText,Loader2,CheckCircle,AlertCircle,RefreshCw,TrendingUp,TrendingDown,Minus,Lightbulb,Star} from "lucide-react";
import {C,cardGlass} from "../theme";

const API=import.meta.env.VITE_API_URL||"/api/v1";
const SENT={
  positive:{icon:TrendingUp,  color:"#22c55e",bg:"rgba(34,197,94,.08)", border:"rgba(34,197,94,.2)", label:"Positive"},
  negative:{icon:TrendingDown,color:C.error,  bg:C.errorDim,            border:C.errorBorder,        label:"Negative"},
  neutral: {icon:Minus,       color:C.text3,  bg:C.surface,             border:C.border,             label:"Neutral"},
};

export default function AnalysisPage(){
  const {state}=useLocation(); const navigate=useNavigate();
  const {documentId,filename}=state||{};
  const [phase,setPhase]=useState("loading");
  const [parsed,setParsed]=useState(null);
  const [errMsg,setErrMsg]=useState("");
  const abort=useRef(null);

  const run=()=>{
    if(!documentId)return;
    abort.current?.abort();
    const ctrl=new AbortController(); abort.current=ctrl;
    setPhase("loading");setParsed(null);setErrMsg("");
    const token=localStorage.getItem("access_token");
    fetch(`${API}/analyze/stream/${documentId}`,{
      method:"POST",signal:ctrl.signal,
      headers:{Accept:"text/event-stream",...(token?{Authorization:`Bearer ${token}`}:{})},
    })
      .then(async res=>{
        if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b?.detail||`Server error ${res.status}`);}
        const reader=res.body.getReader(); const dec=new TextDecoder();
        let buf="",lastEvent="";
        while(true){
          const{done,value}=await reader.read(); if(done)break;
          buf+=dec.decode(value,{stream:true});
          const lines=buf.split("\n"); buf=lines.pop()??"";
          for(const line of lines){
            if(line.startsWith("event: ")){lastEvent=line.slice(7).trim();
              if(lastEvent==="done")setPhase(p=>p==="loading"?"done":p);continue;}
            if(line.startsWith("data: ")){
              const raw=line.slice(6).trim(); if(!raw)continue;
              if(lastEvent==="result"){try{const obj=JSON.parse(raw);if(obj?.analysis!==undefined){setParsed(obj);setPhase("done");}}catch{}}
              lastEvent="";
            }
          }
        }
        setPhase(p=>{if(p==="loading"){setErrMsg("Connection closed before analysis completed.");return "error";}return p;});
      })
      .catch(err=>{if(err.name!=="AbortError"){setErrMsg(err.message||"Analysis failed.");setPhase("error");}});
  };

  useEffect(()=>{if(!documentId){navigate("/upload");return;}run();return()=>abort.current?.abort();},[]);// eslint-disable-line

  const dl=()=>{
    if(!parsed)return;
    const txt=["DocuMind AI — Analysis Report",`File: ${filename||"document"}`,
      `Date: ${new Date().toLocaleString()}`,`Sentiment: ${parsed.sentiment}`,"",
      "SUMMARY","─".repeat(44),parsed.analysis||"","","KEY POINTS","─".repeat(44),
      ...(parsed.key_points||[]).map((p,i)=>`${i+1}. ${p}`),"","RECOMMENDATIONS","─".repeat(44),
      ...(parsed.recommendations||[]).map((r,i)=>`${i+1}. ${r}`)].join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"}));
    a.download=`documind-report-${documentId}.txt`;a.click();URL.revokeObjectURL(a.href);
  };

  if(!documentId)return null;
  const sent=parsed?(SENT[parsed.sentiment]??SENT.neutral):null;
  const SI=sent?.icon;

  return (
    <main id="main-content" style={{maxWidth:1060,margin:"0 auto",padding:"36px 20px 72px"}}>
      <Link to="/upload" style={{display:"inline-flex",alignItems:"center",gap:6,
        color:C.text3,textDecoration:"none",fontSize:13,fontWeight:600,marginBottom:28}}>
        <ArrowLeft size={14} aria-hidden="true"/> Back to upload
      </Link>

      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",
        flexWrap:"wrap",gap:12,marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.tealDim,
            border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center"}}
            aria-hidden="true"><FileText size={17} color={C.teal}/></div>
          <div>
            <h1 style={{fontSize:21,fontWeight:800,color:C.text1,margin:0}}>Analysis Results</h1>
            {filename&&<p style={{fontSize:12,color:C.text3,margin:0}}>{filename}</p>}
          </div>
        </div>
        {phase==="done"&&parsed&&(
          <button type="button" onClick={dl} style={{
            display:"flex",alignItems:"center",gap:6,padding:"8px 14px",
            borderRadius:8,background:C.tealDim,border:`1px solid ${C.tealBorder}`,
            color:C.teal,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit"}}>
            <Download size={13} aria-hidden="true"/> Export Report
          </button>
        )}
      </header>

      {phase==="loading"&&(
        <div style={{...cardGlass,padding:"56px 24px",textAlign:"center"}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:C.tealDim,
            border:`1px solid ${C.tealBorder}`,boxShadow:`0 0 20px ${C.tealDim}`,
            display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}
            aria-hidden="true">
            <Loader2 size={24} color={C.teal} style={{animation:"spin .8s linear infinite"}}/>
          </div>
          <p style={{fontSize:16,fontWeight:700,color:C.text1,marginBottom:8}}>Analysing your document</p>
          <p style={{fontSize:13,color:C.text3,marginBottom:24}}>GPT-4o is processing your content…</p>
          <div style={{maxWidth:280,margin:"0 auto",height:2,background:C.border,borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:"55%",borderRadius:99,background:C.grad,
              animation:"slide-prog 1.5s ease-in-out infinite"}}/>
          </div>
        </div>
      )}

      {phase==="error"&&(
        <div role="alert" style={{...cardGlass,padding:"40px 24px",textAlign:"center"}}>
          <AlertCircle size={36} color={C.error} style={{marginBottom:12}} aria-hidden="true"/>
          <p style={{fontSize:16,fontWeight:700,color:"#fca5a5",marginBottom:6}}>Analysis failed</p>
          <p style={{fontSize:13,color:C.text3,marginBottom:22,maxWidth:360,margin:"0 auto 22px"}}>{errMsg}</p>
          <button type="button" onClick={run} style={{
            display:"inline-flex",alignItems:"center",gap:6,padding:"9px 20px",
            borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,
            color:C.text2,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>
            <RefreshCw size={13} aria-hidden="true"/> Retry analysis
          </button>
        </div>
      )}

      {phase==="done"&&parsed&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12}}>
            {[
              {Icon:SI,         color:sent.color, bg:sent.bg,  border:sent.border,                           label:"Sentiment",   val:sent.label,                                 valC:sent.color},
              {Icon:Star,       color:C.teal,     bg:C.tealDim,border:C.tealBorder,                          label:"Key Points",  val:(parsed.key_points||[]).length,             valC:C.text1},
              {Icon:Lightbulb,  color:C.warn,     bg:C.warnDim,border:"rgba(245,158,11,.2)",                 label:"Actions",     val:(parsed.recommendations||[]).length,         valC:C.text1},
              {Icon:CheckCircle,color:C.success,  bg:C.successDim,border:"rgba(34,197,94,.2)",              label:"Status",      val:"Complete",                                 valC:C.success},
            ].map(({Icon,color,bg,border,label,val,valC})=>(
              <div key={label} style={{...cardGlass,padding:18,display:"flex",alignItems:"center",gap:12}}>
                <div aria-hidden="true" style={{width:40,height:40,borderRadius:10,background:bg,
                  border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {Icon&&<Icon size={18} color={color}/>}
                </div>
                <div>
                  <p style={{fontSize:10,color:C.text3,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",margin:0}}>{label}</p>
                  <p style={{fontSize:17,fontWeight:800,color:valC,margin:0}}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <section aria-labelledby="sum-h" style={{...cardGlass,padding:26}}>
            <h2 id="sum-h" style={{fontSize:11,fontWeight:700,color:C.teal,
              textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 14px"}}>Summary</h2>
            {(parsed.analysis||"").split("\n").filter(Boolean).map((p,i,a)=>(
              <p key={i} style={{color:"#d4d4d8",fontSize:15,lineHeight:1.8,
                margin:i<a.length-1?"0 0 12px":0}}>{p}</p>
            ))}
          </section>

          {/* Key points + Recs */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>
            <section aria-labelledby="kp-h" style={{...cardGlass,padding:22}}>
              <h2 id="kp-h" style={{fontSize:11,fontWeight:700,color:C.teal,
                textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 14px"}}>Key Points</h2>
              {(parsed.key_points||[]).length>0?(
                <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:9}}>
                  {(parsed.key_points||[]).map((pt,i)=>(
                    <li key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <span aria-hidden="true" style={{width:20,height:20,borderRadius:6,background:C.tealDim,
                        border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:10,fontWeight:700,color:C.teal,flexShrink:0,marginTop:2}}>{i+1}</span>
                      <span style={{fontSize:14,color:"#d4d4d8",lineHeight:1.6}}>{pt}</span>
                    </li>
                  ))}
                </ul>
              ):<p style={{color:C.text3,fontSize:13}}>No key points extracted.</p>}
            </section>

            <section aria-labelledby="rec-h" style={{...cardGlass,padding:22}}>
              <h2 id="rec-h" style={{fontSize:11,fontWeight:700,color:C.warn,
                textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 14px"}}>Recommendations</h2>
              {(parsed.recommendations||[]).length>0?(
                <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:9}}>
                  {(parsed.recommendations||[]).map((r,i)=>(
                    <li key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <Lightbulb size={13} color={C.warn} aria-hidden="true" style={{flexShrink:0,marginTop:3}}/>
                      <span style={{fontSize:14,color:"#d4d4d8",lineHeight:1.6}}>{r}</span>
                    </li>
                  ))}
                </ul>
              ):<p style={{color:C.text3,fontSize:13}}>No recommendations generated.</p>}
            </section>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slide-prog{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}`}</style>
    </main>
  );
}
