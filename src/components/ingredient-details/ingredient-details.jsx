import PropTypes from 'prop-types'
import { ingredientConstructorPropType } from '../../utils/prop-types'
import styles from './ingredient-details.module.css'

const IngredientDetails = ({ item, showContent }) => {
  const { thumbnail, text, info } = item

  if (!showContent) return null
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
  item: ingredientConstructorPropType,
  showContent: PropTypes.bool.isRequired
}

export default IngredientDetails
