export const generateCustomId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000)
  return `ID_${randomNum}`
}
