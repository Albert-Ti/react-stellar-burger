import {useSelector} from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
import ErrorPage from '../../pages/error-page'
import {ingredientsStore} from '../../redux/ingredients/slice'
import {TIngredient} from '../../types'
import styles from './ingredient-details.module.css'

const IngredientDetails = () => {
  const {id} = useParams()
  const {state} = useLocation()

  const {items} = useSelector(ingredientsStore)
  if (!items.length) return null

  const findItem = items.find((item: TIngredient) => item._id === id)
  const contentCenter = state?.background ? [styles.box] : [styles.box, styles.center]

  if (!findItem) return <ErrorPage />
  return (
    <figure className={styles.details}>
      <div className={contentCenter.join(' ')}>
        <h3 className='text text_type_main-large'>Детали ингридиента</h3>
      </div>
      <img className={styles.img} src={findItem.image} alt={findItem.name} />
      <figcaption>
        <h4 className='text text_type_main-medium mb-8'>{findItem.name}</h4>
        <ul className={`text text_type_main-default text_color_inactive ${styles.lists}`}>
          <li className={styles.list}>
            <p>Калории, калл</p>
            <p>{findItem.calories}</p>
          </li>
          <li className={styles.list}>
            <p>Белки, г</p>
            <p>{findItem.carbohydrates}</p>
          </li>
          <li className={styles.list}>
            <p>Жиры, г</p>
            <p>{findItem.fat}</p>
          </li>
          <li className={styles.list}>
            <p>Углеводы, г</p>
            <p>{findItem.proteins}</p>
          </li>
        </ul>
      </figcaption>
    </figure>
  )
}

export default IngredientDetails
