import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Preloader from '../UI/preloader/preloader'
import { fetchOrder } from '../../redux/constructor/constructor-actions'
import {
  addBun,
  addIngredient,
  constructorStore,
  setOrder,
  setTotalPrice
} from '../../redux/constructor/constructor-slice'
import { userStore } from '../../redux/user/user-slice'
import { isBun } from '../../utils/constants'
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user } = useSelector(userStore)
  const { bun, addedIngredients, totalPrice, order, statusOrder } = useSelector(constructorStore)

  const handleClickOrder = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname } } })
    } else {
      const ingredientsIdx = [...addedIngredients.map(item => item._id), bun._id]
      dispatch(fetchOrder({ ingredients: ingredientsIdx }))
    }
  }

  const closeModalOrder = () => {
    dispatch(setOrder({ number: 0 }))
  }

  const [{ isDrop }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: element => {
      if (element.type === isBun) {
        dispatch(addBun({ ...element, id: crypto.randomUUID() }))
      } else if (bun.isLocked) {
        dispatch(addIngredient({ ...element, id: crypto.randomUUID() }))
      }
    },
    collect: monitor => ({
      isDrop: monitor.isOver()
    })
  })

  React.useEffect(() => {
    const total = addedIngredients.reduce((acc, item) => acc + item.price, bun.price * 2)
    dispatch(setTotalPrice(total))
  }, [addedIngredients, bun])

  const classesAnimation = isDrop ? [styles.content, styles.indicator] : [styles.content]

  if (statusOrder === 'loading')
    return (
      <div className={styles.content}>
        <Preloader />
      </div>
    )
  return (
    <>
      <section ref={dropRef} className={classesAnimation.join(' ')}>
        {!bun.isLocked && !addedIngredients?.length && (
          <h2 className={`text text_type_main-large ${styles.title}`}>Приготовьте булку!</h2>
        )}

        <ul className={styles.wrapper}>
          <IngredientConstructor type='top' item={bun} />
          <ul className={`custom-scroll ${styles.otherItems}`}>
            {addedIngredients.map((item, i) => (
              <IngredientConstructor type='' item={item} index={i} key={item.id} />
            ))}
          </ul>
          <IngredientConstructor type='bottom' item={bun} />
        </ul>

        {bun.isLocked && (
          <div className={styles.priceBurger}>
            <span className='text text_type_digits-medium'>
              {totalPrice} <CurrencyIcon />
            </span>
            <Button
              onClick={handleClickOrder}
              htmlType='button'
              disabled={addedIngredients.length < 1}
            >
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
