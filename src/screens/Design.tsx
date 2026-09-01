import { useState } from "react";

type DesignTab = "room" | "pa" | "dsp" | "patch" | "save";

const TABS: { id: DesignTab; label: string }[] = [
  { id: "room", label: "01 Room" },
  { id: "pa", label: "02 PA" },
  { id: "dsp", label: "03 DSP" },
  { id: "patch", label: "04 Patch" },
  { id: "save", label: "05 Save" },
];

/* ── Room ── */
function RoomViz() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 620 420" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="room-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191919"/>
          <stop offset="100%" stopColor="#0e0e0e"/>
        </linearGradient>
        <linearGradient id="room-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e0e0e"/>
          <stop offset="100%" stopColor="#161616"/>
        </linearGradient>
        <linearGradient id="room-right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#0e0e0e"/>
          <stop offset="100%" stopColor="#161616"/>
        </linearGradient>
        <linearGradient id="room-ceil" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#141414"/>
          <stop offset="100%" stopColor="#0b0b0b"/>
        </linearGradient>
        <linearGradient id="room-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101010"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>
        <linearGradient id="stage-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222"/>
          <stop offset="100%" stopColor="#181818"/>
        </linearGradient>
        <radialGradient id="room-ambient" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="stage-light-r" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Back wall — main face */}
      <path d="M 120 70 L 500 70 L 500 350 L 120 350 Z" fill="url(#room-back)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

      {/* Back wall grid */}
      {[0,1,2,3].map(i => (
        <line key={`bv${i}`} x1={188+i*104} y1="70" x2={188+i*104} y2="350" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}
      {[0,1,2,3].map(i => (
        <line key={`bh${i}`} x1="120" y1={140+i*70} x2="500" y2={140+i*70} stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}

      {/* Left wall */}
      <path d="M 30 130 L 120 70 L 120 350 L 30 410 Z" fill="url(#room-left)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {[0,1,2].map(i=>(
        <line key={`lwv${i}`} x1={55+i*22} y1={130-i*10} x2={55+i*22} y2={410-i*10} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
      ))}

      {/* Right wall */}
      <path d="M 500 70 L 590 130 L 590 410 L 500 350 Z" fill="url(#room-right)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

      {/* Ceiling */}
      <path d="M 30 130 L 590 130 L 500 70 L 120 70 Z" fill="url(#room-ceil)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      {/* Ceiling grid */}
      {[0,1,2,3,4].map(i=>(
        <path key={`cg${i}`} d={`M ${150+i*80} 70 L ${88+i*100} 130`} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
      ))}
      {/* Ceiling ambient */}
      <path d="M 30 130 L 590 130 L 500 70 L 120 70 Z" fill="url(#room-ambient)"/>

      {/* Truss / rigging bar under ceiling */}
      <path d="M 120 128 L 500 128 L 500 134 L 120 134 Z" fill="#1c1c1c" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      {[168,240,310,380,452].map(x=>(
        <line key={x} x1={x} y1="120" x2={x} y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" strokeDasharray="2 2"/>
      ))}

      {/* Floor */}
      <path d="M 30 410 L 590 410 L 500 350 L 120 350 Z" fill="url(#room-floor)" stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
      {[0,1,2,3].map(i=>(
        <path key={i} d={`M ${80+i*120} 350 L ${52+i*142} 410`} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
      ))}

      {/* Stage platform */}
      <path d="M 195 250 L 425 250 L 425 348 L 195 348 Z" fill="url(#stage-top)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <path d="M 175 266 L 195 250 L 425 250 L 445 266 L 445 350 L 175 350 Z" fill="#181818" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <path d="M 130 282 L 175 266 L 175 350 L 130 366 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
      <path d="M 175 266 L 195 250 L 425 250 L 445 266 Z" fill="#1e1e1e" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <text x="310" y="300" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="Geist Mono" letterSpacing="4">STAGE</text>

      {/* Stage lighting wash */}
      <path d="M 195 250 L 425 250 L 425 348 L 195 348 Z" fill="url(#stage-light-r)"/>

      {/* Spotlights from ceiling */}
      {[240,310,380].map((x,i)=>(
        <g key={i} opacity="0.4">
          <path d={`M ${x-5} 128 L ${x+5} 128 L ${x+22} 250 L ${x-22} 250 Z`} fill="rgba(255,240,100,0.07)"/>
        </g>
      ))}

      {/* Monitor wedges on stage */}
      {[240,295,340,385].map((x,i)=>(
        <path key={i} d={`M ${x-10} 250 L ${x+10} 250 L ${x+7} 262 L ${x-7} 262 Z`} fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      ))}

      {/* Seating rows - raked */}
      <g opacity="0.85">
        {[0,1,2,3,4,5,6,7].map(i=>(
          <g key={i}>
            {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(col=>{
              const rowX = 308 + col*(32+i*1.5);
              const rowY = 220 + i*12;
              if(rowX<40||rowX>570) return null;
              return <rect key={col} x={rowX-10} y={rowY} width="14" height="6" rx="1" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4"/>;
            })}
          </g>
        ))}
      </g>

      {/* Balcony railing */}
      <path d="M 70 190 L 550 190" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" strokeDasharray="6 4"/>
      <text x="78" y="185" fill="rgba(255,255,255,0.18)" fontSize="7.5" fontFamily="Geist Mono">BALCONY</text>

      {/* Balcony seating row */}
      {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(col=>(
        <rect key={col} x={308+col*38-10} y="194" width="20" height="7" rx="1.5" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
      ))}

      {/* LEFT speaker array */}
      <g>
        <path d="M 120 138 L 150 134 L 150 192 L 120 196 Z" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.2"/>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="124" y={140+i*9} width="22" height="7" rx="1.5" fill="#C9F03E" opacity={0.5-i*0.07}/>
        ))}
        <path d="M 150 134 L 162 138 L 162 195 L 150 192 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        <text x="135" y="207" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP L</text>
        {/* Coverage line */}
        <path d="M 150 165 L 420 320 L 300 358 L 95 280 L 90 200 Z" fill="rgba(201,240,62,0.05)" stroke="rgba(201,240,62,0.09)" strokeWidth="0.7"/>
        {/* Sub box */}
        <path d="M 120 198 L 150 194 L 150 222 L 120 226 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="135" y="236" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="7.5" fontFamily="Geist Mono">SUB L</text>
        <line x1="135" y1="128" x2="135" y2="138" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 2"/>
      </g>

      {/* RIGHT speaker array */}
      <g>
        <path d="M 470 134 L 500 138 L 500 196 L 470 192 Z" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.2"/>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x="474" y={140+i*9} width="22" height="7" rx="1.5" fill="#C9F03E" opacity={0.5-i*0.07}/>
        ))}
        <path d="M 458 138 L 470 134 L 470 192 L 458 195 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        <text x="485" y="207" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP R</text>
        <path d="M 470 165 L 200 320 L 320 358 L 525 280 L 530 200 Z" fill="rgba(201,240,62,0.05)" stroke="rgba(201,240,62,0.09)" strokeWidth="0.7"/>
        <path d="M 470 194 L 500 198 L 500 226 L 470 222 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="485" y="236" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="7.5" fontFamily="Geist Mono">SUB R</text>
        <line x1="485" y1="128" x2="485" y2="138" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 2"/>
      </g>

      {/* Fill speakers on balcony */}
      <rect x="120" y="194" width="12" height="22" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <rect x="488" y="194" width="12" height="22" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>

      {/* Dimension lines */}
      <line x1="40" y1="358" x2="590" y2="358" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="40" y1="353" x2="40" y2="363" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="590" y1="353" x2="590" y2="363" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="310" y="375" textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontFamily="Geist Mono">24.6 m</text>

      <line x1="598" y1="70" x2="598" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="593" y1="70" x2="603" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="593" y1="350" x2="603" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="610" y="215" fill="var(--text-muted)" fontSize="8.5" fontFamily="Geist Mono">11.8 m</text>

      <line x1="120" y1="386" x2="500" y2="386" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" strokeDasharray="4 4"/>
      <text x="310" y="398" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="Geist Mono">18.2 m (width)</text>
    </svg>
  );
}

