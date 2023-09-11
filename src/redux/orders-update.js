export function isValidHexID(id) {
  // Проверяем, является ли ID строкой и состоит ли он только из шестнадцатеричных символов (0-9, a-f, A-F)
  if (typeof id !== 'string' || !/^[0-9a-fA-F]+$/.test(id)) {
    return false
  }
  return true
}

export function currectOrderItems(items) {
  return items.map(item => {
    if (item.name && item.ingredients && item._id && item.createdAt && item.status && item.number) {
      if (isValidHexID(item._id)) return item
    }
  })
}
