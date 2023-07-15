import styles from './burger-ingredients.module.css'
import Categories from '../categories/categories'
import TabList from '../tab-list/tab-list'

const BurgerIngredients = () => {
  const categoryTitle = ['Булки', 'Соусы', 'Начинки']
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
