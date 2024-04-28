import { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import { APISERVICE } from '../../../../services/api.service'
import RoleTable from './RoleTable'
import { Link } from 'react-router-dom'

export default function Role() {
  const [roles, setRoles] = useState([])

  const getRoles = async () => {
    let url = 'api/roles'
    const response = await APISERVICE.get(url)
    setRoles(response)
  }
  const updateStateRole = async (id) => {
    let url = `api/update/${id}`
    const response = await APISERVICE.delete(url)
    getRoles()
  }
  useEffect(() => {
    getRoles()
  }, [])

  return (
    <CContainer className="px-4">
      <Link to="/configurar/crear-roles" className="btn btn-primary mb-2">
        Agregar
      </Link>
      <RoleTable roles={roles} updateStateRole={updateStateRole} />
    </CContainer>
  )
}
