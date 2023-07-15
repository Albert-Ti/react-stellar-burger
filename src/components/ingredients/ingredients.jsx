import React from 'react'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from '../../utils/prop-types'
import styles from './ingredients.module.css'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { IngredientsContext } from '../app/app'
import { isBun } from '../../utils/constants'

const Ingredients = ({ element }) => {
  const [ingredientModal, setIngredientModal] = React.useState(null)
  const { type, name, price, image, _id } = element

  const { bun, setBun, addedIngredients, setAddedIngredients, totalPriceDispatcher } =
    React.useContext(IngredientsContext)

  const handleClickIngredient = () => {
    const newIngredient = {
      id: _id,
      type: type,
      isLocked: type === isBun && true,
      text: name,
      price: price,
      thumbnail: image
    }

    if (newIngredient.type === isBun) {
      setBun(newIngredient)
    } else {
      setAddedIngredients(prev => [...prev, newIngredient])
      totalPriceDispatcher({ type: 'set', payload: newIngredient.price })
    }
    // setIngredientModal(element)
  }

  const closeModalIngredient = () => {
    setIngredientModal(null)
  }

  const countIngredient = React.useMemo(() => {
    return addedIngredients.filter(item => item.text === name).length
  }, [addedIngredients, name])

  return (
    <>
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

      {ingredientModal && (
        <Modal onClose={closeModalIngredient}>
          <IngredientDetails {...ingredientModal} />
        </Modal>
      )}
    </>
  )
}

Ingredients.propTypes = {
  element: ingredientPropType
}

export default Ingredients
