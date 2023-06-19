import styles from './burger-ingredients.module.css';
import TabList from '../tab-list/tab-list';
import Category from '../category/category';


const BurgerIngredients = (
  { toggleBunId, setToogleBunId, isLoading, hasError, items, setNewIngredient, bunItem, setBunItem, setTotalPrice }
) => {

  const title = {
    bun: 'Булки',
    sause: 'Соусы',
    main: 'Начинки'
  };



  return (
    <section className={styles.categories}>

      <TabList />
      {
        !isLoading && !hasError &&
        <div className={`custom-scroll ${styles.scroll}`}>

          <div className={styles.category}>
            <h2 className='text text_type_main-medium'>{title.bun}</h2>
            {
              items.map((item, i) => (
                item.type === 'bun' &&
                <Category
                  key={i}
                  {...item}
                  index={i}
                  toggleBunId={toggleBunId}
                  onClickToggleBun={id => setToogleBunId(id)}
                  addBunItem={bun => setBunItem(bun)}
                  setTotalPrice={setTotalPrice}
                />
              ))
            }
          </div>

          <div className={styles.category}>
            <h2 className='text text_type_main-medium'>{title.sause}</h2>
            {
              items.map((item, i) => (
                item.type === 'sauce' &&
                <Category
                  key={i}
                  {...item}
                  setNewIngredient={setNewIngredient}
                  setTotalPrice={setTotalPrice}
                />
              ))
            }
          </div>

          <div className={styles.category}>
            <h2 className='text text_type_main-medium'>{title.main}</h2>
            {
              items.map((item, i) => (
                item.type === 'main' &&
                <Category
                  key={i}
                  {...item}
                  setNewIngredient={setNewIngredient}
                  setTotalPrice={setTotalPrice}
                />
              ))
            }
          </div>
        </div>
      }
    </section>
  )
}

export default BurgerIngredients;