import Ingredients from "../ingredients/ingredients";
import styles from './sorted-ingredients.module.css';

const Category = ({ items, title }) => {

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {items.map((item, i) => {
        if (title === 'Булки' && item.type === 'bun')
          return <Ingredients {...item} key={i} />

        if (title === 'Соусы' && item.type === 'sauce')
          return <Ingredients {...item} key={i} />

        if (title === 'Начинки' && item.type === 'main')
          return <Ingredients {...item} key={i} />
      })}
    </div>
  )
}

export default Category;