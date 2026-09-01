import { useState } from "react";

function HeatmapA() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 340 260" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="hm-a-l" cx="22%" cy="28%" r="72%" fx="22%" fy="22%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.85"/>
          <stop offset="30%"  stopColor="#4CAF50" stopOpacity="0.60"/>
          <stop offset="65%"  stopColor="#2E7D32" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hm-a-r" cx="78%" cy="28%" r="72%" fx="78%" fy="22%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.85"/>
          <stop offset="30%"  stopColor="#4CAF50" stopOpacity="0.60"/>
          <stop offset="65%"  stopColor="#2E7D32" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="clip-a">
          <rect x="12" y="12" width="316" height="236" rx="3"/>
        </clipPath>
      </defs>

      <rect x="12" y="12" width="316" height="236" rx="3" fill="#07100a" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <rect x="12" y="12" width="316" height="236" fill="url(#hm-a-l)" clipPath="url(#clip-a)"/>
      <rect x="12" y="12" width="316" height="236" fill="url(#hm-a-r)" clipPath="url(#clip-a)"/>

      {/* Isocurves — slightly uneven (v1 PA) */}
      <g clipPath="url(#clip-a)">
        <ellipse cx="170" cy="138" rx="35" ry="28" fill="none" stroke="#8BC34A" strokeWidth="0.7" strokeOpacity="0.55"/>
        <ellipse cx="168" cy="145" rx="70" ry="55" fill="none" stroke="#5DB84E" strokeWidth="0.55" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <ellipse cx="165" cy="152" rx="112" ry="84" fill="none" stroke="#3E9142" strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="4 3"/>
        <ellipse cx="160" cy="160" rx="148" ry="108" fill="none" stroke="#2E7D32" strokeWidth="0.45" strokeOpacity="0.3" strokeDasharray="5 4"/>
      </g>

      {/* Seating rows */}
      <g clipPath="url(#clip-a)">
        {[0,1,2,3,4,5].map(i=>(
          <ellipse key={i} cx="170" cy="178" rx={40+i*24} ry={16+i*14} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
        ))}
      </g>

      {/* Stage */}
      <rect x="110" y="14" width="120" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <text x="170" y="33" textAnchor="middle" fill="rgba(255,255,255,0.14)" fontSize="8" fontFamily="Geist Mono" letterSpacing="2">STAGE</text>

      {/* Speakers */}
      {[130,170,210].map((x,i)=>(
        <rect key={i} x={x-7} y={44} width="14" height="10" rx="2" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1"/>
      ))}

      {/* Speaker arrays */}
      <rect x="44" y="60" width="16" height="42" rx="2" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.1"/>
      {[0,1,2,3].map(i=><rect key={i} x="47" y={64+i*8} width="10" height="5" rx="1" fill="#C9F03E" opacity={0.5-i*0.08}/>)}
      <rect x="280" y="60" width="16" height="42" rx="2" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.1"/>
      {[0,1,2,3].map(i=><rect key={i} x="283" y={64+i*8} width="10" height="5" rx="1" fill="#C9F03E" opacity={0.5-i*0.08}/>)}

      {/* Subs */}
      <rect x="44" y="106" width="16" height="24" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"/>
      <rect x="280" y="106" width="16" height="24" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"/>

      {/* dB labels */}
      <text x="170" y="135" textAnchor="middle" fill="rgba(139,195,74,0.7)" fontSize="8" fontFamily="Geist Mono">100</text>
      <text x="240" y="162" textAnchor="middle" fill="rgba(93,184,78,0.5)" fontSize="7" fontFamily="Geist Mono">96</text>
      <text x="100" y="162" textAnchor="middle" fill="rgba(93,184,78,0.5)" fontSize="7" fontFamily="Geist Mono">96</text>
    </svg>
  );
}

