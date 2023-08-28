const BURGER_API_URL = 'https://norma.nomoreparties.space/api'
const checkResponse = response =>
  response.ok ? response.json() : response.json().then(err => Promise.reject(err))

export const getIngredients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.data
      return Promise.reject(data)
    })
}

export const requestOrder = async obj => {
  return await fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const registerRequest = async form => {
  return await fetch(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const loginRequest = async form => {
  return await fetch(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const getUserRequest = async () => {
  return await fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      authorization: localStorage.getItem('access-token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

export const editUserRequest = async form => {
  return await fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      authorization: localStorage.getItem('access-token')
    },
    body: JSON.stringify(form),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

export const forgotPasswordRequest = async form => {
  return await fetch(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const resetPasswordRequest = async form => {
  return await fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const logoutRequest = async () => {
  return await fetch(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

export const refreshToken = async () => {
  return await fetch(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refresh-token') }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    const data = await checkResponse(res)
    if (data?.success) return data
  } catch (error) {
    if (error.messages === 'jwt expired') {
      const refreshData = refreshToken()
      if (!refreshData) return Promise.reject(refreshData)

      localStorage.setItem('access-token', refreshData.accessToken)
      localStorage.setItem('refresh-token', refreshData.refreshToken)
      options.headers.authorization = refreshData.accessToken

      const res = await fetch(url, options)
      const data = await checkResponse(res)
      if (data?.success) return data
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
