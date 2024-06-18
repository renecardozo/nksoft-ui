import {
  CButton,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { APISERVICE } from '../../../services/api.service'
import CIcon from '@coreui/icons-react'
import { cilCommentSquare, cilSettings } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { guardarNotificaciones } from '../notificacion/servicios'
function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [solicitud, setSoli] = useState('')
  const [idsolicitud, setIdSol] = useState(1)
  const [updateData, setUpdateData] = useState({ value: '' })
  const [motivoRechazo, setMotivoRechazo] = useState({ value: '' })
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [visible, setVisible] = useState(false)
  const [recomendation, setRecomendation] = useState([])
  const [sugerencia, setSugrencia] = useState([])

  const getSolicitudes = async () => {
    let url = 'api/solicitud'
    const response = await APISERVICE.get(url)
    setSolicitudes(response.data)
  }

  const onUpdate = (sol) => {
    setSoli(sol)
    setVisible(!visible)
  }
  const getRecomendation = async (solicitud) => {
    setIdSol(solicitud.id)
    //console.log("Motivo de la solicitud:", idSol);
    let url = 'api/recomendacion'
    const response = await APISERVICE.post(url, solicitud)
    setRecomendation(response.data)
    setVisible(!visible)
  }

  const onClose = () => {
    setVisible(false)
    setSoli('')
    setError('')
    setMotivoRechazo('')
    setUpdateData('')
    setRecomendation([])
    setSugrencia([])
  }
  const onSubmit = async (id) => {
    if (!updateData.value) {
      if (solicitud) {
        return setError('Seleccione una opcion')
      } else {
        return setError('Campo obligatorio')
      }
    }

    if (solicitud) {
      let url = `api/solicitud/${solicitud?.id}`
      await APISERVICE.put(url, updateData)

      if (updateData.value === 'Rechazado') {
        console.log(
          `Solicitud ID: ${solicitud.id}, Estado: ${updateData.value}, Motivo: ${motivoRechazo.value}`,
        )
        const nuevaNotificacion = {
          id_solicitud: solicitud.id,
          respuesta: motivoRechazo.value,
        }
        await guardarNotificaciones(nuevaNotificacion)
      } else {
        console.log(`Solicitud ID: ${solicitud.id}, Estado: ${updateData.value}`)
        var resp = 'Puede Disponer del Aula'
        const nuevaNotificacion = {
          id_solicitud: solicitud.id,
          respuesta: resp,
        }
        await guardarNotificaciones(nuevaNotificacion)
      }

      onClose()
      getSolicitudes()
      //enviar correo de aceptado o rechazado
      //si es rechazado se envia mas el motivo de rechazo
    } else {
      const aulasSugeridas = sugerencia.map((aula) => aula.nombreAulas).join(', ')
      console.log(idsolicitud)
      console.log(aulasSugeridas)
      console.log(updateData.value)
      var res = 'Ambientes sugeridos: ' + aulasSugeridas + '. Observacion: ' + updateData.value
      const nuevaNotificacion = {
        id_solicitud: idsolicitud,
        respuesta: res,
      }
      await guardarNotificaciones(nuevaNotificacion)
      //enviar sugerecia
      onClose()
      getSolicitudes()
    }
  }
  const handleChange = (e) => {
    setUpdateData({ value: e.target.value })
  }
  const handleChangeMotivoREchazo = (e) => {
    setMotivoRechazo({ value: e.target.value })
  }

  const handleFilter = async (e) => {
    let url = 'api/filtro'
    const filtro = {
      value: e.target.value,
    }
    const response = await APISERVICE.post(url, filtro)
    setSolicitudes(response.data)
  }
  const handlePrueba = () => {
    console.log('next')
  }
  console.log(sugerencia)
  useEffect(() => {
    getSolicitudes()
  }, [])
  return (
    <div className="container">
      <div className="d-flex mb-5">
        <h3 className="me-5">Filtro:</h3>
        <CFormSelect
          size="mb"
          style={{ width: '40%' }}
          aria-label="Large select example"
          onChange={handleFilter}
        >
          <option>seleccione un filtro</option>
          <option value="urgencia">Urgencia</option>
          <option value="llegada">Llegada</option>
          <option value="motivo">Motivo</option>
        </CFormSelect>
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Usuario</CTableHeaderCell>
            <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
            <CTableHeaderCell scope="col">Periodo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Motivo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
            <CTableHeaderCell scope="col">Aula</CTableHeaderCell>
            <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {solicitudes &&
            solicitudes.map((sol) => (
              <CTableRow key={sol.id}>
                <CTableHeaderCell scope="row">{sol.id}</CTableHeaderCell>
                <CTableDataCell>{sol.users?.name}</CTableDataCell>
                <CTableDataCell>{sol.fecha_hora_reserva.split(' ')[0]}</CTableDataCell>
                <CTableDataCell>
                  <ul>
                    {sol.periodos.map((periodo) => (
                      <li key={periodo.id}>{`${periodo.horaInicio} - ${periodo.horaFin}`}</li>
                    ))}
                  </ul>
                </CTableDataCell>
                <CTableDataCell>{sol.motivo_reserva}</CTableDataCell>
                <CTableDataCell>{sol.estado}</CTableDataCell>
                <CTableDataCell>{sol.aulas.nombreAulas}</CTableDataCell>

                <CTableDataCell>
                  {sol.estado.toLowerCase() === 'pendiente' ? (
                    <>
                      <CButton className="me-2" color="primary" onClick={() => onUpdate(sol)}>
                        {<CIcon icon={cilSettings} />}
                      </CButton>
                      <CButton color="info" onClick={() => getRecomendation(sol)}>
                        {<CIcon icon={cilCommentSquare} />}
                      </CButton>
                    </>
                  ) : (
                    ''
                  )}
                  {sol.estado === 'Rechazado' && (
                    <CButton color="info" onClick={() => getRecomendation(sol)}>
                      {<CIcon icon={cilCommentSquare} />}
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem disabled>Previous</CPaginationItem>
        <CPaginationItem onClick={handlePrueba}>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination>
      <CModal
        visible={visible}
        onClose={onClose}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader onClose={onClose}>
          <CModalTitle id="LiveDemoExampleLabel">
            {solicitud ? 'Actualizar solicitud' : 'Redactar recomendacion'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {solicitud ? (
            <>
              <p>Usuario : {solicitud.users.name}</p>

              <p>Motivo : {solicitud.motivo_reserva}</p>
              <p>Fecha reserva : {solicitud.fecha_hora_reserva.split(' ')[0]}</p>
              <p>Materia : {solicitud.materia.materia}</p>
              <p>Grupo : {solicitud.materia.grupo}</p>
              <p>Aula : {solicitud.aulas.nombreAulas}</p>
              <p>
                Periodo :{' '}
                {solicitud.periodos.map((periodo) => (
                  <p key={periodo.id}>{`${periodo.horaInicio} - ${periodo.horaFin}`}</p>
                ))}
              </p>

              <CFormSelect
                size="lg"
                className="mb-3"
                aria-label="Large select example"
                onChange={handleChange}
              >
                <option>{solicitud.estado}</option>
                <option value="Aceptado">Aceptado</option>
                <option value="Rechazado">Rechazado</option>
              </CFormSelect>
              {updateData?.value === 'Rechazado' ? (
                <CFormTextarea
                  id="floatingTextarea"
                  placeholder="Escribe el motivo del rechazo"
                  value={motivoRechazo.value}
                  onChange={handleChangeMotivoREchazo}
                ></CFormTextarea>
              ) : (
                ''
              )}
              {error && <p className="text-danger">{error}</p>}
            </>
          ) : (
            <>
              {recomendation && (
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Aula</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Capacidad</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {recomendation.map((rec) => (
                      <CTableRow key={rec.id}>
                        <CTableDataCell>{rec.nombreAulas}</CTableDataCell>
                        <CTableDataCell>{rec.capacidadAulas}</CTableDataCell>

                        <CTableDataCell>
                          <>
                            {sugerencia && !sugerencia.find((item) => item.id === rec.id) ? (
                              <CButton
                                className="me-2"
                                color="primary"
                                onClick={() => setSugrencia([...sugerencia, rec])}
                              >
                                Sugerir
                              </CButton>
                            ) : (
                              ''
                            )}
                          </>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}

              <CFormTextarea
                id="floatingTextarea"
                placeholder={
                  recomendation
                    ? 'Escribe un comentario'
                    : 'NO hay aulas disponibles para esa fecha y hora'
                }
                value={updateData.value}
                onChange={handleChange}
              ></CFormTextarea>
              {error && <p className="text-danger">{error}</p>}
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
          <CButton color="primary" onClick={onSubmit}>
            {solicitud ? 'Guardar' : 'Enviar'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Solicitudes
