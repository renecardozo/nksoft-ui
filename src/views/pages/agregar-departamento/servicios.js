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

export const createBitacora = (data) => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const toSave = {
    timestamp: new Date().toISOString(),
    username: `${userData.name} ${userData.last_name}`,
    email: userData.email,
    role: userData.role.name,
    id_resource: 0,
    name_resource: `Nuevo Departamento : ${data.nombreDepartamentos}`,
    actions: 'Created',
  }
  return axios.post('http://localhost:8000/api/bitacora', toSave)
}
