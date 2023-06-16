import Category from '../sorted-ingredients/sorted-ingredients';
import styles from './burger-ingredients.module.css';
import TabList from '../tab-list/tab-list';


const BurgerIngredients = ({ isLoading, hasError, items }) => {

  const categoryList = ['Булки', 'Соусы', 'Начинки'];

  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Ошибка'}
        {!isLoading && !hasError && 'Соберите Бургер'}
      </h1>

      <TabList />
      {
        !isLoading && !hasError &&
        <div className={`custom-scroll ${styles.scroll}`}>
          {
            categoryList.map((title, i) =>
              <Category
                key={i}
                items={items}
                title={title}
              />)
          }
        </div>
      }

    </section>
  )
}

export default BurgerIngredients;