import { createAction } from '@reduxjs/toolkit'

export const profileOrderConntect = createAction('PROFILE_ORDER_CONNECT')
export const profileOrderDisconnect = createAction('PROFILE_ORDER_DISCONNECT')
export const profileOrderWsConnecting = createAction('PROFILE_ORDER_WS_CONNECTING')
export const profileOrderWsOpen = createAction('PROFILE_ORDER_WS_OPEN')
export const profileOrderWsClose = createAction('PROFILE_ORDER_WS_CLOSE')
export const profileOrderWsError = createAction('PROFILE_ORDER_WS_ERROR')
export const profileOrderWsMessage = createAction('PROFILE_ORDER_WS_MESSAGE')
