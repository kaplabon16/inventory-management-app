import prisma from '../config/db.js'

export const Item = {
  findById: (id) => prisma.item.findUnique({ where: { id } }),
  create: (data) => prisma.item.create({ data }),
  updateMany: (where, data) => prisma.item.updateMany({ where, data }),
  delete: (id) => prisma.item.delete({ where: { id } }),
  findAllByInventory: (inventoryId) => prisma.item.findMany({ where: { inventoryId } }),
}
