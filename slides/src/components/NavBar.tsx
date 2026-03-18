interface NavItem {
  id: string;
  label: string;
}

interface NavBarProps {
  items: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function NavBar({ items, activeSection, onNavigate }: NavBarProps) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 bg-card/80 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === item.id
                ? 'bg-primary text-black'
                : 'text-muted hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
