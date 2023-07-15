import styles from './burger-ingredients.module.css'
import Categories from '../categories/categories'
import TabList from '../tab-list/tab-list'
import { categoryTitle } from '../../utils/constants'

const BurgerIngredients = () => {
  return (
    <section className={styles.content}>
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
