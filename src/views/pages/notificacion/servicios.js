import axios from 'axios'

export const getNotificaciones = async () => {
  const response = await axios.get('http://localhost:8000/api/notificaciones')
  return response.data
}


export const guardarNotificaciones = async (data) => {
  const response = await axios.post('http://localhost:8000/api/notificaciones', data)
  return response.data
}