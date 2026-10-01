import { Router } from 'express'
import {
  listCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../controllers/api/categoryController.js'

const router = Router()

router.get('/:slug', getCategoryBySlug)
router.get('/', listCategories)

// Admin CRUD routes
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
