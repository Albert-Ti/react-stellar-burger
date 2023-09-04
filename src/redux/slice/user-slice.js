import { createSlice } from '@reduxjs/toolkit'
import {
  fetchForgotPassword,
  fetchCheckUser,
  fetchEditUser,
  fetchLogout,
  fetchLogin,
  fetchRegister,
  fetchResetPassword
} from '../actions/user-action'

const initialState = {
  user: null,
  errorStatus: null,
  isAuthChecked: false,
  resetPasswordStatus: false,
  logoutStatus: false
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
  },
  extraReducers: {
    [fetchCheckUser.fulfilled]: (state, { payload }) => {
      if (localStorage.getItem('access-token')) {
        state.user = payload.user
      }
      state.isAuthChecked = true
    },
    [fetchCheckUser.rejected]: (state, action) => {
      state.errorStatus = action.error
      state.isAuthChecked = true
      state.user = null
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
    },

    [fetchRegister.fulfilled]: (state, { payload }) => {
      localStorage.setItem('access-token', payload.accessToken)
      localStorage.setItem('refresh-token', payload.refreshToken)
      state.user = payload.user
      state.isAuthChecked = true
    },
    [fetchRegister.rejected]: (state, action) => {
      state.errorStatus = action.error
    },

    [fetchLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem('access-token', payload.accessToken)
      localStorage.setItem('refresh-token', payload.refreshToken)
      state.user = payload.user
      state.isAuthChecked = true
    },
    [fetchLogin.rejected]: (state, action) => {
      state.errorStatus = action.error
    },

    [fetchEditUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user
    },
    [fetchEditUser.rejected]: (state, action) => {
      state.errorStatus = action.error
    },

    [fetchForgotPassword.fulfilled]: (state, { payload }) => {
      state.resetPasswordStatus = payload.success
    },
    [fetchForgotPassword.rejected]: (state, action) => {
      state.errorStatus = action.error
      state.resetPasswordStatus = false
    },

    [fetchResetPassword.fulfilled]: (state, { payload }) => {},
    [fetchResetPassword.rejected]: (state, action) => {
      state.errorStatus = action.error
    },

    [fetchLogout.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.user = null
        state.logoutStatus = payload.success
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
      }
    },
    [fetchLogout.rejected]: (state, action) => {
      state.errorStatus = action.error
    }
  }
})

export const userState = state => state.user

export const { setUser, setAuthChecked, removeUser, catchError } = userSlice.actions
export default userSlice.reducer
