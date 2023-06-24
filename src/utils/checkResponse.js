const checkResponse = response => response.ok
  ? response.json()
  : Promise.reject(`Ошибка: ${response.status}`)

export default checkResponse;