import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { addComment, getComments } from '../controllers/discussionController.js'

const router = express.Router()

router.get('/:inventoryId', getComments)
router.post('/', authenticate, addComment)

export default router
