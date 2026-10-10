import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomeItem from '../Components/HomeItem';
import { itemsActions } from '../store/itemSlice';
import { filterActions } from '../store/filterSlice';
import { fetchCategoryProducts } from '../services/dummyApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import { FiShoppingBag, FiSearch, FiRefreshCw } from 'react-icons/fi';

const CATEGORY_TITLES = {
  men: "Men's Fashion & Essentials",
  women: "Women's Collection & Style",
  kids: "Kids & Young Styles",
  "home-living": "Home & Living Décor",
  beauty: "Beauty, Fragrance & Skincare"
};

const CATEGORY_SUBTITLES = {
  men: "Explore shirts, sneakers, accessories, and grooming essentials",
  women: "Dresses, jewellery, bags, footwear, and trending styles",
  kids: "Comfortable daily wear, tops, sunglasses, and cool accessories",
  "home-living": "Elevate your living space with decor, organizers, and kitchen essentials",
  beauty: "Lash mascaras, luxury perfumes, facial serums, and cosmetics"
};

const Home = () => {
  const { categorySlug } = useParams();
  const dispatch = useDispatch();

  const allItems = useSelector((store) => store.items);
  const { searchQuery } = useSelector((store) => store.filter);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // Sync route param with filter slice and fetch if needed
  useEffect(() => {
    if (categorySlug) {
      dispatch(filterActions.setActiveCategory(categorySlug));

      // Check if we already have items for this category
      const hasCategoryItems = allItems.some(
        (item) => item.category === categorySlug.toLowerCase()
      );

      if (!hasCategoryItems) {
        setIsCategoryLoading(true);
        fetchCategoryProducts(categorySlug)
          .then((newItems) => {
            if (newItems && newItems.length > 0) {
              dispatch(itemsActions.addCategoryItems(newItems));
            }
          })
          .catch((err) => {
            console.error("Failed to load category products:", err);
          })
          .finally(() => {
            setIsCategoryLoading(false);
          });
      }
    } else {
      dispatch(filterActions.setActiveCategory("all"));
    }
  }, [categorySlug, dispatch]);

  // Determine which items to display
  let displayedItems = allItems;

  if (categorySlug) {
    const slug = categorySlug.toLowerCase();
    displayedItems = allItems.filter((item) => {
      if (item.category) {
        return item.category.toLowerCase() === slug;
      }

      const name = item.item_name?.toLowerCase() || "";
      const company = item.company?.toLowerCase() || "";

      // Explicitly identify Women's items (CUKOO, NUEVOSDAMAS, skirts, dresses)
      const isWomenItem =
        name.includes("women") ||
        company.includes("cukoo") ||
        company.includes("nuevosdamas") ||
        name.includes("dress") ||
        name.includes("skirt");

      if (isWomenItem) {
        return slug === "women";
      }

      if (slug === "men") {
        return (
          (/\bmen\b/i.test(name) ||
            /\bmens\b/i.test(name) ||
            name.includes("jersey") ||
            name.includes("t-shirt") ||
            name.includes("shorts")) &&
          !name.includes("women")
        );
      }
      if (slug === "women") {
        return isWomenItem;
      }
      if (slug === "beauty") {
        return (
          name.includes("studs") ||
          name.includes("deodrant") ||
          name.includes("perfume")
        );
      }
      return false;
    });
  }

  // Apply search query filter if user typed anything
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    displayedItems = displayedItems.filter(
      (item) =>
        item.item_name?.toLowerCase().includes(q) ||
        item.company?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }

  const categoryName = categorySlug
    ? CATEGORY_TITLES[categorySlug.toLowerCase()] || categorySlug.toUpperCase()
    : "Trending Catalog";

  const categorySubtitle = categorySlug
    ? CATEGORY_SUBTITLES[categorySlug.toLowerCase()] || "Curated picks from dummy API"
    : "Handpicked styles and must-haves for every occasion";

  return (
    <main className="main-content">
      {/* Category Banner / Header */}
      <section className="category-header-banner">
        <div className="category-header-content">
          <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            {categorySlug && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">
                  {categorySlug.replace("-", " ").toUpperCase()}
                </span>
              </>
            )}
          </div>
          <h1 className="category-page-title">{categoryName}</h1>
          <p className="category-page-subtitle">{categorySubtitle}</p>
        </div>

        {/* Quick Category Switcher Pills */}
        <div className="category-quick-pills">
          <Link
            to="/"
            className={`category-pill ${!categorySlug ? "pill-active" : ""}`}
            onClick={() => dispatch(filterActions.setActiveCategory("all"))}
          >
            All Items
          </Link>
          <Link
            to="/category/men"
            className={`category-pill ${categorySlug === "men" ? "pill-active" : ""}`}
          >
            Men
          </Link>
          <Link
            to="/category/women"
            className={`category-pill ${categorySlug === "women" ? "pill-active" : ""}`}
          >
            Women
          </Link>
          <Link
            to="/category/kids"
            className={`category-pill ${categorySlug === "kids" ? "pill-active" : ""}`}
          >
            Kids
          </Link>
          <Link
            to="/category/home-living"
            className={`category-pill ${categorySlug === "home-living" ? "pill-active" : ""}`}
          >
            Home & Living
          </Link>
          <Link
            to="/category/beauty"
            className={`category-pill ${categorySlug === "beauty" ? "pill-active" : ""}`}
          >
            Beauty
          </Link>
        </div>
      </section>

      {/* Items Grid Area */}
      {isCategoryLoading ? (
        <div className="category-loading-box">
          <LoadingSpinner />
          <p className="loading-caption">Fetching products from Dummy API...</p>
        </div>
      ) : displayedItems.length > 0 ? (
        <div className="catalog-wrapper">
          <div className="results-status-bar">
            <span className="results-count">
              Showing <strong>{displayedItems.length}</strong> items
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>

          <div className="items-container">
            {displayedItems.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-catalog-state">
          <div className="empty-icon-wrapper">
            {searchQuery ? <FiSearch size={44} /> : <FiShoppingBag size={44} />}
          </div>
          <h3>No products found</h3>
          <p>
            {searchQuery
              ? `We couldn't find any products matching "${searchQuery}". Try a different keyword.`
              : "No items currently available in this category."}
          </p>
          <div className="empty-actions">
            {searchQuery && (
              <button
                type="button"
                className="btn-reset-filter"
                onClick={() => dispatch(filterActions.clearSearch())}
              >
                Clear Search
              </button>
            )}
            <Link to="/" className="btn-browse-all">
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;