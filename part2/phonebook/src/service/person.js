import axios from 'axios'

// const url = 'https://falling-sound-4340.fly.dev/api/persons'
const url = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(url, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const service = { getAll, create, update, remove }

export default service