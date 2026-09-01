import { useState } from "react";
import Home from "./screens/Home";
import Design from "./screens/Design";
import Perform from "./screens/Perform";
import FOHKiosk from "./screens/FOHKiosk";
import Scenes from "./screens/Scenes";
import CompareAB from "./screens/CompareAB";
import SPLAnalysis from "./screens/SPLAnalysis";
import AcousticAnalysis from "./screens/AcousticAnalysis";
import StageMap from "./screens/StageMap";
import AIAdvisor from "./screens/AIAdvisor";
import Settings from "./screens/Settings";

export type Screen =
  | "home"
  | "design"
  | "perform"
  | "foh-kiosk"
  | "scenes"
  | "compare"
  | "spl"
  | "acoustic"
  | "stage-map"
  | "ai-advisor"
  | "settings";

const NAV_MAIN = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "design", label: "Design", icon: DesignIcon },
  { id: "perform", label: "Perform", icon: PerformIcon },
];

const NAV_ANALYZE = [
  { id: "spl", label: "SPL Analysis", icon: SPLIcon },
  { id: "acoustic", label: "Acoustic Analysis", icon: AcousticIcon },
  { id: "stage-map", label: "3D Stage Map", icon: StageIcon },
  { id: "compare", label: "Compare A/B", icon: CompareIcon },
];

const NAV_WORKSPACE = [
  { id: "scenes", label: "Scenes", icon: ScenesIcon },
  { id: "ai-advisor", label: "AI Advisor", icon: AIIcon },
];

function SoundMapLogo() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M0 8 Q2.5 2 5 8 Q7.5 14 10 8 Q12.5 2 15 8 Q17.5 14 20 8" stroke="#C9F03E" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
function DesignIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="9" y="2" width="5" height="5" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="2" y="9" width="5" height="5" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="9" y="9" width="5" height="5" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
    </svg>
  );
}
function PerformIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <path d="M6 5.5l5 2.5-5 2.5V5.5z" fill={active ? "#C9F03E" : "#666"}/>
    </svg>
  );
}
function SPLIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="8" rx="5" ry="4" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <ellipse cx="8" cy="8" rx="2.5" ry="2" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
    </svg>
  );
}
function AcousticIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12 Q4 6 6 8 Q8 10 10 5 Q12 0 14 4" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <line x1="2" y1="13" x2="14" y2="13" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}
function StageIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 6v6H2V6L8 2z" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
      <path d="M2 6h12" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}
function CompareIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="5" height="10" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="9" y="3" width="5" height="10" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
    </svg>
  );
}
function ScenesIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="3" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="2" y="6.5" width="12" height="3" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="2" y="11" width="12" height="3" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
    </svg>
  );
}
function AIIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function SettingsIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function TemplatesIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="8" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="9" y="2" width="5" height="4" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <rect x="9" y="8" width="5" height="6" rx="1" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
    </svg>
  );
}
function ToolkitIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 13L7 8M7 8l2-5 4 4-5 2z" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
function CommunityIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <circle cx="11" cy="5" r="1.8" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2"/>
      <path d="M1 14c0-2.2 2-4 5-4s5 1.8 5 4" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M11 10c1.7.3 3 1.5 3 3" stroke={active ? "#C9F03E" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

const ANALYZE_SCREENS = new Set(["spl", "acoustic", "stage-map", "compare"]);

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [analyzeOpen, setAnalyzeOpen] = useState(false);

  const isAnalyze = ANALYZE_SCREENS.has(screen);

  function nav(s: Screen) {
    setScreen(s);
    if (ANALYZE_SCREENS.has(s)) setAnalyzeOpen(true);
  }

  const screenContent = {
    home: <Home onNavigate={nav} />,
    design: <Design />,
    perform: <Perform onFOHKiosk={() => nav("foh-kiosk")} />,
    "foh-kiosk": <FOHKiosk onBack={() => nav("perform")} />,
    scenes: <Scenes />,
    compare: <CompareAB />,
    spl: <SPLAnalysis />,
    acoustic: <AcousticAnalysis />,
    "stage-map": <StageMap />,
    "ai-advisor": <AIAdvisor />,
    settings: <Settings />,
  }[screen];

  return (
    <div style={{ display: "flex", height: "100%", background: "var(--bg)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{
        width: 200,
        minWidth: 200,
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SoundMapLogo />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color: "var(--text)" }}>SOUNDMAP</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em" }}>v6.0</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV_MAIN.map(({ id, label, icon: Icon }) => (
            <NavItem key={id} label={label} active={screen === id} onClick={() => nav(id as Screen)}>
              <Icon active={screen === id} />
            </NavItem>
          ))}

          {/* Analyze expandable */}
          <div style={{ marginTop: 4 }}>
            <button
              onClick={() => {
                setAnalyzeOpen(o => !o);
                if (!isAnalyze) nav("spl");
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 8px",
                borderRadius: "var(--radius-sm)",
                background: isAnalyze ? "var(--accent-dim2)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: isAnalyze ? "var(--accent)" : "var(--text-muted)",
                fontSize: 13,
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              <AcousticIcon active={isAnalyze} />
              <span style={{ flex: 1, textAlign: "left" }}>Analyze</span>
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: analyzeOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
            {analyzeOpen && (
              <div style={{ marginLeft: 8, marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV_ANALYZE.map(({ id, label, icon: Icon }) => (
                  <NavItem key={id} label={label} active={screen === id} onClick={() => nav(id as Screen)} small>
                    <Icon active={screen === id} />
                  </NavItem>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />

          {/* Workspace */}
          <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", padding: "2px 8px 6px", textTransform: "uppercase" }}>Workspace</div>
          {NAV_WORKSPACE.map(({ id, label, icon: Icon }) => (
            <NavItem key={id} label={label} active={screen === id} onClick={() => nav(id as Screen)}>
              <Icon active={screen === id} />
            </NavItem>
          ))}
          <NavItem label="Templates" active={false} onClick={() => {}}>
            <TemplatesIcon />
          </NavItem>
          <NavItem label="Toolkit" active={false} onClick={() => {}}>
            <ToolkitIcon />
          </NavItem>
          <NavItem label="Community" active={false} onClick={() => {}}>
            <CommunityIcon />
          </NavItem>
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 2 }}>
          <NavItem label="Settings" active={screen === "settings"} onClick={() => nav("settings")}>
            <SettingsIcon active={screen === "settings"} />
          </NavItem>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px 4px" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--text-secondary)", fontWeight: 600 }}>LA</div>
            <div>
              <div style={{ fontSize: 12, color: "var(--text)", fontWeight: 500 }}>LevelPro</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {screenContent}
      </main>
    </div>
  );
}

function NavItem({ label, active, onClick, children, small }: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: small ? "6px 8px" : "7px 8px",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--accent-dim2)" : "transparent",
        border: "none",
        cursor: "pointer",
        color: active ? "var(--accent)" : "var(--text-muted)",
        fontSize: small ? 12 : 13,
        fontFamily: "inherit",
        transition: "all 0.15s",
        textAlign: "left",
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
