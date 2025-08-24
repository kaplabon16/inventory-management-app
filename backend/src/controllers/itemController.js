import prisma from '../prisma/client.js'
import { generateCustomId } from '../utils/customIdGenerator.js'

export async function createItem(req,res){
  const { inventoryId,data } = req.body
  const inventory = await prisma.inventory.findUnique({ where:{id:inventoryId} })
  const count = await prisma.item.count({ where:{ inventoryId } })
  const customId = generateCustomId(inventory.customIdFormat || [], count)
  const item = await prisma.item.create({ data:{ inventoryId, customId, fields:data, createdById:req.user.id } })
  req.io?.emit(`itemAdded:${inventoryId}`,item)
  res.json(item)
}

export async function updateItem(req,res){
  const { id } = req.params
  const { data, customId, version } = req.body
  const item = await prisma.item.updateMany({
    where:{ id:parseInt(id), version },
    data:{ fields:data, customId, version:{ increment:1 } }
  })
  if(item.count===0) return res.status(409).json({ message:'Conflict, version mismatch'})
  req.io?.emit(`itemUpdated:${id}`,data)
  res.json({ message:'Updated' })
}

export async function likeItem(req,res){
  const { id } = req.params
  const item = await prisma.item.findUnique({ where:{ id:parseInt(id) }})
  const likes = item.likes || 0
  await prisma.item.update({ where:{id:parseInt(id)}, data:{likes:likes+1} })
  req.io?.emit(`itemLiked:${id}`,likes+1)
  res.json({ likes:likes+1 })
}
