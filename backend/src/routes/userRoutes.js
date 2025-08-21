import express from 'express'
import { getUsers, getUser, blockUser, unblockUser, toggleAdmin } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getUsers)
router.get('/:id', protect, getUser)
router.post('/block/:id', protect, admin, blockUser)
router.post('/unblock/:id', protect, admin, unblockUser)
router.post('/toggle-admin/:id', protect, admin, toggleAdmin)

export default router
