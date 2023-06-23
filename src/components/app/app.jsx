import React from 'react'

import styles from "./app.module.css";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import config from "../../utils/config";

function App() {
  React.useEffect(() => {
    setIngredients({ ...ingredients, isLoading: true })
    fetch(config.url)
      .then(response => response.ok
        ? response.json()
        : Promise.reject(`Ошибка: ${response.status}`))
      .then(json => setIngredients({
        ...ingredients,
        data: json.data
      }))
      .catch(error => setIngredients({ ...ingredients, hasError: true }))
  }, [])

  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [addedIngredients, setAddedingredients] = React.useState([])
  const [bun, setBun] = React.useState({})

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`text_type_main-large ${styles.title}`}>
        {ingredients.isLoading && 'Загрузка...'}
        {ingredients.hasError && 'Ошибка'}
        {!ingredients.isLoading && !ingredients.hasError && 'Соберите Бургер'}
      </h1>
      <main className={styles.main}>
        <BurgerIngredients
          addBun={setBun}
          bun={bun}
          addOtherIngredient={setAddedingredients}
          {...ingredients}
          newIngredients={addedIngredients}
        />
        <BurgerConstructor
          bun={bun}
          otherIngredient={addedIngredients}
          remove={setAddedingredients}
        />
      </main>
    </div>
  );
}

export default App;
