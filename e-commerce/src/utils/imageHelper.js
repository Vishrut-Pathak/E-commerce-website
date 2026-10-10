/**
 * Helper utilities for resolving and falling back product images safely.
 * Fully compatible with Vite base path configuration (e.g. /E-commerce-website/).
 */

const BASE = (import.meta.env?.BASE_URL || '/').replace(/\/+$/, '') + '/';

/**
 * Resolves a public asset path against Vite's base URL
 */
export function getPublicAssetUrl(relativePath) {
  if (!relativePath) return '';
  const cleanPath = relativePath.replace(/^\/+/, '');
  return `${BASE}${cleanPath}`;
}

// Category to reliable local bundled images
const CATEGORY_LOCAL_FALLBACKS = {
  men: 'images/5.jpg',         // Roadster Cotton T-shirt
  women: 'images/2.jpg',       // Cukoo Swimming Dress
  kids: 'images/4.jpg',        // Adidas Jersey
  'home-living': 'images/7.jpg',// Regular Shorts / Living
  beauty: 'images/1.jpg'       // Carlton London Studs
};

/**
 * Returns a reliable local fallback image for a category
 */
export function getCategoryFallbackImage(category) {
  const cat = (category || '').toLowerCase().trim();
  const rel = CATEGORY_LOCAL_FALLBACKS[cat] || 'images/1.jpg';
  return getPublicAssetUrl(rel);
}

/**
 * Returns an inline SVG data URI placeholder for completely resilient offline fallback
 */
export function getPlaceholderSvg(title = "Product", category = "Store") {
  const safeTitle = (title || "Product").slice(0, 22).replace(/<[^>]*>?/gm, '');
  const cat = (category || "Fashion").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400" fill="none">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff5f7"/>
        <stop offset="100%" stop-color="#f8fafc"/>
      </linearGradient>
      <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff3f6c"/>
        <stop offset="100%" stop-color="#ff758c"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="150" cy="165" r="48" fill="white" filter="drop-shadow(0 4px 12px rgba(255, 63, 108, 0.12))"/>
    <path d="M138 152 L133 159 V180 C133 182.2 134.8 184 137 184 H163 C165.2 184 167 182.2 167 180 V159 L162 152 Z" stroke="url(#primary)" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
    <path d="M144 164 C144 167.3 146.7 170 150 170 C153.3 170 156 167.3 156 164" stroke="url(#primary)" stroke-width="2.5" stroke-linecap="round"/>
    <text x="150" y="242" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" fill="#ff3f6c" text-anchor="middle" letter-spacing="1.5">${cat}</text>
    <text x="150" y="264" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#282c3f" text-anchor="middle">${safeTitle}</text>
    <text x="150" y="282" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="500" fill="#94969f" text-anchor="middle">Buyit Store</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Normalizes any image path safely to prevent broken URLs or crashes
 */
export function formatImageUrl(img, category) {
  if (!img || typeof img !== 'string') {
    return getCategoryFallbackImage(category);
  }
  const trimmed = img.trim();
  if (!trimmed) {
    return getCategoryFallbackImage(category);
  }
  // Full remote URLs or data URIs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  // If it already starts with BASE, return it as is
  if (trimmed.startsWith(BASE)) {
    return trimmed;
  }
  // Otherwise resolve relative to BASE
  return getPublicAssetUrl(trimmed);
}

/**
 * Resilient error handler for <img> elements
 */
export function handleImageError(e, category, itemName) {
  const target = e.currentTarget;
  if (!target) return;

  // Prevent infinite error trigger loop
  target.onerror = null;

  const fallback = getCategoryFallbackImage(category);
  const currentSrc = target.getAttribute('src') || target.src || '';

  // If we haven't tried the category fallback yet, try it
  if (!currentSrc.includes(fallback)) {
    target.src = fallback;
    // Set fallback on next error to inline SVG
    target.onerror = () => {
      target.onerror = null;
      target.src = getPlaceholderSvg(itemName, category);
    };
  } else {
    // Already failed on fallback, use guaranteed inline SVG
    target.src = getPlaceholderSvg(itemName, category);
  }
}
