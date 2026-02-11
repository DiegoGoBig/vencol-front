import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Send } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';

export const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const solution = siteContent.solutions.items.find(s => s.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <SEO title="Solución no encontrada" />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Solución no encontrada</h2>
          <Link to="/" className="text-brand-green hover:underline">Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <SEO 
        title={solution.title} 
        description={solution.description} 
        image={solution.image} 
        url={`${siteContent.meta.siteUrl}/soluciones/${solution.slug}`}
      />
      
      {/* Hero Header with Background Image */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={solution.image} 
            alt={solution.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <Link to="/" className="inline-flex items-center text-glass-muted hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="bg-brand-green/20 p-4 rounded-2xl backdrop-blur-md border border-brand-green/30">
              <solution.icon className="h-16 w-16 text-brand-green" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {solution.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {solution.description}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <GlassCard className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-6">Descripción Detallada</h2>
                <h3 className="text-3xl font-bold text-white mb-6">{solution.subtitle1}</h3>
                <p className="text-lg text-gray-300 leading-8">
                  {solution.subtitle1Description}
                </p>
                  <br/>
                <h3 className="text-3xl font-bold text-white mb-6">{solution.subtitle2}</h3>
                <p className="text-lg text-gray-300 leading-8">
                  {solution.subtitle2Description}
                </p>

              </GlassCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* This would be an ideal place for technical specs or an image gallery in the future */}
                 <div className="rounded-2xl overflow-hidden h-64 border border-white/10 relative group">
                    <img 
                      src={solution.image} 
                      alt="Detail view" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                       {/* <span className="text-white font-bold">Aplicación en Planta</span> */}
                    </div>
                 </div>
                 <div className="rounded-2xl overflow-hidden h-64 border border-white/10 relative group">
                     {/* Using a different random image for variety */}
                    <img 
                      src={solution.image2} 
                      alt="Product Result" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                       {/* <span className="text-white font-bold">Resultado Final</span> */}
                    </div>
                 </div>
              </div>
            </div>

            {/* Sidebar / Features */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="bg-white/5 border-white/10 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Características Clave</h3>
                <ul className="space-y-4">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <div className="mt-1 mr-3 bg-brand-green/20 p-1 rounded-full flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-green" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold mb-2">¿Interesado en este producto?</h4>
                  <p className="text-glass-muted text-sm mb-4">
                    Solicita una cotización o muestra técnica para tu operación.
                  </p>
                  <Link 
                    to="/contacto" 
                    className="w-full glass-button py-3 rounded-lg text-white font-semibold flex justify-center items-center gap-2 hover:bg-white/20 transition-all"
                  >
                    Cotizar Ahora
                    <Send className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};