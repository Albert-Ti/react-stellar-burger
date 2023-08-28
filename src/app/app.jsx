import React from 'react'
import { DndProvider } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AppHeader from '../components/app-header/app-header'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import { errorItems, getItems, ingredientsState, loadItems } from '../redux/slice/ingredients-slice'
import { getIngredients } from '../utils/api'
import styles from './app.module.css'

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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  )
}

export default App
