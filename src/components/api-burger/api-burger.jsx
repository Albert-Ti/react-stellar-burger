export default function requestData(callBack, arrayItems, config) {

  callBack({ ...arrayItems, isLoading: true });
  fetch(config.url)
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`))
    .then(json => callBack({
      ...arrayItems,
      items: json.data
    }))
    .catch(error => callBack({ ...arrayItems, hasError: true }));
}
