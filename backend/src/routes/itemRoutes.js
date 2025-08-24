// backend/src/routes/itemRoutes.js
import express from 'express'
import { createItem, updateItem, likeItem, getItem, deleteItem } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createItem)
router.put('/like/:id', protect, likeItem)   // keep before "/:id"
router.get('/:id', getItem)
router.put('/:id', protect, updateItem)
router.delete('/:id', protect, deleteItem)

export default router
