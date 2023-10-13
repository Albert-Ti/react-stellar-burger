import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { isBun } from '../../utils/constants'
import styles from './order-composition.module.css'
import { TIngredient } from '../../types'

const OrderComposition: React.FC<TIngredient> = props => {
  return (
    <figure className={styles.listItem}>
      <img src={props.image_mobile} alt={props.name} />
      <figcaption className={styles.infoItem}>
        <h4 className={`text text_type_main-default ${styles.nameItem}`}>{props.name}</h4>
        <div className={styles.priceItem}>
          <span className='text_type_digits-default'>
            {props.type === isBun ? 2 : props.count} x{' '}
            {props.type === isBun ? props.price * 2 : props.price * props.count}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </figcaption>
    </figure>
  )
}

export default OrderComposition
