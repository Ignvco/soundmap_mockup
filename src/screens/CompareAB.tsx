import { useState } from "react";

function Heatmap({ id, hot }: { id: string; hot: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={`hm-${id}`} cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor={hot ? "#C9F03E" : "#8BC34A"} stopOpacity="0.9"/>
          <stop offset="30%" stopColor="#4CAF50" stopOpacity="0.7"/>
          <stop offset="60%" stopColor="#2E7D32" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#1B3B1E" stopOpacity="0.1"/>
        </radialGradient>
      </defs>
      <rect x="10" y="10" width="280" height="180" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <ellipse cx="150" cy="115" rx="130" ry="80" fill={`url(#hm-${id})`}/>
      {[0.3, 0.55, 0.78].map((r, i) => (
        <ellipse key={i} cx="150" cy="115" rx={r * 130} ry={r * 80} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      ))}
      {/* Stage */}
      <rect x="90" y="12" width="120" height="20" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      {/* Speakers */}
      {[120, 150, 180].map((x, i) => (
        <rect key={i} x={x - 5} y={32} width="10" height="8" rx="1" fill="var(--elevated)" stroke="var(--accent)" strokeWidth="0.8"/>
      ))}
    </svg>
  );
}

function DeltaHeatmap() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="delta-hm" cx="45%" cy="55%" r="70%">
          <stop offset="0%" stopColor="#ff4444" stopOpacity="0.8"/>
          <stop offset="30%" stopColor="#ff8800" stopOpacity="0.6"/>
          <stop offset="55%" stopColor="#ffcc00" stopOpacity="0.4"/>
          <stop offset="75%" stopColor="#4CAF50" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0.1"/>
        </radialGradient>
        <linearGradient id="delta-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4444"/>
          <stop offset="33%" stopColor="#ff8800"/>
          <stop offset="50%" stopColor="#ffcc00"/>
          <stop offset="67%" stopColor="#4CAF50"/>
          <stop offset="100%" stopColor="#1565C0"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="360" height="180" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <ellipse cx="190" cy="110" rx="160" ry="85" fill="url(#delta-hm)"/>
      {/* Scale */}
      <rect x="378" y="30" width="8" height="140" rx="2" fill="url(#delta-scale)"/>
      {["+6","+3","0","−3","−6"].map((v, i) => (
        <text key={v} x="390" y={34 + i * 35} fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">{v}</text>
      ))}
    </svg>
  );
}

const COMPARE_METRICS = [
  { label: "Max SPL", a: "100 dB", b: "102 dB", delta: "+2.0 dB", pos: true },
  { label: "Average SPL", a: "92 dB", b: "94 dB", delta: "+2.0 dB", pos: true },
  { label: "Uniformity", a: "81%", b: "87%", delta: "+6%", pos: true },
  { label: "Coverage", a: "79%", b: "87%", delta: "+8%", pos: true },
];

const TABS = ["AI / B", "SPL", "RT60", "Coverage"];

export default function CompareAB() {
  const [activeTab, setActiveTab] = useState("AI / B");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Compare
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: 0 }}>A/B Comparison</h1>
        </div>
        <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Export</button>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "9px 16px", background: "none", border: "none", borderBottom: activeTab === t ? "2px solid var(--accent)" : "2px solid transparent", color: activeTab === t ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* A/B visualizations */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* A */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: "var(--elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "var(--text)" }}>A</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Main PA v1</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>May 20, 2025</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Heatmap id="a" hot={false} />
            </div>
          </div>

          {/* B */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "var(--accent)" }}>B</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Main PA v2</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>May 24, 2025</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Heatmap id="b" hot={true} />
            </div>
          </div>

          {/* Delta */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Delta SPL (B − A)</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Average +2.4 dB</div>
            </div>
            <div style={{ flex: 1 }}>
              <DeltaHeatmap />
            </div>
          </div>
        </div>

        {/* Metrics comparison */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 28px", flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px", gap: "0 20px", marginBottom: 10 }}>
            {["Metric","A","B","Delta"].map(h => <span key={h} style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>)}
          </div>
          {COMPARE_METRICS.map(m => (
            <div key={m.label} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px", gap: "0 20px", padding: "8px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{m.label}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text)" }}>{m.a}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text)" }}>{m.b}</span>
              <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: m.pos ? "var(--accent)" : "#ff6b6b", fontWeight: 600 }}>{m.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
