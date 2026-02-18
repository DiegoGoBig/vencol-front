import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Quote, Check, Sparkles, ChevronDown, MessageCircle, Star, MessageSquare, Shield } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { fetchBlogPosts } from '../lib/wordpress';
import { BlogPost } from '../types';

export const Home: React.FC = () => {
  const { home, meta } = siteContent;
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(siteContent.blog.posts);

  useEffect(() => {
    fetchBlogPosts()
      .then((wpPosts) => {
        if (wpPosts.length > 0) setBlogPosts(wpPosts);
      })
      .catch((err) => console.warn('WP blog fetch failed, using fallback:', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % home.hero.images.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [home.hero.images.length]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative z-10">
      <SEO 
        title={home.meta.title} 
        description={home.meta.description} 
        image={home.hero.images[0]}
      />
      
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Slider */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          {home.hero.images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-green/40 bg-black/40 text-brand-green text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(86,181,1,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-brand-green mr-2 animate-pulse"></span>
            {home.hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight drop-shadow-lg">
            {home.hero.title.prefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-200">{home.hero.title.highlight}</span> {home.hero.title.suffix}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            {home.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Redirected to the first solution as general solutions page does not exist */}
            <Link to={`/soluciones/${siteContent.solutions.items[0].slug}`} className="glass-button px-8 py-4 rounded-full text-white font-bold hover:bg-white/20 transition-all flex items-center justify-center group shadow-lg shadow-brand-green/20">
              {home.hero.cta.primary}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* <Link to="/contacto" className="px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 border border-white/20 transition-all flex items-center justify-center backdrop-blur-sm">
              {home.hero.cta.secondary}
            </Link> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
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
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
                  {home.about.title.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-300">{home.about.title.highlight}</span>{home.about.title.suffix}
                </h2>
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

              <div className="pt-4">
                <Link to="/nosotros" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-brand-dark font-bold text-sm uppercase tracking-wide hover:bg-brand-green hover:shadow-[0_0_20px_rgba(86,181,1,0.4)] transition-all duration-300 group">
                  {home.about.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

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
             {/* Repeat logos multiple times to ensure infinite loop coverage on large screens with few logos */}
             {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                  {home.partners.logos.map((logo, index) => (
                      <div key={`p-${i}-${index}`} className="flex-shrink-0 w-32 h-32 bg-white rounded-xl flex items-center justify-center p-4 transition-colors border border-white/5 grayscale hover:grayscale-0 hover:opacity-100 duration-300">
                        <img src={logo} alt="Partner Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                  ))}
                </React.Fragment>
             ))}
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

      {/* Impact / Metrics */}
      <section className="relative z-10 mt-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-950 to-brand-green/80 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {home.impact.metrics.map((metric, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center px-4 ${idx !== 0 ? 'pt-8 md:pt-0' : ''}`}>
                  <div className="flex items-start mb-2">
                    <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{metric.value}</span>
                  </div>
                  <p className="text-white font-semibold text-sm uppercase tracking-wide mb-1">{metric.label}</p>
                  <p className="text-emerald-100/60 text-xs">{metric.subLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational / FAQ Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Heading & Image */}
            <div className="lg:sticky lg:top-24">
               <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-brand-green text-xs font-bold tracking-wider backdrop-blur-md mb-6 uppercase">
                   <MessageCircle className="w-3 h-3 mr-2" /> 
                   {home.faq.badge}
               </div>
               <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                 {home.faq.title.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-300">{home.faq.title.highlight}</span> {home.faq.title.suffix}
               </h2>
               <p className="text-glass-muted text-lg mb-8">
                 {home.faq.description}
               </p>
               
               <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 w-full mt-8 border border-white/10 shadow-2xl">
                 <img 
                   src={home.faq.image} 
                   alt="Soporte Vencol" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-bold text-lg">{home.faq.cta.text}</p>
                    <Link to="/contacto" className="text-brand-green text-sm hover:underline">{home.faq.cta.linkText} &rarr;</Link>
                 </div>
               </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="space-y-4">
              {home.faq.items.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index}
                    onClick={() => toggleFaq(index)}
                    className={`
                      rounded-2xl p-6 cursor-pointer transition-all duration-300 border
                      ${isOpen 
                        ? 'bg-gradient-to-r from-brand-green/20 to-lime-500/10 border-brand-green/30 shadow-[0_0_15px_rgba(86,181,1,0.1)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3 className={`text-lg font-bold pr-4 transition-colors ${isOpen ? 'text-brand-green' : 'text-white'}`}>
                        {item.question}
                      </h3>
                      <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-brand-green text-black' : 'bg-white/10 text-white'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="text-glass-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section (New) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-brand-dark to-zinc-900">
         {/* Background glow */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-zinc-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-xs font-bold tracking-wider backdrop-blur-md mb-6 uppercase">
                  <MessageSquare className="w-3 h-3 mr-2" /> 
                  {home.testimonials.badge}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {home.testimonials.title.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-brand-green">{home.testimonials.title.highlight}</span>{home.testimonials.title.suffix}
              </h2>
              <p className="text-glass-muted text-lg mb-8 max-w-lg">
                {home.testimonials.description}
              </p>

              {/* Clients Marquee */}
              <div className="mt-8 relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-transparent to-transparent z-10"></div>
                
                <div className="animate-marquee whitespace-nowrap flex gap-8 items-center py-4">
                  {/* Repeat clients multiple times for infinite loop */}
                  {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                      {(home.testimonials as any).clients?.map((client: string, index: number) => (
                        <div key={`c-${i}-${index}`} className="flex-shrink-0 w-32 h-20 bg-white rounded-xl flex items-center justify-center p-4 border  transition-colors duration-300">
                          <img src={client} alt="Cliente" className="max-h-full max-w-full object-contain" />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Cards */}
            <div className="flex flex-col md:flex-row gap-6 relative">
                {/* Decorative Element */}
                {home.testimonials.items.map((testimonial, idx) => (
                  <div key={testimonial.id} className={`relative z-10 flex-1 md:mt-12`}>
                      <GlassCard className="bg-zinc-800/40 backdrop-blur-xl border-white/5 h-full">
                        <div className="flex gap-1 text-yellow-400 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 italic mb-8 text-sm leading-relaxed min-h-[80px]">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                          />
                          <div>
                            <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                            <span className="text-[10px] text-brand-green uppercase font-bold tracking-wider block">{testimonial.role}</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-wider block">{testimonial.company}</span>
                          </div>
                        </div>
                    </GlassCard>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={home.blogPreview.bgImage}
            alt="Blog Background" 
            className="w-full h-full object-cover opacity-80 " 
          />
          <div className="absolute inset-0 bg-brand-dark/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">{home.blogPreview.title}</h2>
              <p className="text-glass-muted mt-2">{home.blogPreview.subtitle}</p>
            </div>
            <Link to="/blog" className="text-brand-green hover:text-white transition-colors hidden md:block">
              {home.blogPreview.cta} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <GlassCard key={post.id} hoverEffect className="p-0 overflow-hidden group border-white/10 bg-black/40 backdrop-blur-xl">
                <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide border border-white/10">
                    {post.category}
                  </div>
                </Link>
                <div className="p-6">
                  <span className="text-xs text-brand-green font-semibold mb-2 block">{post.date}</span>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">{post.title}</h3>
                  </Link>
                  <p className="text-glass-muted text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-white text-sm font-medium border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors">
                    Leer más
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
          
           <div className="mt-8 text-center md:hidden">
            <Link to="/blog" className="text-brand-green hover:text-white transition-colors">
              {home.blogPreview.cta} &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};