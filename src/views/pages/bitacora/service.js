import axios from 'axios'

export const getAllBitacoras = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/bitacora', {
      headers: {
        Accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener los roles:', error)
    throw error
  }
}
