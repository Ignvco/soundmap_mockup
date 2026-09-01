interface Props {
  onBack: () => void;
}

function LiveWaveform() {
  const segs = 60;
  const pts = Array.from({ length: segs }, (_, i) => {
    const base = 40;
    const noise = Math.sin(i * 0.7) * 12 + Math.sin(i * 1.3) * 6 + Math.sin(i * 2.1) * 3;
    return [i * (800 / (segs - 1)), base + noise];
  });
  const pathD = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const fillD = `M0,80 ${pts.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} L800,80 Z`;

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 80" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave-fill-kiosk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#wave-fill-kiosk)"/>
      <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function FOHKiosk({ onBack }: Props) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#050507", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            FOH Kiosk
          </button>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Teatro Gran Rex</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Main PA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}/>
          <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em" }}>LIVE</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* SPL hero */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 48px", borderRight: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Live SPL</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 120, fontFamily: "Geist Mono", fontWeight: 700, color: "var(--text)", lineHeight: 1, letterSpacing: "-0.04em" }}>102.3</span>
            <span style={{ fontSize: 40, fontFamily: "Geist Mono", color: "var(--text-secondary)", fontWeight: 300 }}>dB</span>
          </div>

          {/* Waveform */}
          <div style={{ width: "100%", height: 80, marginTop: 32 }}>
            <LiveWaveform />
          </div>

          {/* Secondary metrics */}
          <div style={{ display: "flex", gap: 48, marginTop: 28 }}>
            {[
              { value: "7.4 dB", label: "HEADROOM" },
              { value: "105.1 dB", label: "PEAK" },
            ].map(m => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontFamily: "Geist Mono", fontWeight: 500, color: "var(--text)" }}>{m.value}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ width: 280, display: "flex", flexDirection: "column", padding: 24, gap: 16 }}>
          {/* System health */}
          <div style={{ padding: "20px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "center" }}>
            <div style={{ fontSize: 48, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>98%</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 6 }}>SYSTEM HEALTH</div>
          </div>

          {/* MUTE ALL */}
          <button style={{ padding: "18px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid rgba(255,80,80,0.2)", color: "#ff6b6b", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em" }}>
            MUTE ALL
          </button>

          {/* SYSTEM OK */}
          <button style={{ padding: "18px", borderRadius: "var(--radius)", background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.3)", color: "var(--accent)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.06em" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            SYSTEM OK
          </button>

          {/* L/R meters */}
          <div style={{ padding: "16px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "L/R", level: 0.78, val: "−4.2 dB" },
              { label: "SUB", level: 0.62, val: "−6.1 dB" },
            ].map(ch => (
              <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--text-muted)", width: 32 }}>{ch.label}</span>
                <div style={{ flex: 1, height: 8, background: "var(--elevated)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${ch.level * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--accent) 0%, #8BC34A 75%, #ff6b35 100%)", borderRadius: 4 }}/>
                </div>
                <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--text-muted)", width: 44, textAlign: "right" }}>{ch.val}</span>
              </div>
            ))}
          </div>

          {/* FOH controls row */}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Presets</button>
            <button style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
