import prisma from '../config/db.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export const getItems = async (req, res) => {
  const items = await prisma.item.findMany({
    where: { inventoryId: parseInt(req.params.inventoryId) },
  })
  res.json(items)
}

export const createItem = async (req, res) => {
  const { inventoryId, name, fields } = req.body
  const item = await prisma.item.create({
    data: {
      inventoryId,
      name,
      fields,
      customId: generateCustomId(),
      createdBy: req.user.id,
    },
  })
  res.status(201).json(item)
}
