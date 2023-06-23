import styles from './burger-ingredients.module.css';
import Categories from '../categories/categories';
import TabList from '../tab-list/tab-list';


const BurgerIngredients = ({ newIngredients, addOtherIngredient, isLoading, hasError, data, addBun, bun }) => {
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
                newIngredients={newIngredients}
                addOtherIngredient={addOtherIngredient}
              />
            ))
          }
        </div>
      }
    </section>
  )
}

export default BurgerIngredients;