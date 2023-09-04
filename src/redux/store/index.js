import { configureStore } from '@reduxjs/toolkit'
import ingredients from '../slice/ingredients-slice'
import burger from '../slice/constructor-slice'
import user from '../slice/user-slice'

const store = configureStore({
  reducer: {
    ingredients,
    burger,
    user
  }
})

export default store
