import { createAsyncThunk } from '@reduxjs/toolkit'
import { getOrderRequest, orderRequest } from '../../utils/api'

export const fetchOrder = createAsyncThunk('constructor/fetchOrderStatus', orderRequest)

export const fetchByClickingOnTheCardOrder = createAsyncThunk(
  'order/fetchOrderCardStatus',
  getOrderRequest
)
