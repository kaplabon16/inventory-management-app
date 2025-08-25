import express from 'express'
import { getItemById } from '../controllers/itemController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/:id', authMiddleware, getItemById)
export default router
