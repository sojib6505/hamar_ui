import { Router } from 'express'
import { requireAdmin, redirectIfLoggedIn } from '../../middleware/auth.js'
import { renderLogin, login, logout } from '../../controllers/admin/authController.js'
import { renderDashboard } from '../../controllers/admin/dashboardController.js'
import * as productCtrl from '../../controllers/admin/productController.js'
import * as categoryCtrl from '../../controllers/admin/categoryController.js'
import * as orderCtrl from '../../controllers/admin/orderController.js'

const router = Router()

// Auth
router.get('/login', redirectIfLoggedIn, renderLogin)
router.post('/login', redirectIfLoggedIn, login)
router.post('/logout', logout)

// Everything below requires login
router.use(requireAdmin)

router.get('/', renderDashboard)

// Products
router.get('/products', productCtrl.listProducts)
router.get('/products/new', productCtrl.newProductForm)
router.post('/products', productCtrl.createProduct)
router.get('/products/:id/edit', productCtrl.editProductForm)
router.post('/products/:id', productCtrl.updateProduct)
router.post('/products/:id/delete', productCtrl.deleteProduct)

// Categories
router.get('/categories', categoryCtrl.listCategories)
router.post('/categories', categoryCtrl.createCategory)
router.post('/categories/:id', categoryCtrl.updateCategory)
router.post('/categories/:id/delete', categoryCtrl.deleteCategory)

// Orders
router.get('/orders', orderCtrl.listOrders)
router.get('/orders/:id', orderCtrl.viewOrder)
router.post('/orders/:id/status', orderCtrl.updateOrderStatus)
router.post('/orders/:id/delete', orderCtrl.deleteOrder)

export default router
