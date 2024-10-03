import {Middleware, MiddlewareAPI} from 'redux'
import {
  feedOrdersConnect,
  feedOrdersDisconnect,
  feedOrdersWsClose,
  feedOrdersWsConnecting,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen,
} from '../feed-orders/actions'
import {
  profileOrderConnect,
  profileOrderDisconnect,
  profileOrderWsClose,
  profileOrderWsConnecting,
  profileOrderWsError,
  profileOrderWsMessage,
  profileOrderWsOpen,
} from '../profile-orders/actions'
import {AppDispatch, RootState} from '../store'
import {fetchCheckUser} from '../user/actions'

type TWsActions = {
  wsConnect: typeof feedOrdersConnect | typeof profileOrderConnect
  wsDisconnect: typeof feedOrdersDisconnect | typeof profileOrderDisconnect
  wsConnecting: typeof feedOrdersWsConnecting | typeof profileOrderWsConnecting
  onOpen: typeof feedOrdersWsOpen | typeof profileOrderWsOpen
  onMessage: typeof feedOrdersWsMessage | typeof profileOrderWsMessage
  onClose: typeof feedOrdersWsClose | typeof profileOrderWsClose
  onError: typeof feedOrdersWsError | typeof profileOrderWsError
}

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null
    let isCLosed = false

    return next => action => {
      const {dispatch} = store
      const {wsConnect, wsDisconnect, wsConnecting, onOpen, onMessage, onClose, onError} = wsActions

      if (wsConnect.match(action)) {
        if (action.payload) {
          socket = new WebSocket(action.payload)
          dispatch(wsConnecting())
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen())
        }

        socket.onmessage = event => {
          const {data} = event
          if (data.message === 'Invalid or missing token') {
            dispatch(fetchCheckUser())
          } else {
            dispatch(onMessage(JSON.parse(data)))
          }
        }

        socket.onerror = event => {
          dispatch(onError())
        }

        socket.onclose = event => {
          if (!isCLosed) {
            dispatch(onClose())
          } else {
            dispatch(wsConnect())
          }
        }

        if (wsDisconnect.match(action)) {
          socket.close()
          socket = null
          isCLosed = true
        }
      }

      next(action)
    }
  }
}
