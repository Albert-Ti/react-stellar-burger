import React from 'react';

import styles from './burger-ingredients.module.css';
import TabList from '../tab-list/tab-list';
import Category from '../category/category';


const BurgerIngredients = ({ isLoading, hasError, items }) => {
  const [toggleBun, setToogleBun] = React.useState(0);
  const title = {
    bun: 'Булки',
    sause: 'Соусы',
    main: 'Начинки'
  };

  return (
    <section className={styles.categories}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка при загрузке!'}
        {!isLoading && !hasError && 'Соберите Бургер'}
      </h1>

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
                  toggleBun={toggleBun}
                  onClickToggleBun={(id) => setToogleBun(id)}
                />
              ))
            }
          </div>

          <div className={styles.category}>
            <h2 className='text text_type_main-medium'>{title.sause}</h2>
            {
              items.map((item, i) => (
                item.type === 'sauce' &&
                <Category key={i} {...item} />
              ))
            }
          </div>

          <div className={styles.category}>
            <h2 className='text text_type_main-medium'>{title.main}</h2>
            {
              items.map((item, i) => (
                item.type === 'sauce' &&
                <Category key={i} {...item} />
              ))
            }
          </div>
        </div>
      }
    </section>
  )
}

export default BurgerIngredients;