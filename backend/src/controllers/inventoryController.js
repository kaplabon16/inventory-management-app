import prisma from '../prisma/client.js'

export async function createInventory(req, res, next) {
  try {
    const { title, description, category, publicAccess, tags, customFields, customIdFormat } = req.body
    const inventory = await prisma.inventory.create({
      data: {
        title,
        description,
        category,
        public: !!publicAccess,
        ownerId: req.user.id,
        tags: tags || [],
        customFields: customFields || [],
        customIdFormat: customIdFormat || []
      }
    })
    res.json(inventory)
  } catch (err) {
    next(err)
  }
}

export async function updateInventory(req, res, next) {
  try {
    const { id } = req.params
    const { title, description, category, publicAccess, tags, customFields, customIdFormat, version } = req.body

    const result = await prisma.inventory.updateMany({
      where: { id: parseInt(id), version },
      data: {
        title,
        description,
        category,
        public: !!publicAccess,
        tags: tags || [],
        customFields: customFields || [],
        customIdFormat: customIdFormat || [],
        version: { increment: 1 }
      }
    })

    if (result.count === 0) return res.status(409).json({ message: 'Conflict, version mismatch' })
    res.json({ message: 'Updated' })
  } catch (err) {
    next(err)
  }
}

export async function getInventory(req, res, next) {
  try {
    const { id } = req.params
    const inventory = await prisma.inventory.findUnique({
      where: { id: parseInt(id) },
      include: { items: true, posts: true }
    })
    if (!inventory) return res.status(404).json({ message: 'Not found' })
    res.json(inventory)
  } catch (err) {
    next(err)
  }
}

export async function searchInventory(req, res, next) {
  try {
    const { q } = req.query
    const inventories = await prisma.inventory.findMany({
      where: {
        OR: [
          { title: { contains: q || '', mode: 'insensitive' } },
          { description: { contains: q || '', mode: 'insensitive' } }
        ]
      },
      take: 50
    })
    res.json(inventories)
  } catch (err) {
    next(err)
  }
}
