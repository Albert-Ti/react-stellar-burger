import { createAction } from '@reduxjs/toolkit'
import { TOrdersResponse } from '../../types'

export const profileOrderConntect = createAction<string | undefined, 'PROFILE_ORDER_CONNECT'>(
  'PROFILE_ORDER_CONNECT'
)
export const profileOrderDisconnect = createAction<void, 'PROFILE_ORDER_DISCONNECT'>(
  'PROFILE_ORDER_DISCONNECT'
)
export const profileOrderWsConnecting = createAction<void, 'PROFILE_ORDER_WS_CONNECTING'>(
  'PROFILE_ORDER_WS_CONNECTING'
)
export const profileOrderWsOpen = createAction<void, 'PROFILE_ORDER_WS_OPEN'>(
  'PROFILE_ORDER_WS_OPEN'
)
export const profileOrderWsClose = createAction<void, 'PROFILE_ORDER_WS_CLOSE'>(
  'PROFILE_ORDER_WS_CLOSE'
)
export const profileOrderWsError = createAction<void, 'PROFILE_ORDER_WS_ERROR'>(
  'PROFILE_ORDER_WS_ERROR'
)
export const profileOrderWsMessage = createAction<TOrdersResponse, 'PROFILE_ORDER_WS_MESSAGE'>(
  'PROFILE_ORDER_WS_MESSAGE'
)
