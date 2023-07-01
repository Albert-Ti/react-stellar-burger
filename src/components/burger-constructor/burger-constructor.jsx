import React from 'react'
import PropTypes from 'prop-types'

import styles from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = ({
  bun,
  addedIngredients,
  remove,
  setVisibleModal,
  setItemModalIngredient
}) => {
  const { text, price, thumbnail, isLocked } = bun

  const totalPrice = React.useMemo(() => {
    return addedIngredients.reduce((acc, item) => acc + item.price, bun.price * 2)
  }, [addedIngredients, bun.price])

  const removeIngredient = index => {
    remove(addedIngredients.filter((_, i) => i !== index))
  }

  const openModalOrder = () => {
    addedIngredients.length && setVisibleModal({ ingredient: false, order: true })
  }

  const openModalIngredient = item => {
    setItemModalIngredient(item)
    setVisibleModal({ ingredient: true, order: false })
  }

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        <div onClick={() => openModalIngredient(bun)} className={styles.bunItem}>
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
          {addedIngredients.length > 0 &&
            addedIngredients.map((item, i) => (
              <li onClick={() => openModalIngredient(item)} key={i} className={styles.list}>
                <DragIcon />
                <ConstructorElement
                  text={item.text}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  handleClose={() => removeIngredient(i)}
                />
              </li>
            ))}
        </ul>

        <div onClick={() => openModalIngredient(bun)} className={styles.bunItem}>
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
  )
}

BurgerConstructor.propTypes = {
  bun: PropTypes.shape({
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    isLocked: PropTypes.bool
  }),

  remove: PropTypes.func.isRequired,
  addedIngredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default BurgerConstructor
