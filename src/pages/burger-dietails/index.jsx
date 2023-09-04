import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { burgersData } from '../../utils/staticDataBurgers'
import styles from './burger-dietails.module.css'
import ErrorPage from '../error-page'

const BurgerDietails = () => {
  const { id } = useParams()
  const findItemById = burgersData.find(item => item.id === id)

  if (!findItemById) return <ErrorPage />
  return (
    <div className={styles.order}>
      <span className={`text_type_digits-default ${styles.orderNumber}`}>
        {findItemById.number}
      </span>
      <h3 className={`text text_type_main-medium ${styles.orderTitle}`}>{findItemById.title}</h3>
      <p
        className={`text text_type_main-default ${
          findItemById.status === 'Выполнен'
            ? 'text_color_success'
            : findItemById.status === 'Отменен'
            ? 'text_color_error'
            : ''
        } ${styles.orderStatus}`}
      >
        {findItemById.status}
      </p>
      <h3 className={`text text_type_main-medium ${styles.titleListText}`}>Состав:</h3>

      <div className={`custom-scroll ${styles.orderList}`}>
        {findItemById.items.map((item, i) => (
          <figure key={i} className={styles.orderListItem}>
            <img src={item.image} alt={item.name} />
            <figcaption className={styles.orderInfoItem}>
              <h4 className='text text_type_main-default'>{item.name}</h4>
              <div className={styles.orderPriceItem}>
                <span className='text_type_digits-default'>
                  {1} x {item.price}
                </span>
                <CurrencyIcon />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.orderDate}>
        <FormattedDate
          date={findItemById.date}
          className='text text_type_main-default text_color_inactive'
        />
        <span className={`text_type_digits-default ${styles.orderFullPrice}`}>
          {findItemById.price} {<CurrencyIcon />}
        </span>
      </div>
    </div>
  )
}

export default BurgerDietails
