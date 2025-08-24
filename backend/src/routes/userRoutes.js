import express from 'express'
import { 
  getUsers, 
  blockUser, 
  unblockUser, 
  makeAdmin, 
  removeAdmin, 
  getCurrentUser 
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public route to get current user profile (requires authentication but not admin)
router.get('/me', protect, getCurrentUser)

// Admin-only routes
router.get('/', protect, admin, getUsers)
router.put('/block/:id', protect, admin, blockUser)
router.put('/unblock/:id', protect, admin, unblockUser)
router.put('/makeAdmin/:id', protect, admin, makeAdmin)
router.put('/removeAdmin/:id', protect, admin, removeAdmin)

export default router