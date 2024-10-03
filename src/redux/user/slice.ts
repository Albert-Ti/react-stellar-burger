import {PayloadAction, SerializedError, createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {
  fetchCheckUser,
  fetchEditUser,
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
} from './actions'
import {TUserState} from './types'

const initialState: TUserState = {
  user: null,
  errorStatus: {
    name: '',
    message: '',
    stack: '',
    code: '',
  },
  isAuthChecked: false,
  resetPasswordStatus: false,
  logoutStatus: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    catchError: (state, action: PayloadAction<SerializedError | null>) => {
      if (action.payload) {
        state.errorStatus = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCheckUser.fulfilled, (state, {payload}) => {
        if (localStorage.getItem('access-token')) {
          state.user = payload.user
        }
        state.isAuthChecked = true
      })
      .addCase(fetchCheckUser.rejected, (state, action) => {
        state.errorStatus = action.error
        state.isAuthChecked = true
        state.user = null
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
      })
      .addCase(fetchRegister.fulfilled, (state, {payload}) => {
        if (payload.accessToken && payload.refreshToken) {
          localStorage.setItem('access-token', payload.accessToken)
          localStorage.setItem('refresh-token', payload.refreshToken)
        }
        state.user = payload.user
        state.isAuthChecked = true
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.errorStatus = action.error
      })
      .addCase(fetchLogin.fulfilled, (state, {payload}) => {
        if (payload.accessToken && payload.refreshToken) {
          localStorage.setItem('access-token', payload.accessToken)
          localStorage.setItem('refresh-token', payload.refreshToken)
        }
        state.user = payload.user
        state.isAuthChecked = true
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.errorStatus = action.error
      })
      .addCase(fetchEditUser.fulfilled, (state, {payload}) => {
        state.user = payload.user
      })
      .addCase(fetchEditUser.rejected, (state, action) => {
        state.errorStatus = action.error
      })
      .addCase(fetchForgotPassword.fulfilled, (state, {payload}) => {
        state.resetPasswordStatus = payload.success
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.errorStatus = action.error
        state.resetPasswordStatus = false
      })
      .addCase(fetchResetPassword.fulfilled, (state, {payload}) => {})
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.errorStatus = action.error
      })
      .addCase(fetchLogout.fulfilled, (state, {payload}) => {
        if (payload.success) {
          state.user = null
          state.logoutStatus = payload.success
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
        }
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.errorStatus = action.error
      })
  },
})

export const userStore = (store: RootState) => store.user

export const {catchError} = userSlice.actions
export default userSlice.reducer
