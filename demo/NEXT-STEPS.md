# Next Steps - Expand Your Homelab

You've successfully deployed AdGuard Home! Here's what to try next.

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
- Use AdGuard Home to monitor DNS queries across your network
- Set up Uptime Kuma alongside it to monitor all your services
- Create status pages and notification alerts

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
