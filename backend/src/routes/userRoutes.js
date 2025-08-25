import express from 'express'
import { getUsers, blockUser, unblockUser, makeAdmin, removeAdmin } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// All user management routes require auth + admin
router.use(protect, admin)

router.get('/', getUsers)
router.put('/block/:id', blockUser)
router.put('/unblock/:id', unblockUser)
router.put('/makeAdmin/:id', makeAdmin)
router.put('/removeAdmin/:id', removeAdmin)

export default router
