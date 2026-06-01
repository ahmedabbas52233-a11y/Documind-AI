import React, { useRef, useEffect } from "react";
import { Loader2, CheckCircle, WifiOff } from "lucide-react";

const card = {
  background: "rgba(13,17,32,0.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 24,
  minHeight: 280,
  display: "flex",
  flexDirection: "column",
};

export default function StreamingText({ text, isStreaming, isDone, error }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [text]);

  const lines = (text || "").split("\n");

  return (
    <article style={card} aria-label="Document analysis results">
      {/* Status header */}
      <header
        style={{
          display: "flex", alignItems: "center", gap: 8,
          paddingBottom: 14, marginBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {error && (
          <>
            <WifiOff size={15} color="#f87171" aria-hidden="true" />
            <span style={{ fontSize: 13, color: "#f87171", fontWeight: 600 }}>
              Analysis failed
            </span>
          </>
        )}
        {isStreaming && (
          <>
            <Loader2
              size={15}
              color="#818cf8"
              aria-hidden="true"
              style={{ animation: "spin .7s linear infinite" }}
            />
            <span style={{ fontSize: 13, color: "#a5b4fc", fontWeight: 600 }}>
              Analyzing document…
            </span>
            <span
              style={{
                marginLeft: "auto", fontSize: 11,
                color: "#94a3b8",
                fontFamily: "'DM Mono', monospace",
              }}
              aria-live="off"
              aria-hidden="true"
            >
              {text.length} chars
            </span>
          </>
        )}
        {isDone && (
          <>
            <CheckCircle size={15} color="#4ade80" aria-hidden="true" />
            <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>
              Analysis complete
            </span>
          </>
        )}
        {!error && !isStreaming && !isDone && (
          <span style={{ fontSize: 13, color: "#94a3b8" }}>Waiting…</span>
        )}
      </header>

      {/* Error body */}
      {error && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 10, color: "#fca5a5", fontSize: 13, marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      {/* Skeleton while waiting for first chunk */}
      {!text && isStreaming && (
        <div
          aria-label="Loading analysis…"
          style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}
        >
          {[70, 50, 80, 45, 65].map((w, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                height: 12, borderRadius: 6,
                background: "rgba(255,255,255,0.05)",
                width: `${w}%`,
                animation: "pulse-fade 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", lineHeight: 1.65 }}>
        {lines.map((line, i) => {
          const t = line.trim();
          if (!t) return <div key={i} style={{ height: 8 }} aria-hidden="true" />;

          if (t.startsWith("## ")) {
            return (
              <h2
                key={i}
                style={{
                  fontSize: 16, fontWeight: 700, color: "#f1f5f9",
                  marginTop: 20, marginBottom: 6,
                }}
              >
                {t.slice(3)}
              </h2>
            );
          }

          if (t.startsWith("- ") || t.startsWith("* ")) {
            return (
              <div
                key={i}
                style={{
                  display: "flex", gap: 8, marginBottom: 5,
                  fontSize: 13, color: "#cbd5e1",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#818cf8", flexShrink: 0, marginTop: 7,
                  }}
                />
                {t.slice(2)}
              </div>
            );
          }

          return (
            <p key={i} style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 6 }}>
              {t}
            </p>
          );
        })}

        {/* Blinking cursor */}
        {isStreaming && text && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block", width: 2, height: 14,
              background: "#818cf8", marginLeft: 2,
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite",
            }}
          />
        )}

        <div ref={endRef} />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-fade { 0%,100% { opacity: .4; } 50% { opacity: .8; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </article>
  );
}
