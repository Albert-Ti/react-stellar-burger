const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = response =>
  response.ok ? response.json() : response.json().then(err => Promise.reject(err))

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data?.success) return data.data
      return Promise.reject(data)
    })
}

export const getOrder = async obj => {
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
