import express from 'express'
import { getAllInventories, createInventory } from '../controllers/inventoryController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, getAllInventories)
router.post('/', authenticateToken, createInventory)

export default router
