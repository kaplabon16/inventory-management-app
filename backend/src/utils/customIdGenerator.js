const { randomBytes } = require('crypto')
const generateCustomId = (format) => {
  // format is array of elements: ['TEXT:INV', 'SEQ', 'RANDOM6']
  const now = new Date()
  let seq = Math.floor(Math.random() * 1000000)
  let id = ''
  format.forEach(el => {
    if(el.startsWith('TEXT:')) id += el.replace('TEXT:', '')
    if(el === 'SEQ') id += seq
    if(el === 'RANDOM6') id += ('000000' + Math.floor(Math.random()*1e6)).slice(-6)
    if(el === 'RANDOM9') id += ('000000000' + Math.floor(Math.random()*1e9)).slice(-9)
    if(el === 'DATE') id += now.toISOString().replace(/[-:.TZ]/g,'')
    if(el === 'GUID') id += randomBytes(16).toString('hex')
  })
  return id
}
module.exports = generateCustomId
