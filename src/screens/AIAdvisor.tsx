import { useState } from "react";

const SUGGESTIONS = [
  {
    icon: "⚡",
    title: "Sub/top crossover interaction",
    desc: "Your sub/top crossover is creating an interaction around 100 Hz.",
    recommendation: "Move crossover to 110 Hz.",
    impact: "High",
    detail: "The 100 Hz crossover is causing a +3.2 dB peak in the transition region. Raising to 110 Hz will reduce comb filtering and improve mono compatibility.",
    expanded: true,
  },
  {
    icon: "◈",
    title: "Wall absorption",
    desc: "Consider increasing wall absorption on the rear wall.",
    recommendation: "α: 0.32 → 0.45",
    impact: "High",
    detail: "The rear wall reflections are contributing to late-arriving energy that degrades speech intelligibility (RASTI reduction of ~0.08).",
    expanded: false,
  },
  {
    icon: "◉",
    title: "Delay alignment",
    desc: "Delay alignment could be improved in the balcony area.",
    recommendation: "Add 4.2 ms to balcony fills.",
    impact: "Medium",
    detail: "A 4.2 ms delay adjustment for balcony fill speakers will align them with the main PA arrival time and eliminate the comb filtering artifact at 1.2 kHz.",
    expanded: false,
  },
  {
    icon: "◦",
    title: "Limiter threshold",
    desc: "Limiter threshold set too conservatively for this system.",
    recommendation: "Raise from −1.0 to +0.5 dBFS",
    impact: "Low",
    detail: "The current −1.0 dBFS limiter threshold is leaving 1.5 dB of headroom unused. The system can safely operate at +0.5 dBFS without thermal or excursion risk.",
    expanded: false,
  },
];

const IMPACT_COLOR: Record<string, string> = {
  High: "#C9F03E",
  Medium: "#F59E0B",
  Low: "#A0A0A0",
};

export default function AIAdvisor() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [inputVal, setInputVal] = useState("");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>AI Advisor</div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", margin: 0 }}>SoundMap Intelligence</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 4h10M1 8h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Filter
        </button>
      </header>

      {/* Context banner */}
      <div style={{ padding: "12px 28px", background: "var(--accent-dim2)", borderBottom: "1px solid rgba(201,240,62,0.1)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="#C9F03E" strokeWidth="1.2"/><path d="M7 0v2M7 12v2M0 7h2M12 7h2" stroke="#C9F03E" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 12, color: "var(--accent)" }}>Analyzing: <strong>Teatro Gran Rex · Main PA</strong></span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· 4 recommendations found</span>
        </div>
      </div>

      {/* Suggestions list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Primary recommendation */}
        <div style={{ padding: "20px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2l1.5 3 3.5.5-2.5 2.5.6 3.5L7 10l-3.1 1.5.6-3.5L2 5.5l3.5-.5L7 2z" fill="#C9F03E" opacity="0.8"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Your sub/top crossover is creating an interaction around 100 Hz.</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>Recommended: move crossover to 110 Hz.</div>
            </div>
            <div style={{ padding: "2px 8px", borderRadius: "var(--radius-sm)", background: "var(--accent-dim)", border: "1px solid rgba(201,240,62,0.2)" }}>
              <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600 }}>High</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16 }}>
            The 100 Hz crossover is causing a +3.2 dB peak in the transition region. Raising to 110 Hz will reduce comb filtering and improve mono compatibility across the coverage area.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 18px", borderRadius: "var(--radius)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Apply recommendation</button>
            <button style={{ padding: "8px 18px", borderRadius: "var(--radius)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View analysis</button>
          </div>
        </div>

        {/* More suggestions */}
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>More suggestions</div>

        {SUGGESTIONS.slice(1).map((s, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i + 1 ? null : i + 1)} style={{ padding: "14px 18px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.15s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--elevated)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" stroke="#C9F03E" strokeWidth="1.2"/><path d="M6 0v2M6 10v2M0 6h2M10 6h2" stroke="#C9F03E" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{s.desc}</div>
                <div style={{ fontSize: 11, color: "var(--accent)" }}>{s.recommendation}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: IMPACT_COLOR[s.impact], fontFamily: "Geist Mono" }}>Impact: {s.impact}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: expanded === i + 1 ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                  <path d="M2 4l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
            </div>
            {expanded === i + 1 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 12px" }}>{s.detail}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={e => e.stopPropagation()} style={{ padding: "7px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Apply</button>
                  <button onClick={e => e.stopPropagation()} style={{ padding: "7px 14px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Dismiss</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div style={{ padding: "14px 28px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ask SoundMap anything..."
            style={{ flex: 1, background: "none", border: "none", color: "var(--text)", fontSize: 13, fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={() => setInputVal("")} style={{ width: 28, height: 28, borderRadius: "50%", background: inputVal ? "var(--accent)" : "var(--elevated)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke={inputVal ? "#08090A" : "var(--text-muted)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
