# EYORA — Frontend Client Application

> **Haute Lunetterie & Eyewear Design Client**  
> An editorial luxury e-commerce experience crafted with React 19, TypeScript, Vite, and custom CSS design tokens.

---

## Architecture & Tech Stack

- **Framework:** React 19 (`^19.3.1`)
- **Language:** TypeScript (`~6.0.3`)
- **Build Tool:** Vite 8 (`^8.3.4`)
- **Routing:** React Router v7 (`^7.18.4`)
- **Icons:** Lucide React (`^1.61.0`)
- **Linter:** Oxlint (`^1.88.0`)
- **Styling:** Vanilla CSS design token system (`index.css`) with Cormorant Garamond display serif and Inter typography.

---

## Project Structure

```
frontend/
├── public/                 # Static assets (images, videos, favicons, vector icons)
│   ├── images/             # Product photography, atelier craft stills, campaign visuals
│   │   └── products/       # High-resolution frame imagery
│   └── videos/             # Ambient cinématique hero loop
├── src/
│   ├── assets/             # Brand logos & static assets
│   ├── components/         # Modular UI & section components
│   │   ├── Bestsellers/
│   │   ├── BrandCraftsmanship/
│   │   ├── CartDrawer/
│   │   ├── CheckoutModal/
│   │   ├── EditorialJournal/
│   │   ├── FeaturedCollections/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── HeroProductCarousel/  # Cinematic horizontal animated carousel
│   │   ├── PressReviews/
│   │   ├── ProductCard/
│   │   ├── QuickViewModal/
│   │   ├── SearchModal/
│   │   └── WishlistDrawer/
│   ├── context/            # React Context providers (Cart, Wishlist, QuickView, Search)
│   ├── data/               # Product catalog, optical lenses, and editorial articles
│   ├── pages/              # Route views (Home, Collection, ProductDetail, OurStory, Journal)
│   ├── services/           # API abstraction layer (mock fallback & backend integration ready)
│   ├── types/              # Domain TypeScript types & interfaces
│   ├── utils/              # Formatters (INR currency, optical calibre dimensions)
│   ├── App.tsx             # Root layout & route definitions
│   ├── index.css           # Central luxury design tokens & global resets
│   └── main.tsx            # Application entry point
├── .env.example            # Environment variables template
├── .oxlintrc.json          # Oxlint configuration
├── index.html              # HTML5 entry with luxury typography preconnects
├── package.json            # Frontend dependencies & scripts
├── tsconfig.json           # TypeScript project references
├── tsconfig.app.json       # Application TypeScript configuration
├── tsconfig.node.json      # Vite tooling TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

Spins up the local development server at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Compiles TypeScript and bundles production-ready assets into `frontend/dist/`.

### Linting

```bash
npm run lint
```

Runs Oxlint for high-speed code quality checks.

---

## Environment Variables

Copy `.env.example` to `.env` to configure external backend connectivity:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the EYORA backend API | `http://localhost:5000` |

When `VITE_API_URL` is omitted, the frontend operates seamlessly in standalone catalog mode using local atelier data.
