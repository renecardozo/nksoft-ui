import axios from 'axios';

// Función para enviar la solicitud de registro de departamento

  export const getUnidad = async () => {
    const response = await axios.get('http://localhost:8000/api/unidades')
    return response.data
  }

  export const postUnidad = async (data) => {
    const response = await axios.post('http://localhost:8000/api/unidades', data)
  return response.data
  }