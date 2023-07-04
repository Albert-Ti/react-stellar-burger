import styles from './ingredient-details.module.css'
import { ingredientModalPropType } from '../../utils/prop-types'

const IngredientDetails = ({ itemModalIngredient }) => {
  const { thumbnail, text, info } = itemModalIngredient

  if (!itemModalIngredient.text) return
  return (
    <figure className={styles.figure}>
      <img className={styles.img} src={thumbnail} alt={text} />
      <figcaption className={styles.info}>
        <p className='text text_type_main-medium'>{text}</p>
        <ul className={`text text_type_main-default text_color_inactive ${styles.lists}`}>
          <li>Калории, калл {info.calories}</li>
          <li>Белки, г {info.carbohydrates}</li>
          <li>Жиры, г {info.fat}</li>
          <li>Углеводы, г {info.proteins}</li>
        </ul>
      </figcaption>
    </figure>
  )
}

IngredientDetails.propTypes = {
  itemModalIngredient: ingredientModalPropType
}

export default IngredientDetails
