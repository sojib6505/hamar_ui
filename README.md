# HAMAR — E-commerce Frontend (Demo Data)

Premium technology accessories storefront built with React + Vite + Tailwind CSS v4 + React Router + Framer Motion.
All data is mock (see `src/data/`) and every data-fetch goes through `src/services/` so you can swap in your MERN API later without touching UI code.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Connecting your MERN backend later

Every function in `src/services/*.js` currently reads from `src/data/*.js` and resolves as a Promise after a short simulated delay.
To go live:
1. Replace the body of each service function with a `fetch()`/`axios` call to your Express endpoint (the comment above each function already lists the intended route, e.g. `GET /api/products`).
2. Keep the function signature (name + params + return shape) the same — components already call these functions and don't know or care where the data comes from.
3. Remove `src/data/*.js` once every service function is backend-connected (or keep them as a local dev fallback).

## Folder structure

```
src/
 ├── components/   # ui, product, brand, blog, community, layout, home, account
 ├── pages/        # one file per route
 ├── layouts/      # MainLayout, AuthLayout wrap pages with Navbar/Footer etc.
 ├── context/      # Cart, Wishlist, Compare, Toast (React Context, swap-safe)
 ├── services/     # future API layer — mock now, fetch() later
 ├── data/         # mock/demo data only
 ├── utils/        # formatting helpers
 └── routes -> wired directly in App.jsx
```

## Notes
- Cart / Wishlist / Compare state is in-memory only (resets on refresh) since there's no backend yet — wire these to `localStorage` or your API once auth exists.
- Checkout, warranty, support tickets, and referral actions all call stub service functions that resolve successfully but don't persist anywhere real yet.
- Product images are placeholder Unsplash photos — swap for real product photography before going live.
