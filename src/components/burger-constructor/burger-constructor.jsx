import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { requestOrder } from '../../utils/api'
import {
  setTotalPrice,
  removeIngredient,
  setOrder,
  constructorState
} from '../../redux/slice/constructor-slice'

const BurgerConstructor = () => {
  const { bun, addedIngredients, totalPrice, order } = useSelector(constructorState)
  const dispatch = useDispatch()

  const handleClickIngredient = (index, item) => event => {
    event.stopPropagation()
    dispatch(removeIngredient(index))
    dispatch(setTotalPrice({ type: 'remove', price: item.price }))
  }

  const handleClickOrder = async () => {
    const ingredientsIdx = [...addedIngredients.map(item => item._id), bun._id]
    await requestOrder({
      ingredients: ingredientsIdx
    })
      .then(data => dispatch(setOrder(data.order)))
      .catch(err => console.log('Ошибка данных: ' + err.message))
  }

  const closeModalOrder = () => {
    dispatch(setOrder({ number: 0 }))
  }

  return (
    <>
      <section className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.bunItem}>
            {bun.isLocked && (
              <ConstructorElement
                type='top'
                isLocked={bun.isLocked}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>

          <ul className={`custom-scroll ${styles.lists}`}>
            {addedIngredients?.map((item, i) => (
              <li key={i} className={styles.list}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={handleClickIngredient(i, item)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.bunItem}>
            {bun.isLocked && (
              <ConstructorElement
                type='bottom'
                isLocked={bun.isLocked}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
        </div>
        {bun.isLocked && (
          <div className={styles.priceBurger}>
            <span className='text text_type_digits-medium'>
              {totalPrice} <CurrencyIcon />
            </span>
            <Button onClick={handleClickOrder} htmlType='button'>
              Оформить заказ
            </Button>
          </div>
        )}
      </section>

      {order.number > 0 && (
        <Modal onClose={closeModalOrder}>
          <OrderDetails {...order} />
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
  setItemModalIngredient: PropTypes.func,
  setVisibleModal: PropTypes.func
}

export default BurgerConstructor

/* 
  const totalPrice = React.useMemo(() => {
    return addedIngredients.reduce((acc, item) => acc + item.price, bun.price * 2)
  }, [addedIngredients, bun.price])
 */
