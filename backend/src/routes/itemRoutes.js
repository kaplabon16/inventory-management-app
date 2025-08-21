const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { createItem, getItem, updateItem, deleteItem, likeItem } = require('../controllers/itemController')

router.post('/', authMiddleware, createItem)
router.get('/:id', getItem)
router.put('/:id', authMiddleware, updateItem)
router.delete('/:id', authMiddleware, deleteItem)
router.post('/like', authMiddleware, likeItem)

module.exports = router
