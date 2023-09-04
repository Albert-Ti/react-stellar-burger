import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import styles from './indgredient.module.css'

const Ingredient = () => {
  return (
    <div className={`content-route ${styles.ingredient}`}>
      <IngredientDetails />
    </div>
  )
}

export default Ingredient
