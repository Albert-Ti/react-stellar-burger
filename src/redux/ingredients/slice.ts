import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { tabBun } from '../../utils/constants'
import { RootState } from '../store'
import { fetchIngredients } from './actions'
import { TIngredientsState } from './types'

const initialState: TIngredientsState = {
  items: [],
  status: 'LOADING',
  currentTab: tabBun
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.status = 'LOADING'
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.items = payload.data
        state.status = 'SUCCESS'
      })
      .addCase(fetchIngredients.rejected, state => {
        state.status = 'ERROR'
        state.items = []
      })
  }
})

export const ingredientsStore = (store: RootState) => store.ingredients
export const { getCurrentTab } = ingredientsSlice.actions
export default ingredientsSlice.reducer
