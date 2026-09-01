# SOUNDMAP V6 — HIGH-FIDELITY PRODUCT MOCKUP

Create a complete high-fidelity UI/UX mockup for **SoundMap**, a professional sound-system design and acoustic analysis application.

The uploaded SoundMap project and existing HTML/mockup are the source of truth for the product's functionality and information architecture.

The attached visual reference is the source of truth for the new visual direction.

The goal is NOT to invent a new application.

The goal is to redesign the existing SoundMap experience at a premium product level.

---

# DESIGN PHILOSOPHY

SoundMap should feel like:

**A professional instrument for sound-system design.**

Visual characteristics:

Premium
Minimal
Elegant
Technical
Precise
Calm
Intelligent
Audio-centric

Think:

Apple-level clarity
+
professional audio software
+
modern creative tools
+
SoundMap identity

Do NOT copy Apple or any other product.

---

# FRAME SYSTEM

Create high-fidelity Figma frames for:

## DESKTOP

1440 × 1024

Create desktop versions for:

1. Home
2. Design — Room
3. Design — PA
4. Design — DSP
5. Design — Patch
6. Design — Save
7. Perform
8. FOH Kiosk
9. Scenes
10. Compare A/B
11. SPL Analysis
12. Acoustic Analysis
13. 3D Stage Map
14. AI Advisor
15. Settings

---

## MOBILE

390 × 844

Create mobile versions for the same product areas.

Mobile must be intentionally designed.

Do NOT simply scale desktop down.

---

## TABLET

768 × 1024

Create representative responsive frames demonstrating how:

* Home
* Design
* Perform
* Analyze

adapt to tablet.

---

# DESIGN SYSTEM

Use the SoundMap Design System.

Primary background:

#08090A

Secondary:

#0A0A0A

Surface:

#101010

Elevated:

#141414

Text:

#F5F5F5

Secondary:

#A0A0A0

Muted:

#666666

Borders:

rgba(255,255,255,0.06)

Accent:

#C9F03E

Use accent sparingly.

---

# TYPOGRAPHY

Use Geist.

Large technical values should be visually dominant.

Examples:

102.3 dB

87%

1.42 s

7.4 dB

125 Hz

Use Geist Mono for technical numbers where appropriate.

---

# HOME

Create a premium command center.

Show:

Teatro Gran Rex

System optimized

102 dB
MAX SPL

87%
COVERAGE

1.42 s
RT60

7.4 dB
HEADROOM

The main visual should be the acoustic environment.

Show:

room
speakers
audience
SPL coverage
speaker positions

The visualization should be large.

Do not put it inside a tiny dashboard card.

Primary CTA:

Continue design

Secondary:

Perform
Analyze

Below:

Recent scenes

Use elegant rows rather than generic card grids.

---

# DESIGN — ROOM

Headline:

Define the room.

Show:

3D/technical room visualization

Length
Width
Height

Acoustic materials

Audience configuration

The room visualization should be the hero.

---

# DESIGN — PA

Headline:

Configure the PA.

Show a clean technical visualization of:

TOP L
TOP R
SUB L
SUB R
MONITORS

Equipment should use compact professional rows.

Show:

brand
model
units
power
SPL

Do not create huge product cards.

---

# DESIGN — DSP

Create a professional signal-flow interface.

INPUT
↓
EQ
↓
DELAY
↓
CROSSOVER
↓
LIMITER
↓
OUTPUT

Show a beautiful EQ response graph.

Controls should feel like real professional audio hardware.

---

# DESIGN — PATCH

Create a professional channel list.

01 Kick In
02 Kick Out
03 Snare Top
04 Snare Bottom
05 Hi-Hat
06 Tom 1
07 Tom 2
08 OH L

Show signal status and routing.

Keep it extremely clean.

---

# PERFORM

Perform should immediately communicate:

**System ready for show.**

Main value:

102.3 dB

LIVE SPL

Secondary:

7.4 dB Headroom
105.1 dB Peak
98% System Health

Show frequency response.

Controls:

Mute
Presets
FOH Kiosk

---

# FOH KIOSK

Landscape-oriented professional control interface.

Large:

102.3 dB

LIVE SPL

7.4 dB
HEADROOM

105.1 dB
PEAK

