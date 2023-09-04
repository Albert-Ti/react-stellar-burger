import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { ingredientsState } from '../../redux/slice/ingredients-slice'
import styles from './ingredient-details.module.css'
import ErrorPage from '../../pages/error-page'

const IngredientDetails = () => {
  const { id } = useParams()
  const { state } = useLocation()

  const { items } = useSelector(ingredientsState)
  if (!items.length) return null

  const ingredient = items.find(item => item._id === id)

  const { name, image, calories, carbohydrates, fat, proteins } = ingredient
  const center = state?.background ? [styles.box] : [styles.box, styles.center]

  if (!ingredient) return <ErrorPage />
  return (
    <figure className={styles.details}>
      <div className={center.join(' ')}>
        <h3 className='text text_type_main-large'>Детали ингридиента</h3>
      </div>
      <img className={styles.img} src={image} alt={name} />
      <figcaption>
        <h4 className='text text_type_main-medium mb-8'>{name}</h4>
        <ul className={`text text_type_main-default text_color_inactive ${styles.lists}`}>
          <li className={styles.list}>
            <p>Калории, калл</p>
            <p>{calories}</p>
          </li>
          <li className={styles.list}>
            <p>Белки, г</p>
            <p>{carbohydrates}</p>
          </li>
          <li className={styles.list}>
            <p>Жиры, г</p>
            <p>{fat}</p>
          </li>
          <li className={styles.list}>
            <p>Углеводы, г</p>
            <p>{proteins}</p>
          </li>
        </ul>
      </figcaption>
    </figure>
  )
}

export default IngredientDetails
