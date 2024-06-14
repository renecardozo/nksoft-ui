import axios from 'axios'

export const getEventConfig = async () => {
  const response = await axios.get('http://localhost:8000/api/events-config')
  return response.data
}

export const getEvents = async () => {
  const response = await axios.get('http://localhost:8000/api/v1/event')
  return response.data
}
