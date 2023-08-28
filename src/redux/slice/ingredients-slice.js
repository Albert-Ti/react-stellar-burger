import { createSlice } from '@reduxjs/toolkit'
import { tabBun } from '../../utils/constants'

const initialState = {
  items: [],
  isLoading: false,
  errorStatus: null,
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

    catchError: (state, action) => {
      state.errorStatus = action.payload
      state.items = []
    },

    getCurrentTab: (state, action) => {
      state.currentTab = action.payload
    }
  }
})

export const ingredientsState = state => state.ingredients
export const { loadItems, getItems, catchError, getCurrentTab } = ingredientsSlice.actions
export default ingredientsSlice.reducer
