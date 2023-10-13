import { TOptionsResponse } from '../types'

export const modalElememt = document.getElementById('modal')!

export const isBun = 'bun'
export const isSauce = 'sauce'
export const isMain = 'main'

export const tabBun = 'one'
export const tabSauce = 'two'
export const tabMain = 'three'

export const isHeaders = {
  Булки: isBun,
  Соусы: isSauce,
  Начинки: isMain
} as const

export const wsStatus = {
  connecting: 'CONNECTING',
  offline: 'OFFLINE',
  online: 'ONLINE'
} as const

export const BASE_URL = 'https://norma.nomoreparties.space/api/'
export const WS_ORDERS_ALL_URL = 'wss://norma.nomoreparties.space/orders/all'
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders'

export const options: TOptionsResponse = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer'
}
