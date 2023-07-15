import PropTypes from 'prop-types'
import styles from './ingredient-details.module.css'
import { ingredientPropType } from '../../utils/prop-types'

const IngredientDetails = props => {
  const { name, image, calories, carbohydrates, fat, proteins } = props
  return (
    <figure className={styles.details}>
      <h3 className={`text text_type_main-large ${styles.title}`}>Детали ингридиента</h3>
      <img className={styles.img} src={image} alt={name} />
      <figcaption className={styles.info}>
        <p className='text text_type_main-medium'>{name}</p>
        <ul className={`text text_type_main-default text_color_inactive ${styles.lists}`}>
          <li>Калории, калл {calories}</li>
          <li>Белки, г {carbohydrates}</li>
          <li>Жиры, г {fat}</li>
          <li>Углеводы, г {proteins}</li>
        </ul>
      </figcaption>
    </figure>
  )
}

IngredientDetails.propTypes = {
  props: PropTypes.oneOfType([PropTypes.oneOf([null]).isRequired, ingredientPropType])
}

export default IngredientDetails
