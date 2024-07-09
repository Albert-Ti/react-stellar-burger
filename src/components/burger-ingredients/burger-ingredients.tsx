import React from 'react'
import { useSelector } from 'react-redux'
import { ingredientsStore } from '../../redux/ingredients/slice'
import { isBun, isMain, isSauce } from '../../utils/constants'
import IngredientsLoader from '../UI/ingredients-loader/ingredients-loader'
import Categories from '../categories/categories'
import TabList from '../tab-list/tab-list'
import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
  const { status, items } = useSelector(ingredientsStore)

  const sortedCategories = React.useMemo(() => {
    return [
      { id: 1, title: 'Булки', items: items.filter(item => item.type === isBun) },
      { id: 2, title: 'Соусы', items: items.filter(item => item.type === isSauce) },
      { id: 3, title: 'Начинки', items: items.filter(item => item.type === isMain) }
    ]
  }, [items])

  return (
    <section className={`content ${styles.content}`}>
      <TabList />

      <div className={`custom-scroll ${styles.scroll}`}>
        {sortedCategories.map(category =>
          status === 'LOADING' ? (
            [...Array(2)].map((_, i) => <IngredientsLoader key={i} />)
          ) : (
            <Categories key={category.id} {...category} />
          )
        )}
      </div>
    </section>
  )
}

export default BurgerIngredients
