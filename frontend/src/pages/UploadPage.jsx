import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, FileText, Info } from "lucide-react";
import FileDropZone from "../components/FileDropZone";
import { useAuth } from "../contexts/AuthContext";

export default function UploadPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState(null);

  const onSuccess = (data) => {
    setError(null);
    navigate("/analysis", { state: { documentId: data.document_id, filename: data.filename } });
  };

  return (
    <main id="main-content" style={{ maxWidth:620, margin:"0 auto", padding:"56px 20px 80px" }}>
      {/* Header */}
      <header style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{
          width:54, height:54, borderRadius:14, margin:"0 auto 18px",
          background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.18)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }} aria-hidden="true">
          <FileText size={22} color="#818cf8" />
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:"#f1f5f9", letterSpacing:"-.5px", marginBottom:8 }}>
          Upload a Document
        </h1>
        <p style={{ color:"#94a3b8", fontSize:15 }}>
          Drop a PDF or image to start AI analysis
        </p>
      </header>

      {/* Global error */}
      {error && (
        <div role="alert" style={{
          display:"flex", gap:9, padding:"11px 14px", marginBottom:18,
          background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)",
          borderRadius:10, color:"#fca5a5", fontSize:13,
        }}>
          <AlertCircle size={15} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
          <div>
            <strong style={{ color:"#f87171" }}>Upload failed</strong>
            <br />{error}
          </div>
        </div>
      )}

      <FileDropZone onUploadSuccess={onSuccess} onUploadError={setError} />

      {/* Info row */}
      <aside aria-label="File requirements" style={{
        marginTop:14, padding:"12px 16px",
        background:"rgba(15,20,40,.7)", border:"1px solid rgba(255,255,255,.07)",
        borderRadius:10, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center",
      }}>
        <Info size={13} color="#818cf8" aria-hidden="true" style={{ flexShrink:0 }} />
        <span style={{ fontSize:13, color:"#94a3b8", flex:1 }}>
          <strong style={{ color:"#cbd5e1" }}>Accepted:</strong> PDF, PNG, JPG, JPEG · Max 5 MB
        </span>
        {!isAuthenticated && (
          <span style={{ fontSize:12, color:"#94a3b8" }}>
            <Link to="/register" style={{ color:"#818cf8", fontWeight:600 }}>Sign up</Link> to save history
          </span>
        )}
      </aside>
    </main>
  );
}
