import { categoryTitle } from '../../utils/constants'
import Categories from '../categories/categories'
import TabList from '../tab-list/tab-list'
import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
  return (
    <section className={`content ${styles.content}`}>
      <TabList />

      <div className={`custom-scroll ${styles.scroll}`}>
        {categoryTitle.map(title => (
          <Categories key={title} title={title} />
        ))}
      </div>
    </section>
  )
}

export default BurgerIngredients
