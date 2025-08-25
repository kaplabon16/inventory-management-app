import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { getAllUsers, updateUserRoles, blockUser, unblockUser } from '../controllers/userController.js'

const router = express.Router()

router.use(authenticate)
router.get('/', authorizeRoles('admin'), getAllUsers)
router.put('/:id/roles', authorizeRoles('admin'), updateUserRoles)
router.put('/:id/block', authorizeRoles('admin'), blockUser)
router.put('/:id/unblock', authorizeRoles('admin'), unblockUser)

export default router
