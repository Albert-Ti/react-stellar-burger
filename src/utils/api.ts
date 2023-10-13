import {
  TFormUser,
  TIngredient,
  TOptionsResponse,
  TOrder,
  TOrderCreationProperty,
  TOrderCreationResponse,
  TSuccessResponse,
  TToken,
  TUserSuccessResponse
} from '../types'
import { BASE_URL, options } from './constants'

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json()
  }
  return await res.json().then((err: string) => Promise.reject(err))
}

const checkSuccess = (res: any) => {
  if (res && res.success) return res
  return Promise.reject(res)
}

const request = async (endpoint: string, options?: TOptionsResponse) => {
  return await fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess)
}

export const ingredientsRequest = (): Promise<{ success: boolean; data: TIngredient[] }> =>
  request('ingredients')

export const orderRequest = (obj: TOrderCreationProperty): Promise<TOrderCreationResponse> =>
  request('orders', {
    ...options,
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    },
    body: JSON.stringify(obj)
  })

export const getOrderRequest = (number: string): Promise<{ success: boolean; orders: TOrder[] }> =>
  request(`orders/${number}`)

export const loginRequest = (form: TFormUser): Promise<TUserSuccessResponse & TToken> =>
  request('auth/login', {
    ...options,
    body: JSON.stringify(form)
  })

export const registerRequest = (form: TFormUser): Promise<TUserSuccessResponse & TToken> =>
  request('auth/register', {
    ...options,
    body: JSON.stringify(form)
  })

export const forgotPasswordRequest = (form: TFormUser): Promise<TSuccessResponse> =>
  request('password-reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const resetPasswordRequest = (form: TFormUser): Promise<TSuccessResponse> =>
  request('password-reset/reset', {
    ...options,
    body: JSON.stringify(form)
  })

export const logoutRequest = (): Promise<TSuccessResponse> =>
  request('auth/logout', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

export const refreshToken = (): Promise<TToken> =>
  request('auth/token', {
    ...options,
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') })
  })

export const userRequest = async (): Promise<TUserSuccessResponse> => {
  return await fetchWithRefresh(`auth/user`, {
    ...options,
    method: 'GET',
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    }
  })
}

export const editUserRequest = async (form: TFormUser): Promise<TUserSuccessResponse> => {
  return await fetchWithRefresh(`auth/user`, {
    ...options,
    method: 'PATCH',
    headers: {
      ...options.headers,
      authorization: localStorage.getItem('access-token')!
    },
    body: JSON.stringify(form)
  })
}

const fetchWithRefresh = async (
  url: string,
  options: TOptionsResponse
): Promise<TUserSuccessResponse> => {
  try {
    return await request(url, options)
  } catch (error: any) {
    if (error.messages === 'jwt expired') {
      const refreshData = await refreshToken()

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
