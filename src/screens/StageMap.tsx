import { useState } from "react";

/* ────────────────────────────────────────────────────────────
   Full 3D perspective — Teatro Gran Rex
   Isometric-ish projection with face shading & lighting
──────────────────────────────────────────────────────────── */
function StageMap3D() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 900 540" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Face shading gradients */}
        <linearGradient id="wall-back-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#181818"/>
          <stop offset="100%" stopColor="#0e0e0e"/>
        </linearGradient>
        <linearGradient id="wall-l-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#0e0e0e"/>
          <stop offset="100%" stopColor="#161616"/>
        </linearGradient>
        <linearGradient id="wall-r-grad" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"  stopColor="#0e0e0e"/>
          <stop offset="100%" stopColor="#161616"/>
        </linearGradient>
        <linearGradient id="ceil-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"  stopColor="#141414"/>
          <stop offset="100%" stopColor="#0b0b0b"/>
        </linearGradient>
        <linearGradient id="floor-grad3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#111111"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>
        <linearGradient id="stage-top-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#222222"/>
          <stop offset="100%" stopColor="#181818"/>
        </linearGradient>

        {/* Stage spotlight wash */}
        <radialGradient id="stage-wash" cx="50%" cy="0%" r="90%">
          <stop offset="0%"  stopColor="#C9F03E" stopOpacity="0.18"/>
          <stop offset="50%" stopColor="#C9F03E" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>

        {/* Ceiling grid light */}
        <radialGradient id="ceil-light" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>

        {/* Audience area ambient */}
        <radialGradient id="aud-ambient" cx="50%" cy="30%" r="65%">
          <stop offset="0%"  stopColor="#C9F03E" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>

        {/* Array speaker gradient */}
        <linearGradient id="arr-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#1e1e1e"/>
          <stop offset="100%" stopColor="#161616"/>
        </linearGradient>

        {/* Depth fog */}
        <linearGradient id="depth-fog" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"  stopColor="#050507" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#050507" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* ── Back wall ── */}
      <path d="M 110 70 L 790 70 L 790 410 L 110 410 Z" fill="url(#wall-back-grad)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

      {/* Back wall grid */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`bv${i}`} x1={178+i*102} y1="70" x2={178+i*102} y2="410" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={`bh${i}`} x1="110" y1={138+i*62} x2="790" y2={138+i*62} stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}

      {/* Left wall */}
      <path d="M 30 120 L 110 70 L 110 410 L 30 460 Z" fill="url(#wall-l-grad)" stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
      {/* Left wall grid */}
      {[0,1,2,3].map(i=>(
        <line key={`lwh${i}`} x1="30" y1={210+i*62} x2="110" y2={182+i*56} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
      ))}

      {/* Right wall */}
      <path d="M 790 70 L 870 120 L 870 460 L 790 410 Z" fill="url(#wall-r-grad)" stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>

      {/* Ceiling */}
      <path d="M 30 120 L 870 120 L 790 70 L 110 70 Z" fill="url(#ceil-grad)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      {/* Ceiling grid */}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={`cg${i}`} x1={180+i*86} y1="70" x2={120+i*110} y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="0.6"/>
      ))}
      {[0,1,2].map(i=>(
        <path key={`ch${i}`} d={`M ${140+i*90} 70 L ${70+i*120} 120`} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
      ))}
      {/* Ceiling ambient light */}
      <path d="M 30 120 L 870 120 L 790 70 L 110 70 Z" fill="url(#ceil-light)"/>

      {/* ── Rigging truss (horizontal bar under ceiling) ── */}
      {/* Main truss left */}
      <rect x="100" y="128" width="12" height="62" rx="1" fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      {[0,1,2,3,4,5].map(i=>(
        <line key={`trl${i}`} x1="100" y1={134+i*9} x2="112" y2={134+i*9} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      ))}
      {/* Main truss right */}
      <rect x="788" y="128" width="12" height="62" rx="1" fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      {[0,1,2,3,4,5].map(i=>(
        <line key={`trr${i}`} x1="788" y1={134+i*9} x2="800" y2={134+i*9} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
      ))}
      {/* Horizontal truss bar (perspective foreshortened) */}
      <path d="M 112 128 L 788 128 L 788 132 L 112 132 Z" fill="#1c1c1c" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      {/* Motor chain lines */}
      {[190, 300, 450, 600, 710].map((x,i) => (
        <line key={`chain${i}`} x1={x} y1="120" x2={x} y2="128" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="2 2"/>
      ))}

      {/* ── Speaker arrays ── */}

      {/* LEFT array — 6-box vertical */}
      <g>
        {/* Array body — trapezoidal box with perspective */}
        <path d="M 112 134 L 148 130 L 148 196 L 112 200 Z" fill="url(#arr-body)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        {/* Speaker cones */}
        {[0,1,2,3,4,5].map(i=>(
          <g key={i}>
            <rect x="116" y={137+i*10} width="28" height="8" rx="1.5" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
            <ellipse cx="130" cy={141+i*10} rx="4" ry="2.5" fill="rgba(201,240,62,0.35)"/>
          </g>
        ))}
        {/* Array side face */}
        <path d="M 148 130 L 160 135 L 160 200 L 148 196 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        {/* Label */}
        <text x="130" y="213" textAnchor="middle" fill="#C9F03E" fontSize="9" fontFamily="Geist Mono" fontWeight="600">TOP L</text>
        <text x="130" y="224" textAnchor="middle" fill="rgba(201,240,62,0.45)" fontSize="7.5" fontFamily="Geist Mono">6× d&b Y12</text>

        {/* Sub box below */}
        <path d="M 112 204 L 148 200 L 148 234 L 112 238 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {[0,1,2].map(i=>(
          <rect key={i} x="116" y={207+i*8} width="28" height="6" rx="1" fill="#111" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        ))}
        <path d="M 148 200 L 160 205 L 160 238 L 148 234 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <text x="130" y="248" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5" fontFamily="Geist Mono">SUB L</text>

        {/* Rigging wire */}
        <line x1="134" y1="128" x2="130" y2="134" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>

        {/* Coverage beam */}
        <path d="M 148 165 L 500 380 L 350 420 L 110 380 L 75 240 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.07)" strokeWidth="0.6"/>
      </g>

      {/* RIGHT array */}
      <g>
        <path d="M 752 130 L 788 134 L 788 200 L 752 196 Z" fill="url(#arr-body)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        {[0,1,2,3,4,5].map(i=>(
          <g key={i}>
            <rect x="754" y={137+i*10} width="28" height="8" rx="1.5" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
            <ellipse cx="768" cy={141+i*10} rx="4" ry="2.5" fill="rgba(201,240,62,0.35)"/>
          </g>
        ))}
        <path d="M 740 135 L 752 130 L 752 196 L 740 200 Z" fill="#141414" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
        <text x="770" y="213" textAnchor="middle" fill="#C9F03E" fontSize="9" fontFamily="Geist Mono" fontWeight="600">TOP R</text>
        <text x="770" y="224" textAnchor="middle" fill="rgba(201,240,62,0.45)" fontSize="7.5" fontFamily="Geist Mono">6× d&b Y12</text>

        {/* Sub R */}
        <path d="M 752 200 L 788 204 L 788 238 L 752 234 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {[0,1,2].map(i=>(
          <rect key={i} x="754" y={207+i*8} width="28" height="6" rx="1" fill="#111" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        ))}
        <path d="M 740 205 L 752 200 L 752 234 L 740 238 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <text x="770" y="248" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5" fontFamily="Geist Mono">SUB R</text>

        <line x1="766" y1="128" x2="770" y2="134" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        <path d="M 752 165 L 400 380 L 550 420 L 790 380 L 825 240 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.07)" strokeWidth="0.6"/>
      </g>

      {/* Delay cluster — center high */}
      <rect x="432" y="130" width="36" height="20" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {[0,1,2].map(i=><circle key={i} cx={440+i*8} cy="140" r="3" fill="rgba(255,255,255,0.2)"/>)}
      <text x="450" y="162" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7.5" fontFamily="Geist Mono">CENTER</text>
      <line x1="450" y1="120" x2="450" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 2"/>

      {/* ── Stage platform ── */}
      {/* Stage top face */}
      <path d="M 260 272 L 640 272 L 640 340 L 260 340 Z" fill="url(#stage-top-grad)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      {/* Stage front face */}
      <path d="M 230 300 L 260 272 L 640 272 L 670 300 L 670 360 L 230 360 Z" fill="#181818" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* Stage side L */}
      <path d="M 180 320 L 230 300 L 230 360 L 180 380 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      {/* Stage top */}
      <path d="M 230 300 L 260 272 L 640 272 L 670 300 Z" fill="#202020" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Stage label */}
      <text x="450" y="316" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="10" fontFamily="Geist Mono" letterSpacing="4">STAGE</text>
      {/* Stage edge highlight */}
      <line x1="230" y1="300" x2="670" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* Stage lighting wash */}
      <path d="M 260 272 L 640 272 L 640 340 L 260 340 Z" fill="url(#stage-wash)"/>

      {/* Stage spotlights — cones from ceiling */}
      {[320,450,580].map((x,i)=>(
        <g key={i} opacity="0.5">
          <path d={`M ${x-8} 120 L ${x+8} 120 L ${x+30} 272 L ${x-30} 272 Z`} fill="rgba(255,240,100,0.06)"/>
          <line x1={x} y1="120" x2={x} y2="272" stroke="rgba(255,240,100,0.12)" strokeWidth="0.5" strokeDasharray="6 3"/>
        </g>
      ))}

      {/* Monitor wedges on stage */}
      {[320,400,480,560].map((x,i)=>(
        <g key={i}>
          <path d={`M ${x-14} 272 L ${x+14} 272 L ${x+10} 284 L ${x-10} 284 Z`} fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
          <text x={x} y="295" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="6" fontFamily="Geist Mono">MON</text>
        </g>
      ))}

      {/* ── Floor ── */}
      <path d="M 30 460 L 870 460 L 790 410 L 110 410 Z" fill="url(#floor-grad3d)" stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
      {/* Floor grid */}
      {[0,1,2,3,4,5,6].map(i=>(
        <path key={`fg${i}`} d={`M ${100+i*100} 410 L ${55+i*115} 460`} stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}
      {[0,1].map(i=>(
        <path key={`fh${i}`} d={`M 110 ${426+i*16} L 790 ${426+i*16}`} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
      ))}

      {/* ── Audience seating (floor level) ── */}
      {/* Seating rows — perspective grid */}
      {[0,1,2,3,4,5,6,7].map(row => {
        const y0 = 352 + row * 8;
        const yscale = 1 + row * 0.08;
        const xCenter = 450;
        const halfW = 200 + row * 14;
        return (
          <g key={row}>
            {[-4,-3,-2,-1,0,1,2,3,4].map(col => {
              const x = xCenter + col * (halfW / 4.5);
              const w = 16 * yscale;
              const h = 5 * yscale;
              return (
                <rect key={col}
                  x={x - w/2} y={y0}
                  width={w} height={h}
                  rx="1"
                  fill="rgba(255,255,255,0.055)"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        );
      })}

      {/* ── Balcony level ── */}
      {/* Balcony platform */}
      <path d="M 110 240 L 790 240 L 790 258 L 110 258 Z" fill="#181818" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <path d="M 30 260 L 110 240 L 110 258 L 30 278 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
      <path d="M 790 240 L 870 260 L 870 278 L 790 258 Z" fill="#141414" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
      {/* Balcony seating row */}
      {[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(col => {
        const x = 450 + col * 48;
        return x > 120 && x < 770 ? (
          <rect key={col} x={x-14} y="243" width="22" height="8" rx="1.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
        ) : null;
      })}
      <text x="110" y="237" fill="rgba(255,255,255,0.2)" fontSize="7.5" fontFamily="Geist Mono">BALCONY</text>

      {/* Balcony fill speakers */}
      <rect x="110" y="255" width="14" height="26" rx="2" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <text x="117" y="290" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL L</text>
      <rect x="776" y="255" width="14" height="26" rx="2" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <text x="783" y="290" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL R</text>

      {/* Audience ambient light (SPL coverage) */}
      <path d="M 30 260 L 870 260 L 790 410 L 110 410 Z" fill="url(#aud-ambient)"/>

      {/* ── Depth fog ── */}
      <path d="M 30 380 L 870 380 L 870 460 L 30 460 Z" fill="url(#depth-fog)"/>

      {/* ── Dimension callouts ── */}
      {/* Width */}
      <line x1="110" y1="420" x2="790" y2="420" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="110" y1="415" x2="110" y2="425" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="790" y1="415" x2="790" y2="425" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="450" y="435" textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontFamily="Geist Mono">24.6 m</text>

      {/* Height */}
      <line x1="880" y1="120" x2="880" y2="410" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="875" y1="120" x2="885" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="875" y1="410" x2="885" y2="410" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="890" y="272" fill="var(--text-muted)" fontSize="8.5" fontFamily="Geist Mono">11.8 m</text>

      {/* FOH position marker */}
      <g>
        <circle cx="450" cy="430" r="5" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3 2"/>
        <text x="450" y="448" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="Geist Mono">FOH</text>
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   2D Top view — cleaner technical drawing
──────────────────────────────────────────────────────────── */
function StageMap2D() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 760 520" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="cov2d-l" cx="14%" cy="22%" r="78%" fx="14%" fy="18%">
          <stop offset="0%"  stopColor="#C9F03E" stopOpacity="0.22"/>
          <stop offset="35%" stopColor="#4CAF50" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cov2d-r" cx="86%" cy="22%" r="78%" fx="86%" fy="18%">
          <stop offset="0%"  stopColor="#C9F03E" stopOpacity="0.22"/>
          <stop offset="35%" stopColor="#4CAF50" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#1B5E20" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cov2d-sub" cx="50%" cy="16%" r="60%">
          <stop offset="0%"  stopColor="#8BC34A" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#4CAF50" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Room outline */}
      <rect x="40" y="30" width="680" height="460" rx="6" fill="#080d08" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2"/>

      {/* Room grid */}
      {Array.from({length:9},(_,i)=>(
        <line key={`g${i}`} x1={40+i*85} y1="30" x2={40+i*85} y2="490" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}
      {Array.from({length:7},(_,i)=>(
        <line key={`gh${i}`} x1="40" y1={30+i*77} x2="720" y2={30+i*77} stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"/>
      ))}

      {/* Coverage */}
      <rect x="40" y="30" width="680" height="460" fill="url(#cov2d-l)" rx="6"/>
      <rect x="40" y="30" width="680" height="460" fill="url(#cov2d-r)" rx="6"/>
      <rect x="40" y="30" width="680" height="460" fill="url(#cov2d-sub)" rx="6"/>

      {/* Isocurves top view */}
      {[60,110,160,218,278].map((r,i)=>(
        <ellipse key={i} cx="380" cy="260" rx={r*2.5} ry={r*1.9}
          fill="none"
          stroke={i===0?"#C9F03E":i===1?"#9DC94E":i===2?"#5DB84E":i===3?"#3E9142":"#2E7D32"}
          strokeWidth={i===0?0.9:0.6}
          strokeOpacity={0.5-i*0.07}
          strokeDasharray={i===0?"":"4 3"}
        />
      ))}

      {/* Stage */}
      <rect x="200" y="32" width="360" height="62" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <line x1="200" y1="56" x2="560" y2="56" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
      <text x="380" y="73" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="10" fontFamily="Geist Mono" letterSpacing="3">STAGE</text>

      {/* TOP L */}
      <g>
        <rect x="90" y="94" width="26" height="68" rx="3" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.3"/>
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x="94" y={99+i*9} width="18" height="6" rx="1.5" fill="#C9F03E" opacity={0.5-i*0.06}/>
        ))}
        <text x="103" y="174" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP L</text>
        {/* Direction cone */}
        <path d="M 116 128 L 380 270 L 280 490 L 50 430 L 45 240 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.07)" strokeWidth="0.7"/>
      </g>

      {/* TOP R */}
      <g>
        <rect x="644" y="94" width="26" height="68" rx="3" fill="#1a1a1a" stroke="#C9F03E" strokeWidth="1.3"/>
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x="648" y={99+i*9} width="18" height="6" rx="1.5" fill="#C9F03E" opacity={0.5-i*0.06}/>
        ))}
        <text x="657" y="174" textAnchor="middle" fill="#C9F03E" fontSize="8" fontFamily="Geist Mono">TOP R</text>
        <path d="M 644 128 L 380 270 L 480 490 L 710 430 L 715 240 Z" fill="rgba(201,240,62,0.04)" stroke="rgba(201,240,62,0.07)" strokeWidth="0.7"/>
      </g>

      {/* SUB L */}
      <rect x="94" y="170" width="24" height="38" rx="3" fill="#141414" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <text x="106" y="220" textAnchor="middle" fill="var(--text-muted)" fontSize="7.5" fontFamily="Geist Mono">SUB L</text>

      {/* SUB R */}
      <rect x="642" y="170" width="24" height="38" rx="3" fill="#141414" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <text x="654" y="220" textAnchor="middle" fill="var(--text-muted)" fontSize="7.5" fontFamily="Geist Mono">SUB R</text>

      {/* CENTER */}
      <rect x="364" y="32" width="32" height="20" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

      {/* FILL L/R */}
      <rect x="40" y="248" width="14" height="36" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="47" y="295" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>
      <rect x="706" y="248" width="14" height="36" rx="2" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="713" y="295" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="Geist Mono">FILL</text>

      {/* Seating rows */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <ellipse key={i} cx="380" cy="320"
          rx={70+i*32} ry={28+i*22}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.9"
        />
      ))}
      {/* Aisle */}
      <line x1="380" y1="96" x2="380" y2="490" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2"/>

      {/* Balcony */}
      <path d="M 50 296 Q 380 288 710 296" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <text x="56" y="290" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="Geist Mono">BALCONY</text>

      {/* Monitors */}
      {[295,360,400,465].map((x,i)=>(
        <rect key={i} x={x} y="96" width="18" height="12" rx="2" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      ))}

      {/* FOH */}
      <circle cx="380" cy="470" r="7" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3 2"/>
      <text x="380" y="488" textAnchor="middle" fill="var(--accent)" fontSize="7.5" fontFamily="Geist Mono">FOH</text>

      {/* dB labels */}
      <text x="380" y="258" textAnchor="middle" fill="rgba(201,240,62,0.6)" fontSize="8" fontFamily="Geist Mono">105</text>
      <text x="380" y="225" textAnchor="middle" fill="rgba(157,201,78,0.5)" fontSize="7.5" fontFamily="Geist Mono">102</text>
      <text x="550" y="290" textAnchor="middle" fill="rgba(93,184,78,0.45)" fontSize="7" fontFamily="Geist Mono">98</text>
      <text x="380" y="380" textAnchor="middle" fill="rgba(62,145,66,0.4)" fontSize="7" fontFamily="Geist Mono">92</text>
    </svg>
  );
}

