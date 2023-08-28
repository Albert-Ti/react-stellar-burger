import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import {
  removeIngredient,
  setTotalPrice,
  sortedIngredients
} from '../../redux/slice/constructor-slice'
import { ingredientConstructorPropType } from '../../utils/prop-types'
import styles from './ingredient-constructor.module.css'

const IngredientConstructor = ({ type, item, index }) => {
  const dispatch = useDispatch()
  const ref = React.useRef(null)

  const onClickRemoveIngredient = (index, item) => event => {
    event.stopPropagation()
    dispatch(removeIngredient(index))
    dispatch(setTotalPrice({ type: 'remove', price: item.price }))
  }

  const [, drag] = useDrag({
    type: 'burger',
    item: { index }
  })

  const [{ isDrop }, drop] = useDrop({
    accept: 'burger',
    collect: monitor => ({
      isDrop: monitor.isOver()
    }),
    hover: item => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return
      dispatch(sortedIngredients({ dragIndex, hoverIndex }))

      item.index = hoverIndex
    }
  })

  !item.isLocked && drag(drop(ref))

  const isClasses = `${item.isLocked ? styles.bun : styles.other} ${
    !item.isLocked && isDrop ? styles.indicator : ''
  }`

  return (
    item.name && (
      <li ref={ref} className={isClasses} draggable={item.isLocked ? false : true}>
        {!item.isLocked && <DragIcon />}
        <ConstructorElement
          type={type}
          isLocked={item.isLocked}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={onClickRemoveIngredient(index, item)}
        />
      </li>
    )
  )
}

IngredientConstructor.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  item: ingredientConstructorPropType
}

export default IngredientConstructor
