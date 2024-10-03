import React from 'react'
import {useSelector} from 'react-redux'
import CardLoader from '../../components/UI/card-loader/card-loader'
import OrderCard from '../../components/order-card/order-card'
import {useAppDispatch} from '../../hooks'
import {
  profileOrderConnect as connect,
  profileOrderDisconnect as disconnect,
} from '../../redux/profile-orders/actions'
import {profileOrderStore} from '../../redux/profile-orders/reducer'
import {fetchCheckUser} from '../../redux/user/actions'
import {WS_ORDERS_URL, wsStatus} from '../../utils/constants'
import ErrorPage from '../error-page'
import styles from './profile-orders.module.css'

const ProfileOrders = () => {
  const dispatch = useAppDispatch()
  const {orders, wsStatusOrders, connectingError} = useSelector(profileOrderStore)
  const token = localStorage.getItem('access-token')?.replace('Bearer ', '')

  React.useEffect(() => {
    if (token) {
      dispatch(connect(`${WS_ORDERS_URL}?token=${token}`))
    } else {
      dispatch(fetchCheckUser())
    }
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch, token])

  if (connectingError) return <ErrorPage />
  return (
    <div className={`custom-scroll ${styles.content}`}>
      {wsStatusOrders === wsStatus.connecting ? (
        [...Array(5)].map((_, i) => (
          <div key={i}>
            <CardLoader />
          </div>
        ))
      ) : !orders?.length ? (
        <div>
          <h1 style={{textAlign: 'center'}} className='text_type_main-large'>
            История заказов пуста
          </h1>
        </div>
      ) : (
        [...orders]?.reverse().map(order => <OrderCard key={order._id} {...order} />)
      )}
    </div>
  )
}

export default ProfileOrders
