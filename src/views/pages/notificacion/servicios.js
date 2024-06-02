import axios from 'axios'

export const getNotificaciones = async () => {
  const response = await axios.get('http://localhost:8000/api/notificaciones')
  return response.data
}

export const guardarNotificaciones = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/notificaciones', data)
    await createBitacora(JSON.stringify(data), 'Created', 0)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createBitacora = (data, action, id_resource) => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const toSave = {
    timestamp: new Date().toISOString(),
    username: `${userData.name} ${userData.last_name}`,
    email: userData.email,
    role: userData.role.name,
    id_resource: id_resource,
    name_resource: `${data}`,
    actions: action,
  }
  return axios.post('http://localhost:8000/api/bitacora', toSave)
}
