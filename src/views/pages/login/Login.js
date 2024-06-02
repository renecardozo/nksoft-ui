import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from './service'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [codeSis, setCodeSis] = useState('')
  const [cii, setCII] = useState('')
  const [unauthorize, setUnathorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loginSession = (event) => {
    event.preventDefault()
    setLoading(true)
    login(codeSis, cii)
      .then((response) => {
        localStorage.setItem('user_data', JSON.stringify(response.data))
        setLoading(false)
        navigate('/administracion/calendario')
      })
      .catch((error) => {
        setUnathorized(true)
        setLoading(false)
      })
  }
  useEffect(() => {
    if (localStorage.getItem('user_data')) {
      navigate('/administracion/calendario')
    }
  }, [])
  return (
    <div
      id="background-div"
      className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Inicie sesion con su cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Codigo SIS"
                        autoComplete="Codigo SIS"
                        value={codeSis}
                        onChange={(e) => setCodeSis(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="CI"
                        autoComplete="CI"
                        value={cii}
                        onChange={(e) => setCII(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      {unauthorize && (
                        <CCol xs={12}>
                          <CAlert color="danger">Acceso no autorizado</CAlert>
                        </CCol>
                      )}
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={(e) => loginSession(e)}
                          disabled={loading}
                        >
                          Ingresar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
