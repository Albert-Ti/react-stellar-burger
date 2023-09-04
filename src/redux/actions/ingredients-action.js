import { createAsyncThunk } from '@reduxjs/toolkit'
import { ingredientsRequest } from '../../utils/api'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredientsStatus',
  ingredientsRequest
)
