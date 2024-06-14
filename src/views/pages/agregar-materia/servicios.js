import axios from 'axios'

export const getMaterias = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/materias`)
  return response.data
}

export const crearMaterias = async (data) => {
  const response = await axios.post(`${process.env.PATH_API}/api/materias`, data)
  return response.data
}

export const guardarMaterias = async (data) => {
  const response = await axios.post(`${process.env.PATH_API}/api/materias2`, data)
  return response.data
}
