import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import styles from './categories.module.css'
import Ingredients from '../ingredients/ingredients'
import { categoryTitle, isBun, isMain, isSauce } from '../../utils/constants'
import { ingredientsState } from '../../redux/slice/ingredients-slice'
import MyLoader from '../loader/loader'

const Categories = ({ title }) => {
  const { isLoading, items } = useSelector(ingredientsState)

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>
      {isLoading
        ? [...new Array(2)].map((_, i) => <MyLoader key={i} />)
        : items?.map(item => {
            if (title === categoryTitle[0] && item.type === isBun)
              return <Ingredients element={item} key={item._id} />

            if (title === categoryTitle[1] && item.type === isSauce)
              return <Ingredients element={item} key={item._id} />

            if (title === categoryTitle[2] && item.type === isMain)
              return <Ingredients element={item} key={item._id} />
          })}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string.isRequired
}

export default Categories
