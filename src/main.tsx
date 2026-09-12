import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function BootErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "grid", placeItems: "center", padding: "32px", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, width: "100%" }}>
          <div style={{ color: "#bf1e2e", fontWeight: 800, letterSpacing: ".12em", fontSize: 12 }}>AIRGEN / BOOT ERROR</div>
          <h1 style={{ fontSize: 38, margin: "14px 0" }}>The interface failed to start.</h1>
          <p style={{ color: "#999", lineHeight: 1.7, marginBottom: 18 }}>Open the browser console for the full stack trace. The splash screen has been dismissed so this error cannot remain hidden behind the loader.</p>
          <pre style={{ whiteSpace: "pre-wrap", color: "#f3f3f3", background: "#0a0a0a", border: "1px solid #222", padding: 18, overflow: "auto" }}>{error.message}</pre>
        </div>
      </div>
    );
  }

  return <ErrorCatcher onError={setError}>{children}</ErrorCatcher>;
}

class ErrorBoundary extends React.Component<{ onError: (error: Error) => void; children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { this.props.onError(error); }
  render() { return this.state.hasError ? null : this.props.children; }
}

function ErrorCatcher({ onError, children }: { onError: (error: Error) => void; children: React.ReactNode }) {
  return <ErrorBoundary onError={onError}>{children}</ErrorBoundary>;
}

const splash = () => document.getElementById("airgen-splash")?.classList.add("is-hidden");

window.addEventListener("error", () => splash(), { once: true });
window.addEventListener("unhandledrejection", () => splash(), { once: true });

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BootErrorBoundary>
      <App />
    </BootErrorBoundary>
  </React.StrictMode>,
);

requestAnimationFrame(() => splash());
