import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';

export const Faq: React.FC = () => {
  const { faq } = siteContent.home;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="relative z-10 pt-20">
      <SEO
        title="Preguntas Frecuentes | Vencol"
        description="Resolvemos las dudas más comunes sobre nuestras almohadillas absorbentes, empaques flexibles y soluciones para la industria de proteínas."
        image={faq.image}
      />

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-brand-green text-xs font-bold tracking-wider backdrop-blur-md mb-6 uppercase">
                <MessageCircle className="w-3 h-3 mr-2" />
                {faq.badge}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {faq.title.prefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-300">
                  {faq.title.highlight}
                </span>{' '}
                {faq.title.suffix}
              </h1>
              {faq.description && (
                <p className="text-glass-muted text-lg mb-8">{faq.description}</p>
              )}

              <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 w-full mt-8 border border-white/10 shadow-2xl">
                <img
                  src={faq.image}
                  alt="Soporte Vencol"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">{faq.cta.text}</p>
                  <Link to="/contacto" className="text-brand-green text-sm hover:underline">
                    {faq.cta.linkText} &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {faq.items.map((item, index) => {
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
                      <h2 className={`text-lg font-bold pr-4 transition-colors ${isOpen ? 'text-brand-green' : 'text-white'}`}>
                        {item.question}
                      </h2>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
};
