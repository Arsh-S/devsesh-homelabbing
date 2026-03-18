import { useState, useEffect, useRef } from 'react'
import { Section } from './components/Section'
import { NavBar } from './components/NavBar'

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
          <h1 className="text-6xl font-bold text-primary text-center">
            Homelabbing Workshop
          </h1>
        </Section>
        <Section id="what-why">
          <h2 className="text-4xl font-bold text-center">What & Why</h2>
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
