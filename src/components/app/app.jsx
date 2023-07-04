import React, { useState } from 'react'

import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import getIngredients from '../../utils/api'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'

function App() {
  const [visibleModal, setVisibleModal] = React.useState({
    order: false,
    ingredient: false
  })
  const [ingredients, setIngredients] = React.useState({
    isLoading: true,
    hasError: false,
    items: []
  })
  const [bun, setBun] = React.useState({})
  const [addedIngredients, setAddedIngredients] = React.useState([])
  const [itemModalIngredient, setItemModalIngredient] = useState({})

  React.useEffect(() => {
    getIngredients()
      .then(data => setIngredients({ ...ingredients, isLoading: false, items: data }))
      .catch(err => {
        setIngredients({ ...ingredients, hasError: true })
        console.log(`Произошла ошибка: ${err}`)
      })
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
        <BurgerIngredients
          {...ingredients}
          bun={bun}
          addBun={setBun}
          addedIngredients={addedIngredients}
          setAddedIngredients={setAddedIngredients}
        />
        <BurgerConstructor
          bun={bun}
          addedIngredients={addedIngredients}
          remove={setAddedIngredients}
          setVisibleModal={setVisibleModal}
          setItemModalIngredient={setItemModalIngredient}
        />
      </main>

      <Modal
        setVisibleModal={setVisibleModal}
        visibleModal={visibleModal}
        itemModalIngredient={itemModalIngredient}
      >
        {visibleModal.order && <OrderDetails />}
        {visibleModal.ingredient && <IngredientDetails itemModalIngredient={itemModalIngredient} />}
      </Modal>
    </div>
  )
}

export default App
