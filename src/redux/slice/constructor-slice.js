import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bun: {},
  addedIngredients: [],
  countIngredient: 0,
  totalPrice: 0,
  order: { number: 0 }
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = {
        ...action.payload,
        isLocked: true
      }
    },

    addIngredient: (state, action) => {
      state.addedIngredients.push(action.payload)
    },

    removeIngredient: (state, action) => {
      state.addedIngredients = state.addedIngredients.filter((_, index) => index !== action.payload)
    },

    setTotalPrice: (state, action) => {
      switch (action.payload.type) {
        case 'set-bun':
          state.totalPrice = action.payload.price * 2
          break
        case 'set-other':
          state.totalPrice += action.payload.price
          break
        case 'remove':
          state.totalPrice -= action.payload.price
          break
        default:
          throw new Error(`Wrong type of action: ${action.type}`)
      }
    },

    setOrder: (state, action) => {
      state.order = action.payload
    }
  }
})

export const constructorState = state => state.burger
export const { addBun, addIngredient, setTotalPrice, setOrder, removeIngredient } =
  constructorSlice.actions
export default constructorSlice.reducer
