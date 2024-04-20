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

function Unidades() {
  const {
    state: { unidades },
  } = useAppContext()

  const nombreUnidades = (codigo) => {
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
      
      <br></br>
      <CRow>
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
            
          ))

            }
            {}
          </CTableBody>
          
        </CTable>

        <CRow >
         <CCol sm={6} md={8}></CCol>
           <CCol xs={6} md={4}>
             <div className="d-grid">
           <Link to="/administracion/registrar-unidad" className="btn btn-primary">
              Agregar unidades
           </Link>
             </div>
           </CCol>
          
       </CRow>

      </CRow>

    </CContainer>


  )

}

export default Unidades
