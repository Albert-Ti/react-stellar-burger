import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  isLoading: false,
  hasError: false,
  ingredientModal: null
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    loadItems: (state, action) => {
      state.isLoading = action.payload
      state.items = []
    },

    getItems: (state, action) => {
      state.items = action.payload
      state.isLoading = false
    },

    errorItems: (state, action) => {
      state.hasError = action.payload
      state.items = []
    },

    openModalIngredient: (state, action) => {
      state.ingredientModal = action.payload
    }
  }
})

export const ingredientsState = state => state.ingredients
export const { loadItems, getItems, errorItems, openModalIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer
