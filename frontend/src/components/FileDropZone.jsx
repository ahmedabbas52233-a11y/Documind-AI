import React, { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import apiClient from "../api/client";
<<<<<<< HEAD
import { C, cardBase } from "../theme";

const ALLOWED = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const fmt = (b) =>
  b < 1_048_576
    ? `${(b / 1024).toFixed(1)} KB`
    : `${(b / 1_048_576).toFixed(2)} MB`;
=======

const ALLOWED = ["application/pdf","image/png","image/jpeg","image/jpg","image/webp"];
const fmt = (b) => b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(2)} MB`;
>>>>>>> origin/main

export default function FileDropZone({ onUploadSuccess, onUploadError }) {
  const [drag,      setDrag]      = useState(false);
  const [file,      setFile]      = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [localErr,  setLocalErr]  = useState(null);
  const inputRef = useRef(null);

<<<<<<< HEAD
  const validate = useCallback(
    (f) => {
      setLocalErr(null);
      onUploadError(null);
      if (!ALLOWED.includes(f.type)) {
        const m = "Unsupported file type. Please use PDF, PNG, JPG, or WEBP.";
        setLocalErr(m); onUploadError(m); return false;
      }
      if (f.size > 5 * 1_048_576) {
        const m = `File too large (${fmt(f.size)}). Maximum is 5 MB.`;
        setLocalErr(m); onUploadError(m); return false;
      }
      return true;
    },
    [onUploadError]
  );

  const pick  = useCallback((f) => { if (validate(f)) setFile(f); }, [validate]);
  const clear = () => {
    setFile(null); setLocalErr(null); onUploadError(null);
    if (inputRef.current) inputRef.current.value = "";
  };
=======
  const validate = useCallback((f) => {
    setLocalErr(null); onUploadError(null);
    if (!ALLOWED.includes(f.type)) {
      const m = "Unsupported file type. Please use PDF, PNG, or JPG.";
      setLocalErr(m); onUploadError(m); return false;
    }
    if (f.size > 5 * 1024 * 1024) {
      const m = `File too large (${fmt(f.size)}). Maximum is 5 MB.`;
      setLocalErr(m); onUploadError(m); return false;
    }
    return true;
  }, [onUploadError]);

  const pick = useCallback((f) => { if (validate(f)) setFile(f); }, [validate]);
  const clear = () => { setFile(null); setLocalErr(null); onUploadError(null); if (inputRef.current) inputRef.current.value=""; };
>>>>>>> origin/main

  const doUpload = async () => {
    if (!file) return;
    setUploading(true); setProgress(0);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const { data } = await apiClient.post("/upload/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
<<<<<<< HEAD
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
=======
        onUploadProgress: (e) => { if (e.total) setProgress(Math.round(e.loaded * 100 / e.total)); },
>>>>>>> origin/main
      });
      onUploadSuccess(data);
    } catch (err) {
      const d   = err.response?.data?.detail;
<<<<<<< HEAD
      const msg =
        typeof d === "string"   ? d
        : Array.isArray(d)      ? d.map((x) => x.msg).join(", ")
=======
      const msg = typeof d === "string" ? d
        : Array.isArray(d) ? d.map(x => x.msg).join(", ")
>>>>>>> origin/main
        : "Upload failed. Please try again.";
      setLocalErr(msg); onUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

<<<<<<< HEAD
  /* ── Empty state: drop zone ─────────────────────────────────── */
  if (!file) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload area — drag and drop a file, or press Enter to browse"
        onDragOver={(e)  => { e.preventDefault(); setDrag(true);  }}
        onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
        onDrop={(e) => {
          e.preventDefault(); setDrag(false);
          const f = e.dataTransfer.files[0];
          if (f) pick(f);
        }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); inputRef.current?.click();
          }
        }}
        style={{
          border: `2px dashed ${drag ? C.indigo : "rgba(255,255,255,.1)"}`,
          borderRadius: 14,
          padding: "52px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: drag ? "rgba(99,102,241,.04)" : "rgba(18,18,26,.6)",
          transition: "border-color .2s, background .2s",
          outline: "none",
        }}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          onChange={(e) => { const f = e.target.files[0]; if (f) pick(f); }}
          aria-label="Choose a PDF, PNG, JPG, or WEBP file"
          style={{ display: "none" }}
        />

        {/* Icon */}
        <div
          aria-hidden="true"
          style={{
            width: 52, height: 52, borderRadius: 13,
            background: drag ? "rgba(99,102,241,.12)" : "rgba(255,255,255,.04)",
            display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 18px",
            transition: "background .2s",
          }}
        >
          <Upload size={22} color={drag ? C.info : C.textMuted} />
        </div>

        <p style={{ fontWeight: 700, color: C.textPrimary, marginBottom: 5 }}>
          {drag ? "Drop to upload" : "Drag & drop your document"}
        </p>
        <p style={{ fontSize: 13, color: C.textMuted }}>
          or{" "}
          <span style={{ color: C.info, fontWeight: 600 }}>browse files</span>
          {" "}— PDF, PNG, JPG, WEBP up to 5 MB
        </p>
      </div>
    );
  }

  /* ── File selected ──────────────────────────────────────────── */
  return (
    <div style={{ ...cardBase, padding: 20 }}>

      {/* File row */}
      <div
        style={{
          display: "flex", alignItems: "center",
          gap: 12, marginBottom: uploading || localErr ? 16 : 0,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 38, height: 38, borderRadius: 9,
            background: "rgba(99,102,241,.09)",
            border: "1px solid rgba(99,102,241,.15)",
            display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}
        >
          <FileText size={16} color={C.info} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontWeight: 600, color: C.textPrimary, margin: 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              fontSize: 14,
            }}
            title={file.name}
          >
            {file.name}
          </p>
          <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>
            {fmt(file.size)}
          </p>
        </div>

        {!uploading && (
          <button
            type="button"
            onClick={clear}
            aria-label={`Remove ${file.name}`}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: C.textMuted, padding: 5, borderRadius: 6,
              display: "flex", flexShrink: 0,
            }}
          >
=======
  /* ── Empty drop zone ── */
  if (!file) return (
    <div
      role="button" tabIndex={0}
      aria-label="Upload area — drag and drop a file or press Enter to browse"
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
      onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) pick(f); }}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); inputRef.current?.click(); } }}
      style={{
        border:`2px dashed ${drag ? "#6366f1" : "rgba(255,255,255,.1)"}`,
        borderRadius:14, padding:"52px 24px", textAlign:"center", cursor:"pointer",
        background: drag ? "rgba(99,102,241,.05)" : "rgba(15,20,40,.6)",
        transition:"all .2s", outline:"none",
      }}
    >
      <input ref={inputRef} id="file-input" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp"
        onChange={(e) => { const f = e.target.files[0]; if (f) pick(f); }}
        aria-label="Choose file" style={{ display:"none" }} />

      <div style={{
        width:52, height:52, borderRadius:13, margin:"0 auto 16px",
        background: drag ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.04)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }} aria-hidden="true">
        <Upload size={22} color={drag ? "#818cf8" : "#64748b"} />
      </div>
      <p style={{ fontWeight:700, color:"#f1f5f9", marginBottom:5 }}>
        {drag ? "Drop to upload" : "Drag & drop your document"}
      </p>
      <p style={{ fontSize:13, color:"#94a3b8" }}>
        or <span style={{ color:"#818cf8", fontWeight:600 }}>browse files</span> · PDF, PNG, JPG up to 5 MB
      </p>
    </div>
  );

  /* ── File selected ── */
  return (
    <div style={{
      background:"rgba(15,20,40,.8)", border:"1px solid rgba(255,255,255,.08)",
      borderRadius:14, padding:20,
    }}>
      {/* File row */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <div style={{ width:38, height:38, borderRadius:9, background:"rgba(99,102,241,.1)",
          border:"1px solid rgba(99,102,241,.15)", display:"flex", alignItems:"center",
          justifyContent:"center", flexShrink:0 }} aria-hidden="true">
          <FileText size={16} color="#818cf8" />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontWeight:600, color:"#f1f5f9", overflow:"hidden",
            textOverflow:"ellipsis", whiteSpace:"nowrap", margin:0 }} title={file.name}>
            {file.name}
          </p>
          <p style={{ fontSize:12, color:"#64748b", margin:0 }}>{fmt(file.size)}</p>
        </div>
        {!uploading && (
          <button type="button" onClick={clear} aria-label={`Remove ${file.name}`}
            style={{ background:"none", border:"none", cursor:"pointer",
              color:"#64748b", padding:5, borderRadius:6, display:"flex" }}>
>>>>>>> origin/main
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

<<<<<<< HEAD
      {/* Upload progress */}
      {uploading && (
        <div style={{ marginBottom: 14 }} aria-live="polite" aria-atomic="true">
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12, color: C.textMuted, marginBottom: 6,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Loader2
                size={11}
                color={C.info}
                aria-hidden="true"
                style={{ animation: "spin .7s linear infinite" }}
              />
              Uploading…
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: C.info,
              }}
              aria-label={`${progress} percent`}
            >
              {progress}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Upload progress"
            style={{
              height: 3, background: "rgba(255,255,255,.06)",
              borderRadius: 99, overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%", width: `${progress}%`,
                background: C.grad, borderRadius: 99,
                transition: "width .3s",
              }}
            />
=======
      {/* Progress */}
      {uploading && (
        <div style={{ marginBottom:14 }} aria-live="polite" aria-atomic="true">
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12,
            color:"#94a3b8", marginBottom:5 }}>
            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
              <Loader2 size={11} color="#818cf8" aria-hidden="true"
                style={{ animation:"spin .7s linear infinite" }} />
              Uploading…
            </span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", color:"#818cf8" }}
              aria-label={`${progress} percent`}>{progress}%</span>
          </div>
          <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
            aria-label="Upload progress"
            style={{ height:3, background:"rgba(255,255,255,.06)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`,
              background:"linear-gradient(90deg,#4f46e5,#7c3aed)",
              borderRadius:99, transition:"width .3s" }} />
