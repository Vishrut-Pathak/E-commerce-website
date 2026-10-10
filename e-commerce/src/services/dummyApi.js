// Service to fetch dummy products for categories from DummyJSON with fallback dummy data
import { formatImageUrl } from '../utils/imageHelper';

// Verified, live DummyJSON image URLs tested with 200 OK
const DUMMY_FALLBACK_PRODUCTS = {
  men: [
    {
      id: "m-001",
      image: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
      company: "Fashion Trends",
      item_name: "Blue & Black Checked Casual Slim Shirt",
      original_price: 1999,
      current_price: 799,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.4, count: 1820 },
      category: "men"
    },
    {
      id: "m-002",
      image: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp",
      company: "Gigabyte",
      item_name: "Aorus Men Edition Graphic T-Shirt",
      original_price: 1499,
      current_price: 599,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.3, count: 940 },
      category: "men"
    },
    {
      id: "m-003",
      image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
      company: "Nike",
      item_name: "Air Jordan 1 High OG Sneakers",
      original_price: 16999,
      current_price: 11999,
      discount_percentage: 29,
      return_period: 14,
      delivery_date: "11 Oct 2026",
      rating: { stars: 4.8, count: 3400 },
      category: "men"
    },
    {
      id: "m-004",
      image: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
      company: "Fossil",
      item_name: "Chronograph Brown Leather Belt Watch",
      original_price: 8999,
      current_price: 4999,
      discount_percentage: 44,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.6, count: 870 },
      category: "men"
    }
  ],
  women: [
    {
      id: "w-001",
      image: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp",
      company: "Zara",
      item_name: "Flared Black Evening Gown Dress",
      original_price: 3990,
      current_price: 1990,
      discount_percentage: 50,
      return_period: 14,
      delivery_date: "11 Oct 2026",
      rating: { stars: 4.7, count: 980 },
      category: "women"
    },
    {
      id: "w-002",
      image: "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp",
      company: "Carlton London",
      item_name: "Gold-Plated Emerald Green Crystal Earrings",
      original_price: 2499,
      current_price: 999,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.5, count: 430 },
      category: "women"
    },
    {
      id: "w-003",
      image: "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/thumbnail.webp",
      company: "Lavie",
      item_name: "Structured Shoulder Handbag with Pouch",
      original_price: 4490,
      current_price: 1799,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.4, count: 1290 },
      category: "women"
    },
    {
      id: "w-004",
      image: "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/thumbnail.webp",
      company: "Heshe",
      item_name: "Premium Genuine Leather Tote Handbag",
      original_price: 6999,
      current_price: 3899,
      discount_percentage: 44,
      return_period: 14,
      delivery_date: "15 Oct 2026",
      rating: { stars: 4.6, count: 760 },
      category: "women"
    }
  ],
  kids: [
    {
      id: "k-001",
      image: "https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp",
      company: "Hopscotch",
      item_name: "Girls Floral Pattern Cotton Party Dress",
      original_price: 1999,
      current_price: 699,
      discount_percentage: 65,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.5, count: 620 },
      category: "kids"
    },
    {
      id: "k-002",
      image: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp",
      company: "Ray-Ban Kids",
      item_name: "Junior UV Protection Sunglasses",
      original_price: 2490,
      current_price: 1245,
      discount_percentage: 50,
      return_period: 14,
      delivery_date: "11 Oct 2026",
      rating: { stars: 4.3, count: 280 },
      category: "kids"
    },
    {
      id: "k-003",
      image: "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp",
      company: "Polaroid Junior",
      item_name: "Kids Retro Wayfarer UV Sunglasses",
      original_price: 1799,
      current_price: 899,
      discount_percentage: 50,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.4, count: 310 },
      category: "kids"
    },
    {
      id: "k-004",
      image: "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp",
      company: "Spalding",
      item_name: "Junior All-Weather Sports Football",
      original_price: 1299,
      current_price: 599,
      discount_percentage: 54,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.7, count: 540 },
      category: "kids"
    }
  ],
  "home-living": [
    {
      id: "h-001",
      image: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
      company: "Home Centre",
      item_name: "Boho Macrame Hanging Swing Planter",
      original_price: 2499,
      current_price: 1199,
      discount_percentage: 52,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.6, count: 1100 },
      category: "home-living"
    },
    {
      id: "h-002",
      image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
      company: "IKEA",
      item_name: "Solid Oak Minimalist Platform Bed",
      original_price: 49999,
      current_price: 29999,
      discount_percentage: 40,
      return_period: 14,
      delivery_date: "16 Oct 2026",
      rating: { stars: 4.7, count: 680 },
      category: "home-living"
    },
    {
      id: "h-003",
      image: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
      company: "DDecor",
      item_name: "Organic Bamboo Cooking Utensil Set",
      original_price: 1499,
      current_price: 649,
      discount_percentage: 57,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.5, count: 420 },
      category: "home-living"
    },
    {
      id: "h-004",
      image: "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp",
      company: "Urban Ladder",
      item_name: "Family Tree Multi-Photo Wall Frame",
      original_price: 1999,
      current_price: 899,
      discount_percentage: 55,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.3, count: 910 },
      category: "home-living"
    }
  ],
  beauty: [
    {
      id: "b-001",
      image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      company: "Essence",
      item_name: "Lash Princess False Effect Volumizing Mascara",
      original_price: 999,
      current_price: 549,
      discount_percentage: 45,
      return_period: 14,
      delivery_date: "11 Oct 2026",
      rating: { stars: 4.8, count: 4200 },
      category: "beauty"
    },
    {
      id: "b-002",
      image: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      company: "Glamour",
      item_name: "Ultra-Pigmented Nude Eyeshadow Palette",
      original_price: 1899,
      current_price: 999,
      discount_percentage: 47,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.7, count: 1800 },
      category: "beauty"
    },
    {
      id: "b-003",
      image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
      company: "Calvin Klein",
      item_name: "CK One Eau De Toilette Natural Spray 100ml",
      original_price: 5500,
      current_price: 3850,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.8, count: 2900 },
      category: "beauty"
    },
    {
      id: "b-004",
      image: "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp",
      company: "Olay",
      item_name: "Ultra Moisture Shea Butter Nourishing Body Wash",
      original_price: 1199,
      current_price: 699,
      discount_percentage: 42,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.6, count: 1450 },
      category: "beauty"
    }
  ]
};

