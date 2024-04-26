import React, { useState } from 'react'
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
import { loginAsAdmin } from './service'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [email, setEmail] = useState('barthg.simpson@mail.ogt')
  const [password, setPassword] = useState('1234567')
  const [unauthorize, setUnathorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loginAdmin = (event) => {
    event.preventDefault()
    setLoading(true)
    loginAsAdmin(email, password)
      .then((response) => {
        const { data } = response
        if (data.role.name === 'SuperAdmin') {
          localStorage.setItem('user_data', JSON.stringify(response.data))
          navigate('/dashboard')
        } else {
          setUnathorized(true)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }
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
                    <h1>Admin Login</h1>
                    <p className="text-body-secondary">
                      Inicie sesion con su cuenta de administrador
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo Electronico"
                        autoComplete="Correo Electronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                          onClick={(e) => loginAdmin(e)}
                          disabled={loading}
                        >
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton
                          color="default"
                          className="px-4"
                          onClick={(e) => navigate('/login')}
                          disabled={loading}
                        >
                          Volver
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

export default Admin
