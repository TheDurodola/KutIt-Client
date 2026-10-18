# KutIt // 8-Bit Retro Terminal URL Condenser

> **KutIt** is a high-speed URL shortener client wrapped in an authentic **8-Bit Retro Terminal** aesthetic. Inspired by 1980s computing, green phosphor CRT monitors, and arcade hardware constraints, KutIt transforms cumbersome web addresses into compact, high-efficiency route sequences for modern cyberspace operators.

---

## System Architecture & Single Responsibility Principle (SRP)

The codebase strictly adheres to the **Single Responsibility Principle (SRP)**. Every module, service, custom hook, and UI component has a single, well-defined reason to change:

```
src/
├── config/                  # Environment resolution & configuration
│   └── env.js               # Handles API URLs & short code link helpers
├── services/                # Network & API communication tier
│   ├── apiClient.js         # Base HTTP client, headers, & response normalization
│   ├── authService.js       # Authentication endpoints (login, register, logout)
│   └── urlService.js        # URL shortening & telemetry management endpoints
├── hooks/                   # Reusable business logic & state lifecycles
│   ├── useToast.js          # Notification message, variant, & timer lifecycle
│   ├── useClipboard.js      # System clipboard interactions & timed active feedback
│   └── useUserUrls.js       # User links data fetching, loading states, & mutations
├── components/
│   ├── common/              # Primitive presentational building blocks
│   │   ├── Button/          # Retro arcade button variants (primary, ghost, danger)
│   │   ├── Card/            # URL telemetry card with metrics & modal trigger
│   │   ├── Modal/           # Accessible dialog overlay with ESC keyboard listener
│   │   ├── Toast/           # Notification banner matching z-index contract
│   │   └── TerminalFrame/   # Retro window frame with traffic dots & title bar
│   └── layout/              # Structural application shells
│       ├── Navbar/          # Public navigation header & arcade status ticker
│       └── Sidebar/         # Authenticated command drawer & navigation menu
├── pages/                   # Pure view coordinators
│   ├── LandingPage/         # Public URL compression form & asymmetric feature grid
│   ├── LoginPage/           # Security authentication console
│   ├── SignUpPage/          # Operator enlistment & profile creation
│   ├── DashboardPage/       # Operator command center & route matrix
│   ├── ProfilePage/         # Operator identity clearance & CRT preferences
│   ├── ErrorPage/           # 404 Kernel exception & sector fault screen
│   ├── UnauthorizedPage/    # 401 Mainframe lockdown & credential challenge
│   └── RedirectPage/        # Shortcode packet resolution & fast route dispatch
├── App.jsx                  # Declarative client-side routing table
├── index.css                # Global design system tokens, reset, & CRT scanlines
└── main.jsx                 # Application entry point
```

---

## 8-Bit Retro Terminal Design System

The user interface implements an authentic 80s arcade and computing theme:

- **Color Palette:**
  - `Background`: `#050505` (Off-black primary surface; zero pure `#000000`)
  - `Text`: `#2CFF56` (Vibrant green phosphor with subtle CRT glow)
  - `Accent / CTA`: `#FFB200` (Tactile amber button fills and active indicators)
  - `Coin Yellow`: `#FFD700` (Warning states, telemetry hit counters, attention badges)
  - `Heart Red`: `#FF0000` (Errors, kernel exceptions, destructive purge actions)
  - `Surface Panels`: `#0b120c` / `#0e170f` (Phosphor tinted charcoal matrices)
- **Typography:**
  - **Headings & Display:** `Press Start 2P`
  - **Code, Metadata & Telemetry:** `JetBrains Mono`
- **Atmospheric Effects:**
  - Hardware scanlines overlay and vignette border shadow.
  - Zero layout-triggering animations; optimized for 60fps GPU acceleration.
- **Strict UI Rules:**
  - No emojis in UI (strict icon system via `lucide-react`).
  - No `h-screen` (fluid `min-h-[100dvh]` used everywhere).
  - Responsive multi-column collapse below `768px`.
  - Asymmetric feature compositions (no 3-column equal-width generic layouts).

---

## Features

1. **Instant Public Compression:** Condense any valid URL with a single keystroke. Automatic clipboard transfer pipeline with instant feedback.
2. **Operator Command Center:** Authenticated operators unlock persistent storage of created routes, total hit counters, and granular route management.
3. **Route Inspector Modal:** Detailed link telemetry including creation timestamps, destination breakdown, hit count, and route purge capabilities.
4. **Operator Identity & Terminal Console:** Operator profile console with cryptographic clearance specs and CRT display preference controls.
5. **Fail-Safe Glitch Screens:** Custom 404 Kernel Exception and 401 Security Lockdown terminal screens with hex dumps and arcade continue countdowns.
6. **Adaptive Mobile Drawer:** Responsive terminal navigation sidebar that transforms into an accessible slide-out drawer on smaller screens.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/bolaji/KutIt-Client.git
cd KutIt-Client
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
VITE_BASE_URL_FOR_BACKEND=http://localhost:5000
VITE_BASE_URL_FOR_FRONTEND=http://localhost:5173
```

### Available Scripts

- **`npm run dev`**: Starts the Vite development server with HMR.
- **`npm run build`**: Compiles and bundles production-ready assets into `dist/`.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs ESLint to verify code quality and React best practices.

---

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Tooling & Bundler:** [Vite](https://vite.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** CSS Modules with CSS Custom Properties
- **Fonts:** [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
