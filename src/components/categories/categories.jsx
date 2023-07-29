import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentTab, ingredientsState } from '../../redux/slice/ingredients-slice'
import {
  categoryTitle,
  isBun,
  isMain,
  isSauce,
  tabBun,
  tabMain,
  tabSauce
} from '../../utils/constants'
import Ingredients from '../ingredients/ingredients'
import MyLoader from '../loader/loader'
import styles from './categories.module.css'

const Categories = ({ title }) => {
  const dispatch = useDispatch()

  const { isLoading, items } = useSelector(ingredientsState)
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
    if (title === categoryTitle[0]) return isBun
    if (title === categoryTitle[1]) return isSauce
    if (title === categoryTitle[2]) return isMain
  }

  return (
    <div ref={targetRef} id={`${isLinkTitle()}`} className={`categories ${styles.items}`}>
      <h2 className='text text_type_main-medium'>{title}</h2>
      {isLoading
        ? [...Array(2)].map((_, i) => <MyLoader key={i} />)
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
