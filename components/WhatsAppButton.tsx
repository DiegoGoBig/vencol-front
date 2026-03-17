import React from 'react';

export function WhatsAppButton() {
  const whatsappNumber = '+573113391113';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;
  const iconUrl = 'http://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/03/—Pngtree—whatsapp-icon-vector_8704827.png';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 sm:bottom-8 sm:right-8 group">
      <span className="bg-white text-brand-dark px-4 py-2 rounded-lg shadow-lg text-sm font-semibold opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
        chatea con nosotros
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'whatsapp_click', {
              'event_category': 'Contact',
              'event_label': 'WhatsApp Floating Button'
            });
          }
        }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25b411] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <img
          src={iconUrl}
          alt="WhatsApp"
          className="h-12 w-12"
          // Since it's an SVG from a URL, we use standard img tag
        />
      </a>
    </div>
  );
}
