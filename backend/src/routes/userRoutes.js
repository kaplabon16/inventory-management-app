// backend/src/routes/userRoutes.js
import express from 'express'
import { getUsers, blockUser, unblockUser, makeAdmin, removeAdmin, getMe } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public profile endpoint for the logged-in user
router.get('/me', protect, getMe)

// Admin-only endpoints
router.use(protect, admin)
router.get('/', getUsers)
router.put('/block/:id', blockUser)
router.put('/unblock/:id', unblockUser)
router.put('/makeAdmin/:id', makeAdmin)
router.put('/removeAdmin/:id', removeAdmin)

export default router
