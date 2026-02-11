import { BlogPost } from '../types';

const WP_API_URL = 'https://cms.gobigagency.co/vencol/wp-json/wp/v2';

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
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

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    date: formatDate(post.date),
    image: featuredImage,
    category,
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
