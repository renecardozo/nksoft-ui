const APIURL = 'http://localhost:8000/'
import { createBitacora } from '../views/pages/bitacora.service'
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
        let err = new Error('HTTP status code: ' + response.status)
        err.response = response
        err.status = response.status
        throw err
      }
      const data = await response.json()
    await createBitacora(body, 'Created', 0)
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
      const data = await response.json()
      await createBitacora(data, 'Updated', 0)
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
      await createBitacora(body, 'Deleted', data.data.id)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
