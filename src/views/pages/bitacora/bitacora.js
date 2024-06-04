import React, { useEffect, useState } from 'react'
import { getAllBitacoras } from './service'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Bitacora() {
  const [data, setData] = useState([])
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUsuario, setSelectedUsuario] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedFecha, setSelectedFecha] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllBitacoras()
        console.log('Bitacoras obtenidos:', data) // Imprimir los roles en la consola
        setRoles(
          Array.isArray(data)
            ? removeDuplicates(
                'role',
                data.map((d) => ({ role: d.role, id: d.id })),
              )
            : [],
        )
        setUsers(
          Array.isArray(data)
            ? removeDuplicates(
                'username',
                data.map((d) => ({ username: d.username, id: d.id })),
              )
            : [],
        )
        setData(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error al obtener los roles:', error)
        setRoles([])
      }
    }

    getData()
  }, [])

  const removeDuplicates = (prop, arr) => {
    const map = new Map()
    arr.forEach((item) => {
      if (!map.has(item[prop])) {
        map.set(item[prop], item)
      }
    })
    return Array.from(map.values())
  }

  const handleUsuarioChange = (e) => {
    setSelectedUsuario(e.target.value)
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  const handleFechaChange = (date) => {
    setSelectedFecha(date)
  }

  const formatDate = (date) => {
    const newDate = new Date()
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`
  }

  return (
    <div className="container">
      <CCard>
        <CCardHeader>
          <h4>Bitácora</h4>
        </CCardHeader>
        <CCardBody>
          <div className="row align-items-center">
            <div className="col-md-4 mb-3">
              <CFormSelect value={selectedUsuario} onChange={handleUsuarioChange}>
                <option value="">Usuario</option>
                {users.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.username}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-4 mb-3">
              <CFormSelect value={selectedRole} onChange={handleRoleChange}>
                <option value="">Role</option>
                {roles.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.role}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-4 mb-3">
              <DatePicker
                className="form-control"
                selected={selectedFecha}
                onChange={handleFechaChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Fecha"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="table-responsive">
            <CTable bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Usuario</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Id Resource</CTableHeaderCell>
                  <CTableHeaderCell>Resource</CTableHeaderCell>
                  <CTableHeaderCell>Accion</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((log, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{formatDate(log.timestamp)}</CTableDataCell>
                    <CTableDataCell>{log.username}</CTableDataCell>
                    <CTableDataCell>{log.email}</CTableDataCell>
                    <CTableDataCell>{log.role}</CTableDataCell>
                    <CTableDataCell>{log.id_resource}</CTableDataCell>
                    <CTableDataCell>{log.name_resource}</CTableDataCell>
                    <CTableDataCell>{log.actions}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Bitacora
