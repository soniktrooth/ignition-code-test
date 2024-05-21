export const currencyRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/

export const isValidCurrency = (str: string): boolean => {
  const regex = new RegExp(currencyRegex)
  if (!str) {
    return false
  }
  return regex.test(str)
}
