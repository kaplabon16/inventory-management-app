export function generateCustomId(prefix = 'INV') {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}-${timestamp}-${random}`
}
