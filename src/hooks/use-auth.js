import { useDispatch, useSelector } from 'react-redux'
import {
  catchError,
  removeUser,
  setAuthChecked,
  setUser,
  userState
} from '../redux/slice/user-slice'
import {
  editUserRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest
} from '../utils/api'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, errorStatus, isAuthChecked } = useSelector(userState)

  const checkUser = () => {
    if (localStorage.getItem('access-token')) {
      getUserRequest()
        .then(data => dispatch(setUser(data.user)))
        .catch(err => {
          dispatch(catchError(err))
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          dispatch(setUser(null))
        })
        .finally(() => dispatch(setAuthChecked(true)))
    } else {
      dispatch(setAuthChecked(true))
    }
  }

  const registration = async form => {
    await registerRequest(form)
      .then(data => {
        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
        dispatch(setUser(data.user))
        dispatch(setAuthChecked(true))
      })
      .catch(err => dispatch(catchError(err)))
  }

  const sigIn = async form => {
    await loginRequest(form)
      .then(data => {
        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
        dispatch(setUser(data.user))
        dispatch(setAuthChecked(true))
      })
      .catch(err => dispatch(catchError(err)))
  }

  const signOut = async () => {
    await logoutRequest()
      .then(data => {
        if (data.access) {
          dispatch(removeUser())
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
        }
      })
      .catch(err => dispatch(catchError(err)))
  }

  const editUser = async form => {
    await editUserRequest(form)
      .then(data => {
        dispatch(setUser(data.user))
      })
      .catch(err => dispatch(catchError(err)))
  }

  const resetPassword = async form => {
    await resetPasswordRequest(form)
  }

  return {
    user,
    isAuthChecked,
    errorStatus,
    checkUser,
    registration,
    sigIn,
    signOut,
    editUser,
    resetPassword
  }
}
