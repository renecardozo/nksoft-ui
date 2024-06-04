export const createBitacora = async (data, action, id_resource) => {
  const userData = JSON.parse(localStorage.getItem('user_data'))

  const toSave = {
    timestamp: new Date().toISOString(),
    username: `${userData.name} ${userData.last_name}`,
    email: userData.email,
    role: userData.role.name,
    id_resource: id_resource,
    name_resource: JSON.stringify(data),
    actions: action,
  }
  await axios.post('http://localhost:8000/api/bitacora', toSave)
}
