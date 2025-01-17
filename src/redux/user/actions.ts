import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  editUserRequest,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  userRequest,
} from '../../utils/api'

export const fetchCheckUser = createAsyncThunk('user/fetchCheckUserStatus', userRequest)
export const fetchRegister = createAsyncThunk('user/fetchRegisterStatus', registerRequest)
export const fetchLogin = createAsyncThunk('user/fetchLoginStatus', loginRequest)
export const fetchEditUser = createAsyncThunk('user/fetchEditUserStatus', editUserRequest)
export const fetchLogout = createAsyncThunk('user/fetchLogoutStatus', logoutRequest)
export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPasswordStatus',
  forgotPasswordRequest
)
export const fetchResetPassword = createAsyncThunk('user/fetchResetPasswordStatus', resetPasswordRequest)
