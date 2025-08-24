// backend/src/controllers/inventoryController.js
import prisma from '../prisma/client.js'

export async function createInventory(req,res){
  const {title,description,category,public: isPublic,tags,customFields,customIdFormat} = req.body
  const inventory = await prisma.inventory.create({
    data:{
      title,description,category,public:isPublic ?? false,
      ownerId:req.user.id,
      tags,
      customFields,
      customIdFormat
    }
  })
  res.json(inventory)
}

export async function updateInventory(req,res){
  const { id } = req.params
  const { title,description,category,public: isPublic,tags,customFields,customIdFormat,version } = req.body
  const inventory = await prisma.inventory.updateMany({
    where:{ id:parseInt(id), version },
    data:{
      title,description,category,public:isPublic ?? false,
      tags,customFields,customIdFormat,
      version:{ increment:1 }
    }
  })
  if(inventory.count === 0) return res.status(409).json({ message:'Conflict, version mismatch'})
  res.json({ message:'Updated' })
}

export async function getInventory(req,res){
  const { id } = req.params
  const inventory = await prisma.inventory.findUnique({ where:{id:parseInt(id)}, include:{items:true} })
  res.json(inventory)
}

export async function searchInventory(req,res){
  const { q } = req.query
  const inventories = await prisma.inventory.findMany({
    where: q ? {
      OR:[
        { title:{ contains:q, mode:'insensitive' } },
        { description:{ contains:q, mode:'insensitive' } }
      ]
    } : {},
    include: { _count: { select: { items: true } } }
  })
  res.json(inventories)
}
