import React from 'react'
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import requestDataFromServer from '../api-burger/api-burger';
import config from '../../utils/config';

function App() {
  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    items: []
  });

  React.useEffect(() => {
    requestDataFromServer(setIngredients, ingredients, config);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients  {...ingredients} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
