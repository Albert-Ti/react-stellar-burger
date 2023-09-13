import { createSlice } from '@reduxjs/toolkit'
import { fetchOrder } from './constructor-actions'

const initialState = {
  bun: {},
  addedIngredients: [],
  countIngredient: 0,
  totalPrice: 0,
  order: { number: 0 },
  statusOrder: ''
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
      state.totalPrice = action.payload.price * 2
    },
    addIngredient: (state, { payload }) => {
      state.addedIngredients.push(payload)
    },
    removeIngredient: (state, { payload }) => {
      state.addedIngredients = state.addedIngredients.filter(item => item.id !== payload.id)
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    sortedIngredients: (state, { payload }) => {
      let newItems = [...state.addedIngredients]
      const removedDragItem = newItems.splice(payload.dragIndex, 1)
      newItems.splice(payload.hoverIndex, 0, ...removedDragItem)
      state.addedIngredients = newItems
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    }
  },
  extraReducers: {
    [fetchOrder.pending]: state => {
      state.statusOrder = 'loading'
    },
    [fetchOrder.fulfilled]: (state, { payload }) => {
      state.order = payload.order
      state.statusOrder = 'success'
      state.addedIngredients = []
      state.bun = {}
    },
    [fetchOrder.rejected]: state => {
      state.statusOrder = 'error'
      state.order = { number: 0 }
    }
  }
})

export const constructorStore = store => store.burger
export const {
  addBun,
  addIngredient,
  setTotalPrice,
  setOrder,
  removeIngredient,
  sortedIngredients
} = constructorSlice.actions
export default constructorSlice.reducer
