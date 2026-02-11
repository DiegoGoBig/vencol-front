import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { fetchWPPageBySlug } from '../lib/wordpress';
import { WPPage } from '../types';

export const PageDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WPPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    fetchWPPageBySlug(slug)
      .then((wpPage) => {
        if (wpPage) {
          setPage(wpPage);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.warn('Error fetching WP page:', err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const readingTime = page
    ? Math.max(1, Math.ceil(page.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))
    : 0;

  if (loading) {
    return (
      <div className="pt-48 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/10 rounded w-1/3" />
            <div className="h-[40vh] bg-white/5 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-6 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-5/6" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white relative z-10">
        <SEO title="Página no encontrada" />
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
          <p className="text-glass-muted mb-6">La página que buscas no existe o ha sido movida.</p>
          <Link to="/" className="text-brand-green hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <SEO
        title={page.title}
        description={page.excerpt}
        image={page.image}
        url={`${siteContent.meta.siteUrl}/${page.slug}`}
      />

      {/* Hero Header */}
      <div className={`relative ${page.image ? 'h-[50vh] md:h-[60vh]' : 'h-[35vh]'} flex items-end overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          {page.image ? (
            <>
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]" />
            </>
          ) : (
            <div className="absolute inset-0 bg-brand-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link to="/" className="inline-flex items-center text-glass-muted hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-glass-muted text-sm inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {page.date}
            </span>
            <span className="text-glass-muted text-sm inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min de lectura
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Page Content — Full Width */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 md:p-12">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-brand-green
                prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6
                prose-strong:text-white
                prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:mb-2
                prose-blockquote:border-l-brand-green prose-blockquote:text-gray-400 prose-blockquote:italic
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
              "
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </GlassCard>

          {/* CTA */}
          <GlassCard className="mt-8 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg">¿Te interesa saber más?</h3>
              <p className="text-glass-muted text-sm mt-1">Contáctanos para una asesoría personalizada.</p>
            </div>
            <Link
              to="/contacto"
              className="glass-button px-6 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-all whitespace-nowrap"
            >
              Contactar Experto
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
