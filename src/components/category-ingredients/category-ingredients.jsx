import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { constructorState } from '../../redux/slice/constructor-slice'
import { ingredientsState, openModalIngredient } from '../../redux/slice/ingredients-slice'
import { ingredientPropType } from '../../utils/prop-types'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import styles from './category-ingredients.module.css'

const CategoryIngredients = ({ element }) => {
  const dispatch = useDispatch()

  const { bun, addedIngredients } = useSelector(constructorState)
  const { ingredientModal } = useSelector(ingredientsState)

  const handleClickIngredient = () => {
    dispatch(openModalIngredient(element))
  }

  const closeModalIngredient = () => {
    dispatch(openModalIngredient(null))
  }

  const countIngredient = React.useMemo(() => {
    return addedIngredients.filter(item => item.name === element.name).length
  }, [addedIngredients, element.name])

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: element,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const classesAnimation = isDrag ? [styles.ingredient, styles.shadow] : [styles.ingredient]
  return (
    <>
      <figure ref={dragRef} onClick={handleClickIngredient} className={classesAnimation.join(' ')}>
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

      {ingredientModal === element && (
        <Modal onClose={closeModalIngredient}>
          <IngredientDetails {...ingredientModal} />
        </Modal>
      )}
    </>
  )
}

CategoryIngredients.propTypes = {
  element: ingredientPropType
}

export default CategoryIngredients
