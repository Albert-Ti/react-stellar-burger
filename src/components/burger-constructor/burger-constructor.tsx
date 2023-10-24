import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { fetchOrder } from '../../redux/constructor/actions'
import {
  addBun,
  addIngredient,
  constructorStore,
  setOrder,
  setTotalPrice
} from '../../redux/constructor/slice'
import { userStore } from '../../redux/user/slice'
import { TIngredient } from '../../types'
import { isBun } from '../../utils/constants'
import Preloader from '../UI/preloader/preloader'
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user } = useSelector(userStore)
  const { bun, addedIngredients, totalPrice, createdOrder, statusCreatedOrder } =
    useSelector(constructorStore)

  const handleOrderRequest = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname } } })
    } else {
      const ingredientsIdx = [...addedIngredients.map((item: TIngredient) => item._id), bun._id]
      dispatch(fetchOrder({ ingredients: ingredientsIdx }))
    }
  }

  const closeModalOrder = () => {
    dispatch(setOrder({ number: 0 }))
  }

  const [{ isDrop }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (element: TIngredient) => {
      if (element.type === isBun) {
        dispatch(addBun({ ...element, uuid: crypto.randomUUID() }))
      } else if (bun.isLocked) {
        dispatch(addIngredient({ ...element, uuid: crypto.randomUUID() }))
      }
    },
    collect: monitor => ({
      isDrop: monitor.isOver()
    })
  })

  React.useEffect(() => {
    const total = addedIngredients.reduce(
      (acc: number, item: TIngredient) => acc + item.price,
      bun.price * 2
    )
    dispatch(setTotalPrice(total))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedIngredients, bun])

  const classesAnimation = isDrop ? [styles.content, styles.indicator] : [styles.content]

  if (statusCreatedOrder === 'LOADING')
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
          <IngredientConstructor type='top' ingredient={bun} />
          <ul className={`custom-scroll ${styles.otherItems}`}>
            {addedIngredients.map((item: TIngredient, i: number) => (
              <IngredientConstructor ingredient={item} index={i} key={item.uuid} />
            ))}
          </ul>
          <IngredientConstructor type='bottom' ingredient={bun} />
        </ul>

        {bun.isLocked && (
          <div className={styles.priceBurger}>
            <span className='text text_type_digits-medium'>
              {totalPrice} <CurrencyIcon type='primary' />
            </span>
            <Button
              onClick={handleOrderRequest}
              htmlType='button'
              disabled={addedIngredients.length < 1}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </section>

      {createdOrder.number > 0 && (
        <Modal onClose={closeModalOrder}>
          <OrderDetails {...createdOrder} />
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor
