import React from 'react'
import { useSelector } from 'react-redux'
import { ingredientsStore } from '../redux/ingredients/ingredients-slice'
import { isBun } from '../utils/constants'

export const useOrder = arrayId => {
  const { items } = useSelector(ingredientsStore)
  const getFindIngredients = React.useMemo(() => {
    const findItems = arrayId?.map(i => items.find(item => item._id === i))
    const bun = findItems?.filter(item => item?.type === isBun)
    const other = findItems?.filter(item => item?.type !== isBun)
    if (bun) {
      return {
        items: [bun[0], ...other],
        totalPrice: other?.reduce((acc, item) => acc + item?.price, bun[0]?.price * 2)
      }
    }
  }, [items, arrayId])

  return getFindIngredients
}
