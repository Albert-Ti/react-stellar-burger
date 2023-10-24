import { TGeneralStatus, TIngredient, TOrder, TOrderNumber } from '../../types'

export type IConstructorState = {
  bun: TIngredient
  addedIngredients: TIngredient[]
  countIngredient: number
  totalPrice: number
  createdOrder: TOrderNumber
  statusCreatedOrder: TGeneralStatus
  order: TOrder
  statusOrder: TGeneralStatus
}

export type TDragAndDropIndex = { hoverIndex: number; dragIndex: number }