function HeatmapB() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 340 260" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="hm-b-l" cx="22%" cy="26%" r="76%" fx="22%" fy="20%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.92"/>
          <stop offset="22%"  stopColor="#9DC94E" stopOpacity="0.75"/>
          <stop offset="45%"  stopColor="#5DB84E" stopOpacity="0.50"/>
          <stop offset="72%"  stopColor="#2E8B42" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#1A5C2A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hm-b-r" cx="78%" cy="26%" r="76%" fx="78%" fy="20%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.92"/>
          <stop offset="22%"  stopColor="#9DC94E" stopOpacity="0.75"/>
          <stop offset="45%"  stopColor="#5DB84E" stopOpacity="0.50"/>
          <stop offset="72%"  stopColor="#2E8B42" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#1A5C2A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hm-b-sub" cx="50%" cy="18%" r="58%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#4CAF50" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="clip-b">
          <rect x="12" y="12" width="316" height="236" rx="3"/>
        </clipPath>
      </defs>

      <rect x="12" y="12" width="316" height="236" rx="3" fill="#07100a" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <rect x="12" y="12" width="316" height="236" fill="url(#hm-b-l)"   clipPath="url(#clip-b)"/>
      <rect x="12" y="12" width="316" height="236" fill="url(#hm-b-r)"   clipPath="url(#clip-b)"/>
      <rect x="12" y="12" width="316" height="236" fill="url(#hm-b-sub)" clipPath="url(#clip-b)"/>

      {/* Isocurves — tighter, more uniform (v2 PA, better) */}
      <g clipPath="url(#clip-b)">
        <ellipse cx="170" cy="135" rx="38"  ry="30"  fill="none" stroke="#C9F03E" strokeWidth="0.8" strokeOpacity="0.65"/>
        <ellipse cx="170" cy="140" rx="75"  ry="58"  fill="none" stroke="#9DC94E" strokeWidth="0.6" strokeOpacity="0.45" strokeDasharray="4 3"/>
        <ellipse cx="170" cy="148" rx="120" ry="90"  fill="none" stroke="#5DB84E" strokeWidth="0.55" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <ellipse cx="170" cy="156" rx="165" ry="118" fill="none" stroke="#3E9142" strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="5 4"/>
      </g>

      {/* Seating rows */}
      <g clipPath="url(#clip-b)">
        {[0,1,2,3,4,5].map(i=>(
          <ellipse key={i} cx="170" cy="178" rx={40+i*26} ry={16+i*15} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
        ))}
      </g>

      {/* Stage */}
      <rect x="110" y="14" width="120" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <text x="170" y="33" textAnchor="middle" fill="rgba(255,255,255,0.14)" fontSize="8" fontFamily="Geist Mono" letterSpacing="2">STAGE</text>

      {/* Speakers (v2 — more arrays) */}
      {[118,150,170,190,222].map((x,i)=>(
        <rect key={i} x={x-6} y={44} width="12" height="10" rx="2" fill="#1a1a1a" stroke={i===0||i===4?"rgba(255,255,255,0.2)":"#C9F03E"} strokeWidth={i===0||i===4?0.8:1}/>
      ))}

      {/* Speaker arrays - same but tighter throw */}
      <rect x="42" y="58" width="16" height="48" rx="2" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.2"/>
      {[0,1,2,3,4].map(i=><rect key={i} x="45" y={62+i*8} width="10" height="5" rx="1" fill="#C9F03E" opacity={0.55-i*0.07}/>)}
      <rect x="282" y="58" width="16" height="48" rx="2" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.2"/>
      {[0,1,2,3,4].map(i=><rect key={i} x="285" y={62+i*8} width="10" height="5" rx="1" fill="#C9F03E" opacity={0.55-i*0.07}/>)}

      {/* Subs */}
      <rect x="42" y="110" width="16" height="28" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <rect x="282" y="110" width="16" height="28" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>

      {/* Fill L/R (new in v2) */}
      <rect x="14" y="142" width="11" height="26" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <rect x="315" y="142" width="11" height="26" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>

      {/* dB labels */}
      <text x="170" y="132" textAnchor="middle" fill="rgba(201,240,62,0.75)" fontSize="8" fontFamily="Geist Mono">102</text>
      <text x="255" y="158" textAnchor="middle" fill="rgba(157,201,78,0.55)" fontSize="7" fontFamily="Geist Mono">98</text>
      <text x="85" y="158" textAnchor="middle" fill="rgba(157,201,78,0.55)" fontSize="7" fontFamily="Geist Mono">98</text>
    </svg>
  );
}

