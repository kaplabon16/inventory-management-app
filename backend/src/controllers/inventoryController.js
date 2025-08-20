import prisma from '../config/db.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function getAllInventories(req, res) {
  try {
    const inventories = await prisma.inventory.findMany()
    res.json(inventories)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventories', error: err.message })
  }
}

export async function createInventory(req, res) {
  const { name, description } = req.body
  if (!name) return res.status(400).json({ message: 'Name required' })

  try {
    const inventory = await prisma.inventory.create({
      data: { id: generateCustomId('INV'), name, description }
    })
    res.status(201).json(inventory)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create inventory', error: err.message })
  }
}
