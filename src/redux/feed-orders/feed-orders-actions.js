import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getOrderRequest } from '../../utils/api'

export const feedOrdersConnect = createAction('FEED_ORDERS_CONNECT')
export const feedOrdersDisconnect = createAction('FEED_ORDERS_DISCONNECT')
export const feedOrdersWsConnecting = createAction('FEED_ORDERS_WS_CONNECTING')
export const feedOrdersWsOpen = createAction('FEED_ORDERS_WS_OPEN')
export const feedOrdersWsClose = createAction('FEED_ORDERS_WS_CLOSE')
export const feedOrdersWsError = createAction('FEED_ORDERS_WS_ERROR')
export const feedOrdersWsMessage = createAction('FEED_ORDERS_WS_MESSAGE')

export const fetchOrderCard = createAsyncThunk('order/fetchOrderCardStatus', getOrderRequest)
