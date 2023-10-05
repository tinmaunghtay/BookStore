const api = "http://localhost:3001"

const headers = {
    'Content-Type': 'application/vnd.api+json; ext="https://jsonapi.org/ext/version"'
  }

export const getAllStores = async () =>
fetch(`${api}/stores`, { headers })
    .then((res) => res.json())
    .then((json) => {
        let result = json;
        return result;
    })

export const getAllBooks = async () =>
await fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(json => JSON.stringify(json))

export const getAllCountries = async () =>
await fetch(`${api}/countries`, { headers })
    .then(res => res.json())
    .then(json => JSON.stringify(json))

export const getAllAuthors = async () =>
await fetch(`${api}/authors`, { headers })
        .then(res => res.json())
        .then(json => JSON.stringify(json))






