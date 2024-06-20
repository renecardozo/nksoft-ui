import {
  CButton,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { cilTrash } from '@coreui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { APISERVICE } from '../../../services/api.service'
import CIcon from '@coreui/icons-react'
import { setInterval } from 'core-js'

function Backup() {
  const [backups, setBackups] = useState([])
  const [interval, setIntervalo] = useState('')
  const [toast, addToast] = useState(null)
  const toaster = useRef()

  const getBackups = async () => {
    let url = 'api/backup'
    const response = await APISERVICE.get(url)
    setBackups(response.data)
  }
  const createBackup = async () => {
    let url = 'api/backup'
    const response = await APISERVICE.put(url, '')
    getBackups()
    console.log(response)
  }
  const restoreBackup = async (name) => {
    let body = {
      filename: name,
    }
    let url = 'api/backup'
    const { success, message } = await APISERVICE.post(url, body)
    success && addToast(mesageToast(message))
  }
  const deleteBackup = async (name) => {
    let body = {
      filename: name,
    }
    let url = 'api/backup-delete'
    const response = await APISERVICE.post(url, body)
    getBackups()
    console.log(response)
  }
  const handleChange = (e) => {
    setIntervalo(e.target.value)
  }
  const defineInterval = () => {
    localStorage.setItem('interval', interval)
  }
  let valor = parseInt(localStorage.getItem('interval'))
  let inter = valor ? valor : 604800000
  //  setInterval(createBackup, inter)
  const nameIterval = () => {
    if (inter === 86400000) {
      return 'Diario'
    }
    if (inter === 604800000) {
      return 'Semanal'
    }
    if (inter === 2629785600) {
      return 'Mensual'
    }
  }
  const mesageToast = (message) => (
    <CToast autohide={true} visible={true} color="success">
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
  //console.log(inter)
  useEffect(() => {
    getBackups()
  }, [])
  return (
    <div className="container">
      <CToaster
        ref={toaster}
        push={toast}
        placement="bottom-end"
        style={{ marginBottom: '50px' }}
      />
      <div className="d-flex mb-5">
        <p className="me-5">Establecer tiempo de backups:</p>
        <CFormSelect
          size="mb"
          style={{ width: '20%' }}
          aria-label="Large select example"
          onChange={handleChange}
        >
          <option>{nameIterval()}</option>
          <option value="86400000">Diario</option>
          <option value="604800000">Semanal</option>
          <option value="2629785600 ">Mensual</option>
        </CFormSelect>
        <CButton className="ms-2 me-5" color="info" onClick={() => defineInterval()}>
          Establecer
        </CButton>
        <CButton className="ms-5" color="primary" onClick={() => createBackup()}>
          Generar Backup
        </CButton>
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="col-4" scope="col">
              Nombre
            </CTableHeaderCell>
            <CTableHeaderCell className="col-1" scope="col">
              Acciones
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {backups &&
            backups.map((backup) => (
              <CTableRow key={backup}>
                <CTableHeaderCell scope="row">{backup.split('.')[0]}</CTableHeaderCell>
                <CTableDataCell>
                  <CButton className="me-2" color="primary" onClick={() => restoreBackup(backup)}>
                    Restaurar
                  </CButton>
                  <CButton color="info" onClick={() => deleteBackup(backup)}>
                    {<CIcon style={{ color: 'red' }} icon={cilTrash} />}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem disabled>Previous</CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination>
    </div>
  )
}

export default Backup
