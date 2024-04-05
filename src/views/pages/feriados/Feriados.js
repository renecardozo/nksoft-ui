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

function Feriados() {
  const {
    state: { feriados },
  } = useAppContext()
  const describirFeriado = (codigo) => {
    switch (codigo) {
      case 'COD-001':
        return 'Navidad'
      case 'COD-002':
        return 'Halloween'
      case 'COD-003':
        return 'San Valentin'
    }
  }
  return (
    <CContainer className="px-4">
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}>
          <div className="d-grid">
            <Link to="/administracion/crear-feriados" className="btn btn-primary">
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
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
              <CTableHeaderCell scope="col">Feriado</CTableHeaderCell>
              <CTableHeaderCell scope="col">Descripcion</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {feriados.map((feriado) => (
              <CTableRow key={feriado.id}>
                <CTableHeaderCell scope="row">{feriado.id}</CTableHeaderCell>
                <CTableDataCell>{feriado.fecha}</CTableDataCell>
                <CTableDataCell>{describirFeriado(feriado.codigo)}</CTableDataCell>
                <CTableDataCell>{feriado.description}</CTableDataCell>
              </CTableRow>
            ))}
            {/* <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Jacob</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@fat</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">3</CTableHeaderCell>
              <CTableDataCell>Larry the Bird</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@twitter</CTableDataCell>
            </CTableRow> */}
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
                Next
              </a>
            </li>
          </ul>
        </nav>
      </CRow>
    </CContainer>
  )
}

export default Feriados
