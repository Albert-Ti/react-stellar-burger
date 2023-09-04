import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'

const Home = () => {
  return (
    <>
      <h1 className='text_type_main-large title'>Соберите Бургер</h1>
      <main className='main'>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  )
}

export default Home
