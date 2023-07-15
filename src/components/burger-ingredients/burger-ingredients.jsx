import PropTypes from 'prop-types'

import styles from './burger-ingredients.module.css'
import Categories from '../categories/categories'
import TabList from '../tab-list/tab-list'

const BurgerIngredients = ({
  items,
  isLoading,
  hasError,
  bun,
  addBun,
  addedIngredients,
  setAddedIngredients
}) => {
  const categoryTitle = ['Булки', 'Соусы', 'Начинки']
  return (
    <section className={styles.content}>
      <TabList />
      {!isLoading && !hasError && (
        <div className={`custom-scroll ${styles.scroll}`}>
          {categoryTitle.map(title => (
            <Categories
              key={title}
              title={title}
              items={items}
              addBun={addBun}
              bun={bun}
              addedIngredients={addedIngredients}
              setAddedIngredients={setAddedIngredients}
            />
          ))}
        </div>
      )}
    </section>
  )
}

BurgerIngredients.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
}

export default BurgerIngredients
