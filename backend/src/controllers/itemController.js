import prisma from '../prisma/client.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function createItem(req,res){
  const { inventoryId,data } = req.body
  const inventory = await prisma.inventory.findUnique({ where:{id:inventoryId} })
  const count = await prisma.item.count({ where:{ inventoryId } })
  const customId = generateCustomId(inventory.customIdFormat || [], count)
  const item = await prisma.item.create({ data:{ inventoryId, customId, data, createdById:req.user.id } })
  req.io?.emit(`itemAdded:${inventoryId}`,item)
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
  req.io?.emit(`itemUpdated:${id}`,data)
  res.json({ message:'Updated' })
}

export async function likeItem(req,res){
  const { id } = req.params
  const item = await prisma.item.findUnique({ where:{ id:parseInt(id) }})
  const likes = item.likes || []
  if(!likes.includes(req.user.id)) likes.push(req.user.id)
  await prisma.item.update({ where:{id:parseInt(id)}, data:{likes} })
  req.io?.emit(`itemLiked:${id}`,likes)
  res.json({ likes })
}
