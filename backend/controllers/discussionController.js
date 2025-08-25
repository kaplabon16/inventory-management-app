import prisma from '../config/db.js'

export async function addComment(req, res) {
  const { inventoryId, message } = req.body
  const comment = await prisma.discussion.create({
    data: { inventoryId, message, userId: req.user.id }
  })
  res.json(comment)
}

export async function getComments(req, res) {
  const { inventoryId } = req.params
  const comments = await prisma.discussion.findMany({
    where: { inventoryId },
    include: { user: { select: { id: true, username: true } } },
    orderBy: { createdAt: 'asc' }
  })
  res.json(comments)
}
