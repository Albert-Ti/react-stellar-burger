import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthChecked: false,
  errorStatus: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload
    },

    removeUser: (state, action) => {
      state.user = action.payload
    },

    catchError: (state, action) => {
      state.errorStatus = action.payload
    }
  }
})

export const userState = state => state.user

export const { setUser, setAuthChecked, removeUser, catchError } = userSlice.actions
export default userSlice.reducer
