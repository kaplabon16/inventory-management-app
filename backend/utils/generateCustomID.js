export function generateCustomID(template, existingIds) {
  let newId = template.replace(/\{n\}/g, () => Math.floor(Math.random() * 100000))
  while (existingIds.includes(newId)) {
    newId = template.replace(/\{n\}/g, () => Math.floor(Math.random() * 100000))
  }
  return newId
}
