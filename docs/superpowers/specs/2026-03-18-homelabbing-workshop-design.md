# Homelabbing Workshop Design Spec

## Overview

A 45-minute workshop presentation and hands-on activity introducing homelabbing and self-hosting to a web development club. The audience consists of complete beginners with no prior experience.

## Deliverables

### 1. Slides Website (`/slides`)

A React + Vite + Tailwind slideshow (based on the dispatch slides reference) with:
- Dark theme with accent colors
- Snap-scroll sections
- Framer-motion animations
- Navigation pill bar
- Mobile-responsive design

### 2. Demo Repository (`/demo`)

A cloneable demo that attendees use during the hands-on activity:
- README with step-by-step instructions
- Docker Compose file for Uptime Kuma
- Bonus content for next steps

## Presentation Structure (~25 min)

### Section 1: What & Why (5 min)
**Goal:** Hook the audience, explain the concept

Content:
- What is homelabbing/self-hosting?
- Why do it?
  - Privacy & data ownership
  - Cost savings (no subscriptions)
  - Learning & skill building
  - Full control & customization
- Who does this? (hobbyists, developers, privacy advocates)

### Section 2: How it Works (5 min)
**Goal:** Demystify the infrastructure

Content:
- Hardware options:
  - Old laptop/desktop (free!)
  - Raspberry Pi (~$50-100)
  - Mini PC (Intel NUC, etc.)
  - Cloud VPS (DigitalOcean, Hetzner)
- Basic networking concepts:
  - Ports and port forwarding
  - Local vs public access
  - Reverse proxies (Nginx, Caddy, Traefik)
  - Dynamic DNS & domains

### Section 3: Docker 101 (6 min)
**Goal:** Introduce the core technology they'll use

Content:
- What is Docker?
  - Containers vs VMs (visual comparison)
  - "Package your app with everything it needs"
- Key concepts:
  - Images (blueprints)
  - Containers (running instances)
  - Volumes (persistent data)
  - Networks (container communication)
- Docker Compose:
  - Define multi-container apps in YAML
  - Simple example walkthrough

### Section 4: Cool Services to Self-Host (6 min)
**Goal:** Inspire with possibilities

Categories and services:

| Category | Services | Description |
|----------|----------|-------------|
| Media Servers | Plex, Jellyfin, Navidrome | Stream your movies, TV shows, music |
| Dev Tools | Uptime Kuma, code-server, Gitea, Hoppscotch | Monitor sites, code anywhere, host git |
| Photos & Files | Immich, Nextcloud, Syncthing | Google Photos/Drive alternatives |
| Productivity | Outline, Bookstack, n8n | Docs, wikis, workflow automation |
| Smart Home | Home Assistant | Automate your entire home |

Highlight for each:
- Screenshot/demo of the UI
- Why it's useful
- Difficulty level

### Section 5: Getting Started (3 min)
**Goal:** Provide next steps and resources

Content:
- Communities: r/selfhosted, r/homelab
- Resources: awesome-selfhosted GitHub repo
- Start small, expand gradually
- Transition to hands-on activity

## Hands-on Activity (~20 min)

### Service Choice: Uptime Kuma

**Rationale:**
- Single container (simple docker-compose)
- No database configuration needed
- Beautiful, modern UI
- Immediately useful for monitoring their own projects
- Fast setup (<5 minutes)
- Web-based dashboard

### Activity Flow

1. **Prerequisites check (2 min)**
   - Verify Docker Desktop is installed and running
   - Clone the demo repo

2. **Docker basics demo (3 min)**
   - Show `docker --version`
   - Explain docker-compose.yml structure
   - Quick tour of Docker Desktop UI

3. **Launch Uptime Kuma (5 min)**
   - Run `docker compose up -d`
   - Open http://localhost:3001
   - Create admin account

4. **Add monitors (8 min)**
   - Add a monitor for google.com (demo)
   - Add a monitor for their own project/website
   - Explore notification options
   - Show status page feature

5. **Wrap up (2 min)**
   - Show how to stop/start containers
   - Point to bonus content
   - Q&A

### Demo Repository Structure

```
demo/
├── README.md              # Main instructions
│   ├── Prerequisites
│   ├── Quick Start
│   ├── Using Uptime Kuma
│   └── Stopping/Cleanup
├── docker-compose.yml     # Uptime Kuma config
└── NEXT-STEPS.md          # What to try next
    ├── More services to try
    ├── Setting up remotely
    └── Learning resources
```

### docker-compose.yml

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

## Slides Technical Implementation

### Tech Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

### Component Structure

```
slides/src/
├── components/
│   ├── Section.tsx        # Snap-scroll section wrapper
│   ├── NavBar.tsx         # Top navigation pill
│   ├── Card.tsx           # Content cards
│   └── ui/                # Reusable UI components
├── pages/
│   └── Index.tsx          # Main slideshow page
├── App.tsx
├── main.tsx
└── index.css              # Global styles + Tailwind
```

### Slide Sections (IDs for navigation)

1. `home` - Title slide with workshop name
2. `what-why` - What is homelabbing & why do it
3. `how-it-works` - Hardware & networking basics
4. `docker` - Docker 101
5. `services` - Cool services showcase (including Plex/Jellyfin)
6. `get-started` - Resources and next steps
7. `activity` - Hands-on activity instructions

### Design Tokens

```
Colors:
- Background: #0a0a0a (near black)
- Card background: #1a1a1a
- Primary accent: #22c55e (green)
- Secondary accent: #3b82f6 (blue)
- Destructive: #ef4444 (red)
- Muted text: #a1a1aa

Typography:
- Headings: Inter/system font, bold
- Body: Inter/system font, regular
```

## Success Criteria

1. Attendees understand what homelabbing is and why it's valuable
2. Attendees successfully run Uptime Kuma locally
3. Attendees add at least one monitor to track a website
4. Attendees know where to go to learn more
5. Slides are visually engaging and easy to follow

## Out of Scope

- Remote access setup (port forwarding, VPN, Cloudflare tunnels)
- Advanced Docker concepts (multi-stage builds, custom images)
- Kubernetes/orchestration
- Hardware purchasing recommendations
- Specific OS installation guides
