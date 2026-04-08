import { BlogPost, WPPage } from '../types';

const WP_API_URL = 'https://cms.gobigagency.co/vencol/wp-json/wp/v2';

interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || '';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function mapWPPostToBlogPost(post: WPPost): BlogPost {
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://picsum.photos/400/250';

  const category =
    post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General';

  // mock keywords from title for demo purposes
  const keywords = post.title.rendered.split(' ').filter(w => w.length > 4).slice(0, 3).join(', ').toLowerCase();

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: formatDate(post.date),
    image: featuredImage,
    category,
    status: post.status === 'publish' ? 'Publicado' : 'Borrador',
    keywords
  };
}

function mapWPPageToWPPage(page: WPPost): WPPage {
  const featuredImage =
    page._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '';

  return {
    id: page.id,
    slug: page.slug,
    title: stripHtml(page.title.rendered),
    content: page.content.rendered,
    excerpt: stripHtml(page.excerpt.rendered),
    date: formatDate(page.date),
    image: featuredImage,
  };
}

export async function fetchBlogPosts(perPage = 10): Promise<BlogPost[]> {
  const res = await fetch(
    `${WP_API_URL}/posts?per_page=${perPage}&_embed`
  );

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status}`);
  }

  const posts: WPPost[] = await res.json();
  return posts.map(mapWPPostToBlogPost);
}

export async function fetchBlogPostsByMonth(year: number, month: number, perPage = 10): Promise<BlogPost[]> {
  const startDate = new Date(year, month - 1, 1).toISOString();
  // Get the first day of the next month
  const endDate = new Date(year, month, 1).toISOString();

  const user = import.meta.env.VITE_WORDPRESS_USER;
  const pass = import.meta.env.VITE_WORDPRESS_APP_PASSWORD;
  
  const headers: HeadersInit = {};
  let statusParam = '';

  if (user && pass) {
    headers['Authorization'] = 'Basic ' + btoa(`${user}:${pass}`);
    statusParam = '&status=any';
  }

  const res = await fetch(
    `${WP_API_URL}/posts?per_page=${perPage}&after=${startDate}&before=${endDate}&_embed${statusParam}`,
    { headers }
  );

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status}`);
  }

  const posts: WPPost[] = await res.json();
  return posts.map(mapWPPostToBlogPost);
}

export async function fetchWPPageBySlug(slug: string): Promise<WPPage | null> {
  const res = await fetch(
    `${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}&_embed`
  );

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status}`);
  }

  const pages: WPPost[] = await res.json();
  if (pages.length === 0) return null;
  return mapWPPageToWPPage(pages[0]);
}
