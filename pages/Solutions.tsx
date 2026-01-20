import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '../data/data';

export const Solutions: React.FC = () => {
  const { solutions } = siteContent;
  return (
    <div className="pt-24 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{solutions.hero.title}</h1>
          <p className="text-xl text-glass-muted max-w-2xl mx-auto">
            {solutions.hero.description}
          </p>
        </div>

        <div className="space-y-8">
          {solutions.items.map((item) => (
            <Link key={item.id} to={`/soluciones/${item.slug}`} className="block group">
              <GlassCard hoverEffect className="h-full transition-all duration-500 border-white/5 group-hover:border-brand-green/30">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  
                  {/* Icon Box */}
                  <div className="flex-shrink-0 bg-white/5 p-5 rounded-2xl group-hover:bg-brand-green/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-10 w-10 text-brand-green group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-glass-muted text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex-shrink-0 opacity-0 md:opacity-100 md:-translate-x-4 md:group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/10 p-2 rounded-full text-white">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="mt-20">
          <GlassCard className="text-center bg-gradient-to-r from-brand-dark to-brand-green/10 border-brand-green/20">
            <h3 className="text-2xl font-bold text-white mb-4">{solutions.custom.title}</h3>
            <p className="text-glass-muted mb-8 max-w-2xl mx-auto">
              {solutions.custom.description}
            </p>
            <Link to="/contacto" className="inline-block glass-button px-8 py-3 rounded-full text-white font-semibold hover:bg-white/20 transition-all shadow-lg shadow-brand-green/10">
              {solutions.custom.cta}
            </Link>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};