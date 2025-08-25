export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0
}
