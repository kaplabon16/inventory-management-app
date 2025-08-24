// frontend/src/utils/generatecustomid.js
// Mirror of backend customId generator for client-side preview
export function generateCustomId(format = [], itemCount = 0) {
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
        // lightweight guid-ish preview
        id += (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36))
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
