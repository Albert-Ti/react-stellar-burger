import React from 'react'
import PropTypes from 'prop-types'

import styles from './categories.module.css'
import Ingredients from '../ingredients/ingredients'
import { IngredientsContext } from '../app/app'
import { categoryTitle, isBun, isMain, isSauce } from '../../utils/constants'

const Categories = ({ title }) => {
  const { items } = React.useContext(IngredientsContext)

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {items.map(item => {
        if (title === categoryTitle[0] && item.type === isBun)
          return <Ingredients element={item} key={item._id} />

        if (title === categoryTitle[1] && item.type === isSauce)
          return <Ingredients element={item} key={item._id} />

        if (title === categoryTitle[3] && item.type === isMain)
          return <Ingredients element={item} key={item._id} />
      })}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string.isRequired
}

export default Categories
