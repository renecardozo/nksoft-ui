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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilText } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'

import { useParams } from 'react-router-dom'
import { getFeriado, getListCodeDates, getTitleFromCode, editFeriado } from '../service'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'

const DetailsFeriado = () => {
  const { id } = useParams()
  const [feriado, setFeriado] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const navigate = useNavigate()
  const [codes, setCodes] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [codeSelected, setCodeSelected] = useState('')

  const getCodes = async () => {
    const response = await getListCodeDates()
    setCodes(response)
  }

  useEffect(() => {
    const getFeriadoById = async () => {
      try {
        const response = await getFeriado(id)
        console.log(response)
        setFeriado(response)
        setStartDate(response.fecha)
        setDescripcion(response.descripcion)
        const name = await getTitleFromCode(response.codigo)
        setCodeSelected(name)
      } catch (error) {
        console.error('Error fetching item details:', error)
      }
    }

    getFeriadoById()
    getCodes()
  }, [id])

  const handleEditToggle = () => {
    setEditMode(!editMode)
  }

  const handleCancelEdition = () => {
    setEditMode(!editMode)
    navigate('/administracion/feriados')
  }

  const handleSaveEdition = async () => {
    setEditMode(!editMode)
    console.log('guardar feriado')
    const feriadoEditado = {
      id,
      descripcion,
      codigo: codeSelected,
      fecha: new Date(startDate).toISOString(),
    }
    await editFeriado(feriadoEditado)
    navigate('/administracion/feriados')
  }
  return (
    <div className="container">
      <CContainer className="px-4">
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>{!editMode ? 'Feriado' : 'Modo de Edicion'}</h1>
                  <p className="text-body-secondary">Crea un feriado!</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      disabled={!editMode}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Descripcion"
                      autoComplete="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      disabled={!editMode}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    {!editMode ? (
                      <>
                        <CInputGroupText>
                          <CIcon icon={cilText} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Codigo"
                          autoComplete="codigo"
                          value={codeSelected}
                          disabled={!editMode}
                        />
                      </>
                    ) : (
                      <select
                        className="form-select"
                        value={codeSelected}
                        onChange={(e) => setCodeSelected(e.target.value)}
                      >
                        <option value="">Seleccionar un Feriado</option>
                        {codes.map((code, index) => (
                          <option key={index} value={code.code}>
                            {code.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </CInputGroup>
                  <div className="d-grid">
                    {!editMode ? (
                      <>
                        <CButton color="default" onClick={handleCancelEdition}>
                          Cancelar
                        </CButton>
                        <CButton color="primary" onClick={handleEditToggle}>
                          Edit
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton color="default" onClick={handleCancelEdition}>
                          Cancelar
                        </CButton>
                        <CButton color="primary" onClick={handleSaveEdition}>
                          Guardar
                        </CButton>
                      </>
                    )}
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

export default DetailsFeriado
