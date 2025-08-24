// backend/src/controllers/itemController.js
import prisma from '../prisma/client.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function createItem(req,res){
  const { inventoryId, data } = req.body
  const invId = typeof inventoryId === 'string' ? parseInt(inventoryId) : inventoryId
  const inventory = await prisma.inventory.findUnique({ where:{id:invId} })
  if(!inventory) return res.status(404).json({ message:'Inventory not found' })
  const count = await prisma.item.count({ where:{ inventoryId: invId } })
  const customId = generateCustomId(inventory.customIdFormat || [], count)
  const item = await prisma.item.create({ data:{ inventoryId: invId, customId, data, createdById:req.user.id } })
  req.io?.emit(`itemAdded:${invId}`,item)
  res.json(item)
}

export async function updateItem(req,res){
  const { id } = req.params
  const { data, customId, version } = req.body
  const item = await prisma.item.updateMany({
    where:{ id:parseInt(id), version },
    data:{ data, customId, version:{ increment:1 } }
  })
  if(item.count===0) return res.status(409).json({ message:'Conflict, version mismatch'})
  req.io?.emit(`itemUpdated:${id}`,{ id: parseInt(id), data })
  res.json({ message:'Updated' })
}

export async function likeItem(req,res){
  const { id } = req.params
  const item = await prisma.item.findUnique({ where:{ id:parseInt(id) }})
  if(!item) return res.status(404).json({ message:'Item not found' })

  const likes = Array.isArray(item.likes) ? item.likes : []
  const userId = req.user.id
  const hasLiked = likes.includes(userId)
  const newLikes = hasLiked ? likes.filter(u=>u!==userId) : [...likes, userId]

  const updated = await prisma.item.update({ where:{ id:parseInt(id) }, data:{ likes: newLikes } })
  req.io?.emit(`itemLiked:${id}`, newLikes)
  res.json({ likes: newLikes })
}

export async function getItem(req,res){
  const { id } = req.params
  const item = await prisma.item.findUnique({ where:{ id:parseInt(id) } })
  if(!item) return res.status(404).json({ message:'Item not found' })
  res.json(item)
}

export async function deleteItem(req,res){
  const { id } = req.params
  const existing = await prisma.item.findUnique({ where:{ id:parseInt(id) } })
  if(!existing) return res.status(404).json({ message:'Item not found' })
  if(existing.createdById !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ message:'Forbidden' })
  }
  await prisma.item.delete({ where:{ id:parseInt(id) } })
  req.io?.emit(`itemDeleted:${existing.inventoryId}`, parseInt(id))
  res.json({ message:'Deleted', id: parseInt(id) })
}
