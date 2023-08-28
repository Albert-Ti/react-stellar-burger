import { createSlice } from '@reduxjs/toolkit'
import { tabBun } from '../../utils/constants'

const initialState = {
  items: [],
  isLoading: false,
  hasError: false,
  ingredientModal: null,

  currentTab: tabBun
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
    },

    getCurrentTab: (state, action) => {
      state.currentTab = action.payload
    }
  }
})

export const ingredientsState = state => state.ingredients
export const { loadItems, getItems, errorItems, openModalIngredient, getCurrentTab } =
  ingredientsSlice.actions
export default ingredientsSlice.reducer
