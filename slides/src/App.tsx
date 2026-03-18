import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Section } from './components/Section'
import { NavBar } from './components/NavBar'
import { Card } from './components/Card'

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
