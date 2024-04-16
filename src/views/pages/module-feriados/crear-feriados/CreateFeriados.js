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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilText } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import { crearFeriados, getListCodeDates } from '../service'

const CrearFeriados = () => {
  const [startDate, setStartDate] = useState(new Date())
  const navigate = useNavigate()
  const [codes, setCodes] = useState([])
  const [descripcion, setSescripcion] = useState('')
  const [codeSelected, setCodeSelected] = useState('')
  const getCodes = async () => {
    const response = await getListCodeDates()
    setCodes(response)
  }

  useEffect(() => {
    getCodes()
  }, [])
  const save = async (e) => {
    e.preventDefault()
    console.log('guardar feriado')
    const nuevoFeriado = {
      descripcion,
      codigo: codeSelected,
      fecha: startDate.toISOString(),
    }
    await crearFeriados(nuevoFeriado)
    navigate('/administracion/feriados')
  }

  return (
    <div className="container">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Feriados</h1>
                  <p className="text-body-secondary">Crea un feriado!</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Descripcion"
                      autoComplete="descripcion"
                      onChange={(e) => setSescripcion(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
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
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={(e) => save(e)}>
                      Crear
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={3} lg={5} xl={6}>
            {codes.map((item) => (
              <h5 key={item.code}>
                {item.name} <CBadge color={item.color}>{item.code}</CBadge>
              </h5>
            ))}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default CrearFeriados
