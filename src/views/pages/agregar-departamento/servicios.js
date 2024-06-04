import axios from 'axios'

// Función para enviar la solicitud de registro de departamento
export const postDepartamento = async (data) => {
  const response = await axios.post('http://localhost:8000/api/departamentos', data)
  return response.data
}

export const getDepartamento = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/departamentos')
    const departamentos = response.data

    // Ordenar los departamentos por nombre en orden alfabético
    const departamentosOrdenados = departamentos.sort((a, b) => {
      return a.nombreDepartamentos.localeCompare(b.nombreDepartamentos)
    })

    return departamentosOrdenados
  } catch (error) {
    console.error('Error al obtener los departamentos:', error)
    throw error
  }
}
