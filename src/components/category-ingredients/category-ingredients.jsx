import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { constructorState } from '../../redux/slice/constructor-slice'
import { ingredientPropType } from '../../utils/prop-types'
import styles from './category-ingredients.module.css'

const CategoryIngredients = ({ element }) => {
  const { bun, addedIngredients } = useSelector(constructorState)
  const location = useLocation()

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

  const classesAnimation = isDrag ? [styles.ingredient, styles.indicator] : [styles.ingredient]
  return (
    <Link
      to={`/ingredients/${element._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <figure ref={dragRef} className={classesAnimation.join(' ')} draggable={false}>
        {countIngredient > 0 && <Counter count={countIngredient} size='default' extraClass='m-1' />}
        {bun.name === element.name && <Counter count={1} size='default' extraClass='m-1' />}

        <img src={element.image} alt={element.name} />

        <figcaption className={styles.figcaption}>
          <div className={styles.info}>
            <span className='text_type_digits-default'>{element.price}</span>
            <CurrencyIcon />
          </div>
          <h4 className='text text_type_main-default'>{element.name}</h4>
        </figcaption>
      </figure>
    </Link>
  )
}

CategoryIngredients.propTypes = {
  element: ingredientPropType
}

export default CategoryIngredients
