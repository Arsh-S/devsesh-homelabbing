# Homelabbing & Self-Hosting Workshop

A DTI DevSesh workshop introducing homelabbing and self-hosting.

**Live slides:** https://arsh-s.github.io/devsesh-homelabbing/

## Contents

- **`/slides`** - Interactive presentation (React + Vite), auto-deployed to GitHub Pages
- **`/demo`** - Hands-on AdGuard Home activity with Docker Compose + startup script

## Workshop Structure

**Presentation (~25 min)**
1. What & Why - What is homelabbing, privacy, saving money, building real skills
2. Hardware - Homelab tiers from old laptops to server racks, Mac Mini discussion
3. Networking - Ports, local access, reverse proxies, domains
4. Docker 101 - Images, containers, volumes, networks, Docker Compose
5. Services - Media (Jellyfin, Navidrome), gaming servers, Immich, dev tools (Supabase, GitLab, Uptime Kuma), Coolify, docs (Overleaf, Outline), AdGuard Home, AI (OpenClaw, Ollama), security (Vaultwarden, Authelia), and more
6. The *arr stack - Educational overview of media automation (Sonarr, Radarr)
7. Resources - awesome-selfhosted, r/selfhosted, r/homelab

**Hands-on Activity (~20 min)**
1. Clone this repo
2. Run `./start.sh` to launch AdGuard Home
3. Complete the setup wizard at `localhost:3000`
4. Point your Mac's DNS to `127.0.0.1`
5. Visit an ad-heavy site before and after to see the difference
6. Check the AdGuard dashboard at `localhost:80` to see blocked queries

## Quick Start

### Run the slides locally

```bash
cd slides
npm install
npm run dev
```

### Run the demo

```bash
cd demo
./start.sh
```

Or manually:

```bash
cd demo
docker compose up -d
```

Open http://localhost:3000 for setup, then http://localhost:80 for the dashboard.

## Deployment

Slides auto-deploy to GitHub Pages on every push to `master` via `.github/workflows/deploy.yml`.

## Requirements

- Node.js 18+ (for slides)
- Docker Desktop (for demo)

## License

MIT
