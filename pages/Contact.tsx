import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';

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

export const Contact: React.FC = () => {
  const { contact } = siteContent;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [utms, setUtms] = React.useState<Record<string, string>>({});

  const recaptchaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setUtms(captureUtmsFromUrl());
  }, []);

  React.useEffect(() => {
    // Explicitly render reCAPTCHA when the component mounts
    const renderRecaptcha = () => {
      if ((window as any).grecaptcha && recaptchaRef.current) {
        try {
          (window as any).grecaptcha.render(recaptchaRef.current, {
            sitekey: '6Lcrzo0sAAAAALxW-ABUWMU11aS-fpGDoa7cWItp',
          });
        } catch (e) {
          console.log('reCAPTCHA already rendered or failed:', e);
        }
      }
    };

    if ((window as any).grecaptcha) {
      renderRecaptcha();
    } else {
      // If script hasn't loaded yet, it will scan the DOM later or we can wait
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

    // Get reCAPTCHA response using the global grecaptcha object
    const recaptchaResponse = (window as any).grecaptcha?.getResponse();

    if (!recaptchaResponse) {
      setStatus('error');
      setErrorMessage('Por favor, completa el reCAPTCHA.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // API connection disabled — uncomment to reactivate
    // try {
    //   const response = await fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       ...data,
    //       recaptchaToken: recaptchaResponse,
    //       ...utms,
    //       liFatId: readCookie('li_fat_id'),
    //       pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    //       referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    //     }),
    //   });
    //   if (response.ok) {
    //     setStatus('success');
    //     if (typeof (window as any).gtag === 'function') {
    //       (window as any).gtag('event', 'contact_form_submit', {
    //         'event_category': 'Contact',
    //         'event_label': 'Contact Form'
    //       });
    //     }
    //     (window as any).grecaptcha?.reset();
    //   } else {
    //     const errorData = await response.json().catch(() => ({ message: 'Error en el servidor.' }));
    //     setStatus('error');
    //     setErrorMessage(errorData.message || 'Hubo un error al enviar el mensaje.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   setStatus('error');
    //   setErrorMessage('Error de conexión. Inténtalo de nuevo más tarde.');
    // }
    setStatus('success');
    (window as any).grecaptcha?.reset();
  };

  return (
    <div className="pb-20 relative z-10">
      <SEO 
        title={contact.meta.title} 
        description={contact.meta.description} 
      />

{/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={contact.hero.bgimage} 
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
            <span className="text-sm font-medium text-brand-green uppercase tracking-wider">{contact.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {contact.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-glass-muted max-w-3xl mx-auto leading-relaxed">
            {contact.hero.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl pt-10 mx-auto px-4 sm:px-6 lg:px-8">
               
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form (Left) */}
          <GlassCard className="lg:row-span-2 bg-gradient-to-br from-emerald-950/50 to-brand-green/10 border-white/5">
            {/* <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{contact.form.title}</h3> */}
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="text-brand-dark w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
                <p className="text-glass-muted mb-8">Gracias por contactarnos. Te responderemos lo antes posible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-brand-green text-brand-dark font-bold px-8 py-3 rounded-lg hover:bg-white transition-all"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">{contact.form.firstName}</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors placeholder-gray-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">{contact.form.lastName}</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors placeholder-gray-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{contact.form.email}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors placeholder-gray-500"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">{contact.form.topic}</label>
                    <input 
                      type="text" 
                      id="topic" 
                      name="topic"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors placeholder-gray-500"
                      placeholder="Consulta General"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{contact.form.message}</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4} 
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors placeholder-gray-500"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>

                {/* reCAPTCHA Widget */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium text-center">{errorMessage}</p>
                )}
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full bg-brand-green text-brand-dark font-bold py-4 rounded-lg shadow-lg hover:bg-white hover:text-brand-green transition-all flex justify-center items-center gap-2 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? 'Enviando...' : contact.form.submit}
                </button>
              </form>
            )}
          </GlassCard>

          {/* Contact Info (Right) */}
          <div className="space-y-8 pt-4">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white tracking-wider mb-4">
                 <Send className="w-3 h-3" />
                 {contact.infoSection?.badge}
               </div>
               <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                 {contact.infoSection?.title}
               </h2>
               <p className="text-glass-muted text-lg">
                 {contact.infoSection?.description}
               </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Dynamically Map Locations */}
                {siteContent.brand.contact.locations?.slice(0, 2).map((loc, idx) => (
                  <div key={idx} className="space-y-2">
                     <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-2">
                       <MapPin className="text-brand-green w-5 h-5" />
                     </div>
                     <h4 className="text-white font-bold">{loc.country}</h4>
                     <p className="text-sm text-glass-muted leading-relaxed">{loc.address}</p>
                  </div>
                ))}

                {/* Email */}
                <div className="space-y-2">
                   <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-2">
                     <Mail className="text-brand-green w-5 h-5" />
                   </div>
                   <h4 className="text-white font-bold">Email</h4>
                   <p className="text-sm text-glass-muted">{siteContent.brand.contact.email}</p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                   <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-2">
                     <Phone className="text-brand-green w-5 h-5" />
                   </div>
                   <h4 className="text-white font-bold">Teléfono</h4>
                   <p className="text-sm text-glass-muted">{siteContent.brand.contact.phone}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};