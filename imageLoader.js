export default function netlifyImageLoader({ src, width, quality }) {
  // For local development, return the original URL
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  
  // Use Netlify Image CDN in production
  const url = new URL(src, 'https://rami-next.netlify.app');
  const params = new URLSearchParams();
  
  if (width) {
    params.set('w', width.toString());
  }
  
  if (quality) {
    params.set('q', quality.toString());
  }
  
  return `/.netlify/images?url=${encodeURIComponent(url.href)}&${params.toString()}`;
}

