import axios from 'axios'

export const getMaterias = async () => {
  const response = await axios.get('http://localhost:8000/api/materias')
  return response.data
}

export const crearMaterias = async (data) => {
  const response = await axios.post('http://localhost:8000/api/materias', data)
  return response.data
}

export const guardarMaterias = async (data) => {
  const response = await axios.post('http://localhost:8000/api/materias2', data)
  return response.data
}
