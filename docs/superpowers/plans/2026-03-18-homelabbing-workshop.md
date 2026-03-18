# Homelabbing Workshop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 45-minute homelabbing workshop with interactive slides and hands-on Docker activity.

**Architecture:** React slideshow in `/slides` with snap-scroll sections and animated cards. Demo repository in `/demo` with Docker Compose setup for Uptime Kuma. Both deliverables work independently.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Docker Compose

---

## File Structure

### Slides Website (`/slides`)
```
slides/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   └── images/              # Service screenshots
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Section.tsx
│   │   ├── NavBar.tsx
│   │   ├── Card.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── badge.tsx
│   └── pages/
│       └── Index.tsx
```

### Demo Repository (`/demo`)
```
demo/
├── README.md
├── docker-compose.yml
└── NEXT-STEPS.md
```

---

## Task 1: Initialize Slides Project

**Files:**
- Create: `slides/package.json`
- Create: `slides/vite.config.ts`
- Create: `slides/tsconfig.json`
- Create: `slides/tailwind.config.js`
- Create: `slides/postcss.config.js`
- Create: `slides/index.html`

- [ ] **Step 1: Create Vite + React + TypeScript project**

Run from project root:
```bash
cd /Users/arsh/Documents/DTI/devsesh-homelabbing
npm create vite@latest slides -- --template react-ts
cd slides
```

Expected: Project scaffolded successfully

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer @types/node
npm install framer-motion lucide-react clsx tailwind-merge
```

Expected: All packages installed

- [ ] **Step 3: Initialize Tailwind CSS**

```bash
npx tailwindcss init -p
```

Expected: `tailwind.config.js` and `postcss.config.js` created

- [ ] **Step 4: Configure Tailwind**

Update `slides/tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1a1a1a',
        primary: '#22c55e',
        secondary: '#3b82f6',
        destructive: '#ef4444',
        muted: '#a1a1aa',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Update vite.config.ts for path aliases**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 6: Update tsconfig.json for path aliases**

