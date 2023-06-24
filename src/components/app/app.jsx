import React from 'react'

import styles from "./app.module.css";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import config from "../../utils/config";
import fetchDataFromServer from '../../utils/api';

function App() {

  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [addedIngredients, setAddedIngredients] = React.useState([]);
  const [bun, setBun] = React.useState({});

  React.useEffect(() => {
    fetchDataFromServer(ingredients, setIngredients, config.url);
  }, [])

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
          addOtherIngredient={setAddedIngredients}
          {...ingredients}
          newIngredients={addedIngredients}
        />
        <BurgerConstructor
          bun={bun}
          otherIngredient={addedIngredients}
          remove={setAddedIngredients}
        />
      </main>
    </div>
  );
}

export default App;