>>>>>>> origin/main
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Validation error */}
      {localErr && (
        <div
          role="alert"
          style={{
            display: "flex", gap: 8, padding: "9px 12px",
            marginBottom: 12,
            background: C.errorBg,
            border: `1px solid ${C.errorBorder}`,
            borderRadius: 8, color: "#fca5a5", fontSize: 13,
          }}
        >
          <AlertCircle
            size={13}
            style={{ flexShrink: 0, marginTop: 1 }}
            aria-hidden="true"
          />
=======
      {/* Error */}
      {localErr && (
        <div role="alert" style={{ display:"flex", gap:7, padding:"9px 12px", marginBottom:12,
          background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)",
          borderRadius:8, color:"#fca5a5", fontSize:13 }}>
          <AlertCircle size={13} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true" />
>>>>>>> origin/main
          {localErr}
        </div>
      )}

      {/* Upload button */}
      {!uploading && (
<<<<<<< HEAD
        <button
          type="button"
          onClick={doUpload}
          style={{
            width: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 7,
            padding: "11px 20px", borderRadius: 9,
            background: C.grad, color: "#fff",
            border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 14, fontFamily: "inherit",
            boxShadow: "0 6px 20px -4px rgba(99,102,241,.4)",
            marginTop: localErr ? 0 : 14,
          }}
        >
          <CheckCircle size={14} aria-hidden="true" />
          Upload &amp; Analyse
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
=======
        <button type="button" onClick={doUpload}
          style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center",
            gap:7, padding:"11px 20px", borderRadius:9,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            color:"#fff", border:"none", cursor:"pointer",
            fontWeight:700, fontSize:14, fontFamily:"inherit",
            boxShadow:"0 6px 20px -4px rgba(99,102,241,.4)" }}>
          <CheckCircle size={14} aria-hidden="true" /> Upload &amp; Analyse
        </button>
      )}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
>>>>>>> origin/main
    </div>
  );
}
