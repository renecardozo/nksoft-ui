import React, { useState, useEffect }  from 'react'
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
import { getMaterias } from '../agregar-materia/servicios'


function Materias() {
  const {
    state: { materia}
  } = useAppContext()
  const[materias, setMaterias] = useState([])
  const findAll = async () => {
    const response = await getMaterias()
    console.log(response)
    setMaterias(response)
  }

  useEffect(() => {
    findAll()
  }, [])

 
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

              <CTableHeaderCell scope="col">Código</CTableHeaderCell>
              <CTableHeaderCell scope="col">Materia</CTableHeaderCell>
              <CTableHeaderCell scope="col">Grupo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Departamento</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {materias.map((materia) => (
              <CTableRow key={materia.id}>
                
                <CTableHeaderCell scope="row">{materia.id}</CTableHeaderCell>
                <CTableDataCell>{materia.codigo}</CTableDataCell>
                <CTableDataCell>{materia.materia}</CTableDataCell>
                <CTableDataCell>{materia.grupo}</CTableDataCell>
                <CTableDataCell>{materia.departamento}</CTableDataCell>
                
     
              </CTableRow>
            ))}
            {}
          </CTableBody>
        </CTable>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                Anterior
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
