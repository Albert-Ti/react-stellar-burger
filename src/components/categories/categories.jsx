import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'

import { getCurrentTab } from '../../redux/slice/ingredients-slice'
import {
  isBun,
  isMain,
  isSauce,
  tabBun,
  tabMain,
  tabSauce,
  titleBun,
  titleMain,
  titleSauce
} from '../../utils/constants'
import CategoryIngredients from '../category-ingredients/category-ingredients'
import styles from './categories.module.css'

const Categories = ({ title, items }) => {
  const dispatch = useDispatch()

  const targetRef = React.useRef(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(callBack, { threshold: 0.5 })

    function callBack(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === isBun) dispatch(getCurrentTab(tabBun))
          if (entry.target.id === isSauce) dispatch(getCurrentTab(tabSauce))
          if (entry.target.id === isMain) dispatch(getCurrentTab(tabMain))
        }
      })
    }

    const currentTarget = targetRef.current
    if (currentTarget) observer.observe(currentTarget)

    return () => currentTarget && observer.unobserve(currentTarget)
  }, [targetRef, dispatch])

  const isLinkTitle = () => {
    if (title === titleBun) return isBun
    if (title === titleSauce) return isSauce
    if (title === titleMain) return isMain
  }

  return (
    <div ref={targetRef} id={`${isLinkTitle()}`} className={`categories ${styles.items}`}>
      <h2 className='text text_type_main-medium'>{title}</h2>
      {items.map(item => (
        <CategoryIngredients element={item} key={item._id} />
      ))}
    </div>
  )
}

Categories.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default Categories
