import prisma from '../config/db.js'

export const CustomID = {
  findByInventory: (inventoryId) => prisma.customID.findMany({ where: { inventoryId }, orderBy: { order: 'asc' } }),
  create: (data) => prisma.customID.create({ data }),
  update: (id, data) => prisma.customID.update({ where: { id }, data }),
  delete: (id) => prisma.customID.delete({ where: { id } }),
}
