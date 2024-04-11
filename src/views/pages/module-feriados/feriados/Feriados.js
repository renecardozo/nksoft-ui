import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from '@coreui/react'
import { useAppContext } from '../../../../hooks'
import { getFeriados } from '../service'

function Feriados() {
  // const { state } = useAppContext()
  // console.log(state)
  const [feriados, setFeriados] = useState([])
  const describirFeriado = (codigo) => {
    switch (codigo) {
      case 'COD_001':
        return 'Nacional'
      case 'COD_002':
        return 'Halloween'
      case 'COD_003':
        return 'San Valentin'
    }
  }
  const findAll = async () => {
    const response = await getFeriados()
    console.log(response)
    setFeriados(response)
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
                <CTableDataCell>{feriado.descripcion}</CTableDataCell>
              </CTableRow>
            ))}
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
