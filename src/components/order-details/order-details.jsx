import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

import checkIcon from '../../image/graphics.svg'
import styles from './order-details.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalElememt } from '../../utils/constants'

const OrderDetails = ({ setVisibleModal, visibleModal }) => {
  const animationClasses = [styles.overlay, styles.visible]

  const closeModalOrder = () => {
    setVisibleModal({ ingredient: false, order: false })
  }

  React.useEffect(() => {
    function clickEscape(e) {
      if (e.key === 'Escape') setVisibleModal({ ingredient: false, order: false })
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [visibleModal])

  return createPortal(
    <div
      onClick={closeModalOrder}
      className={visibleModal.order ? animationClasses.join(' ') : styles.overlay}
    >
      <div onClick={e => e.stopPropagation()} className={styles.wrapper}>
        <button className={styles.btn}>
          <CloseIcon onClick={closeModalOrder} />
        </button>
        <p className={`text text_type_digits-large ${styles.number}`}>034536</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
        <img className={styles.img} src={checkIcon} alt='иконка-выполнения' />
        <p className={styles.info}>
          <span className='text text_type_main-default'>Ваш заказ начали готовить</span>
          <span className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </span>
        </p>
      </div>
    </div>,
    modalElememt
  )
}

OrderDetails.propTypes = {
  visibleModal: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  setVisibleModal: PropTypes.func.isRequired
}

export default OrderDetails
