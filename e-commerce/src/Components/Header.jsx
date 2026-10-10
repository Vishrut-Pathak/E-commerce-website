import React, { useState, useRef, useEffect } from 'react';
import { MdPerson } from "react-icons/md";
import { FaBagShopping, FaCartShopping } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '../store/authSlice';
import { filterActions } from '../store/filterSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const bag = useSelector((store) => store.bag);
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const { searchQuery } = useSelector((store) => store.filter);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentPath = location.pathname;

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileDropdownOpen((prev) => !prev);
    } else {
      dispatch(authActions.openAuthModal("login"));
    }
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setProfileDropdownOpen(false);
  };

  const handleLogoClick = () => {
    dispatch(filterActions.setActiveCategory("all"));
    dispatch(filterActions.clearSearch());
  };

  const handleCategoryClick = (category) => {
    dispatch(filterActions.setActiveCategory(category));
  };

  return (
    <>
      <header className="header-container">
        <div className="logo_container">
          <Link to="/" onClick={handleLogoClick}>
            <img className="myntra_home" src="/images/myntra_logo.webp" alt="Myntra Home" />
          </Link>
        </div>

        <nav className="nav_bar">
          <Link
            to="/category/men"
            className={currentPath === "/category/men" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleCategoryClick("men")}
          >
            Men
          </Link>
          <Link
            to="/category/women"
            className={currentPath === "/category/women" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleCategoryClick("women")}
          >
            Women
          </Link>
          <Link
            to="/category/kids"
            className={currentPath === "/category/kids" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleCategoryClick("kids")}
          >
            Kids
          </Link>
          <Link
            to="/category/home-living"
            className={currentPath === "/category/home-living" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleCategoryClick("home-living")}
          >
            Home & Living
          </Link>
          <Link
            to="/category/beauty"
            className={currentPath === "/category/beauty" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleCategoryClick("beauty")}
          >
            Beauty
          </Link>
          <span className="nav-item nav-studio">
            Studio <sup>New</sup>
          </span>
        </nav>

        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">search</span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => dispatch(filterActions.setSearchQuery(e.target.value))}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => dispatch(filterActions.clearSearch())}
              title="Clear search"
            >
              <IoCloseOutline />
            </button>
          )}
        </div>

        <div className="action_bar">
          {/* Profile Section with Authentication */}
          <div
            className="action_container profile-action-container"
            ref={profileRef}
            onClick={handleProfileClick}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <div className="profile-icon-wrapper">
              <MdPerson className="header-icon" />
              {isAuthenticated && <span className="online-indicator"></span>}
            </div>
            <span className="action_name">
              {isAuthenticated ? (user.name ? user.name.split(" ")[0] : user.username) : "Profile"}
            </span>

            {/* Profile Dropdown Menu for Authenticated User */}
            {isAuthenticated && profileDropdownOpen && (
              <div
                className="profile-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="profile-dropdown-header">
                  <div className="user-avatar-circle">
                    {(user.name || user.username).charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <p className="user-name-title">{user.name || user.username}</p>
                    <p className="user-handle">@{user.username}</p>
                    <span className="user-badge">Verified Member</span>
                  </div>
                </div>

                <div className="profile-dropdown-divider"></div>

                <div className="profile-dropdown-links">
                  <button
                    className="profile-dropdown-item"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate("/bag");
                    }}
                  >
                    <FaBagShopping className="dropdown-icon" /> Bag ({bag.length} items)
                  </button>
                  <button
                    className="profile-dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="dropdown-icon" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="action_container">
            <FaCartShopping className="header-icon" />
            <span className="action_name">Wishlist</span>
          </div>

          {/* Bag */}
          <Link className="action_container bag_action_container" to="/bag">
            <div className="bag-icon-wrapper">
              <FaBagShopping className="header-icon" />
              <span className="bag-item-count">{bag.length}</span>
            </div>
            <span className="action_name">Bag</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;