import checkResponse from "./checkResponse";

const fetchDataFromServer = (elements, collback, url) => {
  collback({ ...elements, isLoading: true })
  fetch(url)
    .then(checkResponse)
    .then(json => collback({
      ...elements,
      data: json.data
    }))
    .catch(error => collback({ ...elements, hasError: true }))
}

export default fetchDataFromServer;