interface Props {
  onFOHKiosk: () => void;
}

function FreqResponse() {
  // Generate a realistic frequency response curve
  const points = [
    [31, 58], [40, 56], [50, 54], [63, 52], [80, 50], [100, 46], [125, 42],
    [160, 38], [200, 36], [250, 38], [315, 44], [400, 48], [500, 52],
    [630, 56], [800, 54], [1000, 50], [1250, 48], [1600, 46], [2000, 44],
    [2500, 42], [3150, 40], [4000, 38], [5000, 36], [6300, 34], [8000, 32],
    [10000, 36], [12500, 42], [16000, 52], [20000, 60]
  ];

  const W = 1200, H = 80;
  const logMin = Math.log10(31), logMax = Math.log10(20000);

  const toX = (hz: number) => ((Math.log10(hz) - logMin) / (logMax - logMin)) * W;
  const toY = (db: number) => (db / 64) * H;

  const pathD = points.map(([hz, db], i) => `${i === 0 ? "M" : "L"}${toX(hz).toFixed(1)},${toY(db).toFixed(1)}`).join(" ");
  const fillD = `M${toX(31)},${H} ${points.map(([hz, db]) => `L${toX(hz).toFixed(1)},${toY(db).toFixed(1)}`).join(" ")} L${toX(20000)},${H} Z`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="resp-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F03E" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#C9F03E" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Grid */}
      {[20, 40, 60, 80].map(y => <line key={y} x1="0" y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
      <path d={fillD} fill="url(#resp-fill)"/>
      <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Perform({ onFOHKiosk }: Props) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Perform</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Teatro Gran Rex</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}/>
          <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em" }}>LIVE</span>
        </div>
      </header>

      {/* Main metric */}
      <div style={{ padding: "32px 28px 24px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ marginBottom: 8, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live SPL</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 72, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--text)", lineHeight: 1, letterSpacing: "-0.02em" }}>102.3</span>
          <span style={{ fontSize: 28, fontFamily: "Geist Mono", color: "var(--text-secondary)" }}>dB</span>
        </div>

        {/* Secondary metrics */}
        <div style={{ display: "flex", gap: 28, marginTop: 20 }}>
          {[
            { value: "7.4 dB", label: "Headroom" },
            { value: "105.1 dB", label: "Peak" },
            { value: "98%", label: "System health" },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 16, fontFamily: "Geist Mono", fontWeight: 500, color: "var(--text)" }}>{m.value}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, letterSpacing: "0.06em" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Freq response graph */}
      <div style={{ padding: "16px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Frequency response</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 1.5, background: "var(--accent)" }}/>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Live</span>
            </div>
          </div>
        </div>
        {/* dB labels */}
        <div style={{ display: "flex", gap: 0 }}>
          <div style={{ width: 28, display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-end" }}>
            {["+12","0","−12","−24"].map(v => <span key={v} style={{ fontSize: 8, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{v}</span>)}
          </div>
          <div style={{ flex: 1, height: 80, marginLeft: 4 }}>
            <FreqResponse />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 32, marginTop: 4 }}>
          {["31","63","125","250","500","1k","2k","4k","8k","16k"].map(f => (
            <span key={f} style={{ fontSize: 8, fontFamily: "Geist Mono", color: "var(--text-muted)" }}>{f}</span>
          ))}
        </div>
      </div>

      {/* L/R meters */}
      <div style={{ padding: "16px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {[
          { label: "L/R", level: 0.78 },
          { label: "SUB", level: 0.62 },
        ].map(ch => (
          <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--text-muted)", width: 28 }}>{ch.label}</span>
            <div style={{ flex: 1, height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${ch.level * 100}%`, height: "100%", background: `linear-gradient(90deg, var(--accent) 0%, #8BC34A 80%, #ff6b35 100%)`, borderRadius: 3 }}/>
            </div>
            <span style={{ fontSize: 11, fontFamily: "Geist Mono", color: "var(--text-muted)", width: 40, textAlign: "right" }}>
              {ch.level > 0.8 ? "−4.2" : "−6.1"} dB
            </span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ padding: "16px 28px", display: "flex", gap: 10 }}>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3h3v8H3zM8 3h3v8H8z" fill="currentColor"/></svg>
          Mute
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="5" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
          Presets
        </button>
        <button onClick={onFOHKiosk} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: "var(--radius)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M5 11v2M9 11v2M3 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          FOH Kiosk
        </button>
      </div>
    </div>
  );
}
