import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {useAppDispatch} from '../../hooks'
import {removeIngredient, sortedIngredients} from '../../redux/constructor/slice'
import {TIngredient} from '../../types'
import styles from './ingredient-constructor.module.css'
import {TIngredientConstructor} from './types'

const IngredientConstructor: React.FC<TIngredientConstructor> = ({type, ingredient, index}) => {
  const dispatch = useAppDispatch()
  const ref = React.useRef<HTMLLIElement>(null)

  const onClickRemoveIngredient = (item: TIngredient) => {
    dispatch(removeIngredient(item))
  }

  const [, drag] = useDrag({
    type: 'burger',
    item: {index},
  })

  const [{isDrop}, drop] = useDrop({
    accept: 'burger',
    collect: monitor => ({
      isDrop: monitor.isOver(),
    }),
    hover: (item: {index: number}) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index as number

      if (dragIndex === hoverIndex) return
      dispatch(sortedIngredients({dragIndex, hoverIndex}))

      item.index = hoverIndex
    },
  })

  !ingredient.isLocked && drag(drop(ref))

  const isClasses = `${ingredient.isLocked ? styles.bun : styles.other} ${
    !ingredient.isLocked && isDrop ? styles.indicator : ''
  }`

  const typeTextBun = type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''

  if (!ingredient.name) return null
  return (
    <li ref={ref} className={isClasses} draggable={ingredient.isLocked ? false : true}>
      {!ingredient.isLocked && <DragIcon type='secondary' />}
      <ConstructorElement
        type={type}
        isLocked={ingredient.isLocked}
        text={`${ingredient.name} ${typeTextBun}`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onClickRemoveIngredient(ingredient)}
      />
    </li>
  )
}

export default IngredientConstructor
