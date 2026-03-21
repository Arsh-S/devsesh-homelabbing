# Homelabbing Workshop - AdGuard Home Demo

Block ads across your entire network with AdGuard Home - a network-wide DNS ad blocker you run on your own hardware.

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
git clone https://github.com/Arsh-S/devsesh-homelabbing
cd devsesh-homelabbing/demo
```

### 2. Run the start script

```bash
./start.sh
```

Or start manually:

```bash
docker compose up -d
```

### 3. Run the setup wizard

Open **http://localhost:3000** in your browser.

- Click "Get Started"
- Set the **Admin Web Interface** to port `80`, listen on `0.0.0.0`
- Set the **DNS Server** to port `53`, listen on `0.0.0.0`
- Create your admin username and password
- Click through to finish setup

### 4. Open the dashboard

After setup, the dashboard is at: **http://localhost:80**

## Point Your DNS to AdGuard Home

This is where the magic happens - route your Mac's DNS through AdGuard Home to block ads on every app and website.

### macOS

1. Open **System Settings**
2. Go to **Network** > **Wi-Fi** (or your active connection)
3. Click **Details...**
4. Go to the **DNS** tab
5. Remove existing DNS servers (note them down first!)
6. Add **`127.0.0.1`**
7. Click **OK**

### Verify it's working

1. Open a site with ads (e.g. a recipe blog, news site)
2. Check the AdGuard Home dashboard - you should see queries being blocked
3. Compare with your phone (not using AdGuard) to see the difference

### Revert DNS

When you're done, go back to DNS settings and either:
- Remove `127.0.0.1` and re-add your original DNS servers, or
- Switch to "Automatic" DNS

## Using AdGuard Home

### Dashboard

The dashboard shows:
- Total DNS queries
- Queries blocked (and percentage)
- Top blocked domains
- Top clients

### Add Custom Block Lists

1. Go to **Filters** > **DNS blocklists**
2. Click **Add blocklist** > **Choose from list**
3. Recommended lists:
   - **AdGuard DNS filter** (enabled by default)
   - **OISD** - one of the most comprehensive lists
   - **Steven Black's Unified Hosts**

### Allow a Blocked Site

If AdGuard blocks something you need:
1. Go to **Query Log**
2. Find the blocked domain
3. Click **Unblock**

Or go to **Filters** > **Custom filtering rules** and add:
```
@@||example.com^
```

## Stopping and Restarting

### Stop AdGuard Home

```bash
docker compose down
```

**Important:** Remember to revert your DNS settings first, or you'll lose internet access!

### Start it again

```bash
docker compose up -d
```

Your settings and block lists will still be there.

### View logs

```bash
docker compose logs -f
```

Press `Ctrl+C` to exit logs.

## Cleanup

To remove everything including config:

```bash
docker compose down
rm -rf adguard/
```

Remember to revert your DNS settings!

## Troubleshooting

### Port 53 already in use (macOS)

macOS runs a built-in DNS resolver on port 53. To temporarily disable it:

```bash
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist
```

To re-enable it later:

```bash
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist
```

### Port 80 already in use

Edit `docker-compose.yml` and change `"80:80"` to `"8080:80"`, then access the dashboard at http://localhost:8080 instead.

### No internet after starting

Your DNS might be pointed at AdGuard but it's not running. Either:
- Start AdGuard Home: `docker compose up -d`
- Or revert your DNS settings (see "Revert DNS" above)

### Container won't start

```bash
# Check Docker is running
docker ps

# View detailed logs
docker compose logs

# Restart Docker Desktop and try again
```

## What's Next?

Check out [NEXT-STEPS.md](./NEXT-STEPS.md) for more services to try!

## Resources

- [AdGuard Home Wiki](https://github.com/AdguardTeam/AdGuardHome/wiki)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [r/selfhosted](https://reddit.com/r/selfhosted)
- [r/Adguard](https://reddit.com/r/Adguard)
