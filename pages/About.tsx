import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowRight, Quote, Check, Sparkles, Shield } from 'lucide-react';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const { about, home } = siteContent;
  return (
    <div className="min-h-screen bg-brand-dark">
      <SEO 
        title={about.meta.title} 
        description={about.meta.description} 
        image={about.hero.image}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={about.hero.image} 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-sm font-medium text-brand-green uppercase tracking-wider">{about.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {about.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-glass-muted max-w-3xl mx-auto leading-relaxed">
            {about.hero.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
      {/* Content Section */}  
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Image */}
            <div className="relative group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-500/20 rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                <img 
                  src={home.about.image} 
                  alt="Expertos en Vencol" 
                  className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                
                <div className="absolute bottom-6 right-6 glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 animate-bounce duration-[3000ms]">
                   <div className="bg-brand-green p-2 rounded-full text-brand-dark">
                     <Sparkles className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-300">{home.about.experienceBadge.text}</p>
                     <p className="text-lg font-bold text-white leading-none">{home.about.experienceBadge.value}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-brand-green text-xs font-bold tracking-wider backdrop-blur-md mb-6 uppercase">
                   <Shield className="w-3 h-3 mr-2" /> 
                   {home.about.badge}
                </span>
                {/* <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
                  {home.about.title.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-300">{home.about.title.highlight}</span>{home.about.title.suffix}
                </h2> */}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {home.about.description}
              </p>



              <div className="relative py-2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl"></div>
                <GlassCard className="relative bg-black/40 border-l-4 border-l-brand-green !rounded-r-xl !rounded-l-sm p-6 overflow-visible">
                  <div className="absolute -top-4 left-6 bg-brand-dark border border-white/10 p-2 rounded-lg">
                    <Quote className="text-brand-green w-6 h-6 fill-current" />
                  </div>
                  <p className="text-white text-lg font-medium italic pt-4">
                    "{home.about.quote}"
                  </p>
                </GlassCard>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {home.about.subDescription}
              </p>

              <div className="space-y-4 pt-2">
                {home.about.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-200">
                    <div className="mr-4 bg-brand-green/20 p-1 rounded-full text-brand-green">
                       <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* <div className="pt-4">
                <Link to="/nosotros" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-brand-dark font-bold text-sm uppercase tracking-wide hover:bg-brand-green hover:shadow-[0_0_20px_rgba(86,181,1,0.4)] transition-all duration-300 group">
                  {home.about.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div> */}

            </div>
          </div>
        </div>
      </section>
 
      {/* 3P's Section */}
      <section className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{home.threePs.title}</h2>
            <p className="text-glass-muted text-lg">{home.threePs.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.threePs.items.map((item) => (
              <GlassCard key={item.id} hoverEffect className={`text-center py-12 border-brand-green/30 shadow-[0_0_20px_rgba(86,181,1,0.1)]`}>
                <div className="absolute inset-0 z-[-1] w-full h-full">
                  <img 
                    src={item.bgImage} 
                    alt="3P's" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]" />
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark" /> */}
                </div>
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.iconBg}`}>
                  <item.icon className={`h-10 w-10 ${item.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-glass-muted mb-4">
                  {item.description}
                </p>
                <span className="text-brand-green font-medium block">{item.result}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Partners / Allies Section */}
      <section className="py-16 border-y border-white/5 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
           <h3 className="text-2xl md:text-3xl font-bold text-white">
             <span className="text-brand-green text-3xl md:text-4xl mr-2">{home.partners.stats.value}</span>              
           </h3>
           <h3 className="text-2xl md:text-3xl font-bold text-white">             
             {home.partners.stats.text}
           </h3>
           <br></br>
           <p className="text-glass-muted mt-2">{home.partners.subtitle}</p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
          
          <div className="animate-marquee whitespace-nowrap flex gap-16 items-center py-4">
             {home.partners.logos.map((logo, index) => (
                <div key={`p1-${index}`} className="flex-shrink-0 w-48 h-20 bg-white/5 rounded-xl flex items-center justify-center p-4 hover:bg-white/10 transition-colors border border-white/5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 duration-300">
                  <img src={logo} alt="Partner Logo" className="max-h-full max-w-full object-contain brightness-0 invert" />
                </div>
             ))}
             {home.partners.logos.map((logo, index) => (
                <div key={`p2-${index}`} className="flex-shrink-0 w-48 h-20 bg-white/5 rounded-xl flex items-center justify-center p-4 hover:bg-white/10 transition-colors border border-white/5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 duration-300">
                  <img src={logo} alt="Partner Logo" className="max-h-full max-w-full object-contain brightness-0 invert" />
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};