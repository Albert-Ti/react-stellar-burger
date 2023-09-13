import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderRequest } from '../../utils/api'

export const fetchOrder = createAsyncThunk('constructor/fetchOrderStatus', orderRequest)
