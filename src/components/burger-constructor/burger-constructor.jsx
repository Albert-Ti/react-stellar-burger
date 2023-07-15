import PropTypes from 'prop-types'
import React from 'react'

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientConstructorPropType } from '../../utils/prop-types'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

const BurgerConstructor = ({ bun, addedIngredients, remove }) => {
  const [visibleModal, setVisibleModal] = React.useState(false)
  const { text, price, thumbnail, isLocked } = bun

  const totalPrice = React.useMemo(() => {
    return addedIngredients.reduce((acc, item) => acc + item.price, bun.price * 2)
  }, [addedIngredients, bun.price])

  const removeIngredient = index => event => {
    event.stopPropagation()
    remove(addedIngredients.filter((_, i) => i !== index))
  }

  const openModalOrder = () => {
    setVisibleModal(true)
  }

  return (
    <>
      <section className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.bunItem}>
            {text && (
              <ConstructorElement
                type='top'
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
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
                  handleClose={removeIngredient(i)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.bunItem}>
            {text && (
              <ConstructorElement
                type='bottom'
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
              />
            )}
          </div>
        </div>
        {text && (
          <div className={styles.priceBurger}>
            <span className='text text_type_digits-medium'>
              {totalPrice} <CurrencyIcon />
            </span>
            <Button onClick={openModalOrder} htmlType='button'>
              Оформить заказ
            </Button>
          </div>
        )}
      </section>

      <Modal showModal={visibleModal} onClose={setVisibleModal}>
        <OrderDetails />
      </Modal>
    </>
  )
}

BurgerConstructor.propTypes = {
  bun: ingredientConstructorPropType,

  addedIngredients: PropTypes.arrayOf(ingredientConstructorPropType).isRequired,
  remove: PropTypes.func.isRequired,
  setItemModalIngredient: PropTypes.func,
  setVisibleModal: PropTypes.func
}

export default BurgerConstructor
