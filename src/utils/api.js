import { BASE_URL, options } from './constants'

const checkResponse = res => {
  if (res.ok) {
    return res.json()
  }
  return res.json().then(err => Promise.reject(err))
}

const checkSuccess = res => {
  if (res && res.success) return res
  return Promise.reject(res)
}

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess)
}

export const ingredientsRequest = () => request('ingredients')

export const orderRequest = obj =>
  request('orders', {
    ...options,
    body: JSON.stringify(obj)
  })

export const loginRequest = form =>
  request('auth/login', {
    ...options,
    body: JSON.stringify(form)
  })

export const registerRequest = form =>
  request('auth/register', {
    ...options,
    body: JSON.stringify(form)
  })

export const forgotPasswordRequest = form =>
  request('password-reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const resetPasswordRequest = form =>
  request('password-reset/reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const logoutRequest = () =>
  request('auth/logout', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

export const refreshToken = () =>
  request('auth/token', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

export const userRequest = async () => {
  return await fetchWithRefresh(`auth/user`, {
    ...options,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: localStorage.getItem('access-token')
    }
  })
}

export const editUserRequest = async form => {
  return await fetchWithRefresh(`auth/user`, {
    ...options,
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      authorization: localStorage.getItem('access-token')
    },
    body: JSON.stringify(form)
  })
}

const fetchWithRefresh = async (url, options) => {
  try {
    return request(url, options)
  } catch (error) {
    if (error.messages === 'jwt expired') {
      const refreshData = refreshToken()
      if (!refreshData) return Promise.reject(refreshData)
      localStorage.setItem('access-token', refreshData.accessToken)
      localStorage.setItem('refresh-token', refreshData.refreshToken)
      options.headers.authorization = refreshData.accessToken
      return request(url, options)
    } else {
      return Promise.reject(error)
    }
  }
}

/* 
POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
*/
