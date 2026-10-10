// Service to fetch dummy products for categories from DummyJSON with fallback dummy data

const DUMMY_FALLBACK_PRODUCTS = {
  men: [
    {
      id: "m-001",
      image: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-checked-casual-shirt/1.webp",
      company: "Roadster",
      item_name: "Blue & Navy Checked Slim Casual Shirt",
      original_price: 1899,
      current_price: 799,
      discount_percentage: 58,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.4, count: 1820 },
      category: "men"
    },
    {
      id: "m-002",
      image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-retro-high/1.webp",
      company: "Nike",
      item_name: "Air Jordan Retro High Sneakers",
      original_price: 16999,
      current_price: 11999,
      discount_percentage: 29,
      return_period: 14,
      delivery_date: "11 Oct 2026",
      rating: { stars: 4.8, count: 3400 },
      category: "men"
    },
    {
      id: "m-003",
      image: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-strap-watch/1.webp",
      company: "Fossil",
      item_name: "Chronograph Brown Leather Strap Watch",
      original_price: 10995,
      current_price: 6595,
      discount_percentage: 40,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.6, count: 870 },
      category: "men"
    },
    {
      id: "m-004",
      image: "https://cdn.dummyjson.com/product-images/mens-shirts/man-oversized-printed-t-shirt/1.webp",
      company: "HRX",
      item_name: "Oversized Pure Cotton Graphic T-Shirt",
      original_price: 1299,
      current_price: 499,
      discount_percentage: 61,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.3, count: 2150 },
      category: "men"
    }
  ],
  women: [
    {
      id: "w-001",
      image: "https://cdn.dummyjson.com/product-images/womens-dresses/black-sleeveless-maxi-dress/1.webp",
      company: "Zara",
      item_name: "Flared Black Sleeveless Evening Maxi Dress",
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
      image: "https://cdn.dummyjson.com/product-images/womens-jewellery/green-choker-necklace/1.webp",
      company: "Carlton London",
      item_name: "Gold-Plated Emerald Green Choker Necklace",
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
      image: "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women-leather-bag/1.webp",
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
      image: "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-pointy-heels/1.webp",
      company: "Calvin Klein",
      item_name: "Pointed Toe Stiletto Pumps",
      original_price: 7999,
      current_price: 4399,
      discount_percentage: 45,
      return_period: 14,
      delivery_date: "15 Oct 2026",
      rating: { stars: 4.6, count: 310 },
      category: "women"
    }
  ],
  kids: [
    {
      id: "k-001",
      image: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
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
      image: "https://cdn.dummyjson.com/product-images/sunglasses/classic-black-sunglasses/1.webp",
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
      image: "https://cdn.dummyjson.com/product-images/sports-accessories/badminton-racket/1.webp",
      company: "Yonex Junior",
      item_name: "Junior Lightweight Badminton Kit",
      original_price: 1599,
      current_price: 899,
      discount_percentage: 43,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.7, count: 540 },
      category: "kids"
    },
    {
      id: "k-004",
      image: "https://cdn.dummyjson.com/product-images/tops/girl-round-neck-t-shirt/1.webp",
      company: "Gini & Jony",
      item_name: "Boys & Girls Graphic Print Cotton Tees",
      original_price: 1199,
      current_price: 479,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.4, count: 890 },
      category: "kids"
    }
  ],
  "home-living": [
    {
      id: "h-001",
      image: "https://cdn.dummyjson.com/product-images/home-decoration/plant-hanger-for-wall/1.webp",
      company: "Home Centre",
      item_name: "Boho Macrame Wall Hanging Planter",
      original_price: 1499,
      current_price: 599,
      discount_percentage: 60,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.6, count: 1100 },
      category: "home-living"
    },
    {
      id: "h-002",
      image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      company: "IKEA",
      item_name: "Minimalist Wooden Side Lamp & Stand",
      original_price: 4999,
      current_price: 2499,
      discount_percentage: 50,
      return_period: 14,
      delivery_date: "16 Oct 2026",
      rating: { stars: 4.7, count: 680 },
      category: "home-living"
    },
    {
      id: "h-003",
      image: "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-cutlery-set/1.webp",
      company: "DDecor",
      item_name: "Organic Bamboo Wooden Dinner & Cutlery Set",
      original_price: 1899,
      current_price: 849,
      discount_percentage: 55,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.5, count: 420 },
      category: "home-living"
    },
    {
      id: "h-004",
      image: "https://cdn.dummyjson.com/product-images/home-decoration/key-holder/1.webp",
      company: "Urban Ladder",
      item_name: "Carved Teakwood Decorative Key Organizer",
      original_price: 1299,
      current_price: 499,
      discount_percentage: 61,
      return_period: 14,
      delivery_date: "14 Oct 2026",
      rating: { stars: 4.3, count: 910 },
      category: "home-living"
    }
  ],
  beauty: [
    {
      id: "b-001",
      image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
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
      image: "https://cdn.dummyjson.com/product-images/fragrances/dior-sauvage-eau-de-parfum/1.webp",
      company: "Dior",
      item_name: "Sauvage Eau De Parfum Natural Spray 100ml",
      original_price: 11500,
      current_price: 9200,
      discount_percentage: 20,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.9, count: 5800 },
      category: "beauty"
    },
    {
      id: "b-003",
      image: "https://cdn.dummyjson.com/product-images/skin-care/hyaluronic-acid-serum/1.webp",
      company: "The Ordinary",
      item_name: "Hyaluronic Acid 2% + B5 Hydrating Face Serum",
      original_price: 1250,
      current_price: 750,
      discount_percentage: 40,
      return_period: 14,
      delivery_date: "12 Oct 2026",
      rating: { stars: 4.7, count: 3100 },
      category: "beauty"
    },
    {
      id: "b-004",
      image: "https://cdn.dummyjson.com/product-images/beauty/red-matte-lipstick/1.webp",
      company: "M.A.C",
      item_name: "Retro Matte Longwear Lipstick - Ruby Woo",
      original_price: 2100,
      current_price: 1575,
      discount_percentage: 25,
      return_period: 14,
      delivery_date: "13 Oct 2026",
      rating: { stars: 4.8, count: 2600 },
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

  return {
    id: `dj-${product.id}`,
    image: product.thumbnail || product.images?.[0] || "images/1.jpg",
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
