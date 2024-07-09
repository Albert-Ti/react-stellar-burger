import { configureStore } from '@reduxjs/toolkit'
import burger from '../constructor/slice'
import { feedOrdersReducer as feedOrders } from '../feed-orders/reducer'
import ingredients from '../ingredients/slice'
import { socketMiddleware } from '../middleware/socket-middleware'
import * as actionsFeed from '../feed-orders/actions'
import * as actionsProfile from '../profile-orders/actions'
import { profileOrderReducer as profileOrder } from '../profile-orders/reducer'
import user from '../user/slice'

const feedOrdersMiddleWare = socketMiddleware({
  wsConnect: actionsFeed.feedOrdersConnect,
  wsConnecting: actionsFeed.feedOrdersWsConnecting,
  wsdisconnect: actionsFeed.feedOrdersDisconnect,
  onOpen: actionsFeed.feedOrdersWsOpen,
  onClose: actionsFeed.feedOrdersWsClose,
  onError: actionsFeed.feedOrdersWsError,
  onMessage: actionsFeed.feedOrdersWsMessage,
})

const profileOrderMiddleWare = socketMiddleware({
  wsConnect: actionsProfile.profileOrderConntect,
  wsConnecting: actionsProfile.profileOrderWsConnecting,
  wsdisconnect: actionsProfile.profileOrderDisconnect,
  onOpen: actionsProfile.profileOrderWsOpen,
  onClose: actionsProfile.profileOrderWsClose,
  onError: actionsProfile.profileOrderWsError,
  onMessage: actionsProfile.profileOrderWsMessage,
})

const store = configureStore({
  reducer: {
    ingredients,
    burger,
    user,
    feedOrders,
    profileOrder,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(feedOrdersMiddleWare, profileOrderMiddleWare)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
