export const formatPrice = (value) => `৳${Number(value).toLocaleString('en-BD')}`

export const calcDiscountPercent = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

export const truncate = (str, n) => (str && str.length > n ? str.slice(0, n).trim() + '…' : str)
