import type { Screen } from "../App";

interface Props {
  onNavigate: (s: Screen) => void;
}

function SPLHeatmap() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 320" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Venue shape clip */}
        <clipPath id="venue-clip-home">
          <ellipse cx="350" cy="180" rx="300" ry="145"/>
        </clipPath>

        {/* Coverage gradient: hot center → cooler edges */}
        <radialGradient id="cov-home" cx="50%" cy="55%" r="60%" fx="50%" fy="55%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.9"/>
          <stop offset="25%" stopColor="#8BC34A" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="#4CAF50" stopOpacity="0.7"/>
          <stop offset="75%" stopColor="#2E7D32" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#1B3B1E" stopOpacity="0.2"/>
        </radialGradient>
      </defs>

      {/* Room outline */}
      <ellipse cx="350" cy="180" rx="310" ry="152" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* SPL coverage fill */}
      <ellipse cx="350" cy="180" rx="300" ry="145" fill="url(#cov-home)" clipPath="url(#venue-clip-home)"/>

      {/* Seating rows */}
      {[0.3, 0.45, 0.6, 0.74, 0.86].map((r, i) => (
        <ellipse key={i} cx="350" cy="195" rx={r * 270} ry={r * 115} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      ))}

      {/* Stage area */}
      <rect x="260" y="32" width="180" height="52" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <text x="350" y="62" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="Geist Mono">STAGE</text>

      {/* Speaker icons */}
      {[{x:285, y:84},{x:350, y:78},{x:415, y:84}].map((pos, i) => (
        <g key={i}>
          <rect x={pos.x-8} y={pos.y-6} width="16" height="12" rx="2" fill="var(--elevated)" stroke="var(--accent)" strokeWidth="1"/>
          <circle cx={pos.x} cy={pos.y} r="3" fill="var(--accent)" opacity="0.6"/>
        </g>
      ))}

      {/* Subwoofers */}
      {[{x:306,y:94},{x:394,y:94}].map((pos, i) => (
        <rect key={i} x={pos.x-7} y={pos.y-5} width="14" height="10" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      ))}

      {/* SPL scale */}
      <defs>
        <linearGradient id="scale-home" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E"/>
          <stop offset="50%" stopColor="#4CAF50"/>
          <stop offset="100%" stopColor="#1B3B1E"/>
        </linearGradient>
      </defs>
      <rect x="640" y="110" width="8" height="120" rx="2" fill="url(#scale-home)"/>
      {[105, 100, 95, 90, 85, 80].map((val, i) => (
        <text key={val} x="655" y={112 + i * 24} fill="var(--text-muted)" fontSize="9" fontFamily="Geist Mono">{val}</text>
      ))}
      <text x="649" y="104" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">dB</text>
    </svg>
  );
}

const SCENES = [
  { name: "Teatro Gran Rex", type: "Main PA", date: "Today, 14:22", spl: "102 dB" },
  { name: "Concierto Exterior", type: "Festival", date: "May 28, 2025", spl: "98 dB" },
  { name: "Auditorio UNSAM", type: "Conferencia", date: "May 24, 2025", spl: "95 dB" },
];

const METRICS = [
  { value: "102", unit: "dB", label: "MAX SPL" },
  { value: "87", unit: "%", label: "COVERAGE" },
  { value: "1.42", unit: "s", label: "RT60" },
  { value: "7.4", unit: "dB", label: "HEADROOM" },
];

export default function Home({ onNavigate }: Props) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Topbar */}
      <header style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Good afternoon, LevelPro</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", margin: 0 }}>Teatro Gran Rex</h1>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}/>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>System optimized</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· 2 min ago</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => onNavigate("stage-map")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 5v6H1V5L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/></svg>
            Open 3D Map
          </button>
          <button onClick={() => onNavigate("ai-advisor")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="#C9F03E" strokeWidth="1.2"/><path d="M7 0v2M7 12v2M0 7h2M12 7h2" stroke="#C9F03E" strokeWidth="1.2" strokeLinecap="round"/></svg>
            AI Advisor
          </button>
        </div>
      </header>

      {/* Metrics bar */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ flex: 1, padding: "16px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>{m.value}</span>
              <span style={{ fontSize: 14, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>{m.unit}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Main area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {/* SPL visualization — hero */}
        <div style={{ position: "absolute", inset: 0, bottom: 140 }}>
          <SPLHeatmap />
        </div>

        {/* CTA buttons */}
        <div style={{ position: "absolute", bottom: 148, left: 28, display: "flex", gap: 10 }}>
          <button onClick={() => onNavigate("design")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Continue design
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="#08090A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => onNavigate("perform")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 4.5l5 2.5-5 2.5V4.5z" fill="currentColor"/></svg>
            Perform
          </button>
          <button onClick={() => onNavigate("spl")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10 Q4 4 6 6 Q8 8 10 2 Q12 -2 14 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
            Analyze
          </button>
        </div>

        {/* Recent scenes */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, borderTop: "1px solid var(--border)", background: "var(--bg)", padding: "16px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Recent scenes</span>
            <button style={{ fontSize: 11, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all</button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {SCENES.map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "10px 14px", borderRadius: "var(--radius)", background: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>{s.type}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{s.date}</span>
                  <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--accent)", fontWeight: 600 }}>{s.spl}</span>
                </div>
              </div>
            ))}
            <div style={{ width: 120, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius)", border: "1px dashed var(--border)", cursor: "pointer", color: "var(--text-muted)", fontSize: 12, gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              New scene
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
