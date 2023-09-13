import { fetchCheckUser } from '../user/user-actions'

export const socketMiddleware = wsActions => {
  return store => {
    let socket = null
    let isCLosed = false

    return next => action => {
      const { dispatch } = store
      const {
        wsConnect,
        wsdisconnect,
        wsConnecting,
        onOpen,
        onMessage,
        onClose,
        onError,
        wsSendMessage
      } = wsActions

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
          const { data } = event
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

        // if (wsSendMessage && wsSendMessage.match(action)) {
        //   socket.send(JSON.stringify(action.payload))
        // }

        if (wsdisconnect.match(action)) {
          socket.close()
          socket = null
          isCLosed = true
        }
      }

      next(action)
    }
  }
}
