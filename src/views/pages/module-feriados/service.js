import axios from 'axios'

export const getFeriados = async () => {
  const response = await axios.get('http://localhost:8000/api/v1/event')
  return response.data
}

export const crearFeriados = async (data) => {
  const response = await axios.post('http://localhost:8000/api/v1/event', data)
  return response.data
}
