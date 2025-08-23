// Simple utility to generate custom IDs for inventory items
export function generateCustomId(prefix = "item") {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`
}
