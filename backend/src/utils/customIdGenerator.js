import crypto from 'crypto'

export function generateCustomId(format = [], itemCount = 0) {
  let id = ''
  for (let part of format) {
    switch (part.type) {
      case 'fixed':
        id += part.value || ''
        break
      case 'seq':
        {
          const pad = part.pad || 0
          id += String(itemCount + 1).padStart(pad, '0')
        }
        break
      case 'rand6':
        id += String(Math.floor(Math.random() * 1e6)).padStart(6, '0')
        break
      case 'rand9':
        id += String(Math.floor(Math.random() * 1e9)).padStart(9, '0')
        break
      case 'rand20':
        id += String(Math.floor(Math.random() * (1 << 20)))
        break
      case 'rand32':
        id += String(Math.floor(Math.random() * (1 << 32)))
        break
      case 'guid':
        id += crypto.randomUUID()
        break
      case 'datetime':
        id += new Date().toISOString().replace(/[:.]/g, '-')
        break
      default:
        break
    }
  }
  return id
}
