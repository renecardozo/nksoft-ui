import axios from 'axios'

export const getEventConfig = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/events-config`)
  return response.data
}

export const getEvents = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/v1/event`)
  return response.data
}
