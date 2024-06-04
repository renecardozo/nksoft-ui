import axios from 'axios'
import { createBitacora } from '../bitacora.service'

export const getNotificaciones = async () => {
  const response = await axios.get('http://localhost:8000/api/notificaciones')
  return response.data
}

export const guardarNotificaciones = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/notificaciones', data)
    await createBitacora(data, 'Created', 0)
    return response.data
  } catch (error) {
    throw error
  }
}
