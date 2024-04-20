import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard, CCardBody, CCardHeader,
  CCol,  CRow,  CForm,    CFormInput,    CInputGroup,    CInputGroupText,  CTable,  CTableBody,
  CTableCaption,  CTableDataCell,  CTableHead,  CTableHeaderCell,  CTableRow,  CContainer,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClock, cilUser, cilText, cilListNumbered, cilMap, cilBuilding } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { start } from '@popperjs/core'
import { AGREGAR_MATERIA } from '../../../actions'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../hooks'

function Unidades() {
  const {
    state: { unidades },
  } = useAppContext()
 
  return (
    <CContainer className="px-4">
      <CRow>
        <CCol md={10} lg={9} xl={25}>
          <CCard className="mb-4">
            <CCardBody>
              <CForm>
                <h1>Registrar departamento</h1>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilText} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Nombre"
                    autoComplete="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={() => guardarDepartamento()}>
                    Guardar
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ubicacion</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Departamento</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hora de apertura</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hora de cierre</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {unidades.map((unidad) => (
                    <CTableRow key={unidad.id}>
                      <CTableHeaderCell scope="row">{unidad.id}</CTableHeaderCell>
                      <CTableDataCell>{unidad.nombreUnidades}</CTableDataCell>
                      <CTableDataCell>{unidad.ubicacionUnidades}</CTableDataCell>
                      <CTableDataCell>{unidad.departamento}</CTableDataCell>
                      <CTableDataCell>{unidad.horaAperturaUnidades}</CTableDataCell>
                      <CTableDataCell>{unidad.horaCierreUnidades}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CRow>
                <CCol sm={6} md={8}></CCol>
                <CCol xs={6} md={4}>
                  <div className="d-grid">
                    <Link to="/administracion/Departamentos" className="btn btn-primary">
                      Actualizar
                    </Link>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
export default Unidades