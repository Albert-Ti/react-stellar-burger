import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderCard from '../../components/order-card/order-card'
import OrderStatistics from '../../components/order-statistics/order-statistics'
import {
  feedOrdersConnect as connect,
  feedOrdersDisconnect as disconnect
} from '../../redux/feed-orders/feed-orders-actions'
import { feedOrderStore } from '../../redux/feed-orders/feed-orders-reducer'
import { WS_ORDERS_ALL_URL } from '../../utils/constants'
import ErrorPage from '../error-page'
import Preloader from '../../components/UI/preloader/preloader'
import styles from './feed-orders.module.css'

const FeedOrders = () => {
  const dispatch = useDispatch()
  const { orders, connectingError } = useSelector(feedOrderStore)

  React.useEffect(() => {
    dispatch(connect(WS_ORDERS_ALL_URL))
    return () => dispatch(disconnect())
  }, [dispatch])

  if (connectingError) return <ErrorPage />
  if (!orders) return <Preloader />
  return (
    <>
      <h1 className=' text_type_main-large title'>Лента заказов</h1>
      <main className='main'>
        <section className={`custom-scroll ${styles.orderList}`}>
          {orders?.map(
            order =>
              order.ingredients.length > 1 &&
              order.status === 'done' && <OrderCard key={order._id} {...order} />
          )}
        </section>
        <OrderStatistics />
      </main>
    </>
  )
}

export default FeedOrders
