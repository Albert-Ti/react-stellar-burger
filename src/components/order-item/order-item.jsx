import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import styles from './order-item.module.css'

const OrderItem = props => {
  const { pathname } = useLocation()
  const { title, price, number, date, items, status, id } = props
  const contentImages =
    items?.length < 5
      ? items.map(({ image }, i) => (
          <img
            style={{
              position: 'absolute',
              zIndex: items.length - i,
              left: `${i * 44}px`
            }}
            key={i}
            src={image}
            alt='картинка'
          />
        ))
      : items?.slice(0, 6).map(({ image }, i) => (
          <img
            style={{
              position: 'absolute',
              zIndex: items.length - i,
              left: `${i * 49}px`,
              opacity: i === 5 ? 0.4 : ''
            }}
            key={i}
            src={image}
            alt='картинка'
          />
        ))

  const contentMoreImages = items?.length > 5 && (
    <span className={`text_type_main-default ${styles.moreImages}`}>+{items.slice(5).length}</span>
  )

  const contentStatus = (
    <p
      className={`text text_type_main-default ${
        status === 'Выполнен'
          ? 'text_color_success'
          : status === 'Отменен'
          ? 'text_color_error'
          : ''
      }`}
    >
      {status}
    </p>
  )

  return (
    <Link
      to={pathname === '/feed' ? `/feed/${id}` : `/profile/order/${id}`}
      className={styles.content}
    >
      <div className={styles.info}>
        <span className='text text_type_digits-default'>{number}</span>
        {date && (
          <FormattedDate date={date} className='text text_type_main-default text_color_inactive' />
        )}
      </div>
      <h3 className='text text_type_main-medium'>
        {title}
        {pathname === '/profile/order' && contentStatus}
      </h3>

      <div className={styles.dietails}>
        <div className={styles.boxImg}>
          {contentImages}
          {contentMoreImages}
        </div>
        <div className={styles.boxPrice}>
          <span className='text text_type_digits-default'>{price}</span>{' '}
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  )
}

export default OrderItem
