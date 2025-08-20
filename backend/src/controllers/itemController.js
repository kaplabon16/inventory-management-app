import prisma from '../config/db.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function getAllItems(req, res) {
  try {
    const items = await prisma.item.findMany()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message })
  }
}

export async function createItem(req, res) {
  const { name, quantity, inventoryId } = req.body
  if (!name || !quantity || !inventoryId) return res.status(400).json({ message: 'All fields required' })

  try {
    const item = await prisma.item.create({
      data: { id: generateCustomId('ITM'), name, quantity: Number(quantity), inventoryId }
    })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message })
  }
}
