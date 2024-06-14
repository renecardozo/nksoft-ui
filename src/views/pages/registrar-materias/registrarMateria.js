import React, { useState, useEffect } from 'react'
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
import {
  cilLockLocked,
  cilUser,
  cilText,
  cilBuilding,
  cilListNumbered,
  cilSortNumericDown,
} from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { useAppContext } from '../../../hooks'
import { start } from '@popperjs/core'
import { AGREGAR_MATERIA } from '../../../actions'
import { useNavigate } from 'react-router-dom'
import { crearMaterias, getMaterias, guardarMaterias } from '../agregar-materia/servicios'
import { createBitacora } from '../bitacora.service'
const registrarMateria = () => {
  const navigate = useNavigate()

  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null)
  const [departamentos, setDepartamentos] = useState([])

  const [codigo, setCodigo] = useState('')
  const [grupo, setGrupo] = useState('')
  //const [docente, setDocente] = useState('')
  const [materia, setMateria] = useState('')
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)
  const [bien, setBien] = useState(false)

  const {
    state: { materias },
    dispatch,
  } = useAppContext()

  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        const response = await fetch(`${process.env.PATH_API}/api/departamentos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const data = await response.json()
          setDepartamentos(data)
        } else {
          console.error('Error al obtener departamentos')
        }
      } catch (error) {
        console.error('Error de red:', error)
      }
    }
    obtenerDepartamentos()
  }, [])

  const guardarMateria = async (e) => {
    e.preventDefault()

    var hayMateria = false

    try {
      const respuesta = await fetch(`${process.env.PATH_API}/api/materiasDuplicado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materia: materia,
          grupo: grupo,
        }),
      })

      if (!respuesta.ok) {
        throw new Error('Error en la solicitud.')
      }

      const data = await respuesta.json()
      await createBitacora(
        {
          materia: materia,
          grupo: grupo,
        },
        'Created',
        0,
      )
      if (data.duplicados) {
        hayMateria = true
      } else {
        hayMateria = false
      }
    } catch (error) {
      console.error('Error al verificar duplicados:', error)
    }
    
    var id_materia
    var cantDig = codigo.replace(/[^0-9]/g,"").length;
    //if(codigo != '' && materia != 0 && grupo !='' && docente != '' &&  departamentoSeleccionado && departamentoSeleccionado.id){
    //if(codigo != '' && materia != 0 && grupo !='' &&  departamentoSeleccionado && departamentoSeleccionado.id){
      if(codigo != '' && materia != 0 &&  departamentoSeleccionado && departamentoSeleccionado.id){
      id_materia = codigo
      if (cantDig == 7) {
        const nuevaMateria = {
          id_materia,
          codigo,
          materia,
          //grupo,
          //docente,
          departamento: departamentoSeleccionado.nombreDepartamentos,
        }
        if (!hayMateria) {
          await guardarMaterias(nuevaMateria)
          setError(false)
          setError2(false)
          setError3(false)
          setBien(true)

          setTimeout(() => {
            navigate('/administracion/agregar-materia')
          }, 1500)
        } else {
          setError(false)
          setError2(false)
          setError3(true)
        }
      } else {
        setError(false)
        setError3(false)
        setError2(true)
      }
    } else {
      setError2(false)
      setError3(false)
      setError(true)
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

                  {/*<CInputGroup className="mb-3">
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
                    <CFormInput
                      placeholder="Docente"
                      autoComplete="docente"
                      onChange={(e) => setDocente(e.target.value)}
                    />
                  </CInputGroup>
                  */}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <select
                      className="form-select"
                      value={departamentoSeleccionado ? departamentoSeleccionado.id : ''}
                      onChange={(e) => {
                        const selectedDept = departamentos.find(
                          (dep) => dep.id === parseInt(e.target.value),
                        )
                        console.log('Departamento seleccionado:', selectedDept)
                        setDepartamentoSeleccionado(selectedDept)
                      }}
                    >
                      <option value="">Selecciona un departamento</option>
                      {departamentos.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.nombreDepartamentos}
                        </option>
                      ))}
                    </select>
                  </CInputGroup>

                  {error && (
                    <CFormFeedback
                      className="d-block text-center font-weight-extrabold"
                      style={{
                        color: 'red',
                        backgroundColor: '#FFC4C4',
                        padding: '5px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        border: '1px solid red',
                      }}
                    >
                      Llenar todos los campos
                    </CFormFeedback>
                  )}

                  {error2 && (
                    <CFormFeedback
                      className="d-block text-center font-weight-extrabold"
                      style={{
                        color: 'red',
                        backgroundColor: '#FFC4C4',
                        padding: '5px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        border: '1px solid red',
                      }}
                    >
                      El código debe tener 7 digitos
                    </CFormFeedback>
                  )}

                  {error3 && (
                      <CFormFeedback className="d-block text-center font-weight-extrabold" style={{ color: 'red', backgroundColor: '#FFC4C4', padding: '5px', borderRadius: '5px', marginBottom: '15px', border: '1px solid red'}}>
                        {/*La materia y grupo ya esta registrado.*/}
                        La materia ya esta registrado.
                      </CFormFeedback>
                    )}

                  {bien && (
                    <CFormFeedback
                      className="d-block text-center font-weight-extrabold"
                      style={{
                        color: 'green',
                        backgroundColor: '#C3FDE1',
                        padding: '5px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        border: '1px solid green',
                      }}
                    >
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
