import { TGeneralStatus, TIngredient } from '../../types'

export type TIngredientsState = {
  items: TIngredient[]
  status: TGeneralStatus
  currentTab: string
}
