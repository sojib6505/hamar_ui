import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Brands from '@/pages/Brands'
import BrandDetail from '@/pages/BrandDetail'
import Blog from '@/pages/Blog'
import BlogDetail from '@/pages/BlogDetail'
import Community from '@/pages/Community'
import Support from '@/pages/Support'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Wishlist from '@/pages/Wishlist'
import Compare from '@/pages/Compare'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import Orders from '@/pages/Orders'
import Warranty from '@/pages/Warranty'
import Rewards from '@/pages/Rewards'
import Referrals from '@/pages/Referrals'
import NotFound from '@/pages/NotFound'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import AdminLogin from '@/pages/admin/AdminLogin'
import {
  AdminDashboardPage,
  AdminProductsPage,
  AdminCategoriesPage,
  AdminBrandsPage,
  AdminOrdersPage,
  AdminCustomersPage,
  AdminSettingsPage,
} from '@/pages/admin/AdminPages'

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="brands" element={<AdminBrandsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:slug" element={<BrandDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
