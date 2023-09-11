import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardLoader from '../../components/UI/card-loader/card-loader'
import OrderCard from '../../components/order-card/order-card'
import {
  profileOrderConntect as connect,
  profileOrderDisconnect as disconnect
} from '../../redux/profile-orders/profile-orders-actions'
import { profileOrderStore } from '../../redux/profile-orders/profile-orders-reducer'
import { fetchCheckUser } from '../../redux/user/user-actions'
import { WS_ORDERS_URL, wsStatus } from '../../utils/constants'
import ErrorPage from '../error-page'
import styles from './profile-orders.module.css'

const ProfileOrders = () => {
  const dispatch = useDispatch()
  const { orders, statusOrders, connectingError } = useSelector(profileOrderStore)
  const token = localStorage.getItem('access-token')?.replace('Bearer ', '')

  React.useEffect(() => {
    if (token) {
      dispatch(connect(`${WS_ORDERS_URL}?token=${token}`))
    } else {
      dispatch(fetchCheckUser())
    }
    return () => dispatch(disconnect())
  }, [])

  if (connectingError) return <ErrorPage />
  return (
    <div className={`custom-scroll ${styles.content}`}>
      {statusOrders === wsStatus.connecting ? (
        [...Array(5)].map((_, i) => (
          <div key={i}>
            <CardLoader />
          </div>
        ))
      ) : !orders?.length ? (
        <div>
          <h1 style={{ textAlign: 'center' }} className='text_type_main-large'>
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
