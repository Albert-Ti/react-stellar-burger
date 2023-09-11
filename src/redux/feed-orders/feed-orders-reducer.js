import { createReducer } from '@reduxjs/toolkit'
import {
  feedOrdersWsConnecting,
  feedOrdersWsClose,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen,
  fetchOrderCard
} from './feed-orders-actions'
import { currectOrderItems } from '../orders-update'
import { wsStatus } from '../../utils/constants'

const initialState = {
  statusOrders: wsStatus.offline,
  orders: null,
  order: null,
  statusOrder: 'loading',
  statistics: {},
  connectingError: null
}

export const feedOrdersReducer = createReducer(initialState, builder => {
  builder
    .addCase(feedOrdersWsConnecting, state => {
      state.statusOrders = wsStatus.connecting
    })
    .addCase(feedOrdersWsOpen, state => {
      state.statusOrders = wsStatus.online
    })
    .addCase(feedOrdersWsClose, state => {
      state.statusOrders = wsStatus.offline
    })
    .addCase(feedOrdersWsError, (state, action) => {
      state.connectingError = action.payload
    })
    .addCase(feedOrdersWsMessage, (state, { payload }) => {
      const { orders, total, totalToday, success } = payload
      if (success) {
        state.statistics = { total, totalToday }
        state.orders = currectOrderItems(orders)
      }
    })
    .addCase(fetchOrderCard.pending, state => {
      state.statusOrder = 'loading'
    })
    .addCase(fetchOrderCard.fulfilled, (state, { payload }) => {
      state.statusOrder = 'access'
      state.order = payload.orders
    })
    .addCase(fetchOrderCard.rejected, state => {
      state.statusOrder = 'error'
    })
})

export const feedOrderStore = store => store.feedOrders
