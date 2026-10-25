# EYORA System Architecture

> **Architectural Blueprint & Repository Organization Guide**  
> Atelier Lunetterie Luxury Eyewear E-Commerce Platform

---

## 1. High-Level System Overview

EYORA is engineered with a clean separation of concerns, decoupling the high-performance editorial frontend client from the upcoming backend services while maintaining a unified repository structure for GitHub version control.

```
EYORA/
├── frontend/             # High-fashion React 19 + TypeScript + Vite client application
├── backend/              # Placeholder for Node.js, Express & MongoDB REST API services
├── docs/                 # Architectural documentation, API specs & design system guides
├── .gitignore            # Consolidated root Git exclusion rules
└── README.md             # Repository-level documentation & getting-started guide
```

---

## 2. Frontend Client Architecture (`frontend/`)

### 2.1 Core Technologies
- **Runtime & UI Library:** React 19 with strict TypeScript definitions.
- **Build & Development Tooling:** Vite 8 providing sub-second HMR and optimized Rollup production bundling.
- **Client Routing:** React Router v7 with browser history and scroll-to-top orchestration.
- **Design System:** Custom tokenized CSS system (`index.css`) built upon luxury espresso, warm amber, champagne, and obsidian surfaces.
- **Iconography:** Lucide React icons.

### 2.2 Key Subsystems & Layers
1. **Design Tokens & Atmosphere (`src/index.css`):**
   - HSL-tailored master palette: Espresso (`#38251F`), Champagne (`#E9C99A`), Amber (`#D9914B`), Obsidian (`#180F0D`).
   - Editorial typography: *Cormorant Garamond* (display serif) for editorial prestige; *Inter* for optical readability.
   - Ambient radial scrims and chiaroscuro depth overlays.

2. **Component Hierarchy (`src/components/`):**
   - **Hero (`Hero/` & `HeroProductCarousel/`):** Cinematic video backdrop paired with an animated 3D tilt horizontal product transition carousel.
   - **Catalog & Cards (`ProductCard/`, `Bestsellers/`, `FeaturedCollections/`):** Interactive frames with quick actions (Wishlist, Quick View, Direct Bag Add).
   - **Editorial & Journal (`EditorialJournal/`, `PressReviews/`):** Brand storytelling and craft heritage narratives.
   - **Global Overlays:** `CartDrawer`, `WishlistDrawer`, `QuickViewModal`, `SearchModal`, `CheckoutModal`.

3. **State Architecture (`src/context/`):**
   - `CartContext`: LocalStorage-persisted cart state, quantity updates, lens configuration calculations.
   - `WishlistContext`: Real-time wishlist toggling and persistence.
   - `QuickViewContext`: Modal inspection state for frame specifications.
   - `SearchContext`: Live query filtering and search modal visibility.

4. **Service Abstraction Layer (`src/services/apiService.ts`):**
   - Pre-wired to inspect `VITE_API_URL`.
   - When `VITE_API_URL` is set, calls route to live backend endpoints.
   - When running standalone, smoothly falls back to local curated atelier catalog data.

---

## 3. Future Backend Services Architecture (`backend/`)

The `backend/` directory is prepared for subsequent development with the following planned architecture:

### 3.1 Technology Stack
- **Runtime:** Node.js (LTS version)
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) with HTTP-only cookies
- **Payment Gateway:** Razorpay / Stripe integration for bespoke lunetterie transactions

### 3.2 Target Directory Structure
```
backend/
├── src/
│   ├── config/             # Database connection (MongoDB URI), environment validation
│   ├── controllers/        # Route controllers (products, orders, newsletter, user)
│   ├── middleware/         # Auth verification, rate limiting, error handling, CORS
│   ├── models/             # Mongoose schemas (Product, Order, Customer, Article)
│   ├── routes/             # REST API route declarations
│   ├── services/           # Payment processing, transactional emails, cloud storage
│   ├── utils/              # Calculation helpers, token generation
│   ├── app.js / app.ts     # Express application configuration
│   └── server.js / server.ts# Server entry point & listener
├── .env.example            # Backend environment template (PORT, MONGO_URI, JWT_SECRET)
├── package.json            # Backend dependencies & scripts
└── README.md               # Backend-specific setup and API reference
```

### 3.3 Planned API Endpoints Contract
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/products` | `GET` | Retrieve paginated products with category, shape, material filters |
| `/api/products/:slug` | `GET` | Retrieve detailed frame specs, story, and colorways |
| `/api/orders` | `POST` | Process customer checkout payload with lens options & payment |
| `/api/orders/:id` | `GET` | Track atelier craftsmanship and delivery allocation |
| `/api/newsletter` | `POST` | Subscribe to private salon invitations & seasonal archives |
| `/api/articles` | `GET` | Retrieve Haute Lunetterie editorial journal entries |

---

## 4. Version Control & Repository Governance

- **Root `.gitignore`:** Consolidates ignores for both frontend and future backend (`node_modules/`, `dist/`, `.env*`, OS artifacts).
- **Independent Installation:** Frontend remains completely buildable and deployable on its own (`cd frontend && npm install && npm run build`).
- **No Monorepo Overhead:** Standard repository layout avoids complex monorepo tooling until scale demands it.
