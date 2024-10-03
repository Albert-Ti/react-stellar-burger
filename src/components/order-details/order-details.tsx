import React from 'react'
import {TOrderNumber} from '../../types'
import styles from './order-details.module.css'

const OrderDetails: React.FC<TOrderNumber> = ({number}) => {
  return (
    <div className={styles.details}>
      <div className={styles.box}></div>
      <p className={`text text_type_digits-large ${styles.number}`}>{number}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className={styles.img} src={'../../image/check-icon.svg'} alt='иконка-выполнения' />
      <p className={styles.info}>
        <span className='text text_type_main-default'>Ваш заказ начали готовить</span>
        <span className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </span>
      </p>
    </div>
  )
}

export default OrderDetails
