import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import {
  createInventory, updateInventory, getInventory, deleteInventory,
  getLatestInventories, getPopularInventories, searchInventories
} from '../controllers/inventoryController.js'

const router = express.Router()

router.get('/latest', getLatestInventories)
router.get('/popular', getPopularInventories)
router.get('/search', searchInventories)

router.use(authenticate)
router.post('/', createInventory)
router.get('/:id', getInventory)
router.put('/:id', updateInventory)
router.delete('/:id', deleteInventory)

export default router
