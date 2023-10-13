import { TIngredient } from '../../types'

export type TIngredientConstructor = {
  ingredient: TIngredient
  index?: number
  type?: 'top' | 'bottom'
}
