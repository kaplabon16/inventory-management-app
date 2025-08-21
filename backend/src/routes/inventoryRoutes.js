import express from 'express'
import { getInventories, createInventory } from '../controllers/inventoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getInventories)
router.post('/', protect, createInventory)

export default router
