import express from 'express'
import { createItem, updateItem, likeItem } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/',protect,createItem)
router.put('/:id',protect,updateItem)
router.put('/like/:id',protect,likeItem)

export default router