function RoomScreen() {
  return (
    <div style={{ display: "flex", gap: 0, height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <RoomViz />
      </div>
      <div style={{ width: 260, borderLeft: "1px solid var(--border)", padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <Label>Dimensions</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {[
              { label: "Length", value: "24.6 m" },
              { label: "Width", value: "18.2 m" },
              { label: "Height", value: "11.8 m" },
            ].map(d => (
              <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "var(--surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{d.label}</span>
                <span style={{ fontSize: 13, fontFamily: "Geist Mono", color: "var(--text)", fontWeight: 500 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Acoustic materials</Label>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>Absorption coefficient (α)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              { material: "Ceiling", value: 0.18 },
              { material: "Walls", value: 0.32 },
              { material: "Floor", value: 0.25 },
              { material: "Audience (occupied)", value: 0.60 },
            ].map(m => (
              <div key={m.material} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{m.material}</span>
                <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{m.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Audience configuration</Label>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <div style={{ flex: 1, padding: "10px 12px", background: "var(--surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)" }}>2,186</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Total</div>
            </div>
            <div style={{ flex: 1, padding: "10px 12px", background: "var(--surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)" }}>100%</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Occupied</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PA ── */
function PAviz() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 560 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="pa-l" cx="17%" cy="28%" r="75%" fx="17%" fy="22%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.85"/>
          <stop offset="20%"  stopColor="#8BC34A" stopOpacity="0.65"/>
          <stop offset="45%"  stopColor="#4CAF50" stopOpacity="0.40"/>
          <stop offset="72%"  stopColor="#2E7D32" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pa-r" cx="83%" cy="28%" r="75%" fx="83%" fy="22%">
          <stop offset="0%"   stopColor="#C9F03E" stopOpacity="0.85"/>
          <stop offset="20%"  stopColor="#8BC34A" stopOpacity="0.65"/>
          <stop offset="45%"  stopColor="#4CAF50" stopOpacity="0.40"/>
          <stop offset="72%"  stopColor="#2E7D32" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pa-sub" cx="50%" cy="20%" r="60%">
          <stop offset="0%"   stopColor="#8BC34A" stopOpacity="0.45"/>
          <stop offset="50%"  stopColor="#4CAF50" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="pa-clip">
          <rect x="28" y="18" width="504" height="360" rx="4"/>
        </clipPath>
      </defs>

      {/* Room outline */}
      <rect x="28" y="18" width="504" height="360" rx="4" fill="#080d08" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Grid */}
      {Array.from({length:7},(_,i)=>(
        <line key={`v${i}`} x1={72+i*68} y1="18" x2={72+i*68} y2="378" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}
      {Array.from({length:5},(_,i)=>(
        <line key={`h${i}`} x1="28" y1={72+i*68} x2="532" y2={72+i*68} stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}

      {/* Coverage */}
      <rect x="28" y="18" width="504" height="360" fill="url(#pa-l)"   clipPath="url(#pa-clip)"/>
      <rect x="28" y="18" width="504" height="360" fill="url(#pa-r)"   clipPath="url(#pa-clip)"/>
      <rect x="28" y="18" width="504" height="360" fill="url(#pa-sub)" clipPath="url(#pa-clip)"/>

      {/* Isocurves */}
      <g clipPath="url(#pa-clip)">
        <ellipse cx="280" cy="220" rx="50"  ry="40"  fill="none" stroke="#C9F03E" strokeWidth="0.7" strokeOpacity="0.6"/>
        <ellipse cx="280" cy="230" rx="105" ry="80"  fill="none" stroke="#9DC94E" strokeWidth="0.55" strokeOpacity="0.4" strokeDasharray="4 3"/>
        <ellipse cx="280" cy="242" rx="170" ry="125" fill="none" stroke="#5DB84E" strokeWidth="0.55" strokeOpacity="0.35" strokeDasharray="4 3"/>
        <ellipse cx="280" cy="255" rx="238" ry="168" fill="none" stroke="#3E9142" strokeWidth="0.5" strokeOpacity="0.3"  strokeDasharray="5 4"/>
      </g>

      {/* Stage */}
      <rect x="172" y="20" width="216" height="44" rx="2" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
      <text x="280" y="46" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="Geist Mono" letterSpacing="2">STAGE</text>

      {/* TOP L — detailed array box */}
      <g>
        <rect x="62" y="64" width="26" height="60" rx="3" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.4"/>
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x="66" y={69+i*8} width="18" height="5.5" rx="1.5" fill="#C9F03E" opacity={0.55-i*0.06}/>
        ))}
        <path d="M 88 64 L 96 68 L 96 126 L 88 124 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        {/* Coverage triangle */}
        <path d="M 88 94 L 400 330 L 270 378 L 38 310 L 32 200 Z" fill="rgba(201,240,62,0.05)" stroke="rgba(201,240,62,0.09)" strokeWidth="0.7"/>
        <text x="75" y="136" textAnchor="middle" fill="#C9F03E" fontSize="8.5" fontFamily="Geist Mono" fontWeight="600">TOP L</text>
        <text x="75" y="147" textAnchor="middle" fill="rgba(201,240,62,0.4)" fontSize="7" fontFamily="Geist Mono">6× Y12</text>
        {/* Sub L */}
        <rect x="64" y="128" width="24" height="36" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
        {[0,1,2].map(i=>(
          <rect key={i} x="67" y={131+i*9} width="18" height="7" rx="1" fill="#111" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
        ))}
        <text x="76" y="175" textAnchor="middle" fill="var(--text-muted)" fontSize="7.5" fontFamily="Geist Mono">SUB L</text>
      </g>

      {/* TOP R */}
      <g>
        <rect x="472" y="64" width="26" height="60" rx="3" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.4"/>
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x="476" y={69+i*8} width="18" height="5.5" rx="1.5" fill="#C9F03E" opacity={0.55-i*0.06}/>
        ))}
        <path d="M 464 68 L 472 64 L 472 124 L 464 126 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        <path d="M 472 94 L 160 330 L 290 378 L 522 310 L 528 200 Z" fill="rgba(201,240,62,0.05)" stroke="rgba(201,240,62,0.09)" strokeWidth="0.7"/>
        <text x="485" y="136" textAnchor="middle" fill="#C9F03E" fontSize="8.5" fontFamily="Geist Mono" fontWeight="600">TOP R</text>
        <text x="485" y="147" textAnchor="middle" fill="rgba(201,240,62,0.4)" fontSize="7" fontFamily="Geist Mono">6× Y12</text>
        <rect x="472" y="128" width="24" height="36" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
        {[0,1,2].map(i=>(
          <rect key={i} x="475" y={131+i*9} width="18" height="7" rx="1" fill="#111" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
        ))}
        <text x="484" y="175" textAnchor="middle" fill="var(--text-muted)" fontSize="7.5" fontFamily="Geist Mono">SUB R</text>
      </g>

      {/* Center cluster */}
      <rect x="265" y="20" width="30" height="20" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      {[0,1,2].map(i=><circle key={i} cx={272+i*6} cy="30" r="2.5" fill="rgba(255,255,255,0.25)"/>)}

      {/* Monitors on stage */}
      {[204,248,280,316,360].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="64" width="20" height="14" rx="2" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          <circle cx={x+10} cy="71" r="2.5" fill="rgba(255,255,255,0.2)"/>
        </g>
      ))}

      {/* Fill speakers wall */}
      <rect x="28" y="186" width="12" height="32" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="34" y="228" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>
      <rect x="520" y="186" width="12" height="32" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="526" y="228" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>

      {/* Seating rows */}
      {[0,1,2,3,4,5,6,7].map(i=>(
        <ellipse key={i} cx="280" cy="280"
          rx={55+i*27} ry={22+i*16}
          fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.8"
        />
      ))}

      {/* Balcony */}
      <path d="M 40 240 Q 280 233 520 240" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" strokeDasharray="5 4"/>

      {/* SPL labels */}
      <text x="280" y="218" textAnchor="middle" fill="rgba(201,240,62,0.65)" fontSize="8" fontFamily="Geist Mono">105</text>
      <text x="435" y="255" textAnchor="middle" fill="rgba(93,184,78,0.5)" fontSize="7.5" fontFamily="Geist Mono">98</text>
      <text x="125" y="255" textAnchor="middle" fill="rgba(93,184,78,0.5)" fontSize="7.5" fontFamily="Geist Mono">98</text>
      <text x="280" y="354" textAnchor="middle" fill="rgba(62,145,66,0.4)" fontSize="7" fontFamily="Geist Mono">90</text>
    </svg>
  );
}

const PA_EQUIPMENT = [
  { group: "Tops", brand: "d&b audiotechnik", model: "Y12", units: 6, power: "2,100 W", spl: "105 dB" },
  { group: "Subs", brand: "d&b audiotechnik", model: "Y-SUB", units: 4, power: "2,100 W", spl: "120 dB" },
  { group: "Fills", brand: "d&b audiotechnik", model: "E8", units: 6, power: "700 W", spl: "99 dB" },
  { group: "Monitors", brand: "d&b audiotechnik", model: "M2", units: 8, power: "700 W", spl: "112 dB" },
];

function PAScreen() {
  const [activeGroup, setActiveGroup] = useState("Main PA");
  const groups = ["Main PA", "Subs", "Fills", "Monitors"];
  return (
    <div style={{ display: "flex", gap: 0, height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Group tabs */}
        <div style={{ display: "flex", gap: 4, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
          {groups.map(g => (
            <button key={g} onClick={() => setActiveGroup(g)} style={{ padding: "5px 12px", borderRadius: "var(--radius-sm)", background: activeGroup === g ? "var(--accent-dim)" : "transparent", border: activeGroup === g ? "1px solid rgba(201,240,62,0.3)" : "1px solid var(--border)", color: activeGroup === g ? "var(--accent)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{g}</button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <PAviz />
        </div>
      </div>
      <div style={{ width: 280, borderLeft: "1px solid var(--border)", padding: 16, overflowY: "auto" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>System summary</div>
        {PA_EQUIPMENT.map(eq => (
          <div key={eq.group} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{eq.group}</span>
              <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--accent)" }}>{eq.spl}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{eq.brand} · {eq.model}</div>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{eq.units} units</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{eq.power}</span>
            </div>
          </div>
        ))}
        <div style={{ padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Coverage</span>
          <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--accent)" }}>87% · Good</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Power handling</span>
          <span style={{ fontSize: 12, fontFamily: "Geist Mono", color: "var(--text)" }}>18,400 W</span>
        </div>
      </div>
    </div>
  );
}

/* ── DSP ── */
function EQCurve() {
  const pts = "20,64 40,60 80,58 120,54 200,52 300,48 500,42 700,36 900,32 1100,38 1300,44 1400,58 1500,62";
  return (
    <svg width="100%" height="100%" viewBox="0 0 1560 80" preserveAspectRatio="none">
      <defs>
        <linearGradient id="eq-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[20, 40, 60].map(y => <line key={y} x1="0" y1={y} x2="1560" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
      {/* Fill */}
      <path d={`M20,80 ${pts} L1500,80 Z`} fill="url(#eq-fill)"/>
      {/* Curve */}
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Control points */}
      {[[300,48],[700,36],[1100,38]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5"/>
      ))}
    </svg>
  );
}

const SIGNAL_CHAIN = [
  { label: "INPUT", detail: "Analog · Ch 1–4" },
  { label: "EQ", detail: "Parametric · 6-Band" },
  { label: "DELAY", detail: "2.7 ms" },
  { label: "CROSSOVER", detail: "LR24 · 110 Hz" },
  { label: "LIMITER", detail: "−1.0 dBFS" },
  { label: "OUTPUT", detail: "TOP L · TOP R · SUB" },
];

function DSPScreen() {
  const [selectedBand, setSelectedBand] = useState(2);
  const bands = [
    { freq: "80 Hz", gain: "+1.8 dB", q: "1.4", type: "Low Shelf" },
    { freq: "250 Hz", gain: "−1.2 dB", q: "2.0", type: "Peaking" },
    { freq: "1.25 kHz", gain: "+2.4 dB", q: "1.2", type: "Peaking" },
    { freq: "4 kHz", gain: "+0.6 dB", q: "1.8", type: "Peaking" },
    { freq: "8 kHz", gain: "+1.4 dB", q: "2.2", type: "High Shelf" },
  ];
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Signal chain */}
      <div style={{ width: 200, borderRight: "1px solid var(--border)", padding: 16, display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>Signal flow</div>
        {SIGNAL_CHAIN.map((s, i) => (
          <div key={i}>
            <div style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: i === 1 ? "var(--accent-dim2)" : "transparent", border: i === 1 ? "1px solid rgba(201,240,62,0.15)" : "1px solid transparent" }}>
              <div style={{ fontSize: 11, fontFamily: "Geist Mono", color: i === 1 ? "var(--accent)" : "var(--text-secondary)", fontWeight: 500, letterSpacing: "0.06em" }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{s.detail}</div>
            </div>
            {i < SIGNAL_CHAIN.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1v8M2 6l3 3 3-3" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EQ and channel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Channel selector */}
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Channel: <strong style={{ color: "var(--text)" }}>TOP L</strong></span>
          <div style={{ display: "flex", gap: 6 }}>
            {["TOP L","TOP R","SUB L","SUB R"].map(ch => (
              <button key={ch} style={{ padding: "4px 10px", borderRadius: "var(--radius-sm)", background: ch === "TOP L" ? "var(--elevated)" : "transparent", border: "1px solid var(--border)", color: ch === "TOP L" ? "var(--text)" : "var(--text-muted)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono" }}>{ch}</button>
            ))}
          </div>
        </div>

        {/* EQ graph */}
        <div style={{ padding: "16px 20px 8px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 28, alignItems: "flex-end" }}>
              {["+12","+6","0","−6","−12"].map(v => <span key={v} style={{ fontSize: 8, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{v}</span>)}
            </div>
            <div style={{ flex: 1, marginLeft: 8, height: 80, position: "relative" }}>
              <EQCurve />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 36 }}>
            {["20","63","125","250","500","1k","2k","4k","8k","16k"].map(f => (
              <span key={f} style={{ fontSize: 8, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Band selector */}
        <div style={{ padding: "12px 20px", display: "flex", gap: 6, borderBottom: "1px solid var(--border)" }}>
          {bands.map((_, i) => (
            <button key={i} onClick={() => setSelectedBand(i)} style={{ padding: "5px 14px", borderRadius: "var(--radius-sm)", background: selectedBand === i ? "var(--accent-dim)" : "var(--surface)", border: selectedBand === i ? "1px solid rgba(201,240,62,0.3)" : "1px solid var(--border)", color: selectedBand === i ? "var(--accent)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              Band {i + 1}
            </button>
          ))}
        </div>

        {/* Band params */}
        <div style={{ padding: "16px 20px", display: "flex", gap: 32 }}>
          {[
            { label: "Type", value: bands[selectedBand].type },
            { label: "Freq", value: bands[selectedBand].freq },
            { label: "Gain", value: bands[selectedBand].gain },
            { label: "Q", value: bands[selectedBand].q },
          ].map(p => (
            <div key={p.label}>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.label}</div>
              <div style={{ fontSize: 15, fontFamily: "Geist Mono", color: "var(--text)", fontWeight: 500 }}>{p.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Patch ── */
const CHANNELS = [
  { num: "01", name: "Kick In", status: "active", level: 0.72 },
  { num: "02", name: "Kick Out", status: "active", level: 0.65 },
  { num: "03", name: "Snare Top", status: "active", level: 0.81 },
  { num: "04", name: "Snare Bottom", status: "active", level: 0.58 },
  { num: "05", name: "Hi-Hat", status: "active", level: 0.43 },
  { num: "06", name: "Tom 1", status: "active", level: 0.61 },
  { num: "07", name: "Tom 2", status: "active", level: 0.55 },
  { num: "08", name: "OH L", status: "active", level: 0.70 },
  { num: "09", name: "OH R", status: "active", level: 0.68 },
  { num: "10", name: "Bass DI", status: "active", level: 0.77 },
  { num: "11", name: "Bass Amp", status: "active", level: 0.62 },
  { num: "12", name: "Guitar L", status: "active", level: 0.49 },
  { num: "13", name: "Guitar R", status: "active", level: 0.51 },
  { num: "14", name: "Keys L", status: "active", level: 0.55 },
  { num: "15", name: "Keys R", status: "active", level: 0.53 },
  { num: "16", name: "Vox Lead", status: "active", level: 0.88 },
];

function LevelBar({ level }: { level: number }) {
  const segments = 12;
  return (
    <div style={{ display: "flex", gap: 1.5, alignItems: "center" }}>
      {Array.from({ length: segments }).map((_, i) => {
        const filled = i / segments < level;
        const hot = i / segments > 0.8;
        return <div key={i} style={{ width: 12, height: 4, borderRadius: 1, background: filled ? (hot ? "#ff6b35" : "var(--accent)") : "var(--surface)" }}/>;
      })}
    </div>
  );
}

function PatchScreen() {
  const [view, setView] = useState<"inputs" | "outputs" | "matrix">("inputs");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 6, padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
        {(["inputs", "outputs", "matrix"] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: "5px 16px", borderRadius: "var(--radius-sm)", background: view === v ? "var(--elevated)" : "transparent", border: "1px solid var(--border)", color: view === v ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 160px 60px", gap: "0 16px", padding: "8px 20px", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--bg)" }}>
          {["CH","Name","Signal","Route"].map(h => <span key={h} style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>)}
        </div>
        {CHANNELS.map(ch => (
          <div key={ch.num} style={{ display: "grid", gridTemplateColumns: "40px 1fr 160px 60px", gap: "0 16px", padding: "10px 20px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
            <span style={{ fontFamily: "Geist Mono", fontSize: 12, color: "var(--text-muted)" }}>{ch.num}</span>
            <span style={{ fontSize: 13, color: "var(--text)" }}>{ch.name}</span>
            <LevelBar level={ch.level} />
            <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>OUT {ch.num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Save ── */
function SaveScreen() {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", margin: 0, marginBottom: 4 }}>Save design</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Save this configuration as a scene.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.06em" }}>Scene name</label>
          <input defaultValue="Teatro Gran Rex — Main PA" style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: 13, fontFamily: "inherit", outline: "none" }}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.06em" }}>Venue</label>
          <input defaultValue="Teatro Gran Rex" style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: 13, fontFamily: "inherit", outline: "none" }}/>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ flex: 1, padding: "11px 0", borderRadius: "var(--radius)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Save scene</button>
          <button style={{ padding: "11px 20px", borderRadius: "var(--radius)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Export</button>
        </div>
      </div>
    </div>
  );
}

/* ── shared ── */
function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{children}</div>;
}

const SCREEN_MAP: Record<DesignTab, React.ReactNode> = {
  room: <RoomScreen />,
  pa: <PAScreen />,
  dsp: <DSPScreen />,
  patch: <PatchScreen />,
  save: <SaveScreen />,
};

export default function Design() {
  const [tab, setTab] = useState<DesignTab>("room");

  const HEADLINES: Record<DesignTab, { title: string; sub: string }> = {
    room: { title: "Define the room.", sub: "Tell SoundMap where the system needs to work." },
    pa: { title: "Configure the PA.", sub: "Build your system and position your speakers." },
    dsp: { title: "Configure the DSP.", sub: "Build your system and position processing." },
    patch: { title: "Patch your system.", sub: "Connect your channels and verify routing." },
    save: { title: "Save your design.", sub: "Store this configuration as a reusable scene." },
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "16px 20px 0", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Design · Teatro Gran Rex</div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", margin: 0 }}>{HEADLINES[tab].title}</h1>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>{HEADLINES[tab].sub}</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, padding: "6px 12px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4v4M4 6h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Help
          </button>
        </div>
        {/* Tab row */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 16px", borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent", background: "none", border: "none", color: tab === t.id ? "var(--text)" : "var(--text-muted)", fontSize: 12, fontWeight: tab === t.id ? 500 : 400, cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s" }}>{t.label}</button>
          ))}
        </div>
      </header>

      {/* Screen content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {SCREEN_MAP[tab]}
      </div>

      {/* Footer */}
      <footer style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <button style={{ padding: "9px 20px", borderRadius: "var(--radius)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Back</button>
        <button onClick={() => {
          const idx = TABS.findIndex(t => t.id === tab);
          if (idx < TABS.length - 1) setTab(TABS[idx + 1].id);
        }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 24px", borderRadius: "var(--radius)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          {tab === "save" ? "Save & close" : "Continue"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="#08090A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </footer>
    </div>
  );
}
