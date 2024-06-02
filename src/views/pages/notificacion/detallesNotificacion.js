import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CContainer } from '@coreui/react'

const DetallesNotificacion = () => {
  const location = useLocation()
  const id = location.state?.id
  const navigate = useNavigate()

  const [notificacion, setNotificacion] = useState(null)
  const [solicitud, setSolicitud] = useState(null)
  const [nombreAula, setNombreAula] = useState('') // Estado para almacenar el nombre del aula
  const [nombreMateria, setNombreMateria] = useState('') // Estado para almacenar el nombre de la materia

  useEffect(() => {
    const fetchNotificacion = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/notificacion2/${id}`)
        const data = await response.json()
        console.log('Notificación:', data)
        if (data.success) {
          setNotificacion(data.data)

          if (data.data.id_solicitud) {
            const idSolicitud = data.data.id_solicitud
            console.log('ID Solicitud:', idSolicitud)
            fetchSolicitud(idSolicitud)
          }
        } else {
          console.error('Error en la respuesta de notificación:', data.error)
        }
      } catch (error) {
        console.error('Error al cargar los detalles de la notificación:', error)
      }
    }

    const fetchSolicitud = async (idSolicitud) => {
      try {
        const response = await fetch(`http://localhost:8000/api/solicitud/${idSolicitud}`)
        const data = await response.json()
        console.log('Solicitud:', data)
        if (data.success) {
          setSolicitud(data.data)

          if (data.data.id_aula) {
            fetchAula(data.data.id_aula)
          }

          if (data.data.id_materia) {
            fetchMateria(data.data.id_materia)
          }
        } else {
          console.error('Error en la respuesta de solicitud:', data.error)
        }
      } catch (error) {
        console.error('Error al cargar los detalles de la solicitud:', error)
      }
    }

    const fetchAula = async (idAula) => {
      try {
        const response = await fetch(`http://localhost:8000/api/aula/${idAula}`)
        const data = await response.json()
        if (data.success) {
          setNombreAula(data.data.nombreAulas)
        } else {
          console.error('Error en la respuesta de aula:', data.error)
        }
      } catch (error) {
        console.error('Error al cargar los detalles del aula:', error)
      }
    }

    const fetchMateria = async (idMateria) => {
      try {
        const response = await fetch(`http://localhost:8000/api/materia/${idMateria}`)
        const data = await response.json()
        console.log('Respuesta completa de Materia:', data) // Log completo de la respuesta
        if (data.success) {
          setNombreMateria(data.data.materia)
        } else {
          console.error('Error en la respuesta de materia:', data.error)
        }
      } catch (error) {
        console.error('Error al cargar los detalles de la materia:', error)
      }
    }

    if (id) {
      fetchNotificacion()
    }
  }, [id])

  if (!notificacion || !solicitud || !nombreAula || !nombreMateria) {
    return <div>Cargando...</div>
  }

  return (
    <CContainer className="px-4">
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="p-4">
            <CCardHeader>
              <h3 className="mb-0">Notificación</h3>
            </CCardHeader>
            <CCardBody>
              <p>
                <strong>Razón de Solicitud: </strong>
                {solicitud.motivo_reserva}
              </p>
              <p>
                <strong>Ambiente: </strong>
                {nombreAula}
              </p>{' '}
              {/* Mostrar el nombre del aula */}
              <div className="row">
                <div className="col-auto">
                  <p>
                    <strong>Materia: </strong>
                    {nombreMateria}
                  </p>{' '}
                  {/* Mostrar el nombre de la materia */}
                </div>
                {/*
                <div className="col-auto">
                  <p><strong>Grupo: </strong>{materia.grupo}</p> {/* Mostrar el grupo de la materia *
                </div>
                */}
              </div>
              <p>
                <strong>Fecha de Reserva: </strong>
                {solicitud.fecha_hora_reserva}
              </p>
              <p>
                <strong>Estado de la solicitud: </strong>
                {solicitud.estado}
              </p>
              <p>{notificacion.respuesta}</p>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol>
              <CButton
                onClick={() => navigate('/docente/notificacion')}
                color="primary"
                className="mt-3"
              >
                Volver
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default DetallesNotificacion
