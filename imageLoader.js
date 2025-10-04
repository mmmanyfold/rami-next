export default function netlifyImageLoader({ src, width, quality }) {
  // For local development, return the original URL
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  
  // For absolute URLs (remote images), use them directly with Netlify Image CDN
  const params = new URLSearchParams();
  params.set('url', src);
  
  if (width) {
    params.set('w', width.toString());
  }
  
  if (quality) {
    params.set('q', quality.toString());
  }
  
  return `/.netlify/images?${params.toString()}`;
}

