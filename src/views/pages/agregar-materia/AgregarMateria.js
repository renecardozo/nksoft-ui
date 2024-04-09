import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CButton,
} from '@coreui/react'
import { useAppContext } from '../../../hooks'

function Materias() {
  const {
    state: { materias },
  } = useAppContext()
  const nombreMateria = (codigo) => {
    switch (codigo) {
      case 'COD-001':
        return 'Calculo I'
      case 'COD-002':
        return 'Algebra II'
      case 'COD-003':
        return 'Sistemas I'
    }
  }

  const nombreDepartamento = (fecha) => {
    switch (fecha) {
      case 'COD-001':
        return 'Matematicas'
      case 'COD-002':
        return 'Matematicas'
      case 'COD-003':
        return 'Sistemas'
    }
  }
  return (
    <CContainer className="px-4">
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}>
          <div className="d-grid">
            <Link to="/administracion/registrar-materias" className="btn btn-primary">
              Agregar
            </Link>
          </div>
        </CCol>
      </CRow>
      <br></br>
      <CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Departamento</CTableHeaderCell>
              <CTableHeaderCell scope="col">Código</CTableHeaderCell>
              <CTableHeaderCell scope="col">Materia</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {materias.map((materia) => (
              <CTableRow key={materia.id}>
                <CTableHeaderCell scope="row">{materia.id}</CTableHeaderCell>
                <CTableDataCell>{materia.departamento}</CTableDataCell>
                <CTableDataCell>{materia.codigo}</CTableDataCell>
                <CTableDataCell>{materia.materia}</CTableDataCell>
                
     
              </CTableRow>
            ))}
            {}
          </CTableBody>
        </CTable>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Siguiente
              </a>
            </li>
          </ul>
        </nav>
      </CRow>
    </CContainer>
  )
}

export default Materias
