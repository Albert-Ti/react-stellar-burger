import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {feedOrderStore} from '../../redux/feed-orders/reducer'
import styles from './order-number-list.module.css'
import {TOrderNumberListProps} from './types'

const OrderNumberList: React.FC<TOrderNumberListProps> = ({status, title}) => {
  const {orders} = useSelector(feedOrderStore)

  return (
    <div>
      <h3 className={`text text_type_main-medium ${styles.titleProgress}`}>{title}:</h3>
      <ul className={`custom-scroll ${styles.progress}`}>
        {orders.map(
          order =>
            order.ingredients.length > 1 &&
            order.status === status && (
              <Link key={order.number} to={`/feed/${order.number}`}>
                <li
                  className={`text_type_digits-default ${status === 'done' ? 'text_color_success' : ''}`}
                >
                  {order.number}
                </li>
              </Link>
            )
        )}
      </ul>
    </div>
  )
}

export default OrderNumberList
