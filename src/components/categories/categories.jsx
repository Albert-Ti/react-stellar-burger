import PropTypes from "prop-types";

import styles from './categories.module.css';
import Ingredients from "../ingredients/ingredients";


const Categories = ({ data, title, bun, addBun, addedIngredients, setAddedIngredients }) => {

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {data.map((item, index) => {
        if (title === 'Булки' && item.type === 'bun')
          return <Ingredients element={item} key={index} addedIngredients={addedIngredients} setAddedIngredients={setAddedIngredients} bun={bun} addBun={addBun} />

        if (title === 'Соусы' && item.type === 'sauce')
          return <Ingredients element={item} key={index} addedIngredients={addedIngredients} setAddedIngredients={setAddedIngredients} bun={bun} addBun={addBun} />

        if (title === 'Начинки' && item.type === 'main')
          return <Ingredients element={item} key={index} addedIngredients={addedIngredients} setAddedIngredients={setAddedIngredients} bun={bun} addBun={addBun} />
      })}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object)
}

export default Categories;