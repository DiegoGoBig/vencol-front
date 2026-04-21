import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Shield, Clock, Eye, AlertTriangle, Check, FileCheck, Truck, Cog, MessageSquare, Star, Send } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
type UtmKey = typeof UTM_KEYS[number];
const UTM_STORAGE_KEY = 'vencol_utm';

const captureUtmsFromUrl = (): Record<UtmKey, string> => {
  if (typeof window === 'undefined') return {} as Record<UtmKey, string>;
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Partial<Record<UtmKey, string>> = {};
  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) fromUrl[key] = val;
  });

  let stored: Partial<Record<UtmKey, string>> = {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch {
    stored = {};
  }

  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // ignore quota errors
    }
    return { ...stored, ...fromUrl } as Record<UtmKey, string>;
  }
  return stored as Record<UtmKey, string>;
};

const readCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : undefined;
};

export const Landing: React.FC = () => {
    const { home } = siteContent;
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [utms, setUtms] = useState<Record<string, string>>({});
    const recaptchaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUtms(captureUtmsFromUrl());
    }, []);

    useEffect(() => {
        const renderRecaptcha = () => {
            if ((window as any).grecaptcha && recaptchaRef.current) {
                try {
                    (window as any).grecaptcha.render(recaptchaRef.current, {
                        sitekey: '6Lcrzo0sAAAAALxW-ABUWMU11aS-fpGDoa7cWItp',
                    });
                } catch {
                    // already rendered
                }
            }
        };

        if ((window as any).grecaptcha) {
            renderRecaptcha();
        } else {
            const checkInterval = setInterval(() => {
                if ((window as any).grecaptcha) {
                    renderRecaptcha();
                    clearInterval(checkInterval);
                }
            }, 500);
            return () => clearInterval(checkInterval);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const recaptchaResponse = (window as any).grecaptcha?.getResponse();
        if (!recaptchaResponse) {
            setStatus('error');
            setErrorMessage('Por favor, completa el reCAPTCHA.');
            return;
        }

        const formData = new FormData(e.currentTarget);
        const fullName = (formData.get('fullName') as string || '').trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || fullName;
        const lastName = nameParts.slice(1).join(' ') || firstName;

        const empresa = formData.get('empresa') as string || '';
        const cargo = formData.get('cargo') as string || '';
        const phone = formData.get('phone') as string || '';
        const producto = formData.get('producto') as string || '';
        const reto = formData.get('reto') as string || '';
        const email = formData.get('email') as string || '';

        const messageParts = [
            empresa && `Empresa: ${empresa}`,
            cargo && `Cargo: ${cargo}`,
            phone && `WhatsApp: +57 ${phone}`,
            reto && `Mayor reto: ${reto}`,
        ].filter(Boolean);

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    topic: producto || 'Asesoría Técnica',
                    message: messageParts.join('\n') || 'Sin detalles adicionales.',
                    recaptchaToken: recaptchaResponse,
                    ...utms,
                    liFatId: readCookie('li_fat_id'),
                    pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
                    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
                }),
            });

            if (res.ok) {
                setStatus('success');
                if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'landing_form_submit', {
                        event_category: 'Lead',
                        event_label: 'Landing Asesoria Form',
                    });
                }
                (window as any).grecaptcha?.reset();
            } else {
                const err = await res.json().catch(() => ({ message: 'Error en el servidor.' }));
                setStatus('error');
                setErrorMessage(err.message || 'Hubo un error al enviar. Inténtalo de nuevo.');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Error de conexión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="relative z-10 pt-20">
            <SEO 
                title="Agenda tu Asesoría Gratuita | Vencol" 
                description="Optimice su cadena de suministro de proteínas con ingeniería de empaque."
                image={home.hero.images[0]}
            />
            
            {/* 1. Hero Section */}
            <section className="relative pt-16 pb-20 overflow-hidden" id="asesoria">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={home.hero.images[2]} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brand-green uppercase border border-brand-green/30 rounded-full bg-brand-green/10">
                                Eficiencia en Empaque 2026
                            </span>
                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                                Lo que no se ve en el empaque es lo que más le está costando a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-300">tu negocio.</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                                Optimice su cadena de suministro de proteínas con ingeniería de empaque de precisión y cumplimiento normativo internacional.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                    {/* <CheckCircle2 className="w-5 h-5 text-brand-green" />
                                    <span className="max-w-[200px] leading-tight">ASESORÍA TÉCNICA ESPECIALIZADA</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <GlassCard className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 !rounded-3xl shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-2">Agenda tu asesoría técnica gratuita</h3>
                                <p className="text-sm text-gray-400 mb-8">Nuestros ingenieros analizarán tu línea de empaque sin costo.</p>

                                {status === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Send className="text-brand-dark w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">¡Asesoría Agendada!</h3>
                                        <p className="text-gray-400 mb-8">Un ingeniero de Vencol se comunicará contigo muy pronto.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="bg-brand-green text-brand-dark font-bold px-8 py-3 rounded-xl hover:bg-lime-500 transition-all"
                                        >
                                            Enviar otra solicitud
                                        </button>
                                    </div>
                                ) : (
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Nombre completo</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Empresa</label>
                                            <input
                                                type="text"
                                                name="empresa"
                                                required
                                                placeholder="Nombre de Cía."
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Cargo</label>
                                            <input
                                                type="text"
                                                name="cargo"
                                                required
                                                placeholder="Ej. Gerente Planta"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Correo corporativo</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="jperez@empresa.com"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Whatsapp de contacto</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value="+57"
                                                disabled
                                                className="w-16 bg-white/10 border border-white/10 rounded-xl px-3 py-3 text-gray-300 text-center cursor-not-allowed"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="300 000 0000"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Producto de interés</label>
                                        <div className="relative">
                                            <select
                                                name="producto"
                                                required
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors appearance-none cursor-pointer"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Seleccione una opción</option>
                                                <option value="Almohadillas" className="bg-zinc-900">Almohadillas</option>
                                                <option value="Empaque flexible" className="bg-zinc-900">Empaque flexible</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-brand-green">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-green uppercase tracking-wide mb-2">Tu mayor reto (opcional)</label>
                                        <textarea
                                            name="reto"
                                            placeholder="¿Qué problema buscas resolver?"
                                            rows={3}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:bg-black/60 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-center">
                                        <div ref={recaptchaRef}></div>
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm font-medium text-center">{errorMessage}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full bg-brand-green hover:bg-lime-500 text-brand-dark font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center gap-2 group mt-4 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {status === 'loading' ? 'Enviando...' : 'AGENDAR ASESORÍA'}
                                    </button>

                                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-wider mt-4">
                                        Al enviar, aceptas nuestras políticas de tratamiento de datos.
                                    </p>
                                </form>
                                )}
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Partners / Allies Section (From Home) */}
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

            {/* 3. Problem & Form Section */}
            <section className="py-24 relative overflow-hidden z-10">
                <div className="absolute -left-40 top-40 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* Left Column: Problem & 3Ps (Takes 7 columns on large screens) */}
                        <div className="lg:col-span-7 space-y-16">
                            
                            {/* Problem */}
                            <div>
                                <span className="text-brand-green font-bold text-sm tracking-widest uppercase mb-4 block">El Problema</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Cuánto le cuesta el empaque equivocado?</h2>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    En la industria de proteínas, un error de 0.5mm en el sellado o una micra menos en el calibre del film no es solo un detalle técnico; es la diferencia entre la rentabilidad y el desperdicio masivo.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                    <div className="bg-white/5 border-l-4 border-l-brand-green p-6 rounded-r-xl border-t border-r border-b border-white/5">
                                        <div className="text-4xl font-bold text-brand-green mb-2">30%</div>
                                        <div className="font-bold text-white mb-2">Pérdida por Merma</div>
                                        <p className="text-sm text-gray-400 leading-relaxed">Promedio de pérdida en producto final por fallas en atmósfera controlada.</p>
                                    </div>
                                    <div className="bg-white/5 border-l-4 border-l-red-500 p-6 rounded-r-xl border-t border-r border-b border-white/5">
                                        <div className="text-4xl font-bold text-red-500 mb-2">High</div>
                                        <div className="font-bold text-white mb-2">Riesgo Regulatorio</div>
                                        <p className="text-sm text-gray-400 leading-relaxed">Multas y devoluciones por incumplimiento de normativas INVIMA e ICA.</p>
                                    </div>
                                </div>

                                <span className="text-brand-green font-bold text-sm tracking-widest uppercase mb-4 block">Diagnóstico Rápido</span>
                                <h3 className="text-2xl font-bold text-white mb-6">¿Esto te suena familiar?</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-500/10 rounded-xl text-red-400 shrink-0">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Fugas microscópicas constantes</h4>
                                            <p className="text-gray-400 text-sm">El empaque pierde vacío antes de llegar al punto de venta, reduciendo la vida útil.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 shrink-0">
                                            <FileCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Variabilidad en la calidad del proveedor</h4>
                                            <p className="text-gray-400 text-sm">Lotes que no cumplen con las especificaciones de calibre contratadas originalmente.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Tiempos de entrega impredecibles</h4>
                                            <p className="text-gray-400 text-sm">Quiebres de stock en insumos críticos que paralizan su línea de producción.</p>
                                        </div>
                                    </div>
                                </div>                                
                            </div>                           
                        </div>

                        {/* Right Column: Visual Anchor (Sticky Image) */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-12">
                                <div className="relative h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img 
                                        src={home.hero.images[0]} 
                                        alt="Warehouse" 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                            {/* Link to Form CTA */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <a href="#asesoria" className="inline-flex items-center gap-2 bg-brand-green hover:bg-lime-500 text-brand-dark font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-brand-green/20 group">
                                        AGENDAR ASESORÍA                                        
                                    </a>
                                    <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest font-bold">
                                        
                                    </p>
                                </div>
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
            

            {/* 4. Impact / Metrics (From Home) */}
            <section className="relative z-10 pt-24 pb-12">
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

            {/* 5. Difference Section */}
            <section className="py-12 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-16 max-w-3xl">
                        <span className="text-brand-green font-bold text-sm tracking-widest uppercase mb-4 block">Diferencial</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            ¿Por qué Vencol es diferente. Y por qué eso cambia los resultados?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
                        <GlassCard className="p-8 bg-zinc-900/60 border border-white/5 hover:border-brand-green/30 transition-colors">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                                <Truck className="w-6 h-6 text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Logística propia y cumplimiento real</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Operamos con logística propia y compromisos de entrega concretos. Sin excusas. Sin improvisaciones. Sin desabasto.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 bg-zinc-900/60 border border-white/5 hover:border-brand-green/30 transition-colors">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                                <Cog className="w-6 h-6 text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Asesoría técnica incluida</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Analizamos tu proceso, te explicamos qué tecnología necesita tu proteína y te acompañamos hasta que los resultados sean visibles.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 bg-zinc-900/60 border border-white/5 hover:border-brand-green/30 transition-colors">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-6 h-6 text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Certificaciones vigentes para tu mercado</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Nuestros materiales cuentan con las certificaciones exigidas por INVIMA, ICA y los mercados internacionales de referencia.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 bg-zinc-900/60 border border-white/5 hover:border-brand-green/30 transition-colors">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                                <FileCheck className="w-6 h-6 text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Te acompañamos ante auditorías</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Si tienes una visita de auditoría, podemos respaldarte con la documentación técnica necesaria.
                            </p>
                        </GlassCard>
                    </div>

                    <div className="flex justify-center mt-16">
                        <a href="#asesoria" className="inline-flex items-center gap-2 bg-brand-green hover:bg-lime-500 text-brand-dark font-bold px-10 py-5 rounded-xl transition-all hover:scale-105 shadow-xl shadow-brand-green/20 group">
                            AGENDAR ASESORÍA                            
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section (New) */}
            <section className="py-12 relative overflow-hidden bg-gradient-to-b from-brand-dark to-zinc-900">
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

            {/* 6. Bottom CTA */}
            <section className="bg-gradient-to-b from-brand-dark to-zinc-950 py-24 mt-12 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        No deje que el empaque drene su margen de utilidad.
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Hable hoy con un experto en cadena de frío y optimización de materiales.
                    </p>
                    <a href="#asesoria" className="inline-block bg-brand-green hover:bg-lime-500 text-brand-dark font-bold px-10 py-5 rounded-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(86,181,1,0.2)]">
                        AGENDAR ASESORÍA    
                    </a>
                </div>
            </section>
            
        </div>
    );
};
