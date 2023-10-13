import { SerializedError } from '@reduxjs/toolkit'
import { TFormUser } from '../../types'

export type TUserState = {
  user: null | TFormUser
  errorStatus: SerializedError
  isAuthChecked: boolean
  resetPasswordStatus: boolean
  logoutStatus: boolean
}
