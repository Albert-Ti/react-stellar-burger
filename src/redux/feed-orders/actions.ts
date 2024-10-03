import {createAction} from '@reduxjs/toolkit'
import {TOrdersResponse} from '../../types'

export const feedOrdersConnect = createAction<string | undefined, 'FEED_ORDERS_CONNECT'>(
  'FEED_ORDERS_CONNECT'
)
export const feedOrdersDisconnect = createAction<void, 'FEED_ORDERS_DISCONNECT'>(
  'FEED_ORDERS_DISCONNECT'
)
export const feedOrdersWsConnecting = createAction<void, 'FEED_ORDERS_WS_CONNECTING'>(
  'FEED_ORDERS_WS_CONNECTING'
)
export const feedOrdersWsOpen = createAction<void, 'FEED_ORDERS_WS_OPEN'>('FEED_ORDERS_WS_OPEN')
export const feedOrdersWsClose = createAction<void, 'FEED_ORDERS_WS_CLOSE'>('FEED_ORDERS_WS_CLOSE')
export const feedOrdersWsError = createAction<void, 'FEED_ORDERS_WS_ERROR'>('FEED_ORDERS_WS_ERROR')
export const feedOrdersWsMessage = createAction<TOrdersResponse, 'FEED_ORDERS_WS_MESSAGE'>(
  'FEED_ORDERS_WS_MESSAGE'
)
