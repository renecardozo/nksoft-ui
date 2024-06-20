const APIURL = `${process.env.PATH_API}/`
import { createBitacora } from "../views/pages/bitacora.service"
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
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) {
        throw data
      }
      let newBody = JSON.stringify(body).substring(0, 100)
      await createBitacora(newBody, "Created", 0)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  put: async (url, body) => {
    try {
      const response = await fetch(`${APIURL + url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) {
        throw data
      }
      let id_updated = 0
      if (body.id) id_updated = body.id
      if (data.id) id_updated = data.id
      if (data.data && data.data.id) id_updated = data.data.id
      let newData = JSON.stringify(body).substring(0, 100)
      await createBitacora(newData, "Updated", id_updated)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  delete: async (url) => {
    try {
      const response = await fetch(`${APIURL + url}`, {
        method: "DELETE",
      })
      const data = await response.json()
      const split_info = url.split("/")
      let id_deleted = 0
      if (split_info && !isNaN(Number(split_info[split_info.length - 1])))
        id_deleted = split_info[split_info.length - 1]
      await createBitacora(url, "Deleted", id_deleted)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
