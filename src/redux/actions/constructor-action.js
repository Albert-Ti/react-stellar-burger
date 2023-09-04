import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderRequest } from '../../utils/api'

export const fetchOrder = createAsyncThunk('constructor/fetchOrderStatus', async order => {
  return await orderRequest(order)
})