Add to `compilerOptions`:
```json
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 7: Commit initial setup**

```bash
git add slides/
git commit -m "chore: initialize slides project with Vite + React + TypeScript + Tailwind"
```

---

## Task 2: Base Styles and Layout

**Files:**
- Modify: `slides/src/index.css`
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Setup base styles**

Update `slides/src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Snap scroll */
.snap-y {
  scroll-snap-type: y mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
```

- [ ] **Step 2: Create minimal App.tsx**

```typescript
function App() {
  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-primary text-center py-20">
        Homelabbing Workshop
      </h1>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Test the app**

```bash
npm run dev
```

Expected: App runs at localhost:5173, shows "Homelabbing Workshop" in green

- [ ] **Step 4: Commit base styles**

```bash
git add slides/src/index.css slides/src/App.tsx
git commit -m "feat: add base styles and Tailwind setup"
```

---

## Task 3: Section Component

**Files:**
- Create: `slides/src/components/Section.tsx`

- [ ] **Step 1: Create Section component**

Create `slides/src/components/Section.tsx`:
```typescript
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen snap-start flex items-center justify-center px-6 py-12 ${className}`}
    >
      <div className="w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Test Section component**

Update `slides/src/App.tsx` to use Section:
```typescript
import { Section } from './components/Section'

function App() {
  return (
    <div className="h-screen overflow-y-scroll snap-y scrollbar-hide">
      <Section id="home">
        <h1 className="text-6xl font-bold text-primary text-center">
          Homelabbing Workshop
        </h1>
      </Section>
      <Section id="test">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Test Section
        </h1>
      </Section>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify snap scroll works**

Run `npm run dev` and scroll - sections should snap

Expected: Smooth snap scrolling between sections

- [ ] **Step 4: Commit Section component**

```bash
git add slides/src/components/Section.tsx slides/src/App.tsx
git commit -m "feat: add Section component with snap scroll"
```

---

## Task 4: Navigation Bar

**Files:**
- Create: `slides/src/components/NavBar.tsx`

- [ ] **Step 1: Create NavBar component**

Create `slides/src/components/NavBar.tsx`:
```typescript
import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavBarProps {
  items: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function NavBar({ items, activeSection, onNavigate }: NavBarProps) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 bg-card/80 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === item.id
                ? 'bg-primary text-black'
                : 'text-muted hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add scroll detection to App**

Update `slides/src/App.tsx`:
```typescript
import { useState, useEffect, useRef } from 'react'
import { Section } from './components/Section'
import { NavBar } from './components/NavBar'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'what-why', label: 'What & Why' },
  { id: 'how-it-works', label: 'How it Works' },
  { id: 'docker', label: 'Docker' },
  { id: 'services', label: 'Services' },
  { id: 'get-started', label: 'Get Started' },
  { id: 'activity', label: 'Activity' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const scrollMid = scrollTop + viewportHeight / 2;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollMid >= top && scrollMid < top + el.offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <NavBar
        items={NAV_ITEMS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y scrollbar-hide"
      >
        <Section id="home">
          <h1 className="text-6xl font-bold text-primary text-center">
            Homelabbing Workshop
          </h1>
        </Section>
        <Section id="what-why">
          <h2 className="text-4xl font-bold text-center">What & Why</h2>
        </Section>
        <Section id="how-it-works">
          <h2 className="text-4xl font-bold text-center">How it Works</h2>
        </Section>
        <Section id="docker">
          <h2 className="text-4xl font-bold text-center">Docker 101</h2>
        </Section>
        <Section id="services">
          <h2 className="text-4xl font-bold text-center">Cool Services</h2>
        </Section>
        <Section id="get-started">
          <h2 className="text-4xl font-bold text-center">Get Started</h2>
        </Section>
        <Section id="activity">
          <h2 className="text-4xl font-bold text-center">Hands-on Activity</h2>
        </Section>
      </div>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Test navigation**

Run `npm run dev` and test:
- Scroll to see active nav item change
- Click nav items to jump to sections

Expected: Navigation highlights active section and clicking navigates

- [ ] **Step 4: Commit NavBar**

```bash
git add slides/src/components/NavBar.tsx slides/src/App.tsx
git commit -m "feat: add navigation bar with active section tracking"
```

---

## Task 5: Card Component

**Files:**
- Create: `slides/src/components/Card.tsx`

- [ ] **Step 1: Create Card component**

Create `slides/src/components/Card.tsx`:
```typescript
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: false, amount: 0.3 }}
      className={`rounded-2xl border border-white/10 bg-card/90 backdrop-blur-md p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Test Card with animation**

Update the "what-why" section in `App.tsx`:
```typescript
<Section id="what-why">
  <div className="space-y-6">
    <h2 className="text-5xl font-bold text-center mb-8">What & Why</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <Card delay={0}>
        <h3 className="text-2xl font-bold text-primary mb-2">What is Homelabbing?</h3>
        <p className="text-muted">Self-hosting services on your own hardware</p>
      </Card>
      <Card delay={0.1}>
        <h3 className="text-2xl font-bold text-secondary mb-2">Why do it?</h3>
        <p className="text-muted">Privacy, learning, control, and cost savings</p>
      </Card>
    </div>
  </div>
</Section>
```

- [ ] **Step 3: Verify animations**

Run `npm run dev` and scroll to What & Why section

Expected: Cards animate in with stagger effect

- [ ] **Step 4: Commit Card component**

```bash
git add slides/src/components/Card.tsx slides/src/App.tsx
git commit -m "feat: add Card component with framer-motion animations"
```

---

## Task 6: Home Section Content

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create home section with title and subtitle**

Add motion import at the top of `App.tsx`:
```typescript
import { motion } from 'framer-motion'
```

Update home section in `App.tsx`:
```typescript
<Section id="home">
  <div className="text-center space-y-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-7xl md:text-8xl font-black tracking-tight text-white mb-4">
        Homelabbing
      </h1>
      <h2 className="text-4xl md:text-5xl font-bold text-primary">
        Self-Host Everything
      </h2>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="text-xl text-muted max-w-2xl mx-auto"
    >
      Take control of your data, learn new skills, and run your own services
    </motion.p>
  </div>
</Section>
```

- [ ] **Step 2: Test home animations**

Run `npm run dev`

Expected: Title and subtitle fade in with smooth animations

- [ ] **Step 3: Commit home section**

```bash
git add slides/src/App.tsx
git commit -m "feat: add home section with animated title"
```

---

## Task 7: What & Why Section Content

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Build out What & Why section**

Update what-why section:
```typescript
<Section id="what-why">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center"
    >
      What is <span className="text-primary">Homelabbing</span>?
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-6">
      <Card delay={0}>
        <h3 className="text-2xl font-bold text-primary mb-3">Privacy First</h3>
        <p className="text-muted leading-relaxed">
          Your data stays on your hardware. No tech giants tracking everything you do.
        </p>
      </Card>

      <Card delay={0.1}>
        <h3 className="text-2xl font-bold text-secondary mb-3">Save Money</h3>
        <p className="text-muted leading-relaxed">
          Stop paying monthly subscriptions. One-time hardware cost, unlimited services.
        </p>
      </Card>

      <Card delay={0.2}>
        <h3 className="text-2xl font-bold text-destructive mb-3">Learn & Grow</h3>
        <p className="text-muted leading-relaxed">
          Master Docker, networking, Linux, and infrastructure - real-world skills.
        </p>
      </Card>
    </div>

    <Card delay={0.3} className="border-primary/30">
      <p className="text-xl text-center">
        <span className="font-bold text-primary">Self-hosting</span> means running your own
        services (media servers, cloud storage, dev tools) on hardware you control.
      </p>
    </Card>
  </div>
</Section>
```

- [ ] **Step 2: Verify section layout**

Run `npm run dev` and navigate to What & Why

Expected: 3-column grid with staggered animations

- [ ] **Step 3: Commit What & Why content**

```bash
git add slides/src/App.tsx
git commit -m "feat: add What & Why section content"
```

---

## Task 8: How It Works Section

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create How It Works section**

Update how-it-works section:
```typescript
<Section id="how-it-works">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-12"
    >
      How Does it <span className="text-primary">Work</span>?
    </motion.h2>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card delay={0}>
        <h3 className="text-3xl font-bold text-primary mb-4">Hardware Options</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">💻</span>
            <div>
              <p className="font-semibold">Old Laptop/Desktop</p>
              <p className="text-sm text-muted">Free! Repurpose old hardware</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">🥧</span>
            <div>
              <p className="font-semibold">Raspberry Pi</p>
              <p className="text-sm text-muted">~$50-100, low power consumption</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">🖥️</span>
            <div>
              <p className="font-semibold">Mini PC (Intel NUC)</p>
              <p className="text-sm text-muted">More power, still compact</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">☁️</span>
            <div>
              <p className="font-semibold">Cloud VPS</p>
              <p className="text-sm text-muted">DigitalOcean, Hetzner, Linode</p>
            </div>
          </li>
        </ul>
      </Card>

      <Card delay={0.2}>
        <h3 className="text-3xl font-bold text-secondary mb-4">Networking Basics</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1">🔌</span>
            <div>
              <p className="font-semibold">Ports</p>
              <p className="text-sm text-muted">Different services use different ports (80, 443, 3000, etc.)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1">🏠</span>
            <div>
              <p className="font-semibold">Local vs Public Access</p>
              <p className="text-sm text-muted">Access from home network or expose to internet</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1">🔀</span>
            <div>
              <p className="font-semibold">Reverse Proxy</p>
              <p className="text-sm text-muted">Nginx, Caddy, Traefik route traffic to services</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1">🌐</span>
            <div>
              <p className="font-semibold">Dynamic DNS & Domains</p>
              <p className="text-sm text-muted">Access via custom domain name</p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Test How It Works section**

Run `npm run dev` and navigate to section

Expected: 2-column grid with hardware and networking info

- [ ] **Step 3: Commit How It Works content**

```bash
git add slides/src/App.tsx
git commit -m "feat: add How It Works section with hardware and networking"
```

---

## Task 9: Docker Section

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create Docker 101 section**

Update docker section:
```typescript
<Section id="docker">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-12"
    >
      <span className="text-primary">Docker</span> 101
    </motion.h2>

    <Card delay={0} className="border-primary/30">
      <h3 className="text-3xl font-bold text-primary mb-4">What is Docker?</h3>
      <p className="text-lg text-muted leading-relaxed">
        Docker packages your app with everything it needs (code, dependencies, config)
        into a <span className="text-white font-semibold">container</span> that runs
        the same everywhere.
      </p>
    </Card>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card delay={0.1}>
        <div className="text-4xl mb-3">📦</div>
        <h4 className="text-xl font-bold mb-2">Images</h4>
        <p className="text-sm text-muted">
          Blueprints for containers. Downloaded from Docker Hub.
        </p>
      </Card>

      <Card delay={0.2}>
        <div className="text-4xl mb-3">🏃</div>
        <h4 className="text-xl font-bold mb-2">Containers</h4>
        <p className="text-sm text-muted">
          Running instances of images. Isolated processes.
        </p>
      </Card>

      <Card delay={0.3}>
        <div className="text-4xl mb-3">💾</div>
        <h4 className="text-xl font-bold mb-2">Volumes</h4>
        <p className="text-sm text-muted">
          Persistent storage that survives container restarts.
        </p>
      </Card>

      <Card delay={0.4}>
        <div className="text-4xl mb-3">🔗</div>
        <h4 className="text-xl font-bold mb-2">Networks</h4>
        <p className="text-sm text-muted">
          How containers talk to each other and the outside world.
        </p>
      </Card>
    </div>

    <Card delay={0.5} className="border-secondary/30 bg-card">
      <h4 className="text-2xl font-bold text-secondary mb-3">Docker Compose</h4>
      <p className="text-muted mb-4">
        Define multi-container apps in a single YAML file. One command to start everything.
      </p>
      <pre className="bg-background rounded-lg p-4 text-sm overflow-x-auto">
        <code className="text-primary">{`version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html`}</code>
      </pre>
    </Card>
  </div>
</Section>
```

- [ ] **Step 2: Verify Docker section**

Run `npm run dev` and check section

Expected: Clean layout with 4 concept cards and compose example

- [ ] **Step 3: Commit Docker section**

```bash
git add slides/src/App.tsx
git commit -m "feat: add Docker 101 section with concepts and compose example"
```

---

## Task 10: Services Section

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create Services showcase section**

Update services section:
```typescript
<Section id="services">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-12"
    >
      Cool Services to <span className="text-primary">Self-Host</span>
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-8">
      <Card delay={0} className="border-purple-500/30">
        <h3 className="text-3xl font-bold text-purple-400 mb-4">📺 Media Servers</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">Plex / Jellyfin</p>
            <p className="text-sm text-muted">Stream your movies and TV shows anywhere</p>
            <p className="text-xs text-muted mt-1">⭐ Easy setup</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Navidrome</p>
            <p className="text-sm text-muted">Your own Spotify for music you own</p>
            <p className="text-xs text-muted mt-1">⭐ Easy setup</p>
          </div>
        </div>
      </Card>

      <Card delay={0.1} className="border-blue-500/30">
        <h3 className="text-3xl font-bold text-blue-400 mb-4">🛠️ Dev Tools</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">Uptime Kuma</p>
            <p className="text-sm text-muted">Monitor your websites and get alerts</p>
            <p className="text-xs text-muted mt-1">⭐ We'll use this today!</p>
          </div>
          <div>
            <p className="font-semibold text-lg">code-server</p>
            <p className="text-sm text-muted">VS Code in your browser, code from anywhere</p>
            <p className="text-xs text-muted mt-1">⭐⭐ Medium difficulty</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Gitea / Hoppscotch</p>
            <p className="text-sm text-muted">Self-hosted Git repos and API testing</p>
            <p className="text-xs text-muted mt-1">⭐ Easy setup</p>
          </div>
        </div>
      </Card>

      <Card delay={0.2} className="border-green-500/30">
        <h3 className="text-3xl font-bold text-green-400 mb-4">📸 Photos & Files</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">Immich</p>
            <p className="text-sm text-muted">Google Photos alternative with AI features</p>
            <p className="text-xs text-muted mt-1">⭐⭐ Medium difficulty</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Nextcloud</p>
            <p className="text-sm text-muted">Complete Google Drive replacement</p>
            <p className="text-xs text-muted mt-1">⭐⭐⭐ More complex</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Syncthing</p>
            <p className="text-sm text-muted">Sync files between devices, no cloud</p>
            <p className="text-xs text-muted mt-1">⭐ Easy setup</p>
          </div>
        </div>
      </Card>

      <Card delay={0.3} className="border-yellow-500/30">
        <h3 className="text-3xl font-bold text-yellow-400 mb-4">⚡ Productivity & More</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">Outline / Bookstack</p>
            <p className="text-sm text-muted">Team wikis and documentation</p>
            <p className="text-xs text-muted mt-1">⭐⭐ Medium difficulty</p>
          </div>
          <div>
            <p className="font-semibold text-lg">n8n</p>
            <p className="text-sm text-muted">Workflow automation like Zapier</p>
            <p className="text-xs text-muted mt-1">⭐⭐ Medium difficulty</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Home Assistant</p>
            <p className="text-sm text-muted">Automate your entire smart home</p>
            <p className="text-xs text-muted mt-1">⭐⭐⭐ Complex but powerful</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Test Services section**

Run `npm run dev` and navigate to Services

Expected: 4-card grid with categorized services

- [ ] **Step 3: Commit Services section**

```bash
git add slides/src/App.tsx
git commit -m "feat: add Services section with Plex, Jellyfin, and dev tools"
```

---

## Task 11: Get Started Section

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create Get Started section**

Update get-started section:
```typescript
<Section id="get-started">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-12"
    >
      Ready to <span className="text-primary">Get Started</span>?
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-8">
      <Card delay={0}>
        <h3 className="text-3xl font-bold text-primary mb-4">📚 Resources</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">→</span>
            <div>
              <p className="font-semibold">awesome-selfhosted</p>
              <p className="text-sm text-muted">GitHub repo with 1000+ services</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">→</span>
            <div>
              <p className="font-semibold">r/selfhosted</p>
              <p className="text-sm text-muted">Active Reddit community</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">→</span>
            <div>
              <p className="font-semibold">r/homelab</p>
              <p className="text-sm text-muted">Show off your setup</p>
            </div>
          </li>
        </ul>
      </Card>

      <Card delay={0.2}>
        <h3 className="text-3xl font-bold text-secondary mb-4">🎯 Start Small</h3>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="font-bold text-secondary">1.</span>
            <div>
              <p className="font-semibold">Install Docker Desktop</p>
              <p className="text-sm text-muted">Available for Mac, Windows, Linux</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-secondary">2.</span>
            <div>
              <p className="font-semibold">Try one service</p>
              <p className="text-sm text-muted">Start with something simple like Uptime Kuma</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-secondary">3.</span>
            <div>
              <p className="font-semibold">Expand gradually</p>
              <p className="text-sm text-muted">Add more services as you learn</p>
            </div>
          </li>
        </ol>
      </Card>
    </div>

    <Card delay={0.4} className="border-primary/50 text-center">
      <p className="text-2xl font-bold text-primary">
        Let's try it hands-on! →
      </p>
    </Card>
  </div>
</Section>
```

- [ ] **Step 2: Verify Get Started section**

Run `npm run dev` and check layout

Expected: Resources and start small in 2-column layout

- [ ] **Step 3: Commit Get Started section**

```bash
git add slides/src/App.tsx
git commit -m "feat: add Get Started section with resources and steps"
```

---

## Task 12: Activity Section

**Files:**
- Modify: `slides/src/App.tsx`

- [ ] **Step 1: Create hands-on activity section**

Update activity section:
```typescript
<Section id="activity">
  <div className="space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-12"
    >
      Hands-on <span className="text-primary">Activity</span>
    </motion.h2>

    <Card delay={0} className="border-primary/50">
      <h3 className="text-4xl font-bold text-primary mb-4 text-center">
        Deploy Uptime Kuma
      </h3>
      <p className="text-xl text-center text-muted">
        Monitor your websites in 5 minutes
      </p>
    </Card>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card delay={0.1}>
        <div className="text-4xl mb-3">1️⃣</div>
        <h4 className="text-xl font-bold mb-2">Clone the repo</h4>
        <pre className="bg-background rounded p-2 text-sm mt-3">
          <code className="text-primary">git clone &lt;repo-url&gt;</code>
        </pre>
        <p className="text-xs text-muted mt-2">Your instructor will provide the URL</p>
      </Card>

      <Card delay={0.2}>
        <div className="text-4xl mb-3">2️⃣</div>
        <h4 className="text-xl font-bold mb-2">Start the service</h4>
        <pre className="bg-background rounded p-2 text-sm mt-3">
          <code className="text-primary">docker compose up -d</code>
        </pre>
      </Card>

      <Card delay={0.3}>
        <div className="text-4xl mb-3">3️⃣</div>
        <h4 className="text-xl font-bold mb-2">Open in browser</h4>
        <pre className="bg-background rounded p-2 text-sm mt-3">
          <code className="text-primary">localhost:3001</code>
        </pre>
      </Card>

      <Card delay={0.4}>
        <div className="text-4xl mb-3">4️⃣</div>
        <h4 className="text-xl font-bold mb-2">Create account</h4>
        <p className="text-sm text-muted mt-2">Set up your admin username and password</p>
      </Card>

      <Card delay={0.5}>
        <div className="text-4xl mb-3">5️⃣</div>
        <h4 className="text-xl font-bold mb-2">Add monitors</h4>
        <p className="text-sm text-muted mt-2">Monitor your own websites and projects</p>
      </Card>

      <Card delay={0.6}>
        <div className="text-4xl mb-3">6️⃣</div>
        <h4 className="text-xl font-bold mb-2">Explore features</h4>
        <p className="text-sm text-muted mt-2">Status pages, notifications, and more</p>
      </Card>
    </div>

    <Card delay={0.7} className="border-secondary/50 bg-card text-center">
      <p className="text-xl text-muted">
        Full instructions in the <span className="text-primary font-semibold">demo/</span> folder
      </p>
    </Card>
  </div>
</Section>
```

- [ ] **Step 2: Test Activity section**

Run `npm run dev` and navigate to Activity

Expected: 6-step grid with clear instructions

- [ ] **Step 3: Commit Activity section**

```bash
git add slides/src/App.tsx
git commit -m "feat: add Activity section with step-by-step instructions"
```

---

## Task 13: Demo Repository - README

**Files:**
- Create: `demo/README.md`

- [ ] **Step 1: Create demo README**

Create `demo/README.md`:
```markdown
# Homelabbing Workshop - Uptime Kuma Demo

Monitor your websites and services with Uptime Kuma - a self-hosted monitoring tool.

## Prerequisites

- Docker Desktop installed and running
- Git installed
- A web browser

### Install Docker Desktop

**Mac:** https://docs.docker.com/desktop/install/mac-install/
**Windows:** https://docs.docker.com/desktop/install/windows-install/
**Linux:** https://docs.docker.com/desktop/install/linux-install/

Verify installation:
```bash
docker --version
docker compose version
```

## Quick Start

### 1. Clone this repository

```bash
# Your instructor will provide the repository URL
git clone <repository-url>
cd devsesh-homelabbing/demo
```

### 2. Start Uptime Kuma

```bash
docker compose up -d
```

This will:
- Download the Uptime Kuma Docker image
- Create a persistent volume for your data
- Start the container in detached mode
- Make it available at http://localhost:3001

### 3. Open in your browser

Navigate to: **http://localhost:3001**

### 4. Create your admin account

On first visit, you'll be prompted to create an admin account:
- Choose a username
- Set a strong password
- Click "Create"

## Using Uptime Kuma

### Add Your First Monitor

1. Click the **"Add New Monitor"** button
2. Monitor Type: Select "HTTP(s)"
3. Friendly Name: `Google`
4. URL: `https://google.com`
5. Heartbeat Interval: `60` seconds
6. Click **"Save"**

Watch as Uptime Kuma checks the site every minute!

### Monitor Your Own Projects

Add monitors for:
- Your personal website
- Your GitHub Pages site
- Any project you've deployed
- APIs you've built

### Explore Features

- **Status Pages**: Create public status pages
- **Notifications**: Get alerts via Discord, Slack, email, etc.
- **Tags**: Organize monitors with tags
- **Maintenance**: Schedule maintenance windows

## Stopping and Restarting

### Stop Uptime Kuma

```bash
docker compose down
```

This stops and removes the container but **keeps your data**.

### Start it again

```bash
docker compose up -d
```

Your monitors and settings will still be there!

### View logs

```bash
docker compose logs -f
```

Press `Ctrl+C` to exit logs.

## Cleanup

To remove everything including data:

```bash
docker compose down -v
```

⚠️ This deletes all your monitors and settings!

## What's Next?

Check out [NEXT-STEPS.md](./NEXT-STEPS.md) for more services to try!

## Troubleshooting

### Port already in use

If you see `port is already allocated`:

```bash
# Find what's using port 3001
lsof -i :3001

# Or use a different port by editing docker-compose.yml
# Change "3001:3001" to "3002:3001"
```

### Container won't start

```bash
# Check Docker is running
docker ps

# View detailed logs
docker compose logs

# Restart Docker Desktop and try again
```

### Can't access localhost:3001

- Make sure Docker Desktop is running
- Check the container is up: `docker compose ps`
- Try `http://127.0.0.1:3001` instead

## Resources

- [Uptime Kuma Documentation](https://github.com/louislam/uptime-kuma/wiki)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [r/selfhosted](https://reddit.com/r/selfhosted)
```

- [ ] **Step 2: Commit demo README**

```bash
git add demo/README.md
git commit -m "docs: add comprehensive demo README for Uptime Kuma"
```

---

## Task 14: Demo Repository - Docker Compose

**Files:**
- Create: `demo/docker-compose.yml`

- [ ] **Step 1: Create docker-compose.yml**

Create `demo/docker-compose.yml`:
```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    volumes:
      - uptime-kuma-data:/app/data
    ports:
      - "3001:3001"
    restart: unless-stopped

volumes:
  uptime-kuma-data:
```

- [ ] **Step 2: Test the compose file**

```bash
cd /Users/arsh/Documents/DTI/devsesh-homelabbing/demo
docker compose config
```

Expected: YAML validation passes, no errors

- [ ] **Step 3: Commit docker-compose.yml**

```bash
git add demo/docker-compose.yml
git commit -m "feat: add docker-compose.yml for Uptime Kuma"
```

---

## Task 15: Demo Repository - Next Steps

**Files:**
- Create: `demo/NEXT-STEPS.md`

- [ ] **Step 1: Create NEXT-STEPS guide**

Create `demo/NEXT-STEPS.md`:
```markdown
# Next Steps - Expand Your Homelab

You've successfully deployed Uptime Kuma! Here's what to try next.

## More Services to Self-Host

### Media Servers

**Jellyfin** - Free alternative to Plex
```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    volumes:
      - ./config:/config
      - ./media:/media
    ports:
      - "8096:8096"
    restart: unless-stopped
```

Access at: http://localhost:8096

**Navidrome** - Music streaming server
```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    volumes:
      - ./data:/data
      - ./music:/music:ro
    ports:
      - "4533:4533"
    environment:
      ND_LOGLEVEL: info
    restart: unless-stopped
```

### Dev Tools

**code-server** - VS Code in the browser
```yaml
services:
  code-server:
    image: codercom/code-server:latest
    container_name: code-server
    volumes:
      - ./config:/home/coder/.config
      - ./project:/home/coder/project
    ports:
      - "8080:8080"
    environment:
      - PASSWORD=yourpassword
    restart: unless-stopped
```

**Gitea** - Self-hosted Git service
```yaml
services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    volumes:
      - ./data:/data
    ports:
      - "3000:3000"
      - "222:22"
    restart: unless-stopped
```

### Photos & Files

**Immich** - Google Photos alternative (requires multiple containers)
```yaml
# See: https://immich.app/docs/install/docker-compose
```

**Syncthing** - File synchronization
```yaml
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    volumes:
      - ./config:/var/syncthing/config
      - ./data:/var/syncthing/data
    ports:
      - "8384:8384"
      - "22000:22000"
      - "21027:21027/udp"
    restart: unless-stopped
```

## Setting Up Remote Access

### Option 1: Cloudflare Tunnel (Recommended)

Free, secure, no port forwarding needed.

```bash
# Install cloudflared
# Follow: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Create tunnel
cloudflared tunnel create homelab

# Route traffic
cloudflared tunnel route dns homelab uptime.yourdomain.com
```

### Option 2: Tailscale (VPN)

Access your homelab from anywhere securely.

```bash
# Install Tailscale: https://tailscale.com/download

# Start it
sudo tailscale up

# Access services via Tailscale IP
```

### Option 3: Port Forwarding

Only if you understand the security implications!

1. Set static IP for your server
2. Forward ports on your router
3. Use dynamic DNS (duckdns.org, noip.com)
4. Enable HTTPS with Let's Encrypt

## Organizing Multiple Services

### Use Nginx Proxy Manager

```yaml
services:
  nginx-proxy-manager:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx-proxy-manager
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    restart: unless-stopped
```

Access at: http://localhost:81
Default: `admin@example.com` / `changeme`

### Or use Traefik

Auto-configure reverse proxy with Docker labels.

## Learning Resources

### Communities
- [r/selfhosted](https://reddit.com/r/selfhosted) - Active community
- [r/homelab](https://reddit.com/r/homelab) - Hardware discussions
- [Selfhosted Discord](https://discord.gg/selfhosted)

### Lists & Guides
- [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) - 1000+ services
- [perfect-media-server](https://perfectmediaserver.com/) - Media server guide
- [Docker Homelab](https://github.com/christianlempa/videos/tree/main/docker-homelab)

### YouTube Channels
- TechnoTim
- Awesome Open Source
- Christian Lempa
- NetworkChuck

## Best Practices

### Backups
```bash
# Backup volumes
docker run --rm -v uptime-kuma-data:/data -v $(pwd):/backup ubuntu tar czf /backup/backup.tar.gz /data

# Restore
docker run --rm -v uptime-kuma-data:/data -v $(pwd):/backup ubuntu tar xzf /backup/backup.tar.gz -C /
```

### Security
- Use strong passwords
- Keep services updated: `docker compose pull && docker compose up -d`
- Use a reverse proxy with HTTPS
- Don't expose databases to the internet
- Enable 2FA where available

### Monitoring
- Use Uptime Kuma to monitor all your services!
- Set up notifications
- Create a status page

## Common Multi-Service Setup

Create a `docker-compose.yml` with multiple services:

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    volumes:
      - uptime-kuma-data:/app/data
    ports:
      - "3001:3001"
    restart: unless-stopped

  jellyfin:
    image: jellyfin/jellyfin
    volumes:
      - jellyfin-config:/config
      - ./media:/media
    ports:
      - "8096:8096"
    restart: unless-stopped

  code-server:
    image: codercom/code-server:latest
    volumes:
      - code-server-config:/home/coder/.config
      - ./projects:/home/coder/project
    ports:
      - "8080:8080"
    environment:
      - PASSWORD=changeme
    restart: unless-stopped

volumes:
  uptime-kuma-data:
  jellyfin-config:
  code-server-config:
```

Start everything: `docker compose up -d`

## Have Fun!

The homelabbing community is welcoming and helpful. Don't be afraid to:
- Ask questions
- Share your setup
- Experiment and break things (backups!)
- Start small and grow

Happy self-hosting! 🚀
```

- [ ] **Step 2: Commit NEXT-STEPS guide**

```bash
git add demo/NEXT-STEPS.md
git commit -m "docs: add NEXT-STEPS guide with more services and resources"
```

---

## Task 16: Final Testing and Polish

**Files:**
- Modify: `slides/README.md` (create)
- Modify: Root `README.md` (update)

- [ ] **Step 1: Create slides README**

Create `slides/README.md`:
```markdown
# Homelabbing Workshop Slides

Interactive presentation built with React, Vite, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Structure

- 7 sections with snap-scroll navigation
- Framer Motion animations
- Mobile-responsive design
- Dark theme with green/blue accents

## Sections

1. **Home** - Title and introduction
2. **What & Why** - What is homelabbing and why do it
3. **How it Works** - Hardware and networking basics
4. **Docker 101** - Container fundamentals
5. **Services** - Cool self-hosted services showcase
6. **Get Started** - Resources and next steps
7. **Activity** - Hands-on workshop instructions
```

- [ ] **Step 2: Update root README**

Update `/Users/arsh/Documents/DTI/devsesh-homelabbing/README.md`:
```markdown
# Homelabbing Workshop

A 45-minute workshop introducing homelabbing and self-hosting to web developers.

## Contents

- **`/slides`** - Interactive presentation (React + Vite)
- **`/demo`** - Hands-on activity with Uptime Kuma

## Workshop Structure

**Presentation (~25 min)**
1. What & Why - Introduction to homelabbing
2. How it Works - Hardware and networking
3. Docker 101 - Container basics
4. Services - Showcase of self-hosted apps (Plex, Jellyfin, etc.)
5. Get Started - Resources and communities

**Hands-on Activity (~20 min)**
- Deploy Uptime Kuma with Docker Compose
- Monitor websites and services
- Explore notifications and status pages

## Quick Start

### Run the slides

```bash
cd slides
npm install
npm run dev
```

### Try the demo

```bash
cd demo
docker compose up -d
```

Open http://localhost:3001

## Requirements

- Node.js 18+ (for slides)
- Docker Desktop (for demo)

## License

MIT
```

- [ ] **Step 3: Test complete workflow**

**Test slides:**
```bash
cd /Users/arsh/Documents/DTI/devsesh-homelabbing/slides
npm run dev
```

Visit http://localhost:5173 and verify:
- ✓ All 7 sections load without errors
- ✓ Navigation bar displays at top
- ✓ Active section highlights in nav bar when scrolling
- ✓ Clicking nav items navigates to correct section
- ✓ Cards animate when scrolling into view
- ✓ All content is readable and properly styled
- ✓ No console errors in browser dev tools

**Test demo:**
```bash
cd /Users/arsh/Documents/DTI/devsesh-homelabbing/demo
docker compose up -d
```

Visit http://localhost:3001 and verify:
- ✓ Uptime Kuma loads successfully
- ✓ Setup wizard appears for first-time users
- ✓ Can create admin account
- ✓ Dashboard loads after account creation

**Cleanup:**
```bash
docker compose down
```

Expected: Both deliverables work independently with no errors

- [ ] **Step 4: Commit README files**

```bash
git add slides/README.md README.md
git commit -m "docs: add README files for slides and root"
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete homelabbing workshop with slides and demo

- Interactive React slideshow with 7 sections
- Uptime Kuma Docker demo with comprehensive docs
- Ready for 45-minute presentation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Execution Complete

All tasks completed! The workshop is ready with:

✅ **Slides** - 7 interactive sections with animations
✅ **Demo** - Docker setup with detailed instructions
✅ **Documentation** - README and next steps guide

To present:
1. Run slides: `cd slides && npm run dev`
2. Have demo ready: `cd demo && docker compose up -d`
3. Share repo link for attendees to clone
