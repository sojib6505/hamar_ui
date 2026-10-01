# HAMAR — Premium Tech Accessories Store & Admin (Monorepo)

Monorepo containing the **React 19 + Vite storefront & admin dashboard** and the **Node.js + Express + MongoDB REST backend**.

---

## 📁 Monorepo Structure

```text
hamar_ui/
├── frontend/             # React 19 + Vite + Tailwind CSS v4 + Framer Motion
│   ├── src/
│   │   ├── components/   # UI components, layout, product & admin components
│   │   ├── pages/        # Storefront pages and /admin dashboard pages
│   │   ├── context/      # AuthContext (Firebase + backend sync), Cart, Wishlist, Toast
│   │   ├── services/     # REST API client layer (products, categories, brands, orders, admin)
│   │   ├── config/       # Firebase client initialization
│   │   └── data/         # Fallback data & categories
│   ├── .env              # Frontend environment variables (API URL & Firebase)
│   └── package.json
│
├── backend/              # Node.js + Express 5 + MongoDB (Mongoose 9) REST API
│   ├── config/           # Database connection (MongoDB Atlas)
│   ├── controllers/      # REST API controllers & admin controllers
│   ├── middleware/       # Authentication, error handling & permissions
│   ├── models/           # Mongoose models: Product, Category, Brand, Order, User, Admin
│   ├── routes/           # REST endpoints (/api/products, /api/categories, /api/brands, /api/orders, /api/auth, /api/admin)
│   ├── seed/seed.js      # Seed database with initial products, categories, brands, orders
│   ├── server.js         # Backend server entry point (Port 5000)
│   ├── .env              # Backend environment variables
│   └── package.json
│
├── package.json          # Root scripts to orchestrate frontend & backend
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies

Install dependencies for both frontend and backend in one command:

```bash
npm run install:all
```

Or individually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

- **Backend**: verify `backend/.env` contains your `MONGODB_URI` and `PORT=5000`.
- **Frontend**: verify `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`.

### 3. Seed Database (Demo Products, Categories, Brands & Admin)

```bash
npm run seed
```

### 4. Run Development Servers

Run frontend and backend simultaneously:

- **Frontend**: `npm run dev:frontend` (opens at `http://localhost:5173`)
- **Backend**: `npm run dev:backend` (runs at `http://localhost:5000`)

---

## 🔑 Admin Access

- **React Admin Dashboard URL**: `http://localhost:5173/admin`
- **Default Admin Account**: `admin@hamar.com` / `hamar123`
- Full features:
  - 📊 Live statistics (Revenue, Orders, Products, Customers)
  - 📦 Products Management (CRUD, stock toggles, search, filters)
  - 🏷️ Categories & Brands Management
  - 📑 Order tracking & fulfillment status updates
  - 👥 Customer list & account management

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List all products with filtering & sorting |
| `GET` | `/api/products/:slug` | Single product by slug or ID |
| `GET` | `/api/products/:slug/related` | Related products |
| `GET` | `/api/products/bestsellers` | Top-rated bestsellers |
| `POST` | `/api/products` | Create product (Admin) |
| `PUT` | `/api/products/:id` | Update product (Admin) |
| `DELETE` | `/api/products/:id` | Delete product (Admin) |
| `GET` | `/api/categories` | List all categories |
| `POST` | `/api/categories` | Create category (Admin) |
| `GET` | `/api/brands` | List all brands |
| `POST` | `/api/orders` | Place customer order |
| `GET` | `/api/orders/my-orders` | Fetch customer orders |
| `GET` | `/api/admin/dashboard/stats` | Admin metrics & recent activity |
| `GET` | `/api/admin/orders` | Admin orders with search/filter |
| `PUT` | `/api/admin/orders/:id/status` | Update order status |
| `GET` | `/api/admin/customers` | Admin customer list |
