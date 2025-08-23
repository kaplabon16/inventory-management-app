export function formatDate(iso){
  if(!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString()
}
