import PropTypes from 'prop-types'
import styles from './ingredient-details.module.css'

const IngredientDetails = props => {
  const { name, image, calories, carbohydrates, fat, proteins } = props
  return (
    <figure className={styles.figure}>
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
  props: PropTypes.any
}

export default IngredientDetails
