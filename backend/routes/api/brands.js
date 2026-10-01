import { Router } from 'express'
import {
  listBrands,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../../controllers/api/brandController.js'

const router = Router()

router.get('/:slug', getBrandBySlug)
router.get('/', listBrands)

// Admin CRUD routes
router.post('/', createBrand)
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)

export default router
