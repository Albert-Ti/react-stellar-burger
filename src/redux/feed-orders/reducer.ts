import { createReducer } from '@reduxjs/toolkit'
import { wsStatus } from '../../utils/constants'
import { currectOrderItems } from '../orders-verification'
import { RootState } from '../store'
import {
  feedOrdersWsClose,
  feedOrdersWsConnecting,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen
} from './actions'
import { TFeedOrderState } from './types'

const initialState: TFeedOrderState = {
  wsStatusOrders: wsStatus.offline,
  orders: [],
  statistics: {
    total: 0,
    totalToday: 0
  },
  connectingError: null
}

export const feedOrdersReducer = createReducer(initialState, builder => {
  builder
    .addCase(feedOrdersWsConnecting, state => {
      state.wsStatusOrders = wsStatus.connecting
    })
    .addCase(feedOrdersWsOpen, state => {
      state.wsStatusOrders = wsStatus.online
    })
    .addCase(feedOrdersWsClose, state => {
      state.wsStatusOrders = wsStatus.offline
    })
    .addCase(feedOrdersWsError, (state, { payload }) => {
      if (payload) {
        state.connectingError = payload
      }
    })
    .addCase(feedOrdersWsMessage, (state, { payload }) => {
      if (payload) {
        const { orders, total, totalToday, success } = payload
        if (success) {
          state.statistics = { total, totalToday }
          state.orders = currectOrderItems(orders)
        }
      }
    })
})

export const feedOrderStore = (store: RootState) => store.feedOrders
