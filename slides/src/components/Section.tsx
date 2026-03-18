import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen snap-start flex items-center justify-center px-6 py-12 ${className}`}
    >
      <div className="w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
}
