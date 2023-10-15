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

export type TOrderNumber = {
  number: number
}

export type TCurrectedOrder = TOrder & { ingredients: TIngredient[] }

export type TOrderCreationResponse = {
  success: boolean
  name: string
  order: TCurrectedOrder
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

export type TSuccessResponse = {
  success: boolean
  message?: string
}

export type TUserSuccessResponse = TSuccessResponse & { user: TFormUser }

export type TToken = {
  accessToken: string
  refreshToken: string
}

export type TGeneralStatus = '' | 'LOADING' | 'SUCCESS' | 'ERROR'
export type TGeneralStatusWS = 'OFFLINE' | 'CONNECTING' | 'ONLINE'
