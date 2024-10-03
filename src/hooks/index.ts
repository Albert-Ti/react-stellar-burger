import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ingredientsStore} from '../redux/ingredients/slice'
import {AppDispatch} from '../redux/store'
import {TFormUser, TIngredient} from '../types'
import {isBun} from '../utils/constants'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useForm = (inputValue = {}) => {
  const [values, setValues] = React.useState<TFormUser>(inputValue)

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
    sessionStorage.setItem(name, value)
  }

  return {values, setValues, handleChanges}
}

export const useOrder = (arrayId: string[]) => {
  const {items} = useSelector(ingredientsStore)
  const getFindIngredients = React.useMemo(() => {
    const findItems = arrayId?.map(i => items.find(item => item._id === i))
    const bun = findItems.filter(item => item?.type === isBun) as TIngredient[]
    const other = findItems.filter(item => item?.type !== isBun) as TIngredient[]

    return {
      items: [bun[0], ...other].filter(item => item !== undefined),
      totalPrice: other?.reduce((acc, item) => acc + item?.price, bun[0]?.price * 2),
    }
  }, [items, arrayId])

  return getFindIngredients
}
