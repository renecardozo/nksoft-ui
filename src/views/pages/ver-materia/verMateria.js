import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMaterias } from '../agregar-materia/servicios'

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


function DetallesMateria() {
    const location = useLocation();
    const id = location.state?.id;
    const navigate = useNavigate();

     console.log(id)

   /** 
      const [materia, setMateria] = useState([])
    
      /** 
      const findAll = async () => {
        const response = await getMaterias()
        setMaterias(response)
      }
    
      useEffect(() => {
        findAll()
      }, [])*/

     const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMaterias();
        const materiasEncontradas = response.filter(materia => materia.materia === id);
        setMaterias(materiasEncontradas);
      } catch (error) {
        console.error('Error al cargar los detalles de la materia:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <CContainer className="px-4">
      <CRow>
        <CCol>
        <h1 style={{ fontSize: '1.7rem' }}>MATERIA: {id}</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Grupo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Docente</CTableHeaderCell>
                <CTableHeaderCell scope="col">Departamento</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {materias.map(materia => (
                <CTableRow key={materia.id}>
                  <CTableDataCell>{materia.grupo}</CTableDataCell>
                  <CTableDataCell>{materia.docente}</CTableDataCell>
                  <CTableDataCell>{materia.departamento}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton onClick={() => navigate('/administracion/agregar-materia')} color="primary">Volver</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );

}

export default DetallesMateria;