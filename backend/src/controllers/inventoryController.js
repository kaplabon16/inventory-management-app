import prisma from '../config/db.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function getAllInventories(req, res, next) {
  try {
    const inventories = await prisma.inventory.findMany({ include: { owner: true } })
    res.json(inventories)
  } catch (err) { next(err) }
}

export async function getInventoryById(req, res, next) {
  try {
    const { id } = req.params
    const inventory = await prisma.inventory.findUnique({
      where: { id },
      include: { items: true, owner: true }
    })
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' })
    res.json(inventory)
  } catch (err) { next(err) }
}

export async function createInventory(req, res, next) {
  try {
    const { name, description } = req.body
    const id = generateCustomId()
    const inventory = await prisma.inventory.create({
      data: { id, name, description, ownerId: req.user.id }
    })
    res.status(201).json(inventory)
  } catch (err) { next(err) }
}
