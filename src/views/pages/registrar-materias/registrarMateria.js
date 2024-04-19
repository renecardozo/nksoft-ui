import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilText, cilListNumbered, cilSortNumericDown } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { useAppContext } from '../../../hooks'
import { start } from '@popperjs/core'
import { AGREGAR_MATERIA } from '../../../actions'
import { useNavigate } from 'react-router-dom'

const registrarMateria = () => {

  const navigate = useNavigate()
  const [departamento, setDepartamento] = useState('')
  const [codigo, setCodigo] = useState('')
  const [materia, setMateria] = useState('')
  
  
  const {
    state: { materias },
    dispatch,
  } = useAppContext()

  const guardarMateria = () => {
    console.log('guardar Materia')
    var cantDig = codigo.replace(/[^0-9]/g,"").length;
    console.log(departamento)
    if(departamento != '' && codigo != '' && materia != 0){
      if(cantDig == 7){
        console.log(departamento)
      
        const nuevaMateria = {
          id: materias.length + 1, 
          departamento,
          codigo,
          materia,
        }
        dispatch({ type: AGREGAR_MATERIA, payload: nuevaMateria })
        navigate('/administracion/agregar-materia')
  
      }else{
        alert("El codigo es incorrecto");
      }
    }else{
      alert("Llenar todos los campos");
    }

  }

  return (
    <div className="container">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Agregar Materia</h1>
                  <p className="text-body-secondary">Registrar una Materia</p>
                 
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Departamento"
                      autoComplete="departamento"
                      onChange={(e) => setDepartamento(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilListNumbered} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Codigo de Materia"
                      autoComplete="codigo"
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre de Materia"
                      autoComplete="materia"
                      onChange={(e) => setMateria(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={() => guardarMateria()}>
                        Registrar
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default registrarMateria
