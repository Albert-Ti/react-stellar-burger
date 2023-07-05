import PropTypes from 'prop-types'
import checkIcon from '../../image/graphics.svg'
import styles from './order-details.module.css'

const OrderDetails = ({ showContent }) => {
  if (!showContent) return null
  return (
    <>
      <p className={`text text_type_digits-large ${styles.number}`}>034536</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className={styles.img} src={checkIcon} alt='иконка-выполнения' />
      <p className={styles.info}>
        <span className='text text_type_main-default'>Ваш заказ начали готовить</span>
        <span className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </span>
      </p>
    </>
  )
}

OrderDetails.propTypes = {
  showContent: PropTypes.bool.isRequired
}

export default OrderDetails
