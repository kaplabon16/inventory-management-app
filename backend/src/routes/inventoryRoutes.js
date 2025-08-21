import express from 'express'
import { createInventory, updateInventory, getInventory, searchInventory } from '../controllers/inventoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/',protect,createInventory)
router.put('/:id',protect,updateInventory)
router.get('/:id',getInventory)
router.get('/',searchInventory)

export default router
