import prisma from '../config/db.js'
import { generateCustomID } from '../utils/generateCustomID.js'

export async function createItem(req, res) {
  const { inventoryId, fieldValues, customIdTemplate } = req.body
  const existingIds = (await prisma.item.findMany({ where: { inventoryId }, select: { customId: true } })).map(i => i.customId)
  const customId = generateCustomID(customIdTemplate, existingIds)
  const item = await prisma.item.create({
    data: { inventoryId, fieldValues, customId, createdBy: req.user.id }
  })
  res.json(item)
}

export async function updateItem(req, res) {
  const { id } = req.params
  const { fieldValues, version } = req.body
  const updated = await prisma.item.updateMany({
    where: { id, version },
    data: { fieldValues, version: { increment: 1 } }
  })
  if (updated.count === 0) return res.status(409).json({ message: 'Conflict: Item updated elsewhere' })
  const item = await prisma.item.findUnique({ where: { id } })
  res.json(item)
}

export async function likeItem(req, res) {
  const { id } = req.params
  const item = await prisma.item.findUnique({ where: { id } })
  if (!item) return res.status(404).json({ message: 'Item not found' })
  const liked = await prisma.item.update({ where: { id }, data: { likesCount: item.likesCount + 1 } })
  res.json(liked)
}

export async function deleteItem(req, res) {
  const { id } = req.params
  await prisma.item.delete({ where: { id } })
  res.json({ message: 'Deleted' })
}
