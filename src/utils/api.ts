import {
  TFormUser,
  TIngredient,
  TOptionsResponse,
  TOrder,
  TOrderCreationResponse,
  TSuccessResponse,
  TToken,
  TUserSuccessResponse
} from '../types'
import { BASE_URL, options } from './constants'

const request = async <T>(endpoint: string, options?: TOptionsResponse): Promise<T> => {
  // prettier-ignore
  return await fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => res.ok
      ? res.json()
      : res.json().then(err => Promise.reject(err))
    )
    .then(json => json.success
      ? json 
      : Promise.reject(json))
}

export const ingredientsRequest = () =>
  request<TSuccessResponse & { data: TIngredient[] }>('ingredients')

export const orderRequest = (obj: { ingredients: string[] }) =>
  request<TOrderCreationResponse>('orders', {
    ...options,
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    },
    body: JSON.stringify(obj)
  })

export const getOrderRequest = (number: string) =>
  request<TSuccessResponse & { orders: TOrder[] }>(`orders/${number}`)

export const loginRequest = (form: TFormUser) =>
  request<TUserSuccessResponse & TToken>('auth/login', {
    ...options,
    body: JSON.stringify(form)
  })

export const registerRequest = (form: TFormUser) =>
  request<TUserSuccessResponse & TToken>('auth/register', {
    ...options,
    body: JSON.stringify(form)
  })

export const forgotPasswordRequest = (form: TFormUser) =>
  request<TSuccessResponse>('password-reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const resetPasswordRequest = (form: TFormUser) =>
  request<TSuccessResponse>('password-reset/reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const logoutRequest = () =>
  request<TSuccessResponse>('auth/logout', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

export const userRequest = () => {
  return fetchWithRefresh<TUserSuccessResponse>(`auth/user`, {
    ...options,
    method: 'GET',
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    }
  })
}

export const editUserRequest = (form: TFormUser) => {
  return fetchWithRefresh<TUserSuccessResponse>(`auth/user`, {
    ...options,
    method: 'PATCH',
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    },
    body: JSON.stringify(form)
  })
}

export const refreshToken = () =>
  request<TToken>('auth/token', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

const fetchWithRefresh = async <T>(url: string, options: TOptionsResponse) => {
  try {
    return await request<T>(url, options)
  } catch (error: any) {
    if (error.messages === 'jwt expired') {
      const refreshData = await refreshToken()
      if (!refreshData) return Promise.reject(refreshData)

      localStorage.setItem('access-token', refreshData.accessToken)
      localStorage.setItem('refresh-token', refreshData.refreshToken)
      options.headers.authorization = refreshData.accessToken

      return request<T>(url, options)
    } else {
      return Promise.reject(error)
    }
  }
}

/* --------------альтернативный способ через then для функции обновления токена-----------------

return await request<T>(url, options).catch(async err => {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()

      if (!refreshData) return Promise.reject(refreshData)

      localStorage.setItem('access-token', refreshData.accessToken)
      localStorage.setItem('refresh-token', refreshData.refreshToken)

      return request<T>(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken
        }
      })
    }
    return Promise.reject(err)
  })
*/
