import { useState } from "react";

function SPLHeatmapLarge() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="spl-large" cx="50%" cy="55%" r="65%" fx="50%" fy="55%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.95"/>
          <stop offset="18%" stopColor="#8BC34A" stopOpacity="0.85"/>
          <stop offset="38%" stopColor="#4CAF50" stopOpacity="0.7"/>
          <stop offset="58%" stopColor="#2E7D32" stopOpacity="0.5"/>
          <stop offset="78%" stopColor="#1B5E20" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#0d2e12" stopOpacity="0.05"/>
        </radialGradient>
        <linearGradient id="spl-scale-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E"/>
          <stop offset="40%" stopColor="#4CAF50"/>
          <stop offset="70%" stopColor="#2E7D32"/>
          <stop offset="100%" stopColor="#1B3B1E"/>
        </linearGradient>
        <clipPath id="venue-clip-large">
          <ellipse cx="290" cy="210" rx="260" ry="165"/>
        </clipPath>
      </defs>

      {/* Outer venue boundary */}
      <ellipse cx="290" cy="210" rx="270" ry="172" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* Coverage fill */}
      <ellipse cx="290" cy="210" rx="260" ry="165" fill="url(#spl-large)" clipPath="url(#venue-clip-large)"/>

      {/* Isocurves */}
      {[0.22, 0.38, 0.54, 0.70, 0.85].map((r, i) => (
        <ellipse key={i} cx="290" cy="220" rx={r * 255} ry={r * 155} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
      ))}

      {/* Seating rows */}
      {[0.3, 0.45, 0.6, 0.74, 0.86, 0.95].map((r, i) => (
        <ellipse key={i} cx="290" cy="225" rx={r * 240} ry={r * 145} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
      ))}

      {/* Stage */}
      <rect x="175" y="28" width="230" height="50" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <text x="290" y="57" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Geist Mono">STAGE</text>

      {/* Speakers */}
      {[{x:220,y:78,label:"TOP L"},{x:290,y:72,label:"C"},{x:360,y:78,label:"TOP R"}].map((s, i) => (
        <g key={i}>
          <rect x={s.x-9} y={s.y-7} width="18" height="14" rx="2" fill="var(--elevated)" stroke="var(--accent)" strokeWidth="1.2"/>
          <circle cx={s.x} cy={s.y} r="3" fill="var(--accent)" opacity="0.7"/>
        </g>
      ))}
      {/* Subs */}
      {[{x:247,y:88},{x:333,y:88}].map((s, i) => (
        <rect key={i} x={s.x-8} y={s.y-6} width="16" height="12" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      ))}

      {/* Side hangs */}
      <rect x="20" y="148" width="14" height="38" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <rect x="566" y="148" width="14" height="38" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

      {/* SPL Scale */}
      <rect x="562" y="100" width="10" height="160" rx="3" fill="url(#spl-scale-v)"/>
      {[105, 100, 95, 90, 85, 80].map((v, i) => (
        <text key={v} x="576" y={104 + i * 32} fill="var(--text-muted)" fontSize="9" fontFamily="Geist Mono">{v}</text>
      ))}
      <text x="564" y="92" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">dB</text>
    </svg>
  );
}

const METRICS = [
  { value: "102", unit: "dB", label: "MAX SPL" },
  { value: "94", unit: "dB", label: "AVERAGE" },
  { value: "87", unit: "%", label: "UNIFORMITY" },
  { value: "98", unit: "%", label: "COVERAGE" },
];

const VIEW_TABS = ["Live", "Average", "Frequency", "Distribution"];

export default function SPLAnalysis() {
  const [activeView, setActiveView] = useState("Average");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            SPL Analysis
          </button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>2D</button>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>3D</button>
        </div>
      </header>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 4, padding: "10px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {VIEW_TABS.map(t => (
          <button key={t} onClick={() => setActiveView(t)} style={{ padding: "5px 14px", borderRadius: "var(--radius-sm)", background: activeView === t ? "var(--elevated)" : "transparent", border: activeView === t ? "1px solid var(--border)" : "1px solid transparent", color: activeView === t ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <select style={{ padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>1 kHz</option><option>125 Hz</option><option>500 Hz</option><option>4 kHz</option>
          </select>
          <select style={{ padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>A</option><option>C</option><option>Z</option>
          </select>
          <select style={{ padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>1/3 Oct</option><option>1/1 Oct</option>
          </select>
        </div>
      </div>

      {/* Heatmap — hero */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <SPLHeatmapLarge />
      </div>

      {/* Metric strip */}
      <div style={{ display: "flex", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ flex: 1, padding: "14px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ fontSize: 24, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)" }}>{m.value}</span>
              <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>{m.unit}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
