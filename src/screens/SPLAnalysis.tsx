import { useState } from "react";

function SPLHeatmapFull() {
  const W = 680, H = 420;

  // Theater polygon — horseshoe shape approximated
  const venuePath = `
    M 70 38
    L 610 38
    Q 648 38 648 76
    L 648 354
    Q 648 392 610 392
    L 70 392
    Q 32 392 32 354
    L 32 76
    Q 32 38 70 38 Z
  `;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="venue-spl-full">
          <path d={venuePath}/>
        </clipPath>

        {/* L array — angled throw toward center + right */}
        <radialGradient id="spl-l" cx="17%" cy="26%" r="80%" fx="17%" fy="22%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.9"/>
          <stop offset="15%"  stopColor="#A8C94A" stopOpacity="0.78"/>
          <stop offset="35%"  stopColor="#5DB84E" stopOpacity="0.60"/>
          <stop offset="58%"  stopColor="#2E8B42" stopOpacity="0.35"/>
          <stop offset="82%"  stopColor="#1A5C2A" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#0d2e16" stopOpacity="0"/>
        </radialGradient>

        {/* R array */}
        <radialGradient id="spl-r" cx="83%" cy="26%" r="80%" fx="83%" fy="22%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.9"/>
          <stop offset="15%"  stopColor="#A8C94A" stopOpacity="0.78"/>
          <stop offset="35%"  stopColor="#5DB84E" stopOpacity="0.60"/>
          <stop offset="58%"  stopColor="#2E8B42" stopOpacity="0.35"/>
          <stop offset="82%"  stopColor="#1A5C2A" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#0d2e16" stopOpacity="0"/>
        </radialGradient>

        {/* Sub energy — wide low-freq bloom */}
        <radialGradient id="spl-sub" cx="50%" cy="22%" r="72%" fx="50%" fy="16%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.55"/>
          <stop offset="30%"  stopColor="#5DB84E" stopOpacity="0.38"/>
          <stop offset="65%"  stopColor="#2E7D32" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>

        {/* Rear falloff shadow */}
        <radialGradient id="spl-rear" cx="50%" cy="105%" r="52%">
          <stop offset="0%"   stopColor="#04080a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#04080a" stopOpacity="0"/>
        </radialGradient>

        {/* Side fills (walls) */}
        <radialGradient id="spl-fill-l" cx="2%" cy="50%" r="40%">
          <stop offset="0%"   stopColor="#6BAF42" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#6BAF42" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="spl-fill-r" cx="98%" cy="50%" r="40%">
          <stop offset="0%"   stopColor="#6BAF42" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#6BAF42" stopOpacity="0"/>
        </radialGradient>

        {/* Scale */}
        <linearGradient id="spl-scale-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C9F03E"/>
          <stop offset="22%"  stopColor="#9DC94E"/>
          <stop offset="44%"  stopColor="#5DB84E"/>
          <stop offset="66%"  stopColor="#2E8B42"/>
          <stop offset="88%"  stopColor="#1A5C2A"/>
          <stop offset="100%" stopColor="#0d2e16"/>
        </linearGradient>
      </defs>

      {/* Room base */}
      <path d={venuePath} fill="#080e09" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Acoustic coverage layers */}
      <path d={venuePath} fill="url(#spl-l)"       clipPath="url(#venue-spl-full)"/>
      <path d={venuePath} fill="url(#spl-r)"       clipPath="url(#venue-spl-full)"/>
      <path d={venuePath} fill="url(#spl-sub)"     clipPath="url(#venue-spl-full)"/>
      <path d={venuePath} fill="url(#spl-fill-l)"  clipPath="url(#venue-spl-full)"/>
      <path d={venuePath} fill="url(#spl-fill-r)"  clipPath="url(#venue-spl-full)"/>
      <path d={venuePath} fill="url(#spl-rear)"    clipPath="url(#venue-spl-full)"/>

      {/* Measurement grid overlay */}
      <g clipPath="url(#venue-spl-full)" opacity="0.3">
        {Array.from({length: 10}, (_,i) => (
          <line key={`v${i}`} x1={80 + i*58} y1="38" x2={80 + i*58} y2="392" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
        ))}
        {Array.from({length: 8}, (_,i) => (
          <line key={`h${i}`} x1="32" y1={80 + i*42} x2="648" y2={80 + i*42} stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
        ))}
      </g>

      {/* Isocurves */}
      <g clipPath="url(#venue-spl-full)">
        <ellipse cx="340" cy="195" rx="48"  ry="38"  fill="none" stroke="#C9F03E" strokeWidth="0.8" strokeOpacity="0.7"/>
        <ellipse cx="340" cy="205" rx="88"  ry="68"  fill="none" stroke="#B2D44A" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 3"/>
        <ellipse cx="340" cy="215" rx="136" ry="100" fill="none" stroke="#8BC34A" strokeWidth="0.6" strokeOpacity="0.45" strokeDasharray="4 3"/>
        <ellipse cx="340" cy="225" rx="188" ry="135" fill="none" stroke="#5DB84E" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <ellipse cx="340" cy="235" rx="248" ry="168" fill="none" stroke="#3E9142" strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="5 4"/>
        <ellipse cx="340" cy="245" rx="300" ry="195" fill="none" stroke="#2E7D32" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="5 4"/>
      </g>

      {/* dB labels */}
      <text x="340" y="193" textAnchor="middle" fill="rgba(201,240,62,0.75)" fontSize="8.5" fontFamily="Geist Mono" fontWeight="600">105</text>
      <text x="340" y="163" textAnchor="middle" fill="rgba(178,212,74,0.6)"  fontSize="8"   fontFamily="Geist Mono">102</text>
      <text x="500" y="220" textAnchor="middle" fill="rgba(139,195,74,0.55)" fontSize="7.5" fontFamily="Geist Mono">98</text>
      <text x="182" y="220" textAnchor="middle" fill="rgba(139,195,74,0.55)" fontSize="7.5" fontFamily="Geist Mono">98</text>
      <text x="340" y="308" textAnchor="middle" fill="rgba(93,184,78,0.5)"   fontSize="7.5" fontFamily="Geist Mono">94</text>
      <text x="340" y="360" textAnchor="middle" fill="rgba(62,145,66,0.45)"  fontSize="7"   fontFamily="Geist Mono">90</text>
      <text x="340" y="385" textAnchor="middle" fill="rgba(46,125,50,0.35)"  fontSize="7"   fontFamily="Geist Mono">86</text>

      {/* Seating rows */}
      <g clipPath="url(#venue-spl-full)" opacity="0.8">
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <ellipse key={i} cx="340" cy="268"
            rx={55 + i*28} ry={22 + i*18}
            fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.9"
          />
        ))}
        {/* Aisle */}
        <line x1="340" y1="140" x2="340" y2="392" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2"/>
        {/* Cross aisle */}
        <path d="M 80 262 Q 340 255 600 262" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" strokeDasharray="5 5"/>
        <text x="52" y="259" fill="rgba(255,255,255,0.18)" fontSize="7" fontFamily="Geist Mono">BALCONY</text>
      </g>

      {/* Stage */}
      <rect x="195" y="40" width="290" height="58" rx="3" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
      <rect x="215" y="58" width="250" height="2" fill="rgba(255,255,255,0.06)"/>
      <text x="340" y="73" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="Geist Mono" letterSpacing="3">STAGE</text>

      {/* TOP L array */}
      <g>
        <rect x="115" y="98" width="22" height="55" rx="3" fill="#141414" stroke="#C9F03E" strokeWidth="1.4"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="119" y={103+i*9} width="14" height="6" rx="1.5" fill="#C9F03E" opacity={0.55-i*0.07}/>
        ))}
        {/* Directivity arc */}
        <path d="M 137 126 Q 240 180 280 320" fill="none" stroke="rgba(201,240,62,0.12)" strokeWidth="1"/>
        <path d="M 137 126 Q 180 165 200 310" fill="none" stroke="rgba(201,240,62,0.08)" strokeWidth="0.7"/>
        <text x="126" y="165" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP L</text>
        <text x="126" y="175" textAnchor="middle" fill="rgba(201,240,62,0.45)" fontSize="7" fontFamily="Geist Mono">d&b Y12</text>
      </g>

      {/* TOP R array */}
      <g>
        <rect x="543" y="98" width="22" height="55" rx="3" fill="#141414" stroke="#C9F03E" strokeWidth="1.4"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="547" y={103+i*9} width="14" height="6" rx="1.5" fill="#C9F03E" opacity={0.55-i*0.07}/>
        ))}
        <path d="M 543 126 Q 440 180 400 320" fill="none" stroke="rgba(201,240,62,0.12)" strokeWidth="1"/>
        <path d="M 543 126 Q 500 165 480 310" fill="none" stroke="rgba(201,240,62,0.08)" strokeWidth="0.7"/>
        <text x="554" y="165" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP R</text>
        <text x="554" y="175" textAnchor="middle" fill="rgba(201,240,62,0.45)" fontSize="7" fontFamily="Geist Mono">d&b Y12</text>
      </g>

      {/* Sub arrays */}
      <rect x="118" y="160" width="20" height="32" rx="3" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="128" y="204" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB L</text>
      <rect x="542" y="160" width="20" height="32" rx="3" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="552" y="204" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB R</text>

      {/* Side fills */}
      <rect x="37" y="200" width="14" height="36" rx="2" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <text x="44" y="246" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>
      <rect x="629" y="200" width="14" height="36" rx="2" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <text x="636" y="246" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>

      {/* Center cluster */}
      <rect x="326" y="40" width="28" height="18" rx="2" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

      {/* Measurement points */}
      <g clipPath="url(#venue-spl-full)" opacity="0.6">
        {[
          {x:200,y:180,v:"103"},{x:340,y:185,v:"105"},{x:480,y:180,v:"103"},
          {x:150,y:240,v:"100"},{x:340,y:235,v:"102"},{x:530,y:240,v:"100"},
          {x:200,y:300,v:"96"}, {x:340,y:298,v:"97"}, {x:480,y:300,v:"96"},
          {x:200,y:355,v:"91"},{x:340,y:358,v:"92"},{x:480,y:355,v:"91"},
        ].map((pt,i)=>(
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="2" fill="rgba(255,255,255,0.25)"/>
            <text x={pt.x+4} y={pt.y-3} fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="Geist Mono">{pt.v}</text>
          </g>
        ))}
      </g>

      {/* Scale bar */}
      <rect x="660" y="78" width="10" height="200" rx="3" fill="url(#spl-scale-grad)"/>
      {[105,102,98,95,92,88,84].map((v,i) => (
        <text key={v} x="674" y={82 + i*33} fill="var(--text-muted)" fontSize="8.5" fontFamily="Geist Mono">{v}</text>
      ))}
      <text x="656" y="70" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">dB</text>
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
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            SPL Analysis
          </button>
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>·</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>Teatro Gran Rex</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>2D</button>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>3D</button>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Export</button>
        </div>
      </header>

      {/* View tabs + controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {VIEW_TABS.map(t => (
          <button key={t} onClick={() => setActiveView(t)} style={{ padding: "5px 14px", borderRadius: "var(--radius-sm)", background: activeView === t ? "var(--elevated)" : "transparent", border: activeView === t ? "1px solid var(--border)" : "1px solid transparent", color: activeView === t ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          {[["Freq","1 kHz"],["Weighting","A"],["Resolution","1/3 Oct"]].map(([lbl,val]) => (
            <select key={lbl} style={{ padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
              <option>{val}</option>
            </select>
          ))}
        </div>
      </div>

      {/* Heatmap hero */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <SPLHeatmapFull />
      </div>

      {/* Metric strip */}
      <div style={{ display: "flex", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ flex: 1, padding: "14px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ fontSize: 22, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)" }}>{m.value}</span>
              <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>{m.unit}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
