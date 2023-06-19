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
  const [toggleBunId, setToogleBunId] = React.useState(1);
  const [newIngredient, setNewIngredient] = React.useState([]);
  const [bunItem, setBunItem] = React.useState({});
  const [totalPrice, setTotalPrice] = React.useState(0);


  React.useEffect(() => {
    requestDataFromServer(setIngredients, ingredients, config);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={` ${styles.title} text_type_main-large`}>
        {ingredients.isLoading && 'Загрузка...'}
        {ingredients.hasError && 'Произошла ошибка при загрузке!'}
        {!ingredients.isLoading && !ingredients.hasError && 'Соберите Бургер'}
      </h1>
      <main className={styles.main}>
        <BurgerIngredients
          {...ingredients}
          setNewIngredient={setNewIngredient}
          toggleBunId={toggleBunId}
          setToogleBunId={setToogleBunId}
          bunItem={bunItem}
          setBunItem={setBunItem}
          setTotalPrice={setTotalPrice}
        />
        <BurgerConstructor
          newIngredient={newIngredient}
          toggleBunId={toggleBunId}
          bunItem={bunItem}
          totalPrice={totalPrice}
        />
      </main>
    </div>
  );
}

export default App;
