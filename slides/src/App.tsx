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
