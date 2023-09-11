import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { isBun } from '../../utils/constants'
import styles from './order-composition.module.css'
import { orderPropType } from '../../utils/prop-types'

const OrderComposition = props => {
  return (
    <figure className={styles.listItem}>
      <img src={props.image_mobile} alt={props.name} />
      <figcaption className={styles.infoItem}>
        <h4 className={`text text_type_main-default ${styles.nameItem}`}>{props.name}</h4>
        <div className={styles.priceItem}>
          <span className='text_type_digits-default'>
            {props.type === isBun ? 2 : 1} x {props.price}
          </span>
          <CurrencyIcon />
        </div>
      </figcaption>
    </figure>
  )
}

OrderComposition.propTypes = {
  props: orderPropType
}

export default OrderComposition
