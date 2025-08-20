import express from 'express'
import { getAllItems, createItem } from '../controllers/itemController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, getAllItems)
router.post('/', authenticateToken, createItem)

export default router
