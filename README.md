# 🛍️ E-Commerce Web Application

A modern, responsive, and feature-rich E-Commerce web application inspired by Myntra. Built with **React 19**, **Redux Toolkit**, **React Router v7**, and **Vite**, featuring dynamic category catalogs powered by dummy APIs, user authentication, live search, and an interactive shopping bag.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [State Management (Redux Toolkit)](#-state-management-redux-toolkit)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Credentials for Testing](#-credentials-for-testing)
- [Dummy API & Data Normalization](#-dummy-api--data-normalization)
- [UI/UX Refinements](#-uiux-refinements)
- [Future Enhancements](#-future-enhancements)

---

## 🌟 Overview

This project is a full-featured e-commerce frontend application backed by a Node.js/Express server and the DummyJSON API. It delivers a fast, sleek online shopping experience replicating key e-commerce flows:

1. **Browsing & Discovering**: Filter by Men, Women, Kids, Home & Living, and Beauty categories.
2. **Real-Time Search**: Instant filtering by brand, item name, or category.
3. **Simple Authentication**: Sign up as a new user, log in, manage sessions, and log out.
4. **Cart Management**: Add items across any category to the bag, calculate price breakdowns, and complete order placement.

---

## 🚀 Key Features

### 1. 🏷️ Category Catalogs (Powered by Dummy API)
- **Functional Categories**: Dedicated collections for **MEN**, **WOMEN**, **KIDS**, **HOME & LIVING**, and **BEAUTY**.
- **Real-Time Fetching**: Pulls live product data from [DummyJSON API](https://dummyjson.com) with intelligent category mapping.
- **Offline Resilience**: Built-in fallback product sets ensure the application never breaks even without an internet connection.
- **Unified Product Catalog**: Products dynamically merge into the global catalog so items added to the bag remain accessible regardless of category switches.

### 2. 🔐 Simple User Authentication
- **New User Registration (Sign Up)**:
  - Users can create a new account by choosing a username and password (with optional full name).
  - Validates username uniqueness and prevents duplicate accounts.
  - Automatically logs in new users upon account creation.
- **User Login**:
  - Existing users log in with username and password.
  - One-click **"Auto-fill demo user"** option for instant testing.
- **Persistent Sessions**: User session and registered accounts persist in `localStorage` across page reloads.
- **Header Integration**:
  - Displays `"Hi, <username>"` with a green verified active status indicator.
  - Dropdown menu showing user info, bag summary, and a **Logout** action.

### 3. 🛒 Interactive Shopping Bag & Checkout
- **Bag Counter**: Real-time counter badge positioned directly over the bag icon in the header.
- **One-Click Add / Remove**: Toggle items in and out of the bag directly from product cards or the bag page.
- **Detailed Bill Summary**: Calculates Total MRP, Discount on MRP, Convenience Fees, and Final Amount in INR (₹).
- **Authentication Guard**: Prompts guests to log in before placing an order.
- **Order Placement**: Generates a randomized unique Order ID (e.g. `OD84920194`) with an order confirmation screen.
- **Empty State**: Displays an engaging illustration and a **"Start Shopping"** call to action when the cart is empty.

### 4. 🔍 Search & Filtering
- **Dynamic Search**: Instant keyword filtering across item names, companies/brands, and categories.
- **Clear Button**: One-click clear search icon (`X`) inside the input bar.
- **Quick-Switcher Pills**: Category pill buttons on top of product catalogs for rapid switching.
- **Active Navigation Indicator**: Pink underline highlighting the active category tab in the navbar.

---

## 🛠️ Technology Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Component-driven UI library |
| **Redux Toolkit** | Centralized, predictable state management |
| **React Router v7** | Client-side routing (`createBrowserRouter`, `RouterProvider`) |
| **Vite** | Next-generation fast frontend build tool and dev server |
| **React Icons** | Icon set (Material Design, FontAwesome, Feather, Ionicons) |
| **Bootstrap 5** | Utility styling and responsive base grid |
| **Vanilla CSS** | Custom modern styling, CSS Grid, Flexbox, micro-animations |

### Backend
| Technology | Description |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Minimalist web framework serving initial catalog endpoints |
| **Body-Parser** | JSON request payload parsing middleware |

---

## 📁 Project Architecture & Directory Structure

```text
E-commerce/
├── backend/                        # Node.js & Express server
│   ├── data/
│   │   └── items.js                # File I/O helpers for items.json
│   ├── app.js                      # Express app listening on port 8080
│   ├── items.json                  # Initial mock dataset (8 fashion products)
│   └── package.json
│
└── e-commerce/                     # React + Vite frontend
    ├── public/
    │   └── images/                 # Product photos and Myntra logo
    ├── src/
    │   ├── Components/
    │   │   ├── AuthModal.jsx       # Modal for Login & New User Sign Up
    │   │   ├── BagItem.jsx         # Cart item card with removal & delivery info
    │   │   ├── BagSummury.jsx      # Pricing calculations & Place Order flow
    │   │   ├── Fetchitems.jsx      # Initial backend data synchronization
    │   │   ├── Footer.jsx          # Online shopping links & customer policies
    │   │   ├── Header.jsx          # Sticky nav, search bar, profile, bag counter
    │   │   ├── HomeItem.jsx        # Product card with image, rating, add/remove
    │   │   └── LoadingSpinner.jsx  # Animated loading spinner
    │   ├── data/
    │   │   └── items.js            # Default client fallback catalog
    │   ├── routes/
    │   │   ├── App.jsx             # Main layout shell with Header, Outlet, Footer
    │   │   ├── Bag.jsx             # Shopping cart page route (/bag)
    │   │   └── Home.jsx            # Catalog route (/ and /category/:categorySlug)
    │   ├── services/
    │   └── dummyApi.js         # DummyJSON fetcher, normalizer & fallback data
    │   ├── store/
    │   │   ├── authSlice.js        # Authentication & user profile state
    │   │   ├── bagSlice.js         # Item IDs currently added to bag
    │   │   ├── fetchStatusSlice.js # Global fetch status tracking
    │   │   ├── filterSlice.js      # Active category and search query state
    │   │   ├── itemSlice.js        # Global products catalog
    │   │   └── index.js            # Redux store configuration
    │   ├── index.css               # Design system & styles
    │   └── main.jsx                # Application root with router & Redux provider
    ├── index.html                  # HTML entry point
    ├── package.json
    └── vite.config.js
```

---

## 🧠 State Management (Redux Toolkit)

The application uses **Redux Toolkit** with 5 specialized slices:

| Slice | File | Responsibility |
| :--- | :--- | :--- |
| `items` | [`itemSlice.js`](e-commerce/src/store/itemSlice.js) | Stores master list of products. Merges new category products without duplicates. |
| `bag` | [`bagSlice.js`](e-commerce/src/store/bagSlice.js) | Stores an array of selected product IDs. Supports add, remove, and clear. |
| `auth` | [`authSlice.js`](e-commerce/src/store/authSlice.js) | Manages authentication state, active user profile, registered users list, and modals. |
| `filter` | [`filterSlice.js`](e-commerce/src/store/filterSlice.js) | Tracks active category (`all`, `men`, `women`, `kids`, etc.) and search string. |
| `fetchStatus` | [`fetchStatusSlice.js`](e-commerce/src/store/fetchStatusSlice.js) | Tracks backend fetch status (`fetchDone`, `currentlyFetching`). |

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

---

### 1. Backend Setup

The backend serves the initial product catalog on port `8080`.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the Express server
npm start
```

The backend will start at: `http://localhost:8080`

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the frontend directory
cd e-commerce

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

## 🔑 Credentials for Testing

You can either sign up with any new username or use the pre-configured demo user:

| Field | Value |
| :--- | :--- |
| **Username** | `demo` |
| **Password** | `password123` |

> 💡 **Tip:** Inside the Login tab of the Auth modal, you can simply click **"Auto-fill demo user"** to populate these credentials automatically.

---

## 🌐 Dummy API & Data Normalization

External products from DummyJSON use varying schemas and pricing in USD. The [`dummyApi.js`](e-commerce/src/services/dummyApi.js) service normalizes every external item to match the internal e-commerce standard:

```javascript
{
  id: "dj-101",
  image: "https://...",
  company: "Brand Name",
  item_name: "Product Title",
  current_price: 1499,          // Converted into INR (₹)
  original_price: 2499,         // Calculated with discount
  discount_percentage: 40,
  return_period: 14,
  delivery_date: "3-5 Business Days",
  rating: {
    stars: 4.5,
    count: 320
  },
  category: "men"
}
```

---

## 🎨 UI/UX Refinements

- **Visual Consistency**: Clean Myntra-inspired coral/pink `#ff3f6c` accent, crisp typography, and soft dark text `#282c3f`.
- **Responsive Grid**: Fluid auto-fill grid displaying cards with uniform image heights (`270px`) and `object-fit: cover`.
- **Hover Micro-Animations**: Cards elevate subtly (`translateY(-4px)` with shadow elevation) and product images zoom on hover.
- **Glassmorphic Modal**: Login & Signup modal with blurred backdrop and animated entrance.
- **Bug Fixes**: Removed loose syntax artifacts (semicolons `;` in JSX) and standardized rating displays.

---

## 🔮 Future Enhancements

- [ ] Wishlist feature with persistence in Redux and `localStorage`.
- [ ] Product details modal / page with multiple image gallery preview.
- [ ] Filter by price range, discount percentage, and customer ratings.
- [ ] Mock payment gateway options (UPI, Cards, Cash on Delivery).

---

## 📄 License

This project is open-source and created for educational and learning purposes.
