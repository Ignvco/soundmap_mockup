import type { Screen } from "../App";

interface Props {
  onNavigate: (s: Screen) => void;
}

function SPLHeatmap() {
  // Teatro Gran Rex — realistic theater shape + multi-array coverage
  const W = 780, H = 340;

  // Venue outline: D-shaped theater (flat back, curved front)
  const venueD = `
    M 80 30
    L 700 30
    Q 730 30 730 58
    L 730 290
    Q 730 318 700 318
    L 80 318
    Q 50 318 50 290
    L 50 58
    Q 50 30 80 30 Z
  `;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Room background */}
        <clipPath id="venue-main-clip">
          <path d={venueD}/>
        </clipPath>

        {/* Main L array - wide horizontal throw */}
        <radialGradient id="arr-l" cx="19%" cy="34%" r="70%" fx="19%" fy="28%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.85"/>
          <stop offset="18%"  stopColor="#9DC93E" stopOpacity="0.72"/>
          <stop offset="38%"  stopColor="#4CAF50" stopOpacity="0.55"/>
          <stop offset="62%"  stopColor="#2E7D32" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#1B3B1E" stopOpacity="0"/>
        </radialGradient>

        {/* Main R array */}
        <radialGradient id="arr-r" cx="81%" cy="34%" r="70%" fx="81%" fy="28%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.85"/>
          <stop offset="18%"  stopColor="#9DC93E" stopOpacity="0.72"/>
          <stop offset="38%"  stopColor="#4CAF50" stopOpacity="0.55"/>
          <stop offset="62%"  stopColor="#2E7D32" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#1B3B1E" stopOpacity="0"/>
        </radialGradient>

        {/* Sub cluster center */}
        <radialGradient id="arr-sub" cx="50%" cy="22%" r="58%" fx="50%" fy="22%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.6"/>
          <stop offset="40%"  stopColor="#4CAF50" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0"/>
        </radialGradient>

        {/* Coverage falloff toward rear */}
        <radialGradient id="rear-shadow" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#0d1a0e" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#0d1a0e" stopOpacity="0"/>
        </radialGradient>

        {/* SPL scale */}
        <linearGradient id="spl-sidebar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C9F03E"/>
          <stop offset="30%"  stopColor="#8BC34A"/>
          <stop offset="55%"  stopColor="#4CAF50"/>
          <stop offset="78%"  stopColor="#2E7D32"/>
          <stop offset="100%" stopColor="#1B5E20"/>
        </linearGradient>
      </defs>

      {/* Room fill */}
      <path d={venueD} fill="#0b0d0b" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Coverage layers */}
      <path d={venueD} fill="url(#arr-l)"   clipPath="url(#venue-main-clip)"/>
      <path d={venueD} fill="url(#arr-r)"   clipPath="url(#venue-main-clip)"/>
      <path d={venueD} fill="url(#arr-sub)" clipPath="url(#venue-main-clip)"/>
      <path d={venueD} fill="url(#rear-shadow)" clipPath="url(#venue-main-clip)"/>

      {/* Isocurves — dB contours */}
      <g clipPath="url(#venue-main-clip)" opacity="0.5">
        <ellipse cx="390" cy="185" rx="52"  ry="38"  fill="none" stroke="#C9F03E" strokeWidth="0.6" strokeDasharray="0"/>
        <ellipse cx="390" cy="185" rx="95"  ry="70"  fill="none" stroke="#9DC93E" strokeWidth="0.5" strokeDasharray="3 3"/>
        <ellipse cx="390" cy="192" rx="148" ry="108" fill="none" stroke="#6BAF42" strokeWidth="0.5" strokeDasharray="3 3"/>
        <ellipse cx="390" cy="200" rx="205" ry="148" fill="none" stroke="#4CAF50" strokeWidth="0.5" strokeDasharray="3 3"/>
        <ellipse cx="390" cy="208" rx="268" ry="185" fill="none" stroke="#388E3C" strokeWidth="0.5" strokeDasharray="4 4"/>
        <ellipse cx="390" cy="215" rx="310" ry="210" fill="none" stroke="#2E7D32" strokeWidth="0.4" strokeDasharray="4 4"/>
      </g>

      {/* Seating rows */}
      <g clipPath="url(#venue-main-clip)" opacity="0.9">
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <ellipse key={i}
            cx="390" cy="240"
            rx={68 + i * 30} ry={28 + i * 20}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}
        {/* Aisle lines */}
        <line x1="390" y1="145" x2="390" y2="318" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="50" y1="220" x2="730" y2="220" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
      </g>

      {/* Stage */}
      <rect x="220" y="32" width="340" height="52" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <line x1="220" y1="52" x2="560" y2="52" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
      <text x="390" y="63" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="9" fontFamily="Geist Mono" letterSpacing="2">STAGE</text>

      {/* Speaker arrays — TOP L */}
      <g>
        <rect x="148" y="84" width="22" height="48" rx="3" fill="#141414" stroke="#C9F03E" strokeWidth="1.3"/>
        {[0,1,2,3].map(i => (
          <rect key={i} x="152" y={89 + i*10} width="14" height="7" rx="1.5" fill="#C9F03E" opacity={0.5 - i*0.08}/>
        ))}
        {/* Coverage cone */}
        <path d="M170 108 L290 170 L270 290 L110 290 L90 170 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.08)" strokeWidth="0.6"/>
        <text x="159" y="143" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP L</text>
        <text x="159" y="153" textAnchor="middle" fill="rgba(201,240,62,0.5)" fontSize="7" fontFamily="Geist Mono">6×Y12</text>
      </g>

      {/* Speaker arrays — TOP R */}
      <g>
        <rect x="610" y="84" width="22" height="48" rx="3" fill="#141414" stroke="#C9F03E" strokeWidth="1.3"/>
        {[0,1,2,3].map(i => (
          <rect key={i} x="614" y={89 + i*10} width="14" height="7" rx="1.5" fill="#C9F03E" opacity={0.5 - i*0.08}/>
        ))}
        <path d="M610 108 L490 170 L510 290 L670 290 L690 170 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.08)" strokeWidth="0.6"/>
        <text x="621" y="143" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP R</text>
        <text x="621" y="153" textAnchor="middle" fill="rgba(201,240,62,0.5)" fontSize="7" fontFamily="Geist Mono">6×Y12</text>
      </g>

      {/* Sub L / Sub R */}
      <rect x="156" y="138" width="20" height="30" rx="3" fill="#141414" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <text x="166" y="180" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB L</text>
      <rect x="604" y="138" width="20" height="30" rx="3" fill="#141414" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <text x="614" y="180" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">SUB R</text>

      {/* Center cluster */}
      <rect x="376" y="32" width="28" height="18" rx="2" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      {[0,1].map(i => <circle key={i} cx={382 + i*8} cy="41" r="2.5" fill="rgba(255,255,255,0.3)"/>)}

      {/* dB labels on isocurves */}
      <text x="390" y="182" textAnchor="middle" fill="rgba(201,240,62,0.7)" fontSize="8" fontFamily="Geist Mono">105</text>
      <text x="390" y="145" textAnchor="middle" fill="rgba(155,210,62,0.5)" fontSize="8" fontFamily="Geist Mono">102</text>
      <text x="540" y="200" textAnchor="middle" fill="rgba(76,175,80,0.5)" fontSize="7" fontFamily="Geist Mono">98</text>
      <text x="240" y="200" textAnchor="middle" fill="rgba(76,175,80,0.5)" fontSize="7" fontFamily="Geist Mono">98</text>
      <text x="390" y="285" textAnchor="middle" fill="rgba(46,125,50,0.5)" fontSize="7" fontFamily="Geist Mono">90</text>

      {/* SPL scale */}
      <rect x="740" y="80" width="9" height="160" rx="2.5" fill="url(#spl-sidebar)"/>
      {[105,102,98,95,90,85].map((v,i) => (
        <text key={v} x="753" y={83 + i*32} fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">{v}</text>
      ))}
      <text x="737" y="72" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">dB</text>

      {/* Balcony line */}
      <path d="M88 200 Q390 192 692 200" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <text x="96" y="196" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="Geist Mono">BALCONY</text>
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
          <div key={i} style={{ flex: 1, padding: "14px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 26, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>{m.value}</span>
              <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>{m.unit}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 3 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Main: heatmap hero */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, bottom: 148 }}>
          <SPLHeatmap />
        </div>

        {/* CTAs */}
        <div style={{ position: "absolute", bottom: 156, left: 28, display: "flex", gap: 10 }}>
          <button onClick={() => onNavigate("design")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Continue design
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="#08090A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => onNavigate("perform")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 4.5l5 2.5-5 2.5V4.5z" fill="currentColor"/></svg>
            Perform
          </button>
          <button onClick={() => onNavigate("spl")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10 Q4 4 6 6 Q8 8 10 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
            Analyze
          </button>
        </div>

        {/* Recent scenes */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 148, borderTop: "1px solid var(--border)", background: "var(--bg)", padding: "14px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
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
