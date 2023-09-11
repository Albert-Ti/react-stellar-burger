import { createReducer } from '@reduxjs/toolkit'
import { wsStatus } from '../../utils/constants'
import {
  profileOrderWsClose,
  profileOrderWsConnecting,
  profileOrderWsError,
  profileOrderWsMessage,
  profileOrderWsOpen
} from './profile-orders-actions'
import { currectOrderItems } from '../orders-update'

const initialState = {
  statusOrders: wsStatus.offline,
  orders: null,
  connectingError: null
}

export const profileOrderReducer = createReducer(initialState, builder => {
  builder
    .addCase(profileOrderWsConnecting, state => {
      state.statusOrders = wsStatus.connecting
    })
    .addCase(profileOrderWsOpen, state => {
      state.statusOrders = wsStatus.online
    })
    .addCase(profileOrderWsClose, state => {
      state.statusOrders = wsStatus.offline
    })
    .addCase(profileOrderWsMessage, (state, { payload }) => {
      const { orders, success } = payload
      if (success) {
        state.orders = currectOrderItems(orders)
      }
    })
    .addCase(profileOrderWsError, (state, action) => {
      state.connectingError = action.payload
    })
})

export const profileOrderStore = store => store.profileOrder
