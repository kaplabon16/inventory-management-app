// No backend image uploads allowed per requirement
export function uploadMiddleware(req, res, next) {
  next()
}
