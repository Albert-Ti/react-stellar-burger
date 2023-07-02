import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

import styles from './ingredient-details.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalElememt } from '../../utils/constants'
import { ingredientModalPropType } from '../../utils/prop-types'

const IngredientDetails = ({ setVisibleModal, visibleModal, itemModalIngredient }) => {
  const animationClasses = [styles.overlay, styles.visible]
  const { thumbnail, text, info } = itemModalIngredient

  const closeModalIngredient = () => {
    setVisibleModal({ ingredient: false, order: false })
  }

  React.useEffect(() => {
    function clickEscape(e) {
      if (e.key === 'Escape') setVisibleModal({ ingredient: false, order: false })
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [visibleModal])

  if (!itemModalIngredient.text) return
  return createPortal(
    <div
      onClick={closeModalIngredient}
      className={visibleModal.ingredient ? animationClasses.join(' ') : styles.overlay}
    >
      <div onClick={e => e.stopPropagation()} className={styles.wrapper}>
        <h3 className={`text text_type_main-large ${styles.title}`}>
          <span>Детали ингридиента</span>
          <button className={styles.btn}>
            <CloseIcon onClick={closeModalIngredient} />
          </button>
        </h3>

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
      </div>
    </div>,
    modalElememt
  )
}

IngredientDetails.propTypes = {
  itemModalIngredient: ingredientModalPropType,

  visibleModal: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  setVisibleModal: PropTypes.func.isRequired
}

export default IngredientDetails
