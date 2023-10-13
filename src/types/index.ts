import React from 'react'

export type TIngredient = {
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  __v: number
  _id: string
  count: number
  uuid?: string
  isLocked?: boolean
}

export type TOrder = {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
  owner?: string
  _v?: number
}

export type TOrdersResponse = {
  orders: TOrder[]
  success: boolean
  total: number
  totalToday: number
  message?: string
}

export type TOrderCreationProperty = { ingredients: string[] }

export type TOrderNumber = {
  number: number
}

export type TCurrectedOrder = Omit<TOrder, 'ingredients'> & TOrderCreationProperty

export type TOrderCreationResponse = {
  success: boolean
  name: string
  order: TOrderNumber | TCurrectedOrder
}

export type TModal = {
  onClose: () => void
  children?: React.ReactNode
}

export type TCorrectCardInfo = {
  totalPrice: number
  items: TIngredient[]
}

export type THandleSubmitForm = React.FormEvent<HTMLFormElement>

export type TFormUser = { [key: string]: string }

export type TOptionsResponse = {
  [key: string]: string | { [key: string]: string }
} & {
  headers: {
    readonly 'Content-type': 'application/json'
    authorization?: string
  }
}

export type TUserSuccessResponse = {
  success: boolean
  user: TFormUser
  message?: string
}

export type TSuccessResponse = Omit<TUserSuccessResponse, 'user'>

export type TToken = {
  accessToken: string
  refreshToken: string
}

export type TGeneralStatus = '' | 'LOADING' | 'SUCCESS' | 'ERROR'
export type TGeneralStatusWS = 'OFFLINE' | 'CONNECTING' | 'ONLINE'
