const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { createInventory, getInventory, updateInventory, deleteInventory } = require('../controllers/inventoryController')

router.post('/', authMiddleware, createInventory)
router.get('/:id', getInventory)
router.put('/:id', authMiddleware, updateInventory)
router.delete('/:id', authMiddleware, deleteInventory)

module.exports = router
