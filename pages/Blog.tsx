import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { siteContent } from '../data/data';
import { SEO } from '../components/SEO';
import { fetchBlogPosts } from '../lib/wordpress';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const { blog } = siteContent;
  const [posts, setPosts] = useState<BlogPost[]>(blog.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((wpPosts) => {
        if (wpPosts.length > 0) setPosts(wpPosts);
      })
      .catch((err) => console.warn('Error fetching WP posts, using fallback:', err))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="p-0 overflow-hidden flex flex-col h-full animate-pulse">
                <div className="h-56 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block h-full">
                <GlassCard hoverEffect className="p-0 overflow-hidden flex flex-col group h-full">
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
                    <span className="text-left text-brand-green text-sm font-semibold hover:text-white transition-colors mt-auto">
                      Leer artículo completo &rarr;
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};