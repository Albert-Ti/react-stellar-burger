import styles from './burger-ingredients.module.css';
import Categories from '../categories/categories';
import TabList from '../tab-list/tab-list';
import PropTypes from "prop-types";



const BurgerIngredients = ({ data, isLoading, hasError, bun, addBun, addedIngredients, setAddedIngredients }) => {
  const categoryTitle = ['Булки', 'Соусы', 'Начинки',];

  return (
    <section className={styles.content}>
      <TabList />
      {
        !isLoading && !hasError &&
        <div className={`custom-scroll ${styles.scroll}`}>
          {
            categoryTitle.map((title, i) => (
              <Categories
                key={i}
                title={title}
                data={data}
                addBun={addBun}
                bun={bun}
                addedIngredients={addedIngredients}
                setAddedIngredients={setAddedIngredients}
              />
            ))
          }
        </div>
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool
}

export default BurgerIngredients;