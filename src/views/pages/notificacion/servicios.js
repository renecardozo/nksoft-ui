import axios from 'axios'
import { createBitacora } from '../bitacora.service'

export const getNotificaciones = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/notificaciones`)
  return response.data
}

export const guardarNotificaciones = async (data) => {
  try {
    const response = await axios.post(`${process.env.PATH_API}/api/notificaciones`, data)
    await createBitacora(data, 'Created', 0)
    return response.data
  } catch (error) {
    throw error
  }
}
