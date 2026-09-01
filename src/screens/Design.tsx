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
    <svg width="100%" height="100%" viewBox="0 0 520 340" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="room-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0d0d0d"/>
        </linearGradient>
      </defs>

      {/* Back wall */}
      <path d="M100 60 L420 60 L500 120 L500 280 L420 320 L100 320 L20 280 L20 120 Z" fill="url(#room-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* Floor */}
      <path d="M60 290 L460 290 L500 280 L500 290 L460 320 L60 320 L20 280 L20 290 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>

      {/* Ceiling lines (depth) */}
      <path d="M100 60 L260 20 L420 60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <path d="M20 120 L260 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="4 4"/>
      <path d="M500 120 L260 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="4 4"/>

      {/* Seating rake lines */}
      {[0,1,2,3,4,5,6].map(i => (
        <path key={i} d={`M${80+i*12} ${190+i*14} L${440-i*12} ${190+i*14}`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
      ))}

      {/* Stage */}
      <rect x="160" y="62" width="200" height="36" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <text x="260" y="84" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Geist Mono">STAGE</text>

      {/* Speaker arrays - left */}
      <rect x="78" y="96" width="18" height="32" rx="2" fill="var(--elevated)" stroke="var(--accent)" strokeWidth="1"/>
      <rect x="78" y="132" width="18" height="22" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {/* Speaker arrays - right */}
      <rect x="424" y="96" width="18" height="32" rx="2" fill="var(--elevated)" stroke="var(--accent)" strokeWidth="1"/>
      <rect x="424" y="132" width="18" height="22" rx="2" fill="var(--elevated)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>

      {/* Dimensions */}
      {/* Width */}
      <line x1="40" y1="320" x2="480" y2="320" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <line x1="40" y1="315" x2="40" y2="325" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <line x1="480" y1="315" x2="480" y2="325" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <text x="260" y="336" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Geist Mono">18.2 m</text>

      {/* Height indicator */}
      <line x1="508" y1="60" x2="508" y2="280" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <text x="514" y="175" fill="var(--text-muted)" fontSize="9" fontFamily="Geist Mono">11.8 m</text>
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
    <svg width="100%" height="100%" viewBox="0 0 460 320" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="pa-coverage-l" cx="30%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pa-coverage-r" cx="70%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Room outline */}
      <rect x="30" y="20" width="400" height="280" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Stage */}
      <rect x="150" y="22" width="160" height="30" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <text x="230" y="41" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="Geist Mono">STAGE</text>

      {/* Coverage zones */}
      <ellipse cx="145" cy="180" rx="120" ry="130" fill="url(#pa-coverage-l)"/>
      <ellipse cx="315" cy="180" rx="120" ry="130" fill="url(#pa-coverage-r)"/>

      {/* TOP L */}
      <g>
        <rect x="60" y="52" width="24" height="42" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
        {[0,1,2].map(i => <circle key={i} cx="72" cy={62 + i * 12} r="3" fill="var(--accent)" opacity="0.5"/>)}
        <text x="72" y="106" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP L</text>
      </g>
      {/* TOP R */}
      <g>
        <rect x="376" y="52" width="24" height="42" rx="3" fill="#1a1a1a" stroke="var(--accent)" strokeWidth="1.2"/>
        {[0,1,2].map(i => <circle key={i} cx="388" cy={62 + i * 12} r="3" fill="var(--accent)" opacity="0.5"/>)}
        <text x="388" y="106" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="Geist Mono">TOP R</text>
      </g>
      {/* SUB L */}
      <rect x="60" y="100" width="24" height="28" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="72" y="138" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">SUB L</text>
      {/* SUB R */}
      <rect x="376" y="100" width="24" height="28" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="388" y="138" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="Geist Mono">SUB R</text>
      {/* Monitors */}
      {[170, 210, 250].map((x, i) => (
        <g key={i}>
          <rect x={x} y="50" width="20" height="14" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <text x={x+10} y="74" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="Geist Mono">MON</text>
        </g>
      ))}

      {/* Coverage lines */}
      <line x1="72" y1="94" x2="145" y2="280" stroke="rgba(201,240,62,0.15)" strokeWidth="0.8"/>
      <line x1="84" y1="52" x2="40" y2="280" stroke="rgba(201,240,62,0.08)" strokeWidth="0.8"/>
      <line x1="388" y1="94" x2="315" y2="280" stroke="rgba(201,240,62,0.15)" strokeWidth="0.8"/>
      <line x1="376" y1="52" x2="420" y2="280" stroke="rgba(201,240,62,0.08)" strokeWidth="0.8"/>
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
