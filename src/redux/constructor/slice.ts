import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {TIngredient, TOrderNumber} from '../../types'
import {RootState} from '../store'
import {fetchByClickingOnTheCardOrder, fetchOrder} from './actions'
import {IConstructorState, TDragAndDropIndex} from './types'

const initialState: IConstructorState = {
  bun: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: '',
    count: 0,
  },
  addedIngredients: [],
  countIngredient: 0,
  totalPrice: 0,

  createdOrder: {number: 0},
  statusCreatedOrder: '',

  order: {
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    status: '',
    updatedAt: '',
    _id: '',
  },
  statusOrder: '',
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = {
        ...action.payload,
        isLocked: true,
      }
      state.totalPrice = action.payload.price * 2
    },
    addIngredient: (state, {payload}: PayloadAction<TIngredient>) => {
      state.addedIngredients.push(payload)
    },
    removeIngredient: (state, {payload}: PayloadAction<TIngredient>) => {
      state.addedIngredients = state.addedIngredients.filter(item => item.uuid !== payload.uuid)
    },
    setOrder: (state, action: PayloadAction<TOrderNumber>) => {
      state.createdOrder = action.payload
    },
    sortedIngredients: (state, {payload}: PayloadAction<TDragAndDropIndex>) => {
      let newItems = [...state.addedIngredients]
      const removedDragItem = newItems.splice(payload.dragIndex, 1)
      newItems.splice(payload.hoverIndex, 0, ...removedDragItem)
      state.addedIngredients = newItems
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.statusCreatedOrder = 'LOADING'
      })
      .addCase(fetchOrder.fulfilled, (state, {payload}) => {
        state.createdOrder = payload.order
        state.statusCreatedOrder = 'SUCCESS'
        state.addedIngredients = []
      })
      .addCase(fetchOrder.rejected, state => {
        state.statusOrder = 'ERROR'
        state.createdOrder = {number: 0}
      })
      .addCase(fetchByClickingOnTheCardOrder.pending, state => {
        state.statusOrder = 'LOADING'
      })
      .addCase(fetchByClickingOnTheCardOrder.fulfilled, (state, {payload}) => {
        state.statusOrder = 'SUCCESS'
        state.order = payload.orders[0]
      })
      .addCase(fetchByClickingOnTheCardOrder.rejected, state => {
        state.statusOrder = 'ERROR'
      })
  },
})

export const constructorStore = (store: RootState) => store.burger
export const {addBun, addIngredient, setTotalPrice, setOrder, removeIngredient, sortedIngredients} =
  constructorSlice.actions
export default constructorSlice.reducer
