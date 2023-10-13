import { configureStore } from '@reduxjs/toolkit'
import burger from '../constructor/slice'
import {
  feedOrdersConnect,
  feedOrdersDisconnect,
  feedOrdersWsClose,
  feedOrdersWsConnecting,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen
} from '../feed-orders/actions'
import { feedOrdersReducer as feedOrders } from '../feed-orders/reducer'
import ingredients from '../ingredients/slice'
import { socketMiddleware } from '../middleware/socket-middleware'
import {
  profileOrderConntect,
  profileOrderDisconnect,
  profileOrderWsClose,
  profileOrderWsConnecting,
  profileOrderWsError,
  profileOrderWsMessage,
  profileOrderWsOpen
} from '../profile-orders/actions'
import { profileOrderReducer as profileOrder } from '../profile-orders/reducer'
import user from '../user/slice'

const feedOrdersMiddleWare = socketMiddleware({
  wsConnect: feedOrdersConnect,
  wsConnecting: feedOrdersWsConnecting,
  wsdisconnect: feedOrdersDisconnect,
  onOpen: feedOrdersWsOpen,
  onClose: feedOrdersWsClose,
  onError: feedOrdersWsError,
  onMessage: feedOrdersWsMessage
})

const profileOrderMiddleWare = socketMiddleware({
  wsConnect: profileOrderConntect,
  wsConnecting: profileOrderWsConnecting,
  wsdisconnect: profileOrderDisconnect,
  onOpen: profileOrderWsOpen,
  onClose: profileOrderWsClose,
  onError: profileOrderWsError,
  onMessage: profileOrderWsMessage
})

const store = configureStore({
  reducer: {
    ingredients,
    burger,
    user,
    feedOrders,
    profileOrder
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(feedOrdersMiddleWare, profileOrderMiddleWare)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
