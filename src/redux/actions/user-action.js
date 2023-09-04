import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  registerRequest,
  userRequest,
  loginRequest,
  editUserRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest
} from '../../utils/api'

export const fetchCheckUser = createAsyncThunk('user/fetchCheckUserStatus', async () => {
  return await userRequest()
})

export const fetchRegister = createAsyncThunk('user/fetchRegisterStatus', async form => {
  return await registerRequest(form)
})

export const fetchLogin = createAsyncThunk('user/fetchLoginStatus', async form => {
  return await loginRequest(form)
})

export const fetchEditUser = createAsyncThunk('user/fetchEditUserStatus', async form => {
  return await editUserRequest(form)
})

export const fetchLogout = createAsyncThunk('user/fetchLogoutstatus', async () => {
  return await logoutRequest()
})

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPasswordStatus',
  async form => {
    return await forgotPasswordRequest(form)
  }
)

export const fetchResetPassword = createAsyncThunk('user/fetchResetPasswordStatus', async form => {
  return await resetPasswordRequest(form)
})
