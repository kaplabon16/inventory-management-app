import prisma from '../config/db.js'

export const Discussion = {
  findByInventory: (inventoryId) => prisma.discussion.findMany({
    where: { inventoryId },
    include: { user: { select: { id: true, username: true } } },
    orderBy: { createdAt: 'asc' }
  }),
  create: (data) => prisma.discussion.create({ data }),
}
