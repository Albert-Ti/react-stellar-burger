import { createReducer } from '@reduxjs/toolkit'
import { wsStatus } from '../../utils/constants'
import { currectOrderItems } from '../orders-verification'
import { RootState } from '../store'
import {
  profileOrderWsClose,
  profileOrderWsConnecting,
  profileOrderWsError,
  profileOrderWsMessage,
  profileOrderWsOpen
} from './actions'
import { TProfileOrdersState } from './types'

const initialState: TProfileOrdersState = {
  wsStatusOrders: wsStatus.offline,
  orders: [],
  connectingError: null
}

export const profileOrderReducer = createReducer(initialState, builder => {
  builder
    .addCase(profileOrderWsConnecting, state => {
      state.wsStatusOrders = wsStatus.connecting
    })
    .addCase(profileOrderWsOpen, state => {
      state.wsStatusOrders = wsStatus.online
    })
    .addCase(profileOrderWsClose, state => {
      state.wsStatusOrders = wsStatus.offline
    })
    .addCase(profileOrderWsMessage, (state, { payload }) => {
      const { orders, success } = payload
      if (success) {
        state.orders = currectOrderItems(orders)
      }
    })
    .addCase(profileOrderWsError, (state, { payload }) => {
      if (payload) {
        state.connectingError = payload
      }
    })
})

export const profileOrderStore = (store: RootState) => store.profileOrder
