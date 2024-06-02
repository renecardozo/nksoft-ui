import axios from 'axios'
const APIURL = 'http://localhost:8000/'

export const createBitacora = (data, action, id_resource) => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const toSave = {
    timestamp: new Date().toISOString(),
    username: `${userData.name} ${userData.last_name}`,
    email: userData.email,
    role: userData.role.name,
    id_resource: id_resource,
    name_resource: `${data}`,
    actions: action,
  }
  return axios.post('http://localhost:8000/api/bitacora', toSave)
}

export const APISERVICE = {
  get: async (url) => {
    try {
      const response = await fetch(`${APIURL + url}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  post: async (url, body) => {
    try {
      const response = await fetch(`${APIURL + url}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        // throw new Error(response)
        let err = new Error('HTTP status code: ' + response.status)
        err.response = response
        err.status = response.status
        throw err
      }
      const data = await response.json()
      await createBitacora(JSON.stringify(body), 'Created', 0)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  put: async (url, body) => {
    try {
      const response = await fetch(`${APIURL + url}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error(await response.json())
      }
      await createBitacora(JSON.stringify(body), 'Updated', body.id)
      const data = await response.json()
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  delete: async (url) => {
    try {
      const response = await fetch(`${APIURL + url}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      await createBitacora(JSON.stringify(body), 'Deleted', body.id)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
