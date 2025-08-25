import prisma from '../config/db.js'

export async function getItemById(req, res, next) {
  try {
    const { id } = req.params
    const item = await prisma.item.findUnique({ where: { id } })
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (err) { next(err) }
}
