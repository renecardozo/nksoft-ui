import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    state: { materia },
  } = useAppContext()
  const [materias, setMaterias] = useState([])

  const navigate = useNavigate()

  const handleVerMaterias = (id) => {
    navigate('/administracion/ver-materia', { state: { id } })
  }

  const findAll = async () => {
    const response = await getMaterias()

    // Procesar los datos para eliminar duplicados y contar el número de grupos
    const materiasProcesadas = response.reduce((acumulador, materia) => {
      const materiaExistente = acumulador.find((m) => m.materia === materia.materia)

      if (materiaExistente) {
        materiaExistente.grupos++
      } else {
        acumulador.push({ ...materia, grupos: 1 })
      }

      return acumulador
    }, [])

    setMaterias(materiasProcesadas)
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
              <CTableHeaderCell scope="col">Materia</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cantidad de grupos</CTableHeaderCell>

              <CTableHeaderCell scope="col">Detalle</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {materias.map((materia) => (
              <CTableRow key={materia.id}>
                <CTableDataCell>{materia.materia}</CTableDataCell>
                <CTableDataCell>{materia.grupos}</CTableDataCell>

                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleVerMaterias(materia.materia)}>
                    Ver Materia
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
            {}
          </CTableBody>
        </CTable>
      </CRow>
    </CContainer>
  )
}

export default Materias
