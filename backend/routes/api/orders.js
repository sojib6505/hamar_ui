import { Router } from 'express'
import {
  createOrder,
  listOrders,
  getMyOrders,
  trackOrder,
} from '../../controllers/api/orderController.js'

const router = Router()

router.post('/', createOrder)
router.get('/my-orders', getMyOrders)
router.get('/track/:orderId', trackOrder)
router.get('/', listOrders)

export default router
