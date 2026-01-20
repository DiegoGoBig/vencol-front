import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';

export const Blog: React.FC = () => {
  const { blog } = siteContent;
  return (
    <div className="pt-48 pb-20 relative z-10">
      <SEO 
        title={blog.meta.title} 
        description={blog.meta.description} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.hero.title}</h1>
          <p className="text-xl text-glass-muted">
            {blog.hero.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.posts.map((post) => (
            <GlassCard key={post.id} hoverEffect className="p-0 overflow-hidden flex flex-col group h-full">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-brand-green/90 px-3 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs text-gray-400 mb-2">{post.date}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">{post.title}</h3>
                <p className="text-glass-muted text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                <button className="text-left text-brand-green text-sm font-semibold hover:text-white transition-colors mt-auto">
                  Leer artículo completo &rarr;
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
};