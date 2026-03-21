import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { EtherealShadow } from './components/ui/ethereal-shadow'
import { CopyableCode, CopyableLink } from './components/ui/copy-button'
import { ChevronDown } from 'lucide-react'

const PRESENTATION_URL = 'https://arsh-s.github.io/devsesh-homelabbing/';
const BASE = import.meta.env.BASE_URL;
const img = (path: string) => `${BASE}${path}`.replace(/\/\//g, '/');

const NAV_GROUPS = [
  { id: 'home', label: 'Home', slides: ['home'] },
  { id: 'why', label: 'Why', slides: ['what-is-it', 'why-privacy', 'why-money', 'why-learn'] },
  { id: 'hardware', label: 'Hardware', slides: ['hardware-intro', 'hardware-mac', 'hardware-tiers'] },
  { id: 'networking', label: 'Network', slides: ['networking'] },
  { id: 'docker', label: 'Docker', slides: ['docker-intro', 'docker-concepts', 'docker-compose'] },
  { id: 'services', label: 'Services', slides: ['services-media', 'services-piracy', 'services-gaming', 'services-photos', 'services-dev', 'services-deploy', 'services-productivity', 'services-network', 'services-tailscale', 'services-ai', 'services-security', 'services-more'] },
  { id: 'resources', label: 'Resources', slides: ['resources'] },
  { id: 'activity', label: 'Activity', slides: ['activity', 'activity-steps'] },
];

const ALL_SLIDES = NAV_GROUPS.flatMap(g => g.slides);

function Slide({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="h-screen w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-16 relative z-10"
    >
      <div className="max-w-6xl w-full">
        {children}
      </div>
    </section>
  );
}

function SectionCard({
  children,
  className = '',
  accentColor = 'border-border/50'
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div className={`glass-card-hover p-8 ${accentColor} ${className}`}>
      {children}
    </div>
  );
}

function App() {
  const [activeGroup, setActiveGroup] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const scrollMid = scrollTop + viewportHeight / 2;

      for (const slide of ALL_SLIDES) {
        const el = document.getElementById(slide);
        if (el) {
          const top = el.offsetTop;
          if (scrollMid >= top && scrollMid < top + el.offsetHeight) {
            const group = NAV_GROUPS.find(g => g.slides.includes(slide));
            if (group) setActiveGroup(group.id);
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
    <EtherealShadow
      color="rgba(34, 197, 94, 0.9)"
      animation={{ scale: 100, speed: 95 }}
      noise={{ opacity: 0.2, scale: 1 }}
      sizing="fill"
      className="min-h-screen"
    >
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-1 px-2 py-1.5 bg-card/70 backdrop-blur-xl rounded-full border border-border/40">
          {NAV_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => scrollToSection(group.slides[0])}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                activeGroup === group.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-white/5'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Slides Container */}
      <div
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-scroll snap-y scrollbar-hide"
      >
        {/* SLIDE 1: Title */}
        <Slide id="home">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-primary font-semibold mb-3 tracking-[0.2em] uppercase">
              DTI DevSesh
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-5 whitespace-nowrap">
              <span className="text-primary">Homelabbing</span> & <span className="text-secondary">Self-Hosting</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-12">
              Presented by <span className="text-foreground font-semibold">Arsh</span> and <span className="text-foreground font-semibold">Ben</span>
            </p>

            {/* Follow along instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-8 max-w-lg mx-auto"
            >
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-white p-4 rounded-2xl">
                    <QRCodeSVG value={PRESENTATION_URL} size={180} />
                  </div>
                  <p className="text-xl text-foreground font-medium">Slides</p>
                  <CopyableLink url={PRESENTATION_URL} label="Copy link" />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-white p-4 rounded-2xl">
                    <QRCodeSVG value="https://github.com/Arsh-S/devsesh-homelabbing" size={180} />
                  </div>
                  <p className="text-xl text-foreground font-medium">GitHub Repo</p>
                  <CopyableLink url="https://github.com/Arsh-S/devsesh-homelabbing" label="Copy link" />
                </div>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-muted/50" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Slide>

        {/* SLIDE 2: What is it? */}
        <Slide id="what-is-it">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              What is <span className="text-primary">Homelabbing</span>?
            </h2>
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-normal">
              Running your own servers and services on hardware
              <span className="text-foreground font-medium"> you control</span>
            </p>
            <div className="text-5xl md:text-6xl pt-4 opacity-90">
              🏠 + 🖥️ = ✨
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 3: Why - Privacy */}
        <Slide id="why-privacy">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">🔒</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Your Data, <span className="text-primary">Your Rules</span>
            </h2>
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-normal">
              No more Big Tech tracking your photos, messages, and files
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 4: Why - Save Money */}
        <Slide id="why-money">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">💰</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-primary">Stop</span> Paying Subscriptions
            </h2>
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-normal">
              One-time hardware cost, unlimited services forever
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 5: Why - Learn Skills */}
        <Slide id="why-learn">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🚀</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Build <span className="text-primary">Real Skills</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Docker', 'Linux', 'Networking', 'DevOps'].map((skill) => (
                <span key={skill} className="badge text-2xl md:text-3xl">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 6: Hardware Intro */}
        <Slide id="hardware-intro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              What <span className="text-primary">Hardware</span> Do I Need?
            </h2>
            <p className="text-3xl md:text-4xl text-muted font-normal">
              Spoiler: You probably already have something
            </p>
            <div className="glass-card overflow-hidden p-0 max-w-3xl mx-auto">
              <img src={img("images/homelab-rack.jpg")} alt="Homelab setup" className="w-full h-56 object-cover opacity-80" />
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 7: Mac Mini Joke */}
        <Slide id="hardware-mac">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">🍎</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              You do <span className="text-destructive">NOT</span> need a Mac Mini
            </h2>
            <p className="text-3xl md:text-4xl text-muted font-normal">
              ...but it <span className="text-foreground italic">is</span> a pretty good option
            </p>
            <p className="text-2xl text-primary/80">
              (ARM is efficient & macOS runs Docker great)
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 8: Homelab Tiers */}
        <Slide id="hardware-tiers">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
              Homelabs Come in <span className="text-primary">All Sizes</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <SectionCard className="overflow-hidden p-0 text-center">
                <img src={img("images/homelab-laptop.jpg")} alt="Laptop server" className="w-full h-36 object-cover" />
                <div className="p-4">
                  <p className="text-xl font-bold text-muted">Beginner</p>
                  <p className="text-2xl font-bold text-foreground">Old Laptop</p>
                  <p className="text-lg text-primary mt-1">Free</p>
                </div>
              </SectionCard>
              <SectionCard className="overflow-hidden p-0 text-center">
                <img src={img("images/homelab-pi.jpg")} alt="Raspberry Pi" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                  <p className="text-xl font-bold text-muted">Hobbyist</p>
                  <p className="text-2xl font-bold text-foreground">Raspberry Pi</p>
                  <p className="text-lg text-primary mt-1">~$50</p>
                </div>
              </SectionCard>
              <SectionCard className="overflow-hidden p-0 text-center">
                <img src={img("images/homelab-minipc.jpg")} alt="Mini PC" className="w-full h-36 object-cover object-center" />
                <div className="p-4">
                  <p className="text-xl font-bold text-muted">Enthusiast</p>
                  <p className="text-2xl font-bold text-foreground">Mini PC / NUC</p>
                  <p className="text-lg text-primary mt-1">$200+</p>
                </div>
              </SectionCard>
              <SectionCard className="overflow-hidden p-0 text-center">
                <img src={img("images/homelab-rack.jpg")} alt="Server rack" className="w-full h-36 object-cover" />
                <div className="p-4">
                  <p className="text-xl font-bold text-muted">Full Send</p>
                  <p className="text-2xl font-bold text-foreground">Server Rack</p>
                  <p className="text-lg text-primary mt-1">$500+</p>
                </div>
              </SectionCard>
            </div>
            <p className="text-2xl text-center text-muted">
              Start with what you have. Upgrade when you need to.
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 9: Networking Basics */}
        <Slide id="networking">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
              Networking <span className="text-secondary">Basics</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '🔌', title: 'Ports', desc: 'Different doors for different services (80, 443, 3000...)' },
                { icon: '🏠', title: 'Local Access', desc: 'Access from your home network only' },
                { icon: '🔀', title: 'Reverse Proxy', desc: 'Route traffic to the right service' },
                { icon: '🌐', title: 'Domains', desc: 'mysite.home.local or real domains' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-secondary/20">
                  <h3 className="text-3xl font-semibold text-secondary mb-2">{item.icon} {item.title}</h3>
                  <p className="text-2xl text-muted">{item.desc}</p>
                </SectionCard>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 10: Docker Intro */}
        <Slide id="docker-intro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">🐳</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-primary">Docker</span> 101
            </h2>
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-4xl mx-auto font-normal">
              Package your app with <span className="text-foreground font-medium">everything it needs</span>, runs the same everywhere
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 11: Docker Concepts */}
        <Slide id="docker-concepts">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
              Key <span className="text-primary">Concepts</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '📦', title: 'Images', desc: 'The blueprint' },
                { icon: '🏃', title: 'Containers', desc: 'Running instances' },
                { icon: '💾', title: 'Volumes', desc: 'Persistent storage' },
                { icon: '🔗', title: 'Networks', desc: 'Container communication' },
              ].map((item) => (
                <SectionCard key={item.title} className="text-center">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-2xl text-muted">{item.desc}</p>
                </SectionCard>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 12: Docker Compose */}
        <Slide id="docker-compose">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Docker <span className="text-primary">Compose</span>
              </h2>
              <p className="text-2xl text-muted mt-3">
                Define everything in one YAML file
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-lg text-muted/60 font-mono mb-3">docker-compose.yml</p>
              <pre className="text-xl md:text-2xl overflow-x-auto font-mono">
                <code className="text-primary/90">{`services:
  adguard:
    image: adguard/adguardhome
    ports:
      - "53:53/udp"
      - "3000:3000"
      - "80:80"
    volumes:
      - ./adguard/conf:/opt/adguardhome/conf`}</code>
              </pre>
            </div>
            <p className="text-2xl text-center text-muted">
              One command: <code className="text-primary font-mono bg-card/60 px-3 py-1.5 rounded-lg">docker compose up -d</code>
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 13: Media Services */}
        <Slide id="services-media">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-purple-400">Media</span> Servers
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-purple-500/25" className="overflow-hidden p-0">
                <img src={img("images/jellyfin.png")} alt="Jellyfin" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Plex / Jellyfin</h3>
                  <p className="text-2xl text-muted">Stream your movies and TV anywhere</p>
                  <p className="text-xl text-primary mt-2">Like your own Netflix!</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-purple-500/25" className="overflow-hidden p-0">
                <img src={img("images/navidrome.png")} alt="Navidrome" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Navidrome</h3>
                  <p className="text-2xl text-muted">Your music library, streamed</p>
                  <p className="text-xl text-primary mt-2">Your own Spotify!</p>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 13.5: Piracy PSA */}
        <Slide id="services-piracy">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">🏴‍☠️</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              The <span className="text-red-400">Elephant</span> in the Room
            </h2>
            <SectionCard accentColor="border-red-500/25" className="max-w-3xl mx-auto text-left space-y-4">
              <p className="text-3xl text-muted leading-relaxed">
                People use Jellyfin and Plex with tools like <span className="text-foreground font-semibold">Sonarr</span>, <span className="text-foreground font-semibold">Radarr</span>, and <span className="text-foreground font-semibold">qBittorrent</span> to automatically download movies and TV shows for free.
              </p>
              <p className="text-3xl text-muted leading-relaxed">
                This is called the <span className="text-foreground font-semibold">*arr stack</span> and it gives you a fully automated Netflix-like experience with every movie and show ever made.
              </p>
              <div className="border-t border-border/50 pt-4 mt-4">
                <p className="text-2xl text-red-400 font-semibold">
                  This is piracy and you should not do it.
                </p>
                <p className="text-2xl text-muted mt-2">
                  We're telling you purely for educational purposes. Definitely don't Google "Servarr wiki" or "TRaSH Guides." That would be wrong.
                </p>
              </div>
            </SectionCard>
          </motion.div>
        </Slide>

        {/* SLIDE 14: Gaming Servers */}
        <Slide id="services-gaming">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🎮</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-red-400">Gaming</span> Servers
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-red-500/25" className="overflow-hidden p-0">
                <img src={img("images/minecraft.gif")} alt="Minecraft" className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Minecraft Server</h3>
                  <p className="text-xl text-muted">Host your own worlds with mods</p>
                  <p className="text-xl text-primary mt-2">Play with friends, your rules!</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-red-500/25" className="overflow-hidden p-0">
                <img src={img("images/gameservers.jpg")} alt="Game Servers" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Game Servers</h3>
                  <p className="text-xl text-muted">Valheim, Terraria, CS2, and more</p>
                  <p className="text-xl text-primary mt-2">Zero latency, full control</p>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 15: Photos */}
        <Slide id="services-photos">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-green-400">Immich</span>: The Google Photos Killer
            </h2>
            <div className="glass-card overflow-hidden p-0 max-w-4xl mx-auto">
              <img src={img("images/immich.png")} alt="Immich" className="w-full h-64 object-cover object-top" />
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                { icon: '📱', title: 'Mobile App', desc: 'Auto-backup from your phone' },
                { icon: '🤖', title: 'AI Features', desc: 'Face recognition & search' },
                { icon: '🗺️', title: 'Maps', desc: 'See photos by location' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-green-500/25" className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.icon} {item.title}</h3>
                  <p className="text-xl text-muted">{item.desc}</p>
                </SectionCard>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 16: Dev Tools */}
        <Slide id="services-dev">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              🛠️ <span className="text-secondary">Dev</span> Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                { title: 'Supabase', desc: 'Self-host your entire backend', sub: 'Database + Auth + Storage + Realtime', img: 'images/supabase.png' },
                { title: 'GitLab', desc: 'Complete DevOps platform', sub: 'Git + CI/CD + Registry', img: 'images/gitlab.png' },
                { title: 'Uptime Kuma', desc: 'Monitor your sites 24/7', sub: 'Alerts via Discord, Slack, email', img: 'images/uptimekuma.jpg' },
                { title: 'code-server', desc: 'VS Code in your browser', sub: 'Code from anywhere', img: 'images/code-server.png' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-secondary/25" className="overflow-hidden p-0">
                  <img src={img(item.img)} alt={item.title} className="w-full h-28 object-cover object-top" />
                  <div className="p-5">
                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-xl text-muted">{item.desc}</p>
                    <p className="text-lg text-primary mt-1">{item.sub}</p>
                  </div>
                </SectionCard>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 17: Deploy Platforms */}
        <Slide id="services-deploy">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-pink-400">Coolify</span>: Self-hosted Vercel
            </h2>
            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              <div className="glass-card overflow-hidden p-0">
                <img src={img("images/coolify.webp")} alt="Coolify" className="w-full h-full object-cover object-top" />
              </div>
              <SectionCard accentColor="border-pink-500/25" className="text-left">
                <ul className="space-y-3 text-2xl text-muted">
                  <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Deploy from Git with one click</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Automatic SSL certificates</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Database provisioning</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Docker & Docker Compose support</li>
                </ul>
                <p className="text-xl text-primary mt-4">Your own PaaS!</p>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 18: Productivity */}
        <Slide id="services-productivity">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">📝</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-emerald-400">Docs</span> & Writing
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-emerald-500/25" className="overflow-hidden p-0">
                <img src={img("images/overleaf.png")} alt="Overleaf" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Overleaf</h3>
                  <p className="text-xl text-muted">Collaborative LaTeX editor</p>
                  <p className="text-xl text-primary mt-2">Perfect for research papers!</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-emerald-500/25" className="overflow-hidden p-0">
                <img src={img("images/outline.png")} alt="Outline" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Outline</h3>
                  <p className="text-xl text-muted">Beautiful team wiki</p>
                  <p className="text-xl text-primary mt-2">Like Notion, self-hosted</p>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 19: Network */}
        <Slide id="services-network">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-sky-400">AdGuard Home</span>: Block All Ads
            </h2>
            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              <div className="glass-card overflow-hidden p-0">
                <img src={img("images/adguard.gif")} alt="AdGuard Home" className="w-full h-full object-cover object-top" />
              </div>
              <SectionCard accentColor="border-sky-500/25" className="text-left">
                <ul className="space-y-3 text-2xl text-muted">
                  <li className="flex items-center gap-2"><span className="text-sky-400">•</span> Block ads on ALL devices</li>
                  <li className="flex items-center gap-2"><span className="text-sky-400">•</span> No browser extensions needed</li>
                  <li className="flex items-center gap-2"><span className="text-sky-400">•</span> Parental controls</li>
                  <li className="flex items-center gap-2"><span className="text-sky-400">•</span> DNS-over-HTTPS support</li>
                </ul>
                <p className="text-xl text-primary mt-4">We'll set this up today!</p>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 19.5: Tailscale */}
        <Slide id="services-tailscale">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-indigo-400">Tailscale</span>: Connect Everything
            </h2>
            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              <div className="glass-card overflow-hidden p-0">
                <img src={img("images/tailscale.png")} alt="Tailscale" className="w-full h-full object-cover object-top" />
              </div>
              <SectionCard accentColor="border-indigo-500/25" className="text-left">
                <p className="text-2xl text-muted mb-4">
                  A mesh VPN that connects all your devices into one private network. Access your homelab from anywhere.
                </p>
                <ul className="space-y-3 text-2xl text-muted">
                  <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> Access your server from campus or coffee shops</li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> No port forwarding or firewall config</li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> All devices see each other like they're on the same LAN</li>
                </ul>
                <p className="text-xl text-primary mt-4">Free for personal use!</p>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 20: AI Services */}
        <Slide id="services-ai">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-cyan-400">AI</span> at Home
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-cyan-500/25" className="overflow-hidden p-0">
                <img src={img("images/openclaw.png")} alt="OpenClaw" className="w-full h-32 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">OpenClaw</h3>
                  <p className="text-2xl text-muted">Self-host Claude and other LLMs</p>
                  <p className="text-xl text-primary mt-2">Private AI conversations</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-cyan-500/25" className="overflow-hidden p-0">
                <img src={img("images/openwebui.png")} alt="Open WebUI" className="w-full h-32 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Ollama + Open WebUI</h3>
                  <p className="text-xl text-muted">Run LLMs locally (Llama, Mistral)</p>
                  <p className="text-xl text-primary mt-2">No API keys needed</p>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 21: Security */}
        <Slide id="services-security">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🔐</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-orange-400">Security</span> Services
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-orange-500/25" className="overflow-hidden p-0">
                <img src={img("images/vaultwarden.png")} alt="Vaultwarden" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Vaultwarden</h3>
                  <p className="text-xl text-muted">Self-hosted Bitwarden server</p>
                  <p className="text-xl text-primary mt-2">Your passwords, your server</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-orange-500/25" className="overflow-hidden p-0">
                <img src={img("images/authelia.png")} alt="Authelia" className="w-full h-40 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">Authelia</h3>
                  <p className="text-xl text-muted">Single sign-on for all services</p>
                  <p className="text-xl text-primary mt-2">One login to rule them all</p>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 22: More Services */}
        <Slide id="services-more">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-yellow-400">And So Much</span> More...
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <SectionCard accentColor="border-yellow-500/25" className="overflow-hidden p-0">
                <img src={img("images/homeassistant.png")} alt="Home Assistant" className="w-full h-28 object-cover object-top" />
                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2">Home Assistant</h3>
                  <p className="text-xl text-muted">Smart home automation</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-yellow-500/25" className="overflow-hidden p-0">
                <img src={img("images/nextcloud.png")} alt="Nextcloud" className="w-full h-28 object-cover object-top" />
                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2">Nextcloud</h3>
                  <p className="text-xl text-muted">Google Drive alternative</p>
                </div>
              </SectionCard>
              <SectionCard accentColor="border-yellow-500/25" className="overflow-hidden p-0">
                <img src={img("images/n8n.png")} alt="n8n" className="w-full h-28 object-cover object-top" />
                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2">n8n</h3>
                  <p className="text-xl text-muted">Workflow automation</p>
                </div>
              </SectionCard>
            </div>
            <p className="text-2xl text-muted">
              Check out <span className="text-primary font-semibold">awesome-selfhosted</span> on GitHub!
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 23: Resources */}
        <Slide id="resources">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-primary">Resources</span> to Learn More
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: '📚', title: 'awesome-selfhosted', desc: '1000+ services on GitHub', url: 'https://github.com/awesome-selfhosted/awesome-selfhosted' },
                { icon: '💬', title: 'r/selfhosted', desc: 'Active Reddit community', url: 'https://reddit.com/r/selfhosted' },
                { icon: '🏠', title: 'r/homelab', desc: 'Show off your setup', url: 'https://reddit.com/r/homelab' },
              ].map((item) => (
                <SectionCard key={item.title} className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-xl text-muted mb-4">{item.desc}</p>
                  <CopyableLink url={item.url} label="Open" />
                </SectionCard>
              ))}
            </div>
          </motion.div>
        </Slide>

        {/* SLIDE 24: Activity Intro */}
        <Slide id="activity">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="text-8xl md:text-9xl">🛡️</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Hands-on <span className="text-primary">Time!</span>
            </h2>
            <p className="text-3xl md:text-4xl text-muted font-normal">
              Let's deploy <span className="text-foreground font-medium">AdGuard Home</span> together
            </p>
            <p className="text-2xl text-primary/80">
              Block ads across your entire network in 5 minutes
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 25: Activity Steps */}
        <Slide id="activity-steps">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
              <span className="text-primary">Quick Start</span> Steps
            </h2>
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                {[
                  { step: '1', title: 'Clone the repo', code: 'git clone https://github.com/Arsh-S/devsesh-homelabbing' },
                  { step: '2', title: 'Enter directory & start', code: 'cd devsesh-homelabbing/demo && ./start.sh', note: 'Windows: use start.bat instead' },
                  { step: '3', title: 'Run the setup wizard', code: 'http://localhost:3000' },
                ].map((item) => (
                  <SectionCard key={item.step} className="flex items-center gap-6 p-5">
                    <span className="text-4xl font-bold text-primary w-12 text-center font-display">{item.step}</span>
                    <div className="flex-1">
                      <p className="text-2xl font-medium mb-1">{item.title}</p>
                      <CopyableCode code={item.code} />
                      {'note' in item && <span className="text-lg text-muted mt-1 block">{item.note}</span>}
                    </div>
                  </SectionCard>
                ))}
                <SectionCard className="flex items-center gap-6 p-5">
                  <span className="text-4xl font-bold text-primary w-12 text-center font-display">4</span>
                  <div className="flex-1">
                    <p className="text-2xl font-medium">Point your DNS to AdGuard</p>
                    <span className="text-xl text-muted">System Settings → Network → Wi-Fi → Details → DNS → add <code className="text-primary">127.0.0.1</code></span>
                    <span className="text-lg text-muted/60 mt-1 block">macOS: if port 53 fails, the start script will guide you through fixing it</span>
                  </div>
                </SectionCard>
                <SectionCard className="flex items-center gap-6 p-5">
                  <span className="text-4xl font-bold text-primary w-12 text-center font-display">5</span>
                  <div className="flex-1">
                    <p className="text-2xl font-medium">Open this site before AND after setting DNS</p>
                    <CopyableCode code="https://www.tomshardware.com/how-to/install-windows-11-without-microsoft-account" />
                    <span className="text-xl text-muted mt-1 block">Compare the difference, then check <code className="text-primary">localhost:80</code> to see blocked queries</span>
                  </div>
                </SectionCard>
              </div>
              <div className="hidden md:flex flex-col items-center gap-6 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-3 rounded-2xl">
                    <QRCodeSVG value={PRESENTATION_URL} size={140} />
                  </div>
                  <p className="text-lg text-foreground font-medium">Slides</p>
                  <CopyableLink url={PRESENTATION_URL} label="Copy link" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-3 rounded-2xl">
                    <QRCodeSVG value="https://github.com/Arsh-S/devsesh-homelabbing" size={140} />
                  </div>
                  <p className="text-lg text-foreground font-medium">GitHub Repo</p>
                  <CopyableLink url="https://github.com/Arsh-S/devsesh-homelabbing" label="Copy link" />
                </div>
              </div>
            </div>
          </motion.div>
        </Slide>
      </div>
    </EtherealShadow>
  )
}

export default App
