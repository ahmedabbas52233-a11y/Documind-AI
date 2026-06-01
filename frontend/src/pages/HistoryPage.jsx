import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Clock, ArrowRight, Loader2, Trash2,
  AlertCircle, RefreshCw, ChevronLeft, ChevronRight, History,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/client";

const fmt = (b) => b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(2)} MB`;
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-US", {
  month:"short", day:"numeric", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "—";

const card = {
  background:"rgba(15,20,40,.8)",
  border:"1px solid rgba(255,255,255,.07)",
  borderRadius:14,
};

export default function HistoryPage() {
  const { isAuthenticated } = useAuth();
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [page,     setPage]     = useState(1);
  const [total,    setTotal]    = useState(0);
  const [pages,    setPages]    = useState(1);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async (p) => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiClient.get(`/history/?page=${p}&page_size=10`);
      setItems(data.items); setTotal(data.total); setPages(data.pages); setPage(p);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load history.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (isAuthenticated) load(1); }, [isAuthenticated, load]);

  const del = async (id) => {
    setDeleting(id);
    try {
      await apiClient.delete(`/history/${id}`);
      setItems(p => p.filter(d => d.id !== id));
      setTotal(t => t - 1);
    } catch { /* silently fail */ }
    finally { setDeleting(null); }
  };

  if (!isAuthenticated) return (
    <main id="main-content" style={{ minHeight:"80vh", display:"flex", alignItems:"center",
      justifyContent:"center", padding:24 }}>
      <div style={{ ...card, padding:48, maxWidth:340, width:"100%", textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:12, background:"rgba(99,102,241,.1)",
          border:"1px solid rgba(99,102,241,.15)", display:"flex", alignItems:"center",
          justifyContent:"center", margin:"0 auto 16px" }} aria-hidden="true">
          <History size={20} color="#818cf8" />
        </div>
        <h1 style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:8 }}>Sign in to view history</h1>
        <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>
          Create an account to save and revisit your analyses.
        </p>
        <Link to="/login" style={{
          display:"inline-flex", alignItems:"center", gap:6, padding:"10px 22px",
          borderRadius:9, background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
          color:"#fff", textDecoration:"none", fontWeight:700, fontSize:14,
        }}>
          Sign In <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );

  return (
    <main id="main-content" style={{ maxWidth:860, margin:"0 auto", padding:"40px 20px 64px" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
        <header>
          <h1 style={{ fontSize:24, fontWeight:800, color:"#f1f5f9", letterSpacing:"-.4px", margin:0 }}>
            Analysis History
          </h1>
          <p style={{ fontSize:13, color:"#64748b", margin:0 }} aria-live="polite">
            {total} document{total !== 1 ? "s" : ""} analysed
          </p>
        </header>
        <button type="button" onClick={() => load(page)} disabled={loading}
          aria-label="Refresh history"
          style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 14px",
            borderRadius:8, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
            color:"#94a3b8", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
          <RefreshCw size={12} aria-hidden="true"
            style={loading ? { animation:"spin .7s linear infinite" } : {}} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" style={{ display:"flex", gap:8, padding:"10px 14px", marginBottom:16,
          background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)",
          borderRadius:9, color:"#fca5a5", fontSize:13 }}>
          <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Skeletons */}
      {loading && (
        <div aria-label="Loading…" aria-busy="true" style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} aria-hidden="true" style={{ ...card, height:62,
              animation:"pulse-dim 1.4s ease-in-out infinite", animationDelay:`${i*.1}s` }} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && items.length === 0 && (
        <div style={{ ...card, padding:60, textAlign:"center" }}>
          <Clock size={38} color="#1e293b" style={{ marginBottom:14 }} aria-hidden="true" />
          <h2 style={{ fontWeight:700, color:"#f1f5f9", marginBottom:6 }}>No history yet</h2>
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Upload your first document to see it here.</p>
          <Link to="/upload" style={{ display:"inline-flex", alignItems:"center", gap:6,
            padding:"9px 20px", borderRadius:9,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            color:"#fff", textDecoration:"none", fontWeight:600, fontSize:13 }}>
            Upload Document <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* List */}
      {!loading && items.length > 0 && (
        <ul style={{ display:"flex", flexDirection:"column", gap:6, listStyle:"none", padding:0, margin:0 }}>
          {items.map((doc) => (
            <li key={doc.id} style={{ ...card, padding:"12px 16px",
              display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:8, background:"rgba(99,102,241,.08)",
                border:"1px solid rgba(99,102,241,.12)", display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0 }} aria-hidden="true">
                <FileText size={14} color="#818cf8" />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontWeight:600, color:"#f1f5f9", fontSize:14, margin:0,
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={doc.filename}>
                  {doc.filename}
                </p>
                <p style={{ fontSize:11, color:"#64748b", margin:0 }}>
                  {fmtDate(doc.created_at)} · {fmt(doc.file_size)}
                </p>
              </div>
              <span style={{ fontSize:11, color:"#64748b", fontFamily:"'JetBrains Mono',monospace",
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)",
                padding:"2px 7px", borderRadius:5, flexShrink:0 }}
                aria-label={`Document ID ${doc.id}`}>
                #{doc.id}
              </span>
              <button type="button" onClick={() => del(doc.id)} disabled={deleting === doc.id}
                aria-label={`Delete ${doc.filename}`}
                style={{ background:"none", border:"none", cursor:"pointer",
                  color:"#64748b", padding:5, borderRadius:6, display:"flex", flexShrink:0 }}>
                {deleting === doc.id
                  ? <Loader2 size={13} aria-hidden="true" style={{ animation:"spin .7s linear infinite" }} />
                  : <Trash2 size={13} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <nav aria-label="Pagination" style={{ marginTop:22 }}>
          <ul style={{ display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, listStyle:"none", padding:0, margin:0 }}>
            <li>
              <button type="button" onClick={() => load(page-1)} disabled={page<=1||loading}
                aria-label="Previous page"
                style={{ display:"flex", padding:"6px 11px", borderRadius:7,
                  background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                  color:"#94a3b8", cursor:"pointer", opacity:page<=1||loading?.35:1, fontFamily:"inherit" }}>
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
            </li>
            <li>
              <span style={{ fontSize:13, color:"#94a3b8" }} aria-live="polite">
                Page {page} of {pages}
              </span>
            </li>
            <li>
              <button type="button" onClick={() => load(page+1)} disabled={page>=pages||loading}
                aria-label="Next page"
                style={{ display:"flex", padding:"6px 11px", borderRadius:7,
                  background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                  color:"#94a3b8", cursor:"pointer", opacity:page>=pages||loading?.35:1, fontFamily:"inherit" }}>
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      )}
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse-dim { 0%,100%{opacity:.35} 50%{opacity:.65} }
      `}</style>
    </main>
  );
}
