export function generateCustomId(prefix = 'ID') {
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${Date.now()}-${random}`
}
