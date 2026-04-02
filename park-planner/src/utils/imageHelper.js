
export function getOptimizedImage(url) {
  if (!url) return null;

  return `https://res.cloudinary.com/dskcvlu3o/image/fetch/w_400,h_225,c_fill,q_auto,f_auto/${encodeURIComponent(url)}`;
}