// Map URL categories to DummyJSON endpoint category slugs
const DUMMY_API_MAPPINGS = {
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  women: ["womens-dresses", "womens-jewellery", "womens-bags"],
  kids: ["tops", "sunglasses", "sports-accessories"],
  "home-living": ["home-decoration", "furniture", "kitchen-accessories"],
  beauty: ["beauty", "fragrances", "skin-care"]
};

// Normalize a DummyJSON product to the exact e-commerce schema
function normalizeProduct(product, categorySlug) {
  const inrPrice = Math.round(product.price * 82);
  const discount = Math.round(product.discountPercentage || 25);
  const originalPrice = Math.round(inrPrice / (1 - discount / 100));

  const rawImage = product.thumbnail || product.images?.[0];
  const image = formatImageUrl(rawImage, categorySlug);

  return {
    id: `dj-${product.id}`,
    image: image,
    company: product.brand || (product.title ? product.title.split(" ")[0] : "Premium"),
    item_name: product.title,
    original_price: originalPrice,
    current_price: inrPrice,
    discount_percentage: discount,
    return_period: 14,
    delivery_date: "3-5 Business Days",
    rating: {
      stars: Number((product.rating || 4.2).toFixed(1)),
      count: product.reviews?.length ? product.reviews.length * 75 : 240
    },
    category: categorySlug
  };
}

/**
 * Fetch items for a category from DummyJSON API with automatic fallback
 */
export async function fetchCategoryProducts(categorySlug) {
  const normCategory = categorySlug ? categorySlug.toLowerCase() : "all";
  const apiCategories = DUMMY_API_MAPPINGS[normCategory];

  if (!apiCategories) {
    return DUMMY_FALLBACK_PRODUCTS[normCategory] || [];
  }

  try {
    // Pick the primary category and secondary category to get rich product list
    const requests = apiCategories.slice(0, 2).map((cat) =>
      fetch(`https://dummyjson.com/products/category/${cat}?limit=4`)
        .then((res) => {
          if (!res.ok) throw new Error("API response not ok");
          return res.json();
        })
        .then((data) => (data.products || []).map((p) => normalizeProduct(p, normCategory)))
        .catch(() => [])
    );

    const results = await Promise.all(requests);
    const combined = results.flat();

    if (combined && combined.length > 0) {
      return combined;
    }
  } catch (error) {
    console.warn("Could not fetch from DummyJSON, using offline fallback:", error);
  }

  return DUMMY_FALLBACK_PRODUCTS[normCategory] || [];
}

export default {
  fetchCategoryProducts,
  DUMMY_FALLBACK_PRODUCTS
};
