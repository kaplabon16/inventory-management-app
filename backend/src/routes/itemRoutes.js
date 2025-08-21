import express from 'express'
import { getItems, createItem } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:inventoryId', getItems)
router.post('/', protect, createItem)

export default router
