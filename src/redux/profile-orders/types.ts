import { TGeneralStatusWS, TOrder } from '../../types'

export type TProfileOrdersState = {
  wsStatusOrders: TGeneralStatusWS
  orders: null | TOrder[]
  connectingError: null | string
}
