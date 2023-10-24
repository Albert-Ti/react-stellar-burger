import { TGeneralStatusWS, TOrder } from '../../types'

export type TFeedOrderState = {
  wsStatusOrders: TGeneralStatusWS
  orders: TOrder[]
  statistics: { total: number; totalToday: number }
  connectingError: null | string
}
