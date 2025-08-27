// Utility function to construct full URLs for Strapi media
export const getStrapiUrl = (url: string | null | undefined): string => {
  if (!url) return '';

  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Remove leading slash if present to avoid double slashes
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  // Construct full URL using environment variable
  const baseUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}/${cleanUrl}`;
};
