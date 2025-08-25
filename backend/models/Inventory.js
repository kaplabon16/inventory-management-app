import prisma from '../config/db.js'

export const Inventory = {
  findById: (id) => prisma.inventory.findUnique({ where: { id }, include: { items: true, fields: true, customIDs: true, discussions: true } }),
  create: (data) => prisma.inventory.create({ data }),
  update: (id, data) => prisma.inventory.update({ where: { id }, data }),
  updateMany: (where, data) => prisma.inventory.updateMany({ where, data }),
  delete: (id) => prisma.inventory.delete({ where: { id } }),
  findLatest: (limit = 10) => prisma.inventory.findMany({ orderBy: { createdAt: 'desc' }, take: limit }),
  findPopular: (limit = 5) => prisma.inventory.findMany({ orderBy: { items: { _count: 'desc' } }, take: limit }),
  search: (query) => prisma.inventory.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } }
      ]
    }
  }),
}
