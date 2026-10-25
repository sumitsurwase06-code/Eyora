# EYORA — Atelier Lunetterie

[![React](https://img.shields.io/badge/React-19.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Enabled-orange)](https://oxc.rs/)

> Distinctive eyewear handcrafted in Sabae and Cadore from aerospace Japanese beta-titanium and cured Italian bio-acetate. Thoughtfully designed for the way you see the world.

---

## Repository Structure

```
EYORA/
├── frontend/             # React 19 + TypeScript + Vite luxury e-commerce client
│   ├── public/           # Product media, campaign videos, and vector marks
│   ├── src/              # Application source code (components, context, pages, styles)
│   ├── .env.example      # Frontend environment template
│   ├── package.json      # Client dependencies & scripts
│   ├── tsconfig.json     # TypeScript project configurations
│   ├── vite.config.ts    # Vite bundler configuration
│   └── README.md         # Dedicated frontend documentation
├── backend/              # Placeholder for Node.js, Express & MongoDB API services
│   └── .gitkeep          # Repository tracking placeholder
├── docs/                 # Architectural blueprints & engineering specifications
│   └── architecture.md   # Full system architecture documentation
├── .gitignore            # Consolidated Git exclusions
└── README.md             # Repository overview & getting started guide
```

---

## Quick Start (Frontend)

The frontend is fully standalone and can be launched immediately:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Available Frontend Scripts

From within `frontend/`:

- `npm run dev` — Starts Vite dev server with Hot Module Replacement (HMR).
- `npm run build` — Validates TypeScript types and bundles optimized production assets into `frontend/dist/`.
- `npm run lint` — Runs Oxlint for high-performance code quality validation.
- `npm run preview` — Previews the production build locally.

---

## Architectural Documentation

For an in-depth breakdown of the system design, design token hierarchy, and the future Node.js / Express / MongoDB backend roadmap, please consult:

📖 **[docs/architecture.md](docs/architecture.md)**

---

## Backend Roadmap (Upcoming)

The `backend/` directory is prepared for:
- **Runtime & Framework:** Node.js & Express REST API
- **Database:** MongoDB via Mongoose ODM
- **Features:** Catalog filtering, customer checkout processing, order status tracking, and private newsletter concierge.
- **Integration:** The frontend's `apiService.ts` seamlessly switches from standalone catalog mode to live API requests when `VITE_API_URL` is configured.

---

## License

Private repository. All rights reserved © 2026 EYORA Atelier Lunetterie.
