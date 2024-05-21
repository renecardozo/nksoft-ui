import axios from 'axios'
export const getAllAulas = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/aulas/mostrar')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllUnidades = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/unidades')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAulasByUnidad = async (unidadId = 100) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/aulas/mostrarId/${unidadId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPeriodos = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/periodos')
    return response.data
  } catch (error) {
    console.error('Error al obtener los periodos:', error)
    throw error
  }
}

export const checkAvailability = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/disponibilidad_aulas', data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
