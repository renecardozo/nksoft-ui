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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilText } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { useAppContext } from '../../../../hooks'
import { start } from '@popperjs/core'
import { AGREGAR_FERIADO } from '../../../../actions'
import { useNavigate } from 'react-router-dom'
import { crearFeriados } from '../service'

const CrearFeriados = () => {
  const [startDate, setStartDate] = useState(new Date())
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState('')
  const [descripcion, setSescripcion] = useState('')
  // const {
  //   state: { feriados },
  //   dispatch,
  // } = useAppContext()
  const guardarFeriado = async (e) => {
    e.preventDefault()
    console.log('guardar feriado')
    const nuevoFeriado = {
      descripcion,
      codigo,
      fecha: startDate.toISOString(),
    }
    await crearFeriados(nuevoFeriado)
    // dispatch({ type: AGREGAR_FERIADO, payload: nuevoFeriado })
    navigate('/administracion/feriados')
  }

  return (
    <div className="container">
      <CContainer>
        <CRow className="jus<tify-content-center">
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
                    {/* <CFormInput placeholder="Fecha" autoComplete="fecha" /> */}
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
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Codigo"
                      autoComplete="Codigo"
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={(e) => guardarFeriado(e)}>
                      Crear
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={3} lg={5} xl={6}>
            <h5>
              Feriados Locales <CBadge color="primary">COD_001</CBadge>
            </h5>
            <h5>
              Feriados Nacionales <CBadge color="info">COD_002</CBadge>
            </h5>
            <h5>
              Feriados Foraneos <CBadge color="secondary">COD_003</CBadge>
            </h5>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default CrearFeriados
