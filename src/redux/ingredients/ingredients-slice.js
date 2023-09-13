import { createSlice } from '@reduxjs/toolkit'
import { tabBun } from '../../utils/constants'
import { fetchIngredients } from './ingredients-actions'

const initialState = {
  items: [],
  status: 'loading',
  currentTab: tabBun
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getCurrentTab: (state, action) => {
      state.currentTab = action.payload
    }
  },
  extraReducers: {
    [fetchIngredients.pending]: state => {
      state.status = 'loading'
    },
    [fetchIngredients.fulfilled]: (state, { payload }) => {
      state.items = payload.data
      state.status = 'success'
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    }
  }
})

export const ingredientsStore = store => store.ingredients
export const { getCurrentTab } = ingredientsSlice.actions
export default ingredientsSlice.reducer
