import React from 'react'

import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { getIngredients } from '../../utils/api'

export const IngredientsContext = React.createContext()

const priceInitialState = { total: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { total: state.total + action.payload }
    case 'remove':
      return { total: state.total - action.payload }
    default:
      throw new Error(`Wrong type of action: ${action.type}`)
  }
}

function App() {
  const [ingredients, setIngredients] = React.useState({
    isLoading: true,
    hasError: false,
    items: []
  })
  const [bun, setBun] = React.useState({})
  const [addedIngredients, setAddedIngredients] = React.useState([])
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(
    reducer,
    priceInitialState,
    undefined
  )

  React.useEffect(() => {
    getIngredients()
      .then(data => setIngredients({ ...ingredients, isLoading: false, items: data }))
      .catch(err => setIngredients({ ...ingredients, hasError: true }))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`text_type_main-large ${styles.title}`}>
        {ingredients.isLoading && 'Загрузка...'}
        {ingredients.hasError && 'Ошибка запроса!'}
        {!ingredients.isLoading && !ingredients.hasError && 'Соберите Бургер'}
      </h1>
      <main className={styles.main}>
        <IngredientsContext.Provider
          value={{
            bun,
            setBun,
            addedIngredients,
            setAddedIngredients,
            items: ingredients.items,
            totalPriceState,
            totalPriceDispatcher
          }}
        >
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </div>
  )
}

export default App
