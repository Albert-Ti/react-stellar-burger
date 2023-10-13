import React from 'react'
import { useAppDispatch } from '../../hooks'
import { getCurrentTab } from '../../redux/ingredients/slice'
import { isBun, isHeaders, isMain, isSauce, tabBun, tabMain, tabSauce } from '../../utils/constants'
import CategoryIngredients from '../category-ingredients/category-ingredients'
import styles from './categories.module.css'
import { TCategories } from './types'

const Categories: React.FC<TCategories> = ({ title, items }) => {
  const dispatch = useAppDispatch()

  const targetRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const observer = new IntersectionObserver(callBack, { threshold: 0.5 })

    function callBack(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === isBun) dispatch(getCurrentTab(tabBun))
          if (entry.target.id === isSauce) dispatch(getCurrentTab(tabSauce))
          if (entry.target.id === isMain) dispatch(getCurrentTab(tabMain))
        }
      })
    }

    const currentTarget = targetRef.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      currentTarget && observer.unobserve(currentTarget)
    }
  }, [targetRef, dispatch])

  return (
    <div
      ref={targetRef}
      id={`${isHeaders[title as keyof typeof isHeaders]}`}
      className={`categories ${styles.items}`}
    >
      <h2 className='text text_type_main-medium'>{title}</h2>
      {items.map(item => (
        <CategoryIngredients element={item} key={item._id} />
      ))}
    </div>
  )
}

export default Categories
