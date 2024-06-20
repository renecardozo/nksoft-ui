import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CButton,
} from "@coreui/react"

const Notificacion = () => {
  const [notificaciones, setNotificaciones] = useState([])
  const [idUsuario, setIdUsuario] = useState("")
  const [userData, setUserData] = useState(null)

  const navigate = useNavigate()

  const handleVerDetalles = (id) => {
    navigate("/docente/detallesNotificacion", { state: { id } })
  }

  const fetchNotificaciones = async () => {
    const response = await fetch(`${process.env.PATH_API}/api/notificaciones`) // Ajusta la URL de tu API
    const data = await response.json()
    const filterDataByUser = []
    for (const notificacion of data) {
      if (
        notificacion.solicitud &&
        notificacion.solicitud.id_user.toString() === idUsuario.toString()
      ) {
        filterDataByUser.push(notificacion)
      }
    }
    setNotificaciones(filterDataByUser)
  }

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user_data")
    if (userDataFromStorage) {
      const userData = JSON.parse(userDataFromStorage)
      setUserData(userData)
      setIdUsuario(userData.id)
    }
  }, [])

  useEffect(() => {
    if (idUsuario) {
      fetchNotificaciones()
    }
  }, [idUsuario])

  return (
    <CContainer className="px-4">
      <CRow>
        <CCol>
          <h1 style={{ fontSize: "1.7rem" }}>Lista de Notificaciones</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}></CCol>
      </CRow>
      <br />
      <CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Solicitud</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {notificaciones.map((notificacion) => (
              <CTableRow key={notificacion.id}>
                <CTableDataCell>
                  Solicitud para el Ambiente{" "}
                  {notificacion.solicitud &&
                  notificacion.solicitud.aulas &&
                  notificacion.solicitud.aulas.nombreAulas
                    ? notificacion.solicitud.aulas.nombreAulas
                    : ""}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleVerDetalles(notificacion.id)}>
                    Ver Detalles
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CRow>
    </CContainer>
  )
}

export default Notificacion
