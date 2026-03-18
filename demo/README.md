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
