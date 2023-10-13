import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useOrder } from '../../hooks'
import ErrorPage from '../../pages/error-page'
import { fetchByClickingOnTheCardOrder } from '../../redux/constructor/actions'
import { constructorStore } from '../../redux/constructor/slice'
import {
  feedOrdersConnect as connect,
  feedOrdersDisconnect as disconnect
} from '../../redux/feed-orders/actions'
import { TCorrectCardInfo, TIngredient } from '../../types'
import { WS_ORDERS_ALL_URL } from '../../utils/constants'
import Preloader from '../UI/preloader/preloader'
import OrderComposition from '../order-composition/order-composition'
import styles from './order-modal.module.css'

const OrderModal = () => {
  const dispatch = useAppDispatch()
  const { number } = useParams()
  const { order, statusOrder } = useSelector(constructorStore)

  const correctCardInfo = useOrder(order.ingredients) as TCorrectCardInfo

  const correctCardInfoAddCount: TIngredient[] = React.useMemo(() => {
    const uniqueIngredientMap = new Map()

    if (typeof correctCardInfo.items === 'object') {
      for (const ingredient of correctCardInfo.items) {
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
  }, [correctCardInfo])

  React.useEffect(() => {
    number && dispatch(fetchByClickingOnTheCardOrder(number))
    dispatch(connect(WS_ORDERS_ALL_URL))
    return () => {
      dispatch(disconnect())
    }
  }, [number, dispatch])

  if (statusOrder === 'LOADING')
    return (
      <div className={styles.order}>
        <Preloader />
      </div>
    )
  if (statusOrder === 'ERROR') return <ErrorPage />
  return (
    <div className={styles.order}>
      <span className={`text_type_digits-default ${styles.orderNumber}`}>#{order?.number}</span>
      <h3 className={`text text_type_main-medium ${styles.orderTitle}`}>{order?.name}</h3>
      <p
        className={`text text_type_main-default ${
          order.status === 'done'
            ? 'text_color_success'
            : order.status === 'cancelled'
            ? 'text_color_error'
            : ''
        } ${styles.orderStatus}`}
      >
        {order?.status === 'done'
          ? 'Выполнен'
          : order.status === 'cancelled'
          ? 'Отменен'
          : 'Готовится'}
      </p>
      <h3 className={`text text_type_main-medium ${styles.titleListText}`}>Состав:</h3>
      <div className={`custom-scroll ${styles.list}`}>
        {correctCardInfoAddCount.map((item, i) => (
          <OrderComposition key={i} {...item} />
        ))}
      </div>

      <div className={styles.orderDate}>
        {order && (
          <FormattedDate
            className='text text_type_main-default text_color_inactive'
            date={new Date(order.updatedAt)}
          />
        )}
        <span className={`text_type_digits-default ${styles.orderFullPrice}`}>
          {correctCardInfo?.totalPrice} <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  )
}

export default OrderModal
