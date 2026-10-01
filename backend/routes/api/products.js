import { Router } from 'express'
import {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getBestSellers,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/api/productController.js'

const router = Router()

router.get('/bestsellers', getBestSellers)
router.get('/slug/:slug', getProductBySlug)
router.get('/:slug/related', getRelatedProducts)
router.get('/:slug', getProductBySlug)
router.get('/', listProducts)

// Admin / CRUD routes
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
