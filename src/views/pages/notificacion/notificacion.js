import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

function Notificacion() {
  const navigate = useNavigate()
    /** 
  const {
    state: { materia },
  } = useAppContext()
  const [materias, setMaterias] = useState([])

  const navigate = useNavigate();
  
  const handleVerMaterias = (id) => {
   navigate('/administracion/ver-materia', { state: { id } });
  };


  const findAll = async () => {
    const response = await getMaterias();

    // Procesar los datos para eliminar duplicados y contar el número de grupos
    const materiasProcesadas = response.reduce((acumulador, materia) => {
      const materiaExistente = acumulador.find(m => m.materia === materia.materia);

      if (materiaExistente) {
        materiaExistente.grupos++;
      } else {
        acumulador.push({ ...materia, grupos: 1 });
      }

      return acumulador;
    }, []);

    setMaterias(materiasProcesadas);
  };

  useEffect(() => {
    findAll()
  }, [])*/

  return (
    <CContainer className="px-4">
     <CRow>
     <CCol>
          <h1 style={{ fontSize: '1.7rem' }}>Lista de Notificaciones</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}>
        </CCol>
      </CRow>
      <br></br>
      <CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Solicitud</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>
            {/*materias.map((materia) => (
              <CTableRow key={materia.id}>
     
                <CTableDataCell>{materia.materia}</CTableDataCell>
                <CTableDataCell>{materia.grupos}</CTableDataCell>

                <CTableDataCell><CButton color="primary" onClick={() => handleVerMaterias(materia.materia)}>Ver Materia</CButton></CTableDataCell>
              </CTableRow>
            ))}
        {}*/}
            <CTableDataCell>Solicitud para el aula 624</CTableDataCell>
            <CTableDataCell> <CButton onClick={() => navigate('/docente/detallesNotificacion')} color="primary">Ver Detalles</CButton></CTableDataCell>

          {/*
            <CTableDataCell><CButton color="primary" onClick={() => handleVerMaterias()}>Ver detalles</CButton></CTableDataCell>

            {/*<CTableDataCell><CButton color="primary" onClick={() => handleVerMaterias(materia.materia)}>Ver Materia</CButton></CTableDataCell>*/}

          </CTableBody>
        </CTable>

      </CRow>
    </CContainer>
  )
}

export default Notificacion