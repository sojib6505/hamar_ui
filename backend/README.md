# HAMAR Backend + Admin Dashboard

Node.js + Express + MongoDB (Mongoose) backend for the HAMAR frontend, with a simple
server-rendered (EJS) admin dashboard for managing Products, Categories and Orders.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGODB_URI` — your MongoDB Atlas connection string (Database → Connect → Drivers)
- `CLIENT_ORIGIN` — comma-separated list of frontend URLs allowed to call the API (defaults already include the common Vite localhost ports)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by the seed script to create your first admin login

## Seed the database (adds demo products, categories, brands, sample orders, admin user)

```bash
npm run seed
```

## Run

```bash
npm run dev
```

- API: http://localhost:5000/api/...
- Admin dashboard: http://localhost:5000/admin  (log in with the ADMIN_EMAIL/ADMIN_PASSWORD from your `.env`, after running the seed script)

## API Routes (public, used by the frontend)

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List products (query: category, brand, minPrice, maxPrice, search, rating, stock, sort) |
| GET | `/api/products/:slug` | Single product |
| GET | `/api/products/:slug/related` | Related products |
| GET | `/api/products/bestsellers` | Top products by review count |
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:slug` | Single category |
| GET | `/api/brands` | List brands |
| GET | `/api/brands/:slug` | Single brand |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders?email=...` | List orders for a customer |
| GET | `/api/orders/track/:orderId` | Track an order |

## Admin Dashboard Routes (session-based login, server-rendered EJS)

- `/admin/login` — login form
- `/admin` — dashboard (product/category/order counts, revenue, recent orders, low stock)
- `/admin/products` — list, search, add, edit, delete products
- `/admin/categories` — list, add, delete categories
- `/admin/orders` — list (filter by status), view detail, update status, delete

## Notes

- If you hit a MongoDB Atlas DNS/SRV error on Windows, switch your network adapter DNS to Google DNS (8.8.8.8 / 8.8.4.4) — same fix that worked on your earlier HAMAR/Hili Spice/Kaelora projects.
- Also double check Atlas → Network Access has your current IP whitelisted (or `0.0.0.0/0` for local dev).
- The server boots fine even without a working DB connection (useful while you're still setting up Atlas) — API routes will just return errors and the admin dashboard will show empty data until the DB is connected.
- Sessions use MongoDB as the store when `MONGODB_URI` is set (so admin login survives server restarts); falls back to in-memory sessions otherwise.
