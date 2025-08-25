import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { createItem, updateItem, deleteItem, likeItem } from '../controllers/itemController.js'

const router = express.Router()

router.use(authenticate)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)
router.post('/:id/like', likeItem)

export default router
