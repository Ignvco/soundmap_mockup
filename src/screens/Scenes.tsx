import { useState } from "react";

const SCENES = [
  { name: "Teatro Gran Rex — Main PA", venue: "Teatro Gran Rex", date: "Today, 14:22", spl: "102 dB", system: "d&b Y12 + Y-SUB", tag: "Local" },
  { name: "Concierto Exterior — Festival", venue: "Campo Municipal", date: "May 28, 2025", spl: "98 dB", system: "L-Acoustics K2", tag: "Local" },
  { name: "Auditorio UNSAM — Conferencia", venue: "Auditorio UNSAM", date: "May 24, 2025", spl: "95 dB", system: "QSC K12.2", tag: "Shared" },
  { name: "Iglesia Centro — Domingo", venue: "Iglesia Centro", date: "May 18, 2025", spl: "92 dB", system: "JBL SRX900", tag: "Local" },
  { name: "Teatro Colón — Ensayo", venue: "Teatro Colón", date: "May 12, 2025", spl: "101 dB", system: "Meyer Sound LEO", tag: "Favorites" },
  { name: "Teatro Gran Rex — Main PA", venue: "Teatro Gran Rex", date: "Today, 14:22", spl: "102 dB", system: "d&b Y12 + Y-SUB", tag: "Favorites" },
];

const FILTERS = ["All", "Local", "Shared", "Favorites"];

export default function Scenes() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(0);

  const filtered = filter === "All" ? SCENES : SCENES.filter(s => s.tag === filter);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", margin: 0 }}>Scenes</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "6px 12px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M9 9l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Search
          </button>
          <button style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--accent)", border: "none", color: "#08090A", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            + New scene
          </button>
        </div>
      </header>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "10px 16px", background: "none", border: "none", borderBottom: filter === f ? "2px solid var(--accent)" : "2px solid transparent", color: filter === f ? "var(--text)" : "var(--text-muted)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{f}</button>
        ))}
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px 80px 80px", gap: "0 20px", padding: "8px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {["Scene","Max SPL","System","Date",""].map((h, i) => (
          <span key={i} style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
        ))}
      </div>

      {/* Scene list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px 80px 80px", gap: "0 20px", padding: "14px 28px", borderBottom: "1px solid var(--border)", alignItems: "center", cursor: "pointer", background: selected === i ? "var(--surface)" : "transparent", transition: "background 0.1s" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.venue}</div>
            </div>
            <span style={{ fontSize: 14, fontFamily: "Geist Mono", fontWeight: 600, color: "var(--accent)" }}>{s.spl}</span>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.system}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.date}</span>
            <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
              <button style={{ padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
