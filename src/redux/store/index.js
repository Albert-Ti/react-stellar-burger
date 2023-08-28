import { configureStore } from '@reduxjs/toolkit'
import ingredients from '../slice/ingredients-slice'
import burger from '../slice/constructor-slice'

const store = configureStore({
  reducer: {
    ingredients,
    burger
  }
})

export default store
