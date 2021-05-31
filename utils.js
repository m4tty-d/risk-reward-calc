export const formatNumber = (v) => {
  if (!v) return
  return v.toFixed(2) % 1 === 0 ? v.toFixed() : v.toFixed(2)
}
