import React from "react";
import { C } from "../theme";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh", display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: 24, background: C.bg,
        }}
      >
        <div
          style={{
            maxWidth: 440, width: "100%", textAlign: "center",
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 18, padding: "40px 32px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              fontSize: 40, marginBottom: 16,
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(248,113,113,.08)",
              border: "1px solid rgba(248,113,113,.2)",
              display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 20px",
            }}
          >
            ⚠
          </div>
          <h1
            style={{
              fontSize: 20, fontWeight: 800,
              color: C.textPrimary, marginBottom: 8,
            }}
          >
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24, lineHeight: 1.65 }}>
            An unexpected error occurred. Try refreshing the page — if the
            problem persists, contact support.
          </p>
          {this.state.error?.message && (
            <pre
              style={{
                fontSize: 11, color: C.textMuted, textAlign: "left",
                background: "rgba(255,255,255,.03)",
                border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "10px 12px",
                overflowX: "auto", marginBottom: 24,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {this.state.error.message}
            </pre>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "9px 20px", borderRadius: 9,
                background: C.grad, color: "#fff",
                border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: 14, fontFamily: "inherit",
              }}
            >
              Reload page
            </button>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.history.back(); }}
              style={{
                padding: "9px 20px", borderRadius: 9,
                background: "rgba(255,255,255,.05)",
                border: `1px solid ${C.border}`,
                color: C.textSecondary, cursor: "pointer",
                fontSize: 14, fontFamily: "inherit",
              }}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
