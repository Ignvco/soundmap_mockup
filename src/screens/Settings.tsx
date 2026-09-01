const SETTINGS_SECTIONS = [
  {
    items: [
      { label: "Profile", value: "LevelPro Audio" },
      { label: "Audio Unit", value: "dB / Hz" },
      { label: "Measurement", value: "ISO 3382" },
      { label: "System Defaults", value: null },
    ],
  },
  {
    items: [
      { label: "Notifications", value: "On" },
      { label: "Appearance", value: "Dark >" },
      { label: "Language", value: "English" },
    ],
  },
  {
    items: [
      { label: "Backup & Sync", value: "Enabled" },
    ],
  },
  {
    items: [
      { label: "About SoundMap", value: "v6.0.0" },
    ],
  },
];

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 2l4 4-4 4" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export default function Settings() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "16px 28px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", margin: 0 }}>Settings</h1>
      </header>

      {/* Settings list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 28px" }}>
          {SETTINGS_SECTIONS.map((section, si) => (
            <div key={si} style={{ marginBottom: 24 }}>
              <div style={{ background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden" }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: ii < section.items.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, color: "var(--text)" }}>{item.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {item.value && <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: item.value.match(/^\d/) ? "Geist Mono" : "inherit" }}>{item.value}</span>}
                      <ChevronRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Danger zone */}
          <div style={{ marginTop: 8, padding: "14px 18px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontSize: 14, color: "#ff6b6b" }}>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
