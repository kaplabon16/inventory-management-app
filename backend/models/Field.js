import prisma from '../config/db.js'

export const Field = {
  findByInventory: (inventoryId) => prisma.field.findMany({ where: { inventoryId }, orderBy: { order: 'asc' } }),
  create: (data) => prisma.field.create({ data }),
  update: (id, data) => prisma.field.update({ where: { id }, data }),
  delete: (id) => prisma.field.delete({ where: { id } }),
}
