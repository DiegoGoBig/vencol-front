import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        glass-panel rounded-2xl p-6 transition-all duration-300
        ${hoverEffect ? 'hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green/10' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
