export async function protect(req, res, next) {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      if (req.user && req.user.blocked) return res.status(401).json({ message: 'User blocked' })
      return next()
    }
    return res.status(401).json({ message: 'Not authorized' })
  } catch (err) {
    next(err)
  }
}

export function admin(req, res, next) {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ message: 'Admin only' })
}
