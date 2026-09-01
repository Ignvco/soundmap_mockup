import { useState } from "react";

const ANALYSIS_TABS = ["RT60", "EDT", "Clarity", "Reflection"];

const RT60_DATA = [
  { freq: 63, measured: 1.88, target: [1.2, 1.6] },
  { freq: 125, measured: 1.76, target: [1.2, 1.6] },
  { freq: 250, measured: 1.58, target: [1.2, 1.6] },
  { freq: 500, measured: 1.42, target: [1.2, 1.6] },
  { freq: "1k", measured: 1.26, target: [1.2, 1.6] },
  { freq: "2k", measured: 1.15, target: [1.2, 1.6] },
  { freq: "4k", measured: 1.08, target: [1.2, 1.6] },
  { freq: "8k", measured: 0.95, target: [1.2, 1.6] },
];

function RT60Chart() {
  const W = 600, H = 160;
  const N = RT60_DATA.length;
  const maxVal = 2.2;

  const toX = (i: number) => 30 + (i / (N - 1)) * (W - 50);
  const toY = (v: number) => H - 20 - ((v / maxVal) * (H - 40));

  const measPts = RT60_DATA.map((d, i) => [toX(i), toY(d.measured)] as [number, number]);
  const measPath = measPts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const measFill = `M${measPts[0][0]},${H - 20} ${measPts.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} L${measPts[N-1][0]},${H-20} Z`;

  // Target range band
  const targetTop = RT60_DATA.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(d.target[1]).toFixed(1)}`).join(" ");
  const targetBot = RT60_DATA.map((d, i) => `${i === N-1 ? "M" : "L"}${toX(i).toFixed(1)},${toY(d.target[0]).toFixed(1)}`).join(" ");
  const targetFill = `${targetTop} ${targetBot.replace(/M/, "L")} Z`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="rt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Grid */}
      {[0, 0.5, 1.0, 1.5, 2.0].map(v => (
        <g key={v}>
          <line x1="30" y1={toY(v)} x2={W - 20} y2={toY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <text x="22" y={toY(v) + 3} textAnchor="end" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">{v.toFixed(1)}</text>
        </g>
      ))}

      {/* Target range */}
      <path d={targetFill} fill="rgba(255,255,255,0.04)" stroke="none"/>
      <path d={`${targetTop}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
      <path d={`${targetBot.replace("M","M")}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4"/>

      {/* Measured fill */}
      <path d={measFill} fill="url(#rt-fill)"/>
      {/* Measured line */}
      <path d={measPath} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Points */}
      {measPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5"/>
      ))}

      {/* Freq labels */}
      {RT60_DATA.map((d, i) => (
        <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">{d.freq}</text>
      ))}
    </svg>
  );
}

export default function AcousticAnalysis() {
  const [activeTab, setActiveTab] = useState("RT60");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Acoustic Analysis
          </button>
        </div>
        <button style={{ padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Export</button>
      </header>

      {/* Analysis tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {ANALYSIS_TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "9px 18px", background: "none", border: "none", borderBottom: activeTab === t ? "2px solid var(--accent)" : "2px solid transparent", color: activeTab === t ? "var(--text)" : "var(--text-muted)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Main metric + chart */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 28px 20px", overflow: "hidden" }}>
          {/* Hero value */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>RT60 Mid</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 64, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>1.42</span>
              <span style={{ fontSize: 24, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>s</span>
              <div style={{ marginLeft: 12, padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.2)" }}>
                <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Excellent</span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Target: 1.2 s – 1.6 s · ISO 3382</div>
          </div>

          {/* Chart */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>RT60 by frequency band</span>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 1.5, background: "var(--accent)" }}/>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Measured</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 1, background: "rgba(255,255,255,0.3)", borderTop: "1px dashed rgba(255,255,255,0.3)" }}/>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Target</span>
                </div>
              </div>
            </div>
            <RT60Chart />
          </div>

          {/* Data table */}
          <div style={{ marginTop: 20, display: "flex", gap: 0, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
            {RT60_DATA.slice(0, 6).map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 5 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4, fontFamily: "Geist Mono" }}>{d.freq} Hz</div>
                <div style={{ fontSize: 14, fontFamily: "Geist Mono", fontWeight: 500, color: d.measured >= d.target[0] && d.measured <= d.target[1] ? "var(--accent)" : "var(--text)" }}>{d.measured.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ width: 220, borderLeft: "1px solid var(--border)", padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Results</div>
            {[
              { label: "RT60 Mid", value: "1.42 s", ok: true },
              { label: "EDT", value: "1.38 s", ok: true },
              { label: "Clarity C80", value: "+2.1 dB", ok: true },
              { label: "Definition D50", value: "0.62", ok: true },
              { label: "Strength G", value: "4.8 dB", ok: false },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{r.label}</span>
                <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: r.ok ? "var(--text)" : "var(--text-muted)" }}>{r.value}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Room type</div>
            <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>Teatro Gran Rex</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Live music · 2,186 seats</div>
          </div>
        </div>
      </div>
    </div>
  );
}
