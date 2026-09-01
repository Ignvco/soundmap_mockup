import { useState } from "react";

function StageMap3D() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 760 440" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141414"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </linearGradient>
        <linearGradient id="stage-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e1e"/>
          <stop offset="100%" stopColor="#141414"/>
        </linearGradient>
        <linearGradient id="wall-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="wall-r" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#101010"/>
        </linearGradient>
        <radialGradient id="stage-light" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Back wall */}
      <path d="M80 60 L680 60 L680 340 L80 340 Z" fill="#0d0d0d" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

      {/* Left wall */}
      <path d="M20 100 L80 60 L80 340 L20 380 Z" fill="url(#wall-l)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {/* Right wall */}
      <path d="M680 60 L740 100 L740 380 L680 340 Z" fill="url(#wall-r)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {/* Ceiling */}
      <path d="M20 100 L740 100 L680 60 L80 60 Z" fill="#0a0a0a" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {/* Floor */}
      <path d="M20 380 L740 380 L680 340 L80 340 Z" fill="url(#floor-grad)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

      {/* Back wall grid lines */}
      {[160, 240, 320, 400, 480, 560, 640].map(x => <line key={x} x1={x} y1="60" x2={x} y2="340" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>)}
      {[100, 140, 180, 220, 260, 300].map(y => <line key={y} x1="80" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>)}

      {/* Stage platform */}
      <path d="M240 240 L520 240 L520 340 L240 340 Z" fill="url(#stage-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <path d="M220 260 L240 240 L520 240 L540 260 L520 260 L240 260 Z" fill="#1c1c1c" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <path d="M240 340 L220 360 L540 360 L520 340 Z" fill="#161616" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <text x="380" y="295" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="Geist Mono">STAGE</text>

      {/* Stage lighting wash */}
      <ellipse cx="380" cy="240" rx="180" ry="40" fill="url(#stage-light)"/>

      {/* Monitor speakers on stage */}
      {[300, 365, 430].map((x, i) => (
        <g key={i}>
          <path d={`M${x-12} 240 L${x+12} 240 L${x+8} 256 L${x-8} 256 Z`} fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          <text x={x} y="265" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="6" fontFamily="Geist Mono">MON</text>
        </g>
      ))}

      {/* Main left array */}
      <g>
        <rect x="105" y="90" width="20" height="90" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
        {[0,1,2,3,4].map(i => <circle key={i} cx="115" cy={104 + i * 16} r="4" fill="var(--accent)" opacity="0.4"/>)}
        <text x="95" y="88" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP L</text>
      </g>
      {/* Sub L */}
      <rect x="108" y="186" width="20" height="40" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="118" y="238" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB L</text>

      {/* Main right array */}
      <g>
        <rect x="635" y="90" width="20" height="90" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
        {[0,1,2,3,4].map(i => <circle key={i} cx="645" cy={104 + i * 16} r="4" fill="var(--accent)" opacity="0.4"/>)}
        <text x="655" y="88" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP R</text>
      </g>
      {/* Sub R */}
      <rect x="632" y="186" width="20" height="40" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="642" y="238" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB R</text>

      {/* Center cluster */}
      <rect x="365" y="68" width="30" height="22" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="380" y="62" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">CENTER</text>

      {/* Audience seating areas */}
      {/* Floor seating */}
      {[0,1,2,3,4].map(row => (
        <g key={row}>
          {[-3,-2,-1,0,1,2,3].map(col => (
            <rect key={col} x={380 + col * 28 - 10} y={280 + row * 14} width="8" height="6" rx="1" fill="rgba(255,255,255,0.06)"/>
          ))}
        </g>
      ))}

      {/* Balcony */}
      <path d="M120 160 L640 160 L640 180 L120 180 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={135 + i * 58} y="162" width="14" height="6" rx="1" fill="rgba(255,255,255,0.05)"/>
      ))}

      {/* Coverage beams */}
      <line x1="125" y1="135" x2="240" y2="340" stroke="rgba(201,240,62,0.08)" strokeWidth="0.8"/>
      <line x1="125" y1="90" x2="80" y2="380" stroke="rgba(201,240,62,0.05)" strokeWidth="0.8"/>
      <line x1="635" y1="135" x2="520" y2="340" stroke="rgba(201,240,62,0.08)" strokeWidth="0.8"/>
      <line x1="635" y1="90" x2="680" y2="380" stroke="rgba(201,240,62,0.05)" strokeWidth="0.8"/>

      {/* Dimension lines */}
      <line x1="30" y1="100" x2="30" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <text x="22" y="244" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono" style={{ writingMode: "vertical-rl" }}>11.8 m</text>
    </svg>
  );
}

function StageMap2D() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="cov-2d-l" cx="20%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cov-2d-r" cx="80%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Room */}
      <rect x="40" y="20" width="520" height="360" rx="4" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Coverage */}
      <rect x="40" y="20" width="520" height="360" fill="url(#cov-2d-l)"/>
      <rect x="40" y="20" width="520" height="360" fill="url(#cov-2d-r)"/>
      {/* Stage */}
      <rect x="160" y="22" width="280" height="50" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <text x="300" y="51" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Geist Mono">STAGE</text>
      {/* Speakers */}
      <rect x="68" y="72" width="20" height="50" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
      <rect x="512" y="72" width="20" height="50" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
      {/* Subwoofers */}
      <rect x="68" y="128" width="20" height="30" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <rect x="512" y="128" width="20" height="30" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {/* Center */}
      <rect x="286" y="22" width="28" height="18" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      {/* Monitors */}
      {[220, 290, 360].map((x, i) => <rect key={i} x={x} y={74} width="18" height="12" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>)}
      {/* Seating rows */}
      {[0,1,2,3,4,5,6,7].map(row => (
        <line key={row} x1="60" y1={180 + row * 22} x2="540" y2={180 + row * 22} stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      ))}
    </svg>
  );
}

export default function StageMap() {
  const [view, setView] = useState<"3d" | "2d">("3d");
  const [labels, setLabels] = useState(true);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            3D Stage Map
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: 0 }}>Teatro Gran Rex</h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <button onClick={() => setView("2d")} style={{ padding: "5px 14px", background: view === "2d" ? "var(--elevated)" : "transparent", border: "none", color: view === "2d" ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>2D</button>
            <button onClick={() => setView("3d")} style={{ padding: "5px 14px", background: view === "3d" ? "var(--elevated)" : "transparent", border: "none", color: view === "3d" ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>3D</button>
          </div>
        </div>
      </header>

      {/* Map area */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {view === "3d" ? <StageMap3D /> : <StageMap2D />}

        {/* Floating controls */}
        <div style={{ position: "absolute", right: 20, top: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { icon: "+", label: "Zoom in" },
            { icon: "−", label: "Zoom out" },
            { icon: "⊙", label: "Reset" },
          ].map(c => (
            <button key={c.label} title={c.label} style={{ width: 30, height: 30, borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 16, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</button>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div style={{ padding: "10px 28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select style={{ padding: "5px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>Top View</option><option>Front View</option><option>Side View</option><option>Isometric</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Speaker labels</span>
          <button onClick={() => setLabels(l => !l)} style={{ width: 36, height: 20, borderRadius: 10, background: labels ? "var(--accent)" : "var(--surface)", border: "1px solid var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s", padding: 0 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: labels ? "#08090A" : "var(--text-muted)", position: "absolute", top: 2, left: labels ? 18 : 2, transition: "left 0.2s" }}/>
          </button>
        </div>
      </div>
    </div>
  );
}
