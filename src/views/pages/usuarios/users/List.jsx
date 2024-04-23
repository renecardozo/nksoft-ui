import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import GenericTable from './../../../../components/sections/GenericTable.jsx'
import { APISERVICE } from '../../../../services/api.service'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function ListUser() {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const headers = [
    {
      id: 1,
      title: 'ID',
      key: 'id',
    },
    {
      id: 2,
      title: 'Nombre',
      key: 'name',
    },
    {
      id: 3,
      title: 'Apellido',
      key: 'last_name',
    },
    {
      id: 4,
      title: 'Email',
      key: 'email',
    },
    {
      id: 5,
      title: 'Cedula de Identidad',
      key: 'ci',
    },
    {
      id: 6,
      title: 'Codigo Sis',
      key: 'code_sis',
    },
    {
      id: 7,
      title: 'Rol',
      key: 'role_id',
      field: (row) => {
        return row.role.name
      },
    },
    {
      id: 8,
      title: 'Telefono',
      key: 'phone',
    },
    {
      id: 9,
      title: 'Acciones',
      key: 'actions',
    },
  ]
  const getUsers = async () => {
    let url = 'api/users'
    const response = await APISERVICE.get(url)
    setUsers(response)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const updateUser = async (item) => {
    navigate(`/users/${item.id}/edit`)
  }
  const removeUser = async () => {
    await APISERVICE.delete(`api/users/${user.id}`)
    getUsers()
    setVisible(false)
    //navigate(`/users/${item.id}/edit`)
  }
  const openModalDelete = async (item) => {
    setUser(item)
    setVisible(true)
  }

  return (
    <CRow>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Eliminar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>Esta seguro de eliminar este usuario </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={() => removeUser()}>
            Si
          </CButton>
        </CModalFooter>
      </CModal>
      <CCol xs={12}>
        <CCard className="mb-4 max-height400">
          <CCardHeader>
            <strong>Lista de Usuarios</strong>
          </CCardHeader>
          <CCardBody className="overflow-auto p-3">
            <Link to="/users/create" className="btn btn-primary mb-2">
              Crear Usuario
            </Link>
            <GenericTable
              headers={headers}
              list={users}
              onEdit={(row) => updateUser(row)}
              onDelete={(row) => openModalDelete(row)}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
