import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { fetchBlogPosts } from '../lib/wordpress';
import { BlogPost } from '../types';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blog } = siteContent;
  const [posts, setPosts] = useState<BlogPost[]>(blog.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((wpPosts) => {
        if (wpPosts.length > 0) setPosts(wpPosts);
      })
      .catch((err) => console.warn('Using fallback data:', err))
      .finally(() => setLoading(false));
  }, []);

  const post = posts.find(p => p.slug === slug);
  const relatedPosts = posts.filter(p => p.slug !== slug).slice(0, 3);

  // Estimate reading time from content
  const readingTime = post 
    ? Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white relative z-10">
        <SEO title="Artículo no encontrado" />
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Artículo no encontrado</h2>
          <p className="text-glass-muted mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog" className="text-brand-green hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        image={post.image}
        url={`${siteContent.meta.siteUrl}/blog/${post.slug}`}
      />

      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col items-center text-center">
          <Link to="/blog" className="inline-flex items-center text-glass-muted hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Blog
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <span className="bg-brand-green/90 px-3 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wide inline-flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="text-glass-muted text-sm inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-glass-muted text-sm inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min de lectura
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Article */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8 md:p-12">
                <div 
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-brand-green
                    prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6
                    prose-strong:text-white
                    prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline
                    prose-ul:text-gray-300 prose-ol:text-gray-300
                    prose-li:mb-2
                    prose-blockquote:border-l-brand-green prose-blockquote:text-gray-400 prose-blockquote:italic
                    prose-img:rounded-xl prose-img:border prose-img:border-white/10
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </GlassCard>

              {/* Share / CTA */}
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

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="bg-white/5 border-white/10 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                          <img 
                            src={related.image} 
                            alt={related.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-brand-green transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <span className="text-xs text-glass-muted mt-1 block">{related.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link 
                    to="/blog" 
                    className="text-brand-green text-sm font-semibold hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Ver todos los artículos &rarr;
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
