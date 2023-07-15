import React from 'react'
import PropTypes from 'prop-types'

import styles from './categories.module.css'
import Ingredients from '../ingredients/ingredients'
import { IngredientsContext } from '../app/app'

const Categories = ({ title }) => {
  const { items } = React.useContext(IngredientsContext)

  return (
    <div className={styles.items}>
      <h2 className='text text_type_main-medium'>{title}</h2>

      {items.map(item => {
        if (title === 'Булки' && item.type === 'bun')
          return <Ingredients element={item} key={item._id} />

        if (title === 'Соусы' && item.type === 'sauce')
          return <Ingredients element={item} key={item._id} />

        if (title === 'Начинки' && item.type === 'main')
          return <Ingredients element={item} key={item._id} />
      })}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string.isRequired
}

export default Categories
