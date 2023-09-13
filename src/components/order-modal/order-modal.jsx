import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useOrder } from '../../hooks/use-order'
import ErrorPage from '../../pages/error-page'
import Preloader from '../UI/preloader/preloader'
import {
  feedOrdersConnect as connect,
  feedOrdersDisconnect as disconnect,
  fetchOrderCard
} from '../../redux/feed-orders/feed-orders-actions'
import { feedOrderStore } from '../../redux/feed-orders/feed-orders-reducer'
import { WS_ORDERS_ALL_URL } from '../../utils/constants'
import OrderComposition from '../order-composition/order-composition'
import styles from './order-modal.module.css'

const OrderModal = () => {
  const dispatch = useDispatch()
  const { number } = useParams()
  const { order, statusOrder } = useSelector(feedOrderStore)
  const orderByNumber = order && order[0]
  const findIngredients = useOrder(orderByNumber?.ingredients)

  const findIngredientsAddCount = React.useMemo(() => {
    const uniqueIngredientMap = new Map()

    if (typeof findIngredients?.items === 'object') {
      for (const ingredient of findIngredients.items) {
        const ingredientSrting = JSON.stringify(ingredient)

        if (uniqueIngredientMap.has(ingredientSrting)) {
          const existingIngredient = uniqueIngredientMap.get(ingredientSrting)
          existingIngredient.count += 1
        } else {
          uniqueIngredientMap.set(ingredientSrting, { ...ingredient, count: 1 })
        }
      }
    }
    return Array.from(uniqueIngredientMap.values())
  }, [findIngredients])

  React.useEffect(() => {
    dispatch(fetchOrderCard(number))
    dispatch(connect(WS_ORDERS_ALL_URL))
    return () => dispatch(disconnect())
  }, [number, dispatch])

  if (statusOrder === 'loading')
    return (
      <div className={styles.order}>
        <Preloader />
      </div>
    )
  if (statusOrder === 'error') return <ErrorPage />
  return (
    <div className={styles.order}>
      <span className={`text_type_digits-default ${styles.orderNumber}`}>
        #{orderByNumber.number}
      </span>
      <h3 className={`text text_type_main-medium ${styles.orderTitle}`}>{orderByNumber.name}</h3>
      <p
        className={`text text_type_main-default ${
          orderByNumber.status === 'done'
            ? 'text_color_success'
            : orderByNumber.status === 'cancelled'
            ? 'text_color_error'
            : ''
        } ${styles.orderStatus}`}
      >
        {orderByNumber.status === 'done'
          ? 'Выполнен'
          : orderByNumber.status === 'cancelled'
          ? 'Отменен'
          : 'Готовится'}
      </p>
      <h3 className={`text text_type_main-medium ${styles.titleListText}`}>Состав:</h3>
      <div className={`custom-scroll ${styles.list}`}>
        {findIngredientsAddCount.map((item, i) => (
          <OrderComposition key={i} {...item} />
        ))}
      </div>

      <div className={styles.orderDate}>
        <FormattedDate
          className='text text_type_main-default text_color_inactive'
          date={new Date(orderByNumber.updatedAt)}
        />
        <span className={`text_type_digits-default ${styles.orderFullPrice}`}>
          {findIngredients.totalPrice} <CurrencyIcon />
        </span>
      </div>
    </div>
  )
}

export default OrderModal