function DeltaHeatmap() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 300" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Delta: red = B much better, yellow = slightly better, blue = worse */}
        <radialGradient id="delta-hot" cx="50%" cy="35%" r="68%" fx="50%" fy="28%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.85"/>
          <stop offset="25%"  stopColor="#8BC34A" stopOpacity="0.65"/>
          <stop offset="50%"  stopColor="#4CAF50" stopOpacity="0.40"/>
          <stop offset="72%"  stopColor="#2196F3" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#0D47A1" stopOpacity="0"/>
        </radialGradient>
        {/* Left side anomaly */}
        <radialGradient id="delta-anom-l" cx="18%" cy="55%" r="35%">
          <stop offset="0%"   stopColor="#FF5722" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0"/>
        </radialGradient>
        {/* Right side anomaly */}
        <radialGradient id="delta-anom-r" cx="82%" cy="55%" r="30%">
          <stop offset="0%"   stopColor="#FF9800" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#FF9800" stopOpacity="0"/>
        </radialGradient>
        {/* Rear negative */}
        <radialGradient id="delta-neg" cx="50%" cy="92%" r="40%">
          <stop offset="0%"   stopColor="#1565C0" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="delta-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C9F03E"/>
          <stop offset="25%"  stopColor="#8BC34A"/>
          <stop offset="45%"  stopColor="#4CAF50"/>
          <stop offset="65%"  stopColor="#2196F3"/>
          <stop offset="85%"  stopColor="#1565C0"/>
          <stop offset="100%" stopColor="#0D47A1"/>
        </linearGradient>
        <clipPath id="delta-clip">
          <rect x="14" y="14" width="400" height="272" rx="4"/>
        </clipPath>
      </defs>

      <rect x="14" y="14" width="400" height="272" rx="4" fill="#060a08" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Coverage layers */}
      <rect x="14" y="14" width="400" height="272" fill="url(#delta-hot)"    clipPath="url(#delta-clip)"/>
      <rect x="14" y="14" width="400" height="272" fill="url(#delta-anom-l)" clipPath="url(#delta-clip)"/>
      <rect x="14" y="14" width="400" height="272" fill="url(#delta-anom-r)" clipPath="url(#delta-clip)"/>
      <rect x="14" y="14" width="400" height="272" fill="url(#delta-neg)"    clipPath="url(#delta-clip)"/>

      {/* Grid */}
      <g clipPath="url(#delta-clip)" opacity="0.3">
        {Array.from({length:5},(_,i)=>(
          <line key={`v${i}`} x1={65+i*72} y1="14" x2={65+i*72} y2="286" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
        ))}
        {Array.from({length:4},(_,i)=>(
          <line key={`h${i}`} x1="14" y1={70+i*60} x2="414" y2={70+i*60} stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
        ))}
      </g>

      {/* Delta isocurves */}
      <g clipPath="url(#delta-clip)">
        <ellipse cx="214" cy="150" rx="45"  ry="35"  fill="none" stroke="#C9F03E" strokeWidth="0.8" strokeOpacity="0.6"/>
        <ellipse cx="214" cy="158" rx="92"  ry="70"  fill="none" stroke="#8BC34A" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <ellipse cx="214" cy="166" rx="145" ry="108" fill="none" stroke="#4CAF50" strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="4 3"/>
        <ellipse cx="214" cy="174" rx="192" ry="138" fill="none" stroke="#2196F3" strokeWidth="0.45" strokeOpacity="0.3" strokeDasharray="5 4"/>
      </g>

      {/* Stage reference */}
      <rect x="124" y="16" width="180" height="26" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"/>
      <text x="214" y="33" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="7.5" fontFamily="Geist Mono" letterSpacing="2">STAGE</text>

      {/* Delta value labels */}
      <text x="214" y="147" textAnchor="middle" fill="rgba(201,240,62,0.75)" fontSize="8.5" fontFamily="Geist Mono" fontWeight="600">+2.4</text>
      <text x="80"  y="175" textAnchor="middle" fill="rgba(255,87,34,0.7)"   fontSize="7.5" fontFamily="Geist Mono">+0.8</text>
      <text x="348" y="175" textAnchor="middle" fill="rgba(255,152,0,0.65)"  fontSize="7.5" fontFamily="Geist Mono">+1.2</text>
      <text x="214" y="268" textAnchor="middle" fill="rgba(33,150,243,0.6)"  fontSize="7.5" fontFamily="Geist Mono">−0.6</text>

      {/* Scale */}
      <rect x="422" y="40" width="10" height="210" rx="3" fill="url(#delta-scale)"/>
      {["+6","+4","+2","0","−2","−4","−6"].map((v,i)=>(
        <text key={v} x="436" y={44+i*35} fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">{v}</text>
      ))}
      <text x="418" y="32" fill="var(--text-muted)" fontSize="7.5" fontFamily="Geist Mono">dB</text>
    </svg>
  );
}

