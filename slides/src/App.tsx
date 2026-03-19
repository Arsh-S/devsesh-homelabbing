import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EtherealShadow } from './components/ui/ethereal-shadow'
import { CopyableCode, CopyableLink } from './components/ui/copy-button'
import { ChevronDown } from 'lucide-react'

const PRESENTATION_URL = window.location.href.split('?')[0];

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'what-is-it', label: 'What' },
  { id: 'why-privacy', label: 'Privacy' },
  { id: 'why-money', label: 'Money' },
  { id: 'why-learn', label: 'Learn' },
  { id: 'hardware-intro', label: 'Hardware' },
  { id: 'hardware-mac', label: 'Mac?' },
  { id: 'hardware-options', label: 'Options' },
  { id: 'networking', label: 'Networking' },
  { id: 'docker-intro', label: 'Docker' },
  { id: 'docker-concepts', label: 'Concepts' },
  { id: 'docker-compose', label: 'Compose' },
  { id: 'services-media', label: 'Media' },
  { id: 'services-gaming', label: 'Gaming' },
  { id: 'services-photos', label: 'Photos' },
  { id: 'services-dev', label: 'Dev' },
  { id: 'services-deploy', label: 'Deploy' },
  { id: 'services-productivity', label: 'Docs' },
  { id: 'services-network', label: 'Network' },
  { id: 'services-ai', label: 'AI' },
  { id: 'services-security', label: 'Security' },
  { id: 'services-more', label: 'More' },
  { id: 'resources', label: 'Resources' },
  { id: 'activity', label: 'Activity' },
  { id: 'activity-steps', label: 'Steps' },
];

