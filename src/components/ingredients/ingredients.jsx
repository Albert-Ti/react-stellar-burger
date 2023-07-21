import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from '../../utils/prop-types'
import styles from './ingredients.module.css'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { isBun } from '../../utils/constants'
import {
  addBun,
  addIngredient,
  constructorState,
  setTotalPrice
} from '../../redux/slice/constructor-slice'
import { ingredientsState, openModalIngredient } from '../../redux/slice/ingredients-slice'

const Ingredients = ({ element }) => {
  const dispatch = useDispatch()

  const { bun, addedIngredients } = useSelector(constructorState)
  const { ingredientModal } = useSelector(ingredientsState)

  const handleClickIngredient = () => {
    if (element.type === isBun) {
      dispatch(addBun(element))
      dispatch(setTotalPrice({ type: 'set-bun', price: element.price }))
    } else {
      dispatch(addIngredient(element))
      dispatch(setTotalPrice({ type: 'set-other', price: element.price }))
    }
    // dispatch(openModalIngredient(element))
  }

  const closeModalIngredient = () => {
    dispatch(openModalIngredient(null))
  }

  const countIngredient = React.useMemo(() => {
    return addedIngredients.filter(item => item.name === element.name).length
  }, [addedIngredients, element.name])

  return (
    <>
      <figure onClick={handleClickIngredient} className={styles.items}>
        {countIngredient > 0 && <Counter count={countIngredient} size='default' extraClass='m-1' />}
        {bun.name === element.name && <Counter count={1} size='default' extraClass='m-1' />}

        <img src={element.image} alt={element.name} />

        <figcaption className={styles.figcaption}>
          <div className={styles.info}>
            <span className='text_type_digits-default'>{element.price}</span>
            <CurrencyIcon />
          </div>
          <p className='text text_type_main-default'>{element.name}</p>
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
