import PropTypes from 'prop-types'

import styles from './categories.module.css'
import Ingredients from '../ingredients/ingredients'
import { ingredientPropType } from '../../utils/prop-types'

const Categories = ({ items, title, bun, addBun, addedIngredients, setAddedIngredients }) => {
  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {items.map(item => {
        if (title === 'Булки' && item.type === 'bun')
          return (
            <Ingredients
              element={item}
              key={item._id}
              addedIngredients={addedIngredients}
              setAddedIngredients={setAddedIngredients}
              bun={bun}
              addBun={addBun}
            />
          )

        if (title === 'Соусы' && item.type === 'sauce')
          return (
            <Ingredients
              element={item}
              key={item._id}
              addedIngredients={addedIngredients}
              setAddedIngredients={setAddedIngredients}
              bun={bun}
              addBun={addBun}
            />
          )

        if (title === 'Начинки' && item.type === 'main')
          return (
            <Ingredients
              element={item}
              key={item._id}
              addedIngredients={addedIngredients}
              setAddedIngredients={setAddedIngredients}
              bun={bun}
              addBun={addBun}
            />
          )
      })}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default Categories
