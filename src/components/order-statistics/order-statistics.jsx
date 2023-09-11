import { useSelector } from 'react-redux'
import OrderNumberList from '../order-number-list/order-number-list'
import styles from './order-statistics.module.css'

const OrderStatistics = () => {
  const { statistics } = useSelector(store => store.feedOrders)

  return (
    <section className={styles.orderDietails}>
      <div className={styles.status}>
        <OrderNumberList status='done' title='Готово' />
        <OrderNumberList status='pending' title='В работе' />
      </div>
      <div>
        <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
        <span className={`${styles.timeProgress} text_type_digits-large`}>{statistics?.total}</span>
      </div>
      <div>
        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
        <span className={`${styles.timeProgress} text_type_digits-large`}>
          {statistics?.totalToday}
        </span>
      </div>
    </section>
  )
}

export default OrderStatistics
