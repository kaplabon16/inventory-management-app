// backend/src/utils/customIdGenerator.js
import { randomUUID } from 'crypto'

export function generateCustomId(format, itemCount) {
  let id = ''
  for (let part of format) {
    switch(part.type) {
      case 'fixed':
        id += part.value
        break
      case 'seq':
        id += (itemCount + 1).toString().padStart(part.pad || 0, '0')
        break
      case 'rand6':
        id += Math.floor(Math.random() * 1e6).toString().padStart(6,'0')
        break
      case 'rand9':
        id += Math.floor(Math.random() * 1e9).toString().padStart(9,'0')
        break
      case 'rand20':
        id += Math.floor(Math.random() * (1<<20)).toString()
        break
      case 'rand32':
        id += Math.floor(Math.random() * (1<<32)).toString()
        break
      case 'guid':
        id += randomUUID()
        break
      case 'datetime':
        id += Date.now().toString()
        break
      default:
        break
    }
  }
  return id
}
