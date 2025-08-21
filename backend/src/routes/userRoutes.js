const express = require('express')
const router = express.Router()
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const { getAllUsers, blockUser, unblockUser, deleteUser, toggleAdmin } = require('../controllers/userController')

router.use(authMiddleware)
router.get('/', adminMiddleware, getAllUsers)
router.patch('/:id/block', adminMiddleware, blockUser)
router.patch('/:id/unblock', adminMiddleware, unblockUser)
router.delete('/:id', adminMiddleware, deleteUser)
router.patch('/:id/toggle-admin', adminMiddleware, toggleAdmin)

module.exports = router
