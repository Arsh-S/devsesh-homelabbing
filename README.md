# Homelabbing Workshop

A 45-minute workshop introducing homelabbing and self-hosting to web developers.

## Contents

- **`/slides`** - Interactive presentation (React + Vite)
- **`/demo`** - Hands-on activity with AdGuard Home

## Workshop Structure

**Presentation (~25 min)**
1. What & Why - Introduction to homelabbing
2. How it Works - Hardware and networking
3. Docker 101 - Container basics
4. Services - Showcase of self-hosted apps (Plex, Jellyfin, etc.)
5. Get Started - Resources and communities

**Hands-on Activity (~20 min)**
- Deploy AdGuard Home with Docker Compose
- Block ads across your entire network
- Configure DNS and explore the dashboard

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

Open http://localhost:3000

## Requirements

- Node.js 18+ (for slides)
- Docker Desktop (for demo)

## License

MIT