function Slide({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="h-screen w-full snap-start flex items-center justify-center px-6 md:px-12 lg:px-16 relative z-10"
    >
      <div className="max-w-5xl w-full">
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
    <EtherealShadow
      color="rgba(34, 197, 94, 0.9)"
      animation={{ scale: 100, speed: 95 }}
      noise={{ opacity: 0.2, scale: 1 }}
      sizing="fill"
      className="min-h-screen"
    >
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-0.5 px-1.5 py-1 bg-card/70 backdrop-blur-xl rounded-full border border-border/40 overflow-x-auto max-w-[95vw]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-white/5'
              }`}
            >
              {item.label}
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
            <p className="text-2xl md:text-3xl text-primary font-medium mb-2 tracking-wide uppercase">
              DTI DevSesh
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">
              Homelabbing & Self-Hosting
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-12">
              Presented by <span className="text-foreground font-medium">Ben</span> and <span className="text-foreground font-medium">Arsh</span>
            </p>

            {/* Follow along instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-8 max-w-lg mx-auto"
            >
              <p className="text-xl text-muted mb-4 font-medium">Follow along on your device</p>
              <div className="flex items-center justify-center">
                <CopyableLink url={PRESENTATION_URL} label="Copy presentation link" />
              </div>
              <p className="text-lg text-muted/70 mt-4">or scan the QR code</p>
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
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-light">
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
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-light">
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
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-3xl mx-auto font-light">
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
                <span key={skill} className="badge text-xl md:text-2xl">
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
            <p className="text-3xl md:text-4xl text-muted font-light">
              Spoiler: You probably already have something
            </p>
            <div className="text-6xl md:text-7xl pt-4 flex justify-center gap-6">
              <span>💻</span>
              <span>🥧</span>
              <span>🖥️</span>
              <span>☁️</span>
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
            <p className="text-3xl md:text-4xl text-muted font-light">
              ...but it <span className="text-foreground italic">is</span> a pretty good option
            </p>
            <p className="text-2xl text-primary/80">
              (ARM is efficient & macOS runs Docker great)
            </p>
          </motion.div>
        </Slide>

        {/* SLIDE 8: Hardware Options */}
        <Slide id="hardware-options">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
              Hardware <span className="text-primary">Options</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: '💻', title: 'Old Laptop', desc: 'Free! Repurpose what you have' },
                { icon: '🥧', title: 'Raspberry Pi', desc: '~$50-100, tiny & efficient' },
                { icon: '🖥️', title: 'Mini PC', desc: 'Intel NUC, more powerful' },
                { icon: '☁️', title: 'Cloud VPS', desc: 'DigitalOcean, Hetzner, Linode' },
              ].map((item) => (
                <SectionCard key={item.title}>
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className="text-3xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-xl text-muted">{item.desc}</p>
                </SectionCard>
              ))}
            </div>
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
                  <p className="text-xl text-muted">{item.desc}</p>
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
            <p className="text-3xl md:text-4xl text-muted leading-relaxed max-w-4xl mx-auto font-light">
              Package your app with <span className="text-foreground font-medium">everything it needs</span> — runs the same everywhere
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
                  <h3 className="text-3xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-xl text-muted">{item.desc}</p>
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
            <div className="glass-card p-6 relative group">
              <CopyableCode
                code={`services:\n  uptime-kuma:\n    image: louislam/uptime-kuma:1\n    ports:\n      - "3001:3001"\n    volumes:\n      - data:/app/data\n\nvolumes:\n  data:`}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <pre className="text-lg md:text-xl overflow-x-auto font-mono">
                <code className="text-primary/90">{`services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    ports:
      - "3001:3001"
    volumes:
      - data:/app/data

volumes:
  data:`}</code>
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
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">📺</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-purple-400">Media</span> Servers
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-purple-500/25">
                <h3 className="text-3xl font-semibold mb-2">Plex / Jellyfin</h3>
                <p className="text-xl text-muted">Stream your movies and TV anywhere</p>
                <p className="text-lg text-primary mt-2">Like your own Netflix!</p>
              </SectionCard>
              <SectionCard accentColor="border-purple-500/25">
                <h3 className="text-3xl font-semibold mb-2">Navidrome</h3>
                <p className="text-xl text-muted">Your music library, streamed</p>
                <p className="text-lg text-primary mt-2">Your own Spotify!</p>
              </SectionCard>
            </div>
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
              <SectionCard accentColor="border-red-500/25">
                <h3 className="text-3xl font-semibold mb-2">Minecraft Server</h3>
                <p className="text-xl text-muted">Host your own worlds with mods</p>
                <p className="text-lg text-primary mt-2">Play with friends, your rules!</p>
              </SectionCard>
              <SectionCard accentColor="border-red-500/25">
                <h3 className="text-3xl font-semibold mb-2">Game Servers</h3>
                <p className="text-xl text-muted">Valheim, Terraria, CS2, and more</p>
                <p className="text-lg text-primary mt-2">Zero latency, full control</p>
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
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">📸</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-green-400">Immich</span>
            </h2>
            <p className="text-3xl text-muted font-light">The Google Photos killer</p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                { icon: '📱', title: 'Mobile App', desc: 'Auto-backup from your phone' },
                { icon: '🤖', title: 'AI Features', desc: 'Face recognition & search' },
                { icon: '🗺️', title: 'Maps', desc: 'See photos by location' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-green-500/25" className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{item.icon} {item.title}</h3>
                  <p className="text-lg text-muted">{item.desc}</p>
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
            <div className="text-8xl md:text-9xl">🛠️</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-secondary">Dev</span> Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                { title: 'Supabase', desc: 'Self-host your entire backend', sub: 'Database + Auth + Storage + Realtime' },
                { title: 'GitLab', desc: 'Complete DevOps platform', sub: 'Git + CI/CD + Registry' },
                { title: 'Uptime Kuma', desc: 'Monitor your sites 24/7', sub: "We'll set this up today!" },
                { title: 'code-server', desc: 'VS Code in your browser', sub: 'Code from anywhere' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-secondary/25" className="p-6">
                  <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-lg text-muted">{item.desc}</p>
                  <p className="text-base text-primary mt-1">{item.sub}</p>
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
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🚀</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-pink-400">Deploy</span> Platforms
            </h2>
            <SectionCard accentColor="border-pink-500/25" className="text-left max-w-2xl mx-auto">
              <h3 className="text-4xl font-bold mb-4">Coolify</h3>
              <p className="text-2xl text-muted mb-4">Self-hosted Vercel / Netlify / Heroku</p>
              <ul className="space-y-2 text-xl text-muted">
                <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Deploy from Git with one click</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Automatic SSL certificates</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Database provisioning</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">•</span> Docker & Docker Compose support</li>
              </ul>
              <p className="text-lg text-primary mt-4">Your own PaaS!</p>
            </SectionCard>
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
              <SectionCard accentColor="border-emerald-500/25">
                <h3 className="text-3xl font-semibold mb-2">Overleaf</h3>
                <p className="text-xl text-muted">Collaborative LaTeX editor</p>
                <p className="text-lg text-primary mt-2">Perfect for research papers!</p>
              </SectionCard>
              <SectionCard accentColor="border-emerald-500/25">
                <h3 className="text-3xl font-semibold mb-2">Outline</h3>
                <p className="text-xl text-muted">Beautiful team wiki</p>
                <p className="text-lg text-primary mt-2">Like Notion, self-hosted</p>
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
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🌐</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-sky-400">Network</span> Tools
            </h2>
            <SectionCard accentColor="border-sky-500/25" className="text-left max-w-2xl mx-auto">
              <h3 className="text-4xl font-bold mb-4">AdGuard Home</h3>
              <p className="text-2xl text-muted mb-4">Network-wide ad & tracker blocking</p>
              <ul className="space-y-2 text-xl text-muted">
                <li className="flex items-center gap-2"><span className="text-sky-400">•</span> Block ads on ALL devices</li>
                <li className="flex items-center gap-2"><span className="text-sky-400">•</span> No browser extensions needed</li>
                <li className="flex items-center gap-2"><span className="text-sky-400">•</span> Parental controls</li>
                <li className="flex items-center gap-2"><span className="text-sky-400">•</span> DNS-over-HTTPS support</li>
              </ul>
              <p className="text-lg text-primary mt-4">Goodbye YouTube ads!</p>
            </SectionCard>
          </motion.div>
        </Slide>

        {/* SLIDE 20: AI Services */}
        <Slide id="services-ai">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">🤖</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-cyan-400">AI</span> at Home
            </h2>
            <div className="grid md:grid-cols-2 gap-5 text-left">
              <SectionCard accentColor="border-cyan-500/25">
                <h3 className="text-3xl font-semibold mb-2">OpenClaw</h3>
                <p className="text-xl text-muted">Self-host Claude and other LLMs</p>
                <p className="text-lg text-primary mt-2">Private AI conversations</p>
              </SectionCard>
              <SectionCard accentColor="border-cyan-500/25">
                <h3 className="text-3xl font-semibold mb-2">Ollama + Open WebUI</h3>
                <p className="text-xl text-muted">Run LLMs locally (Llama, Mistral)</p>
                <p className="text-lg text-primary mt-2">No API keys needed</p>
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
              <SectionCard accentColor="border-orange-500/25">
                <h3 className="text-3xl font-semibold mb-2">Vaultwarden</h3>
                <p className="text-xl text-muted">Self-hosted Bitwarden server</p>
                <p className="text-lg text-primary mt-2">Your passwords, your server</p>
              </SectionCard>
              <SectionCard accentColor="border-orange-500/25">
                <h3 className="text-3xl font-semibold mb-2">Authelia</h3>
                <p className="text-xl text-muted">Single sign-on for all services</p>
                <p className="text-lg text-primary mt-2">One login to rule them all</p>
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
            className="text-center space-y-10"
          >
            <div className="text-8xl md:text-9xl">⚡</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-yellow-400">And So Much</span> More...
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                { title: 'Home Assistant', desc: 'Smart home automation' },
                { title: 'Nextcloud', desc: 'Google Drive alternative' },
                { title: 'n8n', desc: 'Workflow automation' },
              ].map((item) => (
                <SectionCard key={item.title} accentColor="border-yellow-500/25" className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-lg text-muted">{item.desc}</p>
                </SectionCard>
              ))}
            </div>
            <p className="text-2xl text-muted">
              Check out <span className="text-primary font-medium">awesome-selfhosted</span> on GitHub!
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
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-lg text-muted mb-4">{item.desc}</p>
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
            <div className="text-8xl md:text-9xl">🎯</div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Hands-on <span className="text-primary">Time!</span>
            </h2>
            <p className="text-3xl md:text-4xl text-muted font-light">
              Let's deploy <span className="text-foreground font-medium">Uptime Kuma</span> together
            </p>
            <p className="text-2xl text-primary/80">
              Monitor your websites in 5 minutes
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
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
              <span className="text-primary">Quick Start</span> Steps
            </h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Clone the repo', code: 'git clone https://github.com/your-org/homelabbing-demo' },
                { step: '2', title: 'Enter directory & start', code: 'cd homelabbing-demo && docker compose up -d' },
                { step: '3', title: 'Open in browser', code: 'http://localhost:3001' },
              ].map((item) => (
                <SectionCard key={item.step} className="flex items-center gap-6 p-5">
                  <span className="text-4xl font-bold text-primary w-12 text-center">{item.step}</span>
                  <div className="flex-1">
                    <p className="text-xl font-medium mb-1">{item.title}</p>
                    <CopyableCode code={item.code} />
                  </div>
                </SectionCard>
              ))}
              <SectionCard className="flex items-center gap-6 p-5">
                <span className="text-4xl font-bold text-primary w-12 text-center">4</span>
                <div className="flex-1">
                  <p className="text-xl font-medium">Add monitors for your sites!</p>
                  <span className="text-lg text-muted">Track uptime for anything</span>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </Slide>
      </div>
    </EtherealShadow>
  )
}

export default App
