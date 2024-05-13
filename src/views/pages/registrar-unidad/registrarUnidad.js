import React, { useState, useEffect } from 'react'
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClock, cilText, cilBuilding, cilPlus, cilMinus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import {
  postUnidad,
  getUnidad,
  horaInicio,
  horaFin,
  getAulasPorUnidad,
  agregarAula,
} from './servicios'

const RegistrarUnidad = () => {
  const navigate = useNavigate()
  const [nombreUnidades, setNombreUnidades] = useState('')
  const [horaAperturaUnidades, setHoraDeApertura] = useState('')
  const [horaCierreUnidades, setHoraDeCierre] = useState('')
  const [nombreDepartamentos, setNombreDepartamentos] = useState([])
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null)
  const [departamentos, setDepartamentos] = useState([])
  const [aulas, setAulas] = useState([{ nombreAulas: '', capacidadAulas: '', unidad_id: null }])
  const [horasApertura, setHorasApertura] = useState([])
  const [horasCierre, setHorasCierre] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDuplicate, setShowDuplicate] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showEmptyWarning, setShowEmptyWarning] = useState(false)
  const [showHoraAperturaWarning, setShowHoraAperturaWarning] = useState(false)
  const [showHoraCierreWarning, setShowHoraCierreWarning] = useState(false)
  const [showHoraWarning, setShowHoraWarning] = useState(false)

  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/departamentos', {
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

  useEffect(() => {
    const cargarHorasDeAperturaYCierre = async () => {
      try {
        const horaInicioData = await horaInicio()
        const horaFinData = await horaFin()
        setHorasApertura(horaInicioData)
        setHorasCierre(horaFinData)
      } catch (error) {
        console.error('Error al cargar las horas de apertura y cierre:', error)
      }
    }
    cargarHorasDeAperturaYCierre()
  }, [])

  const guardarUnidad = async (e) => {
    e.preventDefault()
    try {
      // Verificar si se completaron los campos obligatorios
      if (nombreUnidades.trim() === '') {
        setShowEmptyWarning(true)
        return
      }
      if (horaAperturaUnidades.trim() === '') {
        setShowHoraAperturaWarning(true)
        return
      }
      if (horaCierreUnidades.trim() === '') {
        setShowHoraCierreWarning(true)
        return
      }
      if (horaCierreUnidades.trim() <= horaAperturaUnidades.trim()) {
        setShowHoraWarning(true)
        return
      }

      const unidades = await getUnidad()
      const unidadExistente = unidades.find((unidad) => unidad.nombreUnidades === nombreUnidades)
      if (unidadExistente) {
        setShowDuplicate(true)
        return
      }

      const uniid = await postUnidad({
        nombreUnidades,
        horaAperturaUnidades,
        horaCierreUnidades,
        departamento_id: departamentoSeleccionado ? departamentoSeleccionado.id : null,
      })

      const aulasConUnidadId = aulas.map((aula) => ({
        ...aula,
        unidad_id: uniid,
      }))

      await Promise.all(
        aulasConUnidadId.map(async (aula) => {
          await agregarAula(aula)
        }),
      )

      setNombreUnidades('')
      setHoraDeApertura('')
      setHoraDeCierre('')
      setDepartamentoSeleccionado(null)
      setAulas([{ nombreAulas: '', capacidadAulas: '' }])
      setShowSuccess(true)
    } catch (error) {
      setShowError(true)
      console.error('Error al registrar la unidad: ' + error.message)
    } finally {
      setTimeout(() => {
        setShowSuccess(false)
        setShowDuplicate(false)
        setShowError(false)
        setShowEmptyWarning(false)
        setShowHoraAperturaWarning(false)
        setShowHoraCierreWarning(false)
        setShowHoraWarning(false)
      }, 3000)
    }
  }

  const agregarNuevaAula = () => {
    setAulas([...aulas, { nombreAulas: '', capacidadAulas: '' }])
  }

  const eliminarAula = (index) => {
    const nuevasAulas = [...aulas]
    nuevasAulas.splice(index, 1)
    setAulas(nuevasAulas)
  }

  const handleNombreAulaChange = (index, value) => {
    const nuevasAulas = [...aulas]
    nuevasAulas[index].nombreAulas = value
    setAulas(nuevasAulas)
  }

  const handleCapacidadAulaChange = (index, value) => {
    const nuevasAulas = [...aulas]
    nuevasAulas[index].capacidadAulas = value
    setAulas(nuevasAulas)
  }

  return (
    <div className="container">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registrar unidad nueva</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre"
                      autoComplete="nombre"
                      value={nombreUnidades}
                      onChange={(e) => setNombreUnidades(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <select
                      className="form-select"
                      value={departamentoSeleccionado ? departamentoSeleccionado.id : ''}
                      onChange={(e) => {
                        const selectedDeptId = parseInt(e.target.value)
                        const selectedDept =
                          selectedDeptId !== -1
                            ? departamentos.find((dep) => dep.id === selectedDeptId)
                            : null
                        setDepartamentoSeleccionado(selectedDept)
                      }}
                    >
                      <option value={-1}>Ninguno</option>
                      {departamentos
                        .sort((a, b) => a.nombreDepartamentos.localeCompare(b.nombreDepartamentos))
                        .map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.nombreDepartamentos}
                          </option>
                        ))}
                    </select>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilClock} />
                    </CInputGroupText>
                    <select
                      className="form-select"
                      value={horaAperturaUnidades}
                      onChange={(e) => setHoraDeApertura(e.target.value)}
                    >
                      <option value="">Seleccionar hora de apertura</option>
                      {horasApertura.map((hora, index) => (
                        <option key={index} value={hora}>
                          {hora}
                        </option>
                      ))}
                    </select>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilClock} />
                    </CInputGroupText>
                    <select
                      className="form-select"
                      value={horaCierreUnidades}
                      onChange={(e) => setHoraDeCierre(e.target.value)}
                    >
                      <option value="">Seleccionar hora de cierre</option>
                      {horasCierre.map((hora, index) => (
                        <option key={index} value={hora}>
                          {hora}
                        </option>
                      ))}
                    </select>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="button" color="primary" onClick={(e) => guardarUnidad(e)}>
                      Registrar
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Agregar aulas</h1>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre del Aula</CTableHeaderCell>
                        <CTableHeaderCell>Capacidad</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {aulas.map((aula, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <CFormInput
                              placeholder={`Nombre del aula ${index + 1}`}
                              autoComplete="nombre"
                              value={aula.nombreAulas}
                              onChange={(e) => handleNombreAulaChange(index, e.target.value)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormInput
                              placeholder={`Capacidad del aula ${index + 1}`}
                              autoComplete="capacidad"
                              value={aula.capacidadAulas}
                              onChange={(e) => handleCapacidadAulaChange(index, e.target.value)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger" onClick={() => eliminarAula(index)}>
                              Eliminar
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  <div className="d-grid mt-3">
                    <CButton color="primary" onClick={agregarNuevaAula}>
                      <CIcon icon={cilPlus} />
                      Agregar Aula
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <br></br>
        <CRow className="justify-content-center p-10">
          <CCol>
            {showSuccess && (
              <CAlert color="success">Se ha registrado la unidad exitosamente</CAlert>
            )}
            {showDuplicate && (
              <CAlert color="warning">
                El nombre de la unidad ya se encuentra registrado, por favor ingrese otro
              </CAlert>
            )}
            {showError && <CAlert color="danger">Error al registrar la unidad</CAlert>}
            {showEmptyWarning && (
              <CAlert color="warning">Por favor complete el nombre de la unidad.</CAlert>
            )}
            {showHoraAperturaWarning && (
              <CAlert color="warning">Por favor seleccione una hora de apertura</CAlert>
            )}
            {showHoraCierreWarning && (
              <CAlert color="warning">Por favor seleccione una hora de Cierre</CAlert>
            )}
            {showHoraWarning && (
              <CAlert color="warning">
                La hora de cierre debe ser posterior la hora de apertura, por favor seleccione un
                horario válido{' '}
              </CAlert>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default RegistrarUnidad
