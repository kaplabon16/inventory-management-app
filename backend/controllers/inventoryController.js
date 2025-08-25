import prisma from '../config/db.js'

export async function createInventory(req, res) {
  const { title, description, category, public: isPublic, tags, imageUrl } = req.body
  const inventory = await prisma.inventory.create({
    data: {
      title, description, category, public: isPublic, tags, imageUrl,
      creatorId: req.user.id
    }
  })
  res.json(inventory)
}

export async function updateInventory(req, res) {
  const { id } = req.params
  const { title, description, category, public: isPublic, tags, imageUrl, version } = req.body
  try {
    const updated = await prisma.inventory.updateMany({
      where: { id, version },
      data: {
        title, description, category, public: isPublic, tags, imageUrl,
        version: { increment: 1 }
      }
    })
    if (updated.count === 0) return res.status(409).json({ message: 'Conflict: Inventory updated elsewhere' })
    const inventory = await prisma.inventory.findUnique({ where: { id } })
    res.json(inventory)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getInventory(req, res) {
  const { id } = req.params
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    include: { items: true, fields: true, customIDs: true, discussions: true }
  })
  res.json(inventory)
}

export async function deleteInventory(req, res) {
  const { id } = req.params
  await prisma.inventory.delete({ where: { id } })
  res.json({ message: 'Deleted' })
}

export async function getLatestInventories(req, res) {
  const inventories = await prisma.inventory.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
  res.json(inventories)
}

export async function getPopularInventories(req, res) {
  const inventories = await prisma.inventory.findMany({
    orderBy: { items: { _count: 'desc' } },
    take: 5
  })
  res.json(inventories)
}

export async function searchInventories(req, res) {
  const { query } = req.query
  const inventories = await prisma.inventory.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } }
      ]
    }
  })
  res.json(inventories)
}
