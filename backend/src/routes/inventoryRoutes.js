import express from 'express'
import { getAllInventories, getInventoryById, createInventory } from '../controllers/inventoryController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/', authMiddleware, getAllInventories)
router.get('/:id', authMiddleware, getInventoryById)
router.post('/', authMiddleware, createInventory)
export default router