98%
SYSTEM HEALTH

Large controls:

MUTE ALL

SYSTEM OK

FOH controls

No unnecessary navigation.

This should feel like professional FOH software.

---

# SCENES

Create a premium project library.

Scenes:

Teatro Gran Rex — Main PA
Concierto Exterior — Festival
Auditorio UNSAM — Conferencia
Iglesia Centro — Domingo
Teatro Colón — Ensayo

Show:

venue
date
SPL
system

Use elegant rows.

---

# COMPARE A/B

Two large system visualizations.

A

B

Show:

Max SPL
Average SPL
Uniformity
Coverage
Delta SPL

Make the difference heatmap the visual hero.

---

# SPL ANALYSIS

Make the heatmap extremely large.

Show:

102 dB
MAX SPL

94 dB
AVERAGE

87%
UNIFORMITY

98%
COVERAGE

Use a refined scientific heatmap.

Avoid excessive saturation.

---

# ACOUSTIC ANALYSIS

Main value:

1.42 s

RT60 MID

Show graph.

Tabs:

RT60
EDT
Clarity
Reflection

Show target range.

---

# 3D STAGE MAP

Create a large immersive technical 3D visualization.

Show:

stage
speakers
subwoofers
monitors
audience
room

Minimal floating controls.

Use:

2D
3D

top view

speaker labels

Do not make it look like a videogame.

It should feel like professional engineering software.

---

# AI ADVISOR

Title:

SoundMap Intelligence

Example recommendation:

Your sub/top crossover is creating an interaction around 100 Hz.

Recommended:

Move crossover to 110 Hz.

Actions:

Apply recommendation

View analysis

Additional suggestions:

Increase wall absorption

Optimize delay alignment

The AI must feel contextual to the current sound system.

---

# SETTINGS

Minimal settings list:

Profile
Audio Unit
Measurement
System Defaults
Notifications
Appearance
Language
Backup & Sync
About SoundMap

No dashboard cards.

---

# NAVIGATION

Desktop:

Minimal left sidebar.

Home
Design
Perform
Analyze

Divider

Scenes
Templates
Toolkit
Community

Bottom:

Settings
Account

Mobile:

Home
Design
+
Perform
Analyze

The center "+" is the main creation action.

---

# COMPONENT STYLE

Use:

subtle borders
minimal surfaces
controlled radius
large whitespace
precise typography

Avoid:

heavy shadows
excessive cards
glassmorphism
neon
huge gradients
decorative effects

---

# VISUALIZATION TECHNOLOGY

The mockup should visually anticipate real implementation using:

React
TypeScript
Tailwind CSS
CSS Variables
Geist
Lucide
Motion / Framer Motion
shadcn/ui

For visualization:

SVG
Canvas
WebGL

For 3D:

Three.js
React Three Fiber
Drei

For charts:

Recharts where appropriate.

The design must be realistic to implement using these technologies.

Do not design impossible UI elements that cannot reasonably be implemented.

---

# FIGMA ORGANIZATION

Organize the Figma file into:

01 — Cover
02 — Design Tokens
03 — Components
04 — Desktop
05 — Tablet
06 — Mobile
07 — Prototypes

Within Components:

Buttons
Inputs
Navigation
Metrics
Status
Cards
Lists
Charts
Audio
SPL
DSP
AI
3D

Use Auto Layout extensively.

Use Components and Variants.

Use Variables for:

colors
spacing
radius
typography

Use consistent naming.

---

# PROTOTYPE

Connect the main user journey:

Home
→ Continue design
→ Room
→ PA
→ DSP
→ Patch
→ Save
→ Perform
→ Analyze
→ Scenes
→ Compare

Create subtle transitions.

The prototype should communicate the intended product experience.

---

# FINAL QUALITY BAR

The final mockup should NOT look like:

a SaaS dashboard.

It should look like:

**a premium professional audio instrument.**

The visual hierarchy should communicate:

precision
confidence
intelligence
clarity
professionalism

The interface should have enough whitespace that every important element feels intentional.

The green accent should feel rare and valuable.

The acoustic visualizations should become part of SoundMap's identity.

The final reaction should be:

> “This looks like professional software.”

not:

> “This is a nice web dashboard.”

This is **SoundMap V6**.
