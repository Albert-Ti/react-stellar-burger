import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { TCorrectCardInfo, TOrder } from '../../types'
import styles from './order-card.module.css'
import { useOrder } from '../../hooks'

const OrderCard: React.FC<TOrder> = props => {
  const location = useLocation()
  const { name, number, updatedAt, ingredients, status } = props
  const profileOrderPath = useMatch('/profile/order')

  const correctCardInfo = useOrder(ingredients) as TCorrectCardInfo

  const contentImages =
    correctCardInfo.items.length < 5
      ? correctCardInfo.items.map((item, i) => (
          <img
            loading='lazy'
            style={{
              position: 'absolute',
              zIndex: correctCardInfo.items.length - i,
              left: `${i * 44}px`
            }}
            key={i}
            src={item?.image_mobile}
            alt='картинка'
          />
        ))
      : correctCardInfo.items.slice(0, 6).map((item, i) => (
          <img
            loading='lazy'
            style={{
              position: 'absolute',
              zIndex: ingredients.length - i,
              left: `${i * 44}px`,
              opacity: i === 5 ? 0.4 : ''
            }}
            key={i}
            src={item?.image_mobile}
            alt='картинка'
          />
        ))

  const contentMoreImages = correctCardInfo.items.length > 5 && (
    <span className={`text_type_main-default ${styles.moreImages}`}>
      +{correctCardInfo.items.slice(5).length}
    </span>
  )

  const contentStatus = (
    <p
      className={`text text_type_main-default ${
        status === 'pending'
          ? 'text_color_success'
          : status === 'cancelled'
          ? 'text_color_error'
          : ''
      } ${styles.status}`}
    >
      {status === 'pending' ? 'Готовится' : status === 'cancelled' ? 'Отменен' : 'Выполнен'}
    </p>
  )

  return (
    <Link
      to={profileOrderPath ? `/profile/order/${number}` : `/feed/${number}`}
      state={{ background: location }}
      className={styles.content}
    >
      <div className={styles.info}>
        <span className='text text_type_digits-default'>#{number}</span>
        <FormattedDate
          className='text text_type_main-default text_color_inactive'
          date={new Date(updatedAt)}
        />
      </div>
      <h3 className='text text_type_main-medium'>
        {name}
        {profileOrderPath && contentStatus}
      </h3>
      <div className={styles.details}>
        <div className={styles.boxImg}>
          {contentImages}
          {contentMoreImages}
        </div>
        <div className={styles.boxPrice}>
          <span className='text text_type_digits-default'>
            {correctCardInfo.totalPrice.toString()}
          </span>{' '}
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  )
}

export default OrderCard
