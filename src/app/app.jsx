import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './app.module.css'
import AppHeader from '../components/app-header/app-header'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import { getIngredients } from '../utils/api'
import { errorItems, getItems, ingredientsState, loadItems } from '../redux/slice/ingredients-slice'

function App() {
  const dispatch = useDispatch()
  const { hasError, isLoading } = useSelector(ingredientsState)

  React.useEffect(() => {
    dispatch(loadItems(true))
    getIngredients()
      .then(data => dispatch(getItems(data)))
      .catch(err => dispatch(errorItems(true)))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`text_type_main-large ${styles.title}`}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Ошибка запроса!'}
        {!isLoading && !hasError && 'Соберите Бургер'}
      </h1>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  )
}

export default App
