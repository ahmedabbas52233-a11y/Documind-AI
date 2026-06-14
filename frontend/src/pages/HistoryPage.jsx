import React,{useState,useEffect,useCallback} from "react";
import {Link} from "react-router-dom";
import {FileText,Clock,ArrowRight,Loader2,Trash2,AlertCircle,RefreshCw,ChevronLeft,ChevronRight,History} from "lucide-react";
import {useAuth} from "../contexts/AuthContext";
import apiClient from "../api/client";
import {C,cardGlass} from "../theme";

const fmt=b=>b<1048576?`${(b/1024).toFixed(1)} KB`:`${(b/1048576).toFixed(2)} MB`;
const fmtDate=iso=>iso?new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}):"—";

export default function HistoryPage(){
  const{isAuthenticated}=useAuth();
  const[items,setItems]=useState([]);const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);const[page,setPage]=useState(1);
  const[total,setTotal]=useState(0);const[pages,setPages]=useState(1);
  const[deleting,setDeleting]=useState(null);

  const load=useCallback(async p=>{
    setLoading(true);setError(null);
    try{const{data}=await apiClient.get(`/history/?page=${p}&page_size=10`);
      setItems(data.items);setTotal(data.total);setPages(data.pages);setPage(p);}
    catch(err){setError(err.response?.data?.detail||"Failed to load history.");}
    finally{setLoading(false);}
  },[]);

  useEffect(()=>{if(isAuthenticated)load(1);},[isAuthenticated,load]);

  const del=async id=>{
    setDeleting(id);
    try{await apiClient.delete(`/history/${id}`);setItems(p=>p.filter(d=>d.id!==id));setTotal(t=>t-1);}
    catch{}finally{setDeleting(null);}
  };

  if(!isAuthenticated) return (
    <main id="main-content" style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{...cardGlass,padding:48,maxWidth:340,width:"100%",textAlign:"center"}}>
        <div aria-hidden="true" style={{width:48,height:48,borderRadius:12,background:C.tealDim,
          border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",
          boxShadow:`0 0 16px ${C.tealDim}`}}>
          <History size={20} color={C.teal}/>
        </div>
        <h1 style={{fontSize:20,fontWeight:800,color:C.text1,marginBottom:8}}>Sign in to view history</h1>
        <p style={{fontSize:13,color:C.text3,marginBottom:24,lineHeight:1.6}}>Create an account to save and revisit every analysis.</p>
        <Link to="/login" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 22px",
          borderRadius:9,background:C.grad,color:"#fff",textDecoration:"none",fontWeight:700,fontSize:14,
          boxShadow:C.gradGlow}}>
          Sign In <ArrowRight size={13} aria-hidden="true"/>
        </Link>
      </div>
    </main>
  );

  return (
    <main id="main-content" style={{maxWidth:860,margin:"0 auto",padding:"40px 20px 72px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28,gap:12,flexWrap:"wrap"}}>
        <header>
          <h1 style={{fontSize:24,fontWeight:800,color:C.text1,letterSpacing:"-.4px",margin:0}}>Analysis History</h1>
          <p style={{fontSize:13,color:C.text3,margin:0}} aria-live="polite">{total} document{total!==1?"s":""} analysed</p>
        </header>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Link to="/upload" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",
            borderRadius:8,background:C.grad,color:"#fff",textDecoration:"none",fontWeight:700,fontSize:13,
            boxShadow:C.gradGlow}}>+ New Analysis</Link>
          <button type="button" onClick={()=>load(page)} disabled={loading} aria-label="Refresh history"
            style={{display:"flex",alignItems:"center",gap:5,padding:"7px 13px",borderRadius:8,
              background:C.surface,border:`1px solid ${C.border}`,color:C.text2,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>
            <RefreshCw size={12} aria-hidden="true" style={loading?{animation:"spin .7s linear infinite"}:{}}/>Refresh
          </button>
        </div>
      </div>

      {error&&(
        <div role="alert" style={{display:"flex",gap:8,padding:"10px 14px",marginBottom:16,
          background:C.errorDim,border:`1px solid ${C.errorBorder}`,borderRadius:9,color:"#fca5a5",fontSize:13}}>
          <AlertCircle size={14} style={{flexShrink:0,marginTop:1}} aria-hidden="true"/>{error}
        </div>
      )}

      {loading&&(
        <div aria-label="Loading…" aria-busy="true" style={{display:"flex",flexDirection:"column",gap:8}}>
          {[...Array(5)].map((_,i)=>(
            <div key={i} aria-hidden="true" style={{...cardGlass,height:62,
              animation:"pulse-dim 1.4s ease-in-out infinite",animationDelay:`${i*.08}s`}}/>
          ))}
        </div>
      )}

      {!loading&&!error&&items.length===0&&(
        <div style={{...cardGlass,padding:"60px 24px",textAlign:"center"}}>
          <div aria-hidden="true" style={{width:52,height:52,borderRadius:14,background:C.surface,
            border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <Clock size={22} color={C.text3}/>
          </div>
          <h2 style={{fontWeight:700,color:C.text1,fontSize:18,marginBottom:6}}>No history yet</h2>
          <p style={{fontSize:13,color:C.text3,marginBottom:22}}>Upload your first document to see it here.</p>
          <Link to="/upload" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"9px 20px",
            borderRadius:9,background:C.grad,color:"#fff",textDecoration:"none",fontWeight:700,fontSize:13,
            boxShadow:C.gradGlow}}>
            Upload Document <ArrowRight size={13} aria-hidden="true"/>
          </Link>
        </div>
      )}

      {!loading&&items.length>0&&(
        <ul style={{display:"flex",flexDirection:"column",gap:6,listStyle:"none",padding:0,margin:0}}>
          {items.map(doc=>(
            <li key={doc.id} style={{...cardGlass,padding:"13px 16px",display:"flex",alignItems:"center",gap:12}}>
              <div aria-hidden="true" style={{width:34,height:34,borderRadius:8,background:C.tealDim,
                border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <FileText size={14} color={C.teal}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontWeight:700,color:C.text1,fontSize:14,margin:0,
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={doc.filename}>{doc.filename}</p>
                <p style={{fontSize:11,color:C.text3,margin:0}}>{fmtDate(doc.created_at)} · {fmt(doc.file_size)}</p>
              </div>
              <span style={{fontSize:11,color:C.text3,fontFamily:"'JetBrains Mono',monospace",
                background:C.surface,border:`1px solid ${C.border}`,padding:"2px 7px",borderRadius:5,flexShrink:0}}
                aria-label={`Document ID ${doc.id}`}>#{doc.id}</span>
              <button type="button" onClick={()=>del(doc.id)} disabled={deleting===doc.id}
                aria-label={`Delete ${doc.filename}`}
                style={{background:"none",border:"none",cursor:"pointer",color:C.text3,
                  padding:5,borderRadius:6,display:"flex",flexShrink:0,opacity:deleting===doc.id?.5:1}}>
                {deleting===doc.id
                  ?<Loader2 size={13} aria-hidden="true" style={{animation:"spin .7s linear infinite"}}/>
                  :<Trash2 size={13} aria-hidden="true"/>}
              </button>
            </li>
          ))}
        </ul>
      )}

      {pages>1&&(
        <nav aria-label="Pagination" style={{marginTop:22}}>
          <ul style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,listStyle:"none",padding:0,margin:0}}>
            <li><button type="button" onClick={()=>load(page-1)} disabled={page<=1||loading} aria-label="Previous page"
              style={{display:"flex",padding:"6px 11px",borderRadius:7,background:C.surface,
                border:`1px solid ${C.border}`,color:C.text2,cursor:"pointer",
                opacity:page<=1||loading?.35:1,fontFamily:"inherit"}}>
              <ChevronLeft size={14} aria-hidden="true"/>
            </button></li>
            <li><span style={{fontSize:13,color:C.text3}} aria-live="polite">Page {page} of {pages}</span></li>
            <li><button type="button" onClick={()=>load(page+1)} disabled={page>=pages||loading} aria-label="Next page"
              style={{display:"flex",padding:"6px 11px",borderRadius:7,background:C.surface,
                border:`1px solid ${C.border}`,color:C.text2,cursor:"pointer",
                opacity:page>=pages||loading?.35:1,fontFamily:"inherit"}}>
              <ChevronRight size={14} aria-hidden="true"/>
            </button></li>
          </ul>
        </nav>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse-dim{0%,100%{opacity:.3}50%{opacity:.6}}`}</style>
    </main>
  );
}
