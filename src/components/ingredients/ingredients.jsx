import PropTypes from 'prop-types'
import React from 'react'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientConstructorPropType, ingredientPropType } from '../../utils/prop-types'
import styles from './ingredients.module.css'

const Ingredients = ({ element, bun, addBun, addedIngredients, setAddedIngredients }) => {
  const { type, name, price, image, calories, carbohydrates, fat, proteins } = element

  const handleClickIngredient = () => {
    const newIngredient = {
      type: type,
      isLocked: type === 'bun' && true,
      text: name,
      price: price,
      thumbnail: image,
      info: {
        calories,
        proteins,
        fat,
        carbohydrates
      }
    }
    if (newIngredient.type === 'bun') {
      addBun(newIngredient)
    } else {
      setAddedIngredients(prev => [...prev, newIngredient])
    }
  }

  const countIngredient = React.useMemo(() => {
    return addedIngredients.filter(item => item.text === name).length
  }, [addedIngredients, name])

  return (
    <figure onClick={handleClickIngredient} className={styles.items}>
      {countIngredient > 0 && <Counter count={countIngredient} size='default' extraClass='m-1' />}
      {bun.text === name && <Counter count={1} size='default' extraClass='m-1' />}
      <img src={image} alt={name} />

      <figcaption className={styles.figcaption}>
        <div className={styles.info}>
          <span className='text_type_digits-default'>{price}</span>
          <CurrencyIcon />
        </div>
        <p className='text text_type_main-default'>{name}</p>
      </figcaption>
    </figure>
  )
}

Ingredients.propTypes = {
  element: ingredientPropType,
  bun: ingredientConstructorPropType,

  addedIngredients: PropTypes.arrayOf(ingredientConstructorPropType).isRequired,
  addBun: PropTypes.func.isRequired,
  setAddedIngredients: PropTypes.func.isRequired
}

export default Ingredients
