import React from 'react'
import { useSelector } from 'react-redux'
import { ingredientsStore } from '../../redux/ingredients/ingredients-slice'
import { isBun, isMain, isSauce, titleBun, titleMain, titleSauce } from '../../utils/constants'
import Categories from '../categories/categories'
import IngredientsLoader from '../UI/ingredients-loader/ingredients-loader'
import TabList from '../tab-list/tab-list'
import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
  const { status, items } = useSelector(ingredientsStore)

  const sortedCategories = React.useMemo(() => {
    return [
      { id: 1, title: titleBun, items: items.filter(item => item.type === isBun) },
      { id: 2, title: titleSauce, items: items.filter(item => item.type === isSauce) },
      { id: 3, title: titleMain, items: items.filter(item => item.type === isMain) }
    ]
  }, [items])

  return (
    <section className={`content ${styles.content}`}>
      <TabList />

      <div className={`custom-scroll ${styles.scroll}`}>
        {sortedCategories.map(category =>
          status === 'loading' ? (
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
