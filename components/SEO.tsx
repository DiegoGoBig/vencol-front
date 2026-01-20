import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteContent } from '../data/data';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website' 
}) => {
  const { meta } = siteContent;
  
  const seo = {
    title: title || meta.defaultTitle,
    description: description || meta.defaultDescription,
    image: image || meta.defaultImage,
    url: url || meta.siteUrl,
  };

  return (
    <Helmet
      title={title}
      titleTemplate={meta.titleTemplate}
      defaultTitle={meta.defaultTitle}
    >
      <html lang="es" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href={meta.favicon} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={meta.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};