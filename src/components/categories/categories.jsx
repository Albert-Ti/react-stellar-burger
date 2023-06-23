import styles from './categories.module.css';
import Ingredients from "../ingredients/ingredients";

const Categories = ({ data, title, addOtherIngredient, addBun, newIngredients, bun }) => {

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {data.map((item, index) => {
        if (title === 'Булки' && item.type === 'bun')
          return <Ingredients addBun={addBun} addOtherIngredient={addOtherIngredient} element={item} key={index} newIngredients={newIngredients} bun={bun} />

        if (title === 'Соусы' && item.type === 'sauce')
          return <Ingredients addBun={addBun} addOtherIngredient={addOtherIngredient} element={item} key={index} newIngredients={newIngredients} bun={bun} />

        if (title === 'Начинки' && item.type === 'main')
          return <Ingredients addBun={addBun} addOtherIngredient={addOtherIngredient} element={item} key={index} newIngredients={newIngredients} bun={bun} />
      })}
    </div>
  )
}

export default Categories;