import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBun,
  addIngredient,
  constructorState,
  setOrder,
  setTotalPrice
} from '../../redux/slice/constructor-slice'
import { requestOrder } from '../../utils/api'
import { isBun } from '../../utils/constants'
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  const { bun, addedIngredients, totalPrice, order } = useSelector(constructorState)
  const dispatch = useDispatch()

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

  const [{ isDrop }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: element => {
      if (element.type === isBun) {
        dispatch(addBun(element))
        dispatch(setTotalPrice({ type: 'set-bun', price: element.price }))
      } else {
        dispatch(addIngredient(element))
        dispatch(setTotalPrice({ type: 'set-other', price: element.price }))
      }
    },
    collect: monitor => ({
      isDrop: monitor.isOver()
    })
  })

  const classesAnimation = isDrop ? [styles.content, styles.shadow] : [styles.content]
  return (
    <>
      <section ref={dropRef} className={classesAnimation.join(' ')}>
        <ul className={styles.wrapper}>
          <IngredientConstructor type='top' item={bun} />

          <ul className={`custom-scroll ${styles.otherItems}`}>
            {addedIngredients.map((item, i) => (
              <IngredientConstructor type='' item={item} index={i} key={i} />
            ))}
          </ul>

          <IngredientConstructor type='bottom' item={bun} />
        </ul>

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

export default BurgerConstructor