export default function StageMap() {
  const [view, setView] = useState<"3d" | "2d">("3d");
  const [labels, setLabels] = useState(true);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <header style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 2L2 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            3D Stage Map
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: 0 }}>Teatro Gran Rex</h1>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>d&b Soundscape · Y-Series</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <button onClick={() => setView("2d")} style={{ padding: "5px 16px", background: view === "2d" ? "var(--elevated)" : "transparent", border: "none", color: view === "2d" ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>2D</button>
            <button onClick={() => setView("3d")} style={{ padding: "5px 16px", background: view === "3d" ? "var(--elevated)" : "transparent", border: "none", color: view === "3d" ? "var(--text)" : "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>3D</button>
          </div>
        </div>
      </header>

      {/* Map */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#050507" }}>
        {view === "3d" ? <StageMap3D /> : <StageMap2D />}

        {/* Zoom controls */}
        <div style={{ position: "absolute", right: 20, top: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          {["+", "−", "⟲"].map(c => (
            <button key={c} style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "rgba(20,20,20,0.9)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 16, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>{c}</button>
          ))}
        </div>

        {/* Legend */}
        <div style={{ position: "absolute", left: 16, bottom: 50, display: "flex", flexDirection: "column", gap: 5, padding: "10px 12px", background: "rgba(10,10,10,0.85)", borderRadius: "var(--radius)", border: "1px solid var(--border)", backdropFilter: "blur(4px)" }}>
          {[
            { color: "#C9F03E", label: "Line array (TOP)" },
            { color: "rgba(255,255,255,0.3)", label: "Subwoofer" },
            { color: "rgba(255,255,255,0.15)", label: "Fill / monitor" },
            { color: "rgba(201,240,62,0.15)", label: "Coverage zone" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color, flexShrink: 0 }}/>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "Geist Mono" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ padding: "5px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>Top View</option><option>Front View</option><option>Side View</option><option>Isometric</option>
          </select>
          <select style={{ padding: "5px 10px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "Geist Mono", outline: "none" }}>
            <option>All systems</option><option>TOP L/R only</option><option>Subs only</option>
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
