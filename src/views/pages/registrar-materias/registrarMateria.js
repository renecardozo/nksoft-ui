import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CFormFeedback, 
  CInputGroupText,
  CRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilText, cilListNumbered, cilSortNumericDown } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { useAppContext } from '../../../hooks'
import { start } from '@popperjs/core'
import { AGREGAR_MATERIA } from '../../../actions'
import { useNavigate } from 'react-router-dom'
import { crearMaterias } from '../agregar-materia/servicios'
import { getMaterias } from '../agregar-materia/servicios'




/** 
function leerMaterias (mat) {
  console.log("entro")
  var respuesta = false
  const resultados = async () => {
    const response = await getMaterias()
    console.log("aqui")
    for(var i=0;i<response.length;i++){
      console.log(response[i].materia)
      if(mat==response[i].materia){
        imprimir()
      }
    }
  }

  
  
  resultados()

}*/



const registrarMateria = () => {
  const navigate = useNavigate()
  const [departamento, setDepartamento] = useState('')
  const [codigo, setCodigo] = useState('')
  const [grupo, setGrupo] = useState('')
  const [materia, setMateria] = useState('')
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [bien, setBien] = useState(false);

  const {
    state: { materias },
    dispatch,
  } = useAppContext()

  const guardarMateria = async (e) => {

    e.preventDefault()

    var cantDig = codigo.replace(/[^0-9]/g,"").length;
    if(departamento != '' && codigo != '' && materia != 0 && grupo !=''){


      if(cantDig == 7){  

        
        const nuevaMateria = {
          codigo,
          materia,
          grupo,
          departamento,
        }
        await crearMaterias(nuevaMateria)
        setError(false);
        setError2(false);
        setBien(true);
        setTimeout(() => {
          navigate('/administracion/agregar-materia')
        }, 1500);
       
  


      }else{
        setError(false);
        setError2(true);
      }
    }else{
      setError2(false);
      setError(true);
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

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Grupo"
                      autoComplete="grupo"
                      onChange={(e) => setGrupo(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormSelect onChange={(e) => setDepartamento(e.target.value)}>
                      <option value="">Seleccione un departamento</option>
                      <option value="Industrias">Departamento de Industrias</option>
                      <option value="Química">Departamento de Química</option>
                      <option value="Física">Departamento de Física</option>
                      <option value="Matemítica">Departamento de Matemática</option>
                      <option value="Informática-Sistemas">
                        Departamento de Informática-Sistemas
                      </option>
                      <option value="Civil">Departamento de Civil</option>
                      <option value="Eléctrica-Electrónica">Departamento de Eléctrica-Electrónica</option>
                      <option value="Mecánica">Departamento de Mecánica</option>
                       {}
                      </CFormSelect>
                      </CInputGroup>

                     
                    {error && (
                      <CFormFeedback className="d-block text-center font-weight-extrabold" style={{ color: 'red', backgroundColor: '#FFC4C4', padding: '5px', borderRadius: '5px', marginBottom: '15px', border: '1px solid red'}}>
                        Llenar todos los campos
                      </CFormFeedback>
                    )}

                    {error2 && (
                      <CFormFeedback className="d-block text-center font-weight-extrabold" style={{ color: 'red', backgroundColor: '#FFC4C4', padding: '5px', borderRadius: '5px', marginBottom: '15px', border: '1px solid red'}}>
                        El código es incorrecto
                      </CFormFeedback>
                    )}

                    {bien && (
                      <CFormFeedback className="d-block text-center font-weight-extrabold" style={{ color: 'green', backgroundColor: '#C3FDE1', padding: '5px', borderRadius: '5px', marginBottom: '15px', border: '1px solid green'}}>
                        Materia registrada con éxito
                      </CFormFeedback>
                    )}
              
                    

                  <div className="d-grid">
                    <CButton color="primary" onClick={(e) => guardarMateria(e)}>
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
