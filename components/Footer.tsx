import React from 'react';
import { Mail, Phone, Leaf, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { siteContent } from '../data/data';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.24 8.24 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.12z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const { brand } = siteContent;
  
  const getSocialIcon = (iconName: string) => {
    switch(iconName) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />; 
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'tiktok': return <TikTokIcon className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer className="glass-panel border-t border-white/10 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={siteContent.header.logo} alt={brand.name} width={100} height={100} />
            </div>
            <p className="text-glass-muted text-sm leading-relaxed mb-6">
              {brand.description}
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4 max-w-sm">
               <h4 className="text-white font-bold text-sm tracking-wide">{siteContent.newsletter?.title}</h4>
               <p className="text-xs text-glass-muted">{siteContent.newsletter?.description}</p>
               <form className="flex flex-col sm:flex-row gap-2">
                 <input 
                   type="email" 
                   placeholder={siteContent.newsletter?.placeholder} 
                   className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-green/50 placeholder:text-white/20"
                 />
                 <button 
                   type="button" 
                   className="bg-brand-green text-brand-dark font-bold text-xs uppercase px-4 py-2 rounded-lg hover:bg-white hover:text-brand-green transition-colors"
                 >
                   {siteContent.newsletter?.buttonText}
                 </button>
               </form>
            </div>
          </div>         

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-glass-muted hover:text-white transition-colors">
                <Mail className="h-5 w-5 mr-2 text-brand-green shrink-0" />
                <span>{brand.contact.email}</span>
              </li>
              <li className="flex items-center text-glass-muted hover:text-white transition-colors">
                <Phone className="h-5 w-5 mr-2 text-brand-green shrink-0" />
                <span>{brand.contact.phone}</span>
              </li>
            </ul>
          </div>

           {/* Locations */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ubicaciones</h3>
            <ul className="space-y-4">
              {brand.contact.locations?.map((loc, idx) => (
                <li key={idx} className="flex flex-col text-glass-muted hover:text-white transition-colors">
                  <span className="font-bold text-brand-green text-xs uppercase mb-1">{loc.country}</span>
                  <span className="text-sm leading-snug">{loc.address}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-glass-muted hover:text-brand-green text-sm transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-glass-muted hover:text-brand-green text-sm transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-glass-muted">
            &copy; {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            {brand.social.socialLinks?.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-green hover:text-brand-dark transition-all duration-300 hover:scale-110"
                aria-label={link.label}
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};