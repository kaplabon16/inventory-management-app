import express from 'express'
import { getAllUsers, getUserById } from '../controllers/userController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, getAllUsers)
router.get('/:id', authenticateToken, getUserById)

export default router
