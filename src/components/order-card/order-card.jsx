import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { useOrder } from '../../hooks/use-order'
import { orderPropType } from '../../utils/prop-types'
import styles from './order-card.module.css'

const OrderCard = props => {
  const location = useLocation()
  const { name, number, updatedAt, ingredients, status } = props
  const profileOrderPath = useMatch('/profile/order')

  const findIngredients = useOrder(ingredients)

  const contentImages =
    findIngredients?.items.length < 5
      ? findIngredients.items.map((item, i) => (
          <img
            style={{
              position: 'absolute',
              zIndex: findIngredients.items.length - i,
              left: `${i * 44}px`
            }}
            key={i}
            src={item.image_mobile}
            alt='картинка'
          />
        ))
      : findIngredients.items.slice(0, 6).map((item, i) => (
          <img
            style={{
              position: 'absolute',
              zIndex: ingredients.length - i,
              left: `${i * 44}px`,
              opacity: i === 5 ? 0.4 : ''
            }}
            key={i}
            src={item.image_mobile}
            alt='картинка'
          />
        ))

  const contentMoreImages = findIngredients.items.length > 5 && (
    <span className={`text_type_main-default ${styles.moreImages}`}>
      +{findIngredients.items.slice(5).length}
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
          <span className='text text_type_digits-default'>{findIngredients.totalPrice}</span>{' '}
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  )
}

OrderCard.propTypes = {
  props: orderPropType
}

export default OrderCard
