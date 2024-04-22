import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard, CCardBody, CCardHeader,
  CCol,  CRow,  CForm,    CFormInput,    CInputGroup,    CInputGroupText,  CTable,  CTableBody,
  CTableCaption,  CTableDataCell,  CTableHead,  CTableHeaderCell,  CTableRow,  CContainer,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClock, cilUser, cilText, cilListNumbered } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { start } from '@popperjs/core'
import { postDepartamento } from '../agregar-departamento/servicios' 
import { getDepartamento } from '../agregar-departamento/servicios'
import { useAppContext } from '../../../hooks'
import { useNavigate } from 'react-router-dom'


function Departamentos(){
  const {
    state: { departamento },
    dispatch,
  } = useAppContext()
  const [departamentos, setDepartamentos] = useState([])
  const [nombreDepartamentos, setNombreDepartamentos] = useState('')
  const navigate = useNavigate();
  
  const findAll = async () => {
    const response = await getDepartamento()
    console.log(response)
    setDepartamentos(response)
  }

  useEffect(() => {
    findAll()
  }, [])

  const guardarDepartamento = async (e) => {
    e.preventDefault()
    
    const departamentoExistente = departamentos.find(dep => dep.nombreDepartamentos === nombreDepartamentos);
  
    if (departamentoExistente) {
      alert('El departamento ya existe.');
      return;
    }

    if (nombreDepartamentos !== '' ) {
        const nuevoDepartamento = {
          nombreDepartamentos
        }
        await postDepartamento(nuevoDepartamento)
        setNombreDepartamentos('');
        findAll();      
    } else {
      alert('Llenar todos los campos')
    }
  }

  const handleActualizar = () => {
    findAll();
  };

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
                    value={nombreDepartamentos}
                    onChange={(e) => setNombreDepartamentos(e.target.value)}
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={(e) => guardarDepartamento(e)}>
                  
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
      <CRow>
          <CCol sm={6} md={8}></CCol>
          <CCol xs={6} md={4}>
            <div className="d-grid">
            <button className="btn btn-primary" onClick={handleActualizar}>
                Actualizar
                </button>
            </div>
          </CCol>
        </CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {departamentos.map((departamento, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{departamento.nombreDepartamentos}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
       
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
    </CContainer>
  )
}
export default Departamentos