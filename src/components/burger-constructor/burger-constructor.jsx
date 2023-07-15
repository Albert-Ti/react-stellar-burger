import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { IngredientsContext } from '../app/app'
import { getOrder } from '../../utils/api'

const BurgerConstructor = () => {
  const [visibleModal, setVisibleModal] = React.useState(false)
  const [order, setOrder] = React.useState({ number: 0 })

  const { bun, addedIngredients, setAddedIngredients, totalPriceState, totalPriceDispatcher } =
    React.useContext(IngredientsContext)

  const removeIngredient = (index, item) => event => {
    event.stopPropagation()
    setAddedIngredients(addedIngredients.filter((_, i) => i !== index))
    totalPriceDispatcher({ type: 'remove', payload: item.price })
  }

  const handleClickOrder = async () => {
    const ingredientsIdx = [...addedIngredients.map(item => item.id), bun.id]
    await getOrder({
      ingredients: ingredientsIdx
    })
      .then(data => setOrder(data.order))
      .catch(err => console.log('Ошибка данных: ' + err.message))

    setVisibleModal(true)
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
                text={bun.text}
                price={bun.price}
                thumbnail={bun.thumbnail}
              />
            )}
          </div>

          <ul className={`custom-scroll ${styles.lists}`}>
            {addedIngredients?.map((item, i) => (
              <li key={i} className={styles.list}>
                <DragIcon />
                <ConstructorElement
                  text={item.text}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  handleClose={removeIngredient(i, item)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.bunItem}>
            {bun.isLocked && (
              <ConstructorElement
                type='bottom'
                isLocked={bun.isLocked}
                text={bun.text}
                price={bun.price}
                thumbnail={bun.thumbnail}
              />
            )}
          </div>
        </div>
        {bun.isLocked && (
          <div className={styles.priceBurger}>
            <span className='text text_type_digits-medium'>
              {totalPriceState.total + bun.price * 2} <CurrencyIcon />
            </span>
            <Button onClick={handleClickOrder} htmlType='button'>
              Оформить заказ
            </Button>
          </div>
        )}
      </section>

      <Modal showModal={visibleModal} onClose={setVisibleModal}>
        <OrderDetails {...order} />
      </Modal>
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