const COMPARE_METRICS = [
  { label: "Max SPL",     a: "100 dB", b: "102 dB", delta: "+2.0 dB", pos: true },
  { label: "Average SPL", a: "92 dB",  b: "94 dB",  delta: "+2.0 dB", pos: true },
  { label: "Uniformity",  a: "81%",    b: "87%",    delta: "+6%",     pos: true },
  { label: "Coverage",    a: "79%",    b: "87%",    delta: "+8%",     pos: true },
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
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: 0 }}>A/B Comparison · Teatro Gran Rex</h1>
        </div>
        <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Export</button>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "9px 16px", background: "none", border: "none", borderBottom: activeTab === t ? "2px solid var(--accent)" : "2px solid transparent", color: activeTab === t ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
      </div>

      {/* Visualizations */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* A */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "var(--elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--text)", fontFamily: "Geist Mono" }}>A</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Main PA v1</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>May 20, 2025 · d&b Y12 (6-box)</div>
              </div>
            </div>
            <div style={{ flex: 1, background: "#050507" }}>
              <HeatmapA />
            </div>
          </div>

          {/* B */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--accent)", fontFamily: "Geist Mono" }}>B</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Main PA v2</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>May 24, 2025 · d&b Y12 (6-box) + fills</div>
              </div>
            </div>
            <div style={{ flex: 1, background: "#050507" }}>
              <HeatmapB />
            </div>
          </div>

          {/* Delta */}
          <div style={{ flex: 1.3, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>Delta SPL (B − A)</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Average <span style={{ color: "var(--accent)", fontFamily: "Geist Mono" }}>+2.4 dB</span></div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: "#C9F03E" }}/>
                  <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "Geist Mono" }}>B better</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: "#1565C0" }}/>
                  <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "Geist Mono" }}>A better</span>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, background: "#050507" }}>
              <DeltaHeatmap />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "14px 28px", flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 90px", gap: "0 20px", marginBottom: 8 }}>
            {["Metric","A","B","Delta"].map(h => <span key={h} style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>)}
          </div>
          {COMPARE_METRICS.map(m => (
            <div key={m.label} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 90px", gap: "0 20px", padding: "7px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{m.label}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{m.a}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text)" }}>{m.b}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: m.pos ? "var(--accent)" : "#ff6b6b", fontWeight: 600 }}>{m.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
