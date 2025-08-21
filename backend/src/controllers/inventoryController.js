import prisma from '../config/db.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export const getInventories = async (req, res) => {
  const inventories = await prisma.inventory.findMany()
  res.json(inventories)
}

export const createInventory = async (req, res) => {
  const { title, description, isPublic } = req.body
  const inventory = await prisma.inventory.create({
    data: {
      title,
      description,
      isPublic: !!isPublic,
      createdBy: req.user.id,
      customId: generateCustomId(),
    },
  })
  res.status(201).json(inventory)
}
