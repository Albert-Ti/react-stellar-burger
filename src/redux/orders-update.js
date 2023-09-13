/* eslint-disable array-callback-return */
export function isValidHexID(id) {
  // Проверяем, является ли ID строкой и состоит ли он только из шестнадцатеричных символов (0-9, a-f, A-F)
  if (typeof id !== 'string' || !/^[0-9a-fA-F]+$/.test(id)) {
    return false
  }
  return true
}

export function currectOrderItems(items) {
  return items
    .map(order => {
      if (
        order.name &&
        order.ingredients &&
        order._id &&
        order.createdAt &&
        order.status &&
        order.number
      ) {
        if (isValidHexID(order._id)) {
          if (order.ingredients.every(i => isValidHexID(i))) {
            return order
          }
        }
      }
    })
    .filter(item => item)
}
