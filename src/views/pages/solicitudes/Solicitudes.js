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
} from "@coreui/react"
import React, { useEffect, useState } from "react"
import { APISERVICE } from "../../../services/api.service"
import CIcon from "@coreui/icons-react"
import { cilCommentSquare, cilSettings } from "@coreui/icons"
import { Link } from "react-router-dom"

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [solicitud, setSoli] = useState("")
  const [updateData, setUpdateData] = useState({ value: "" })
  const [motivoRechazo, setMotivoRechazo] = useState({ value: "" })
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [visible, setVisible] = useState(false)

  const getSolicitudes = async () => {
    let url = "api/solicitud"
    const response = await APISERVICE.get(url)
    setSolicitudes(response.data)
  }

  const onUpdate = (sol) => {
    setSoli(sol)
    setVisible(!visible)
  }
  const onClose = () => {
    setVisible(false)
    setSoli("")
    setError("")
    setMotivoRechazo("")
    setUpdateData("")
  }
  const onSubmit = async (id) => {
    if (!updateData.value) {
      if (solicitud) {
        return setError("Seleccione una opcion")
      } else {
        return setError("Campo obligatorio")
      }
    }

    if (solicitud) {
      let url = `api/solicitud/${solicitud?.id}`
      await APISERVICE.put(url, updateData)
      onClose()
      getSolicitudes()
      //enviar correo de aceptado o rechazado
      //si es rechazado se envia mas el motivo de rechazo
      
    } else {
      //enviar sugerecia
      onClose()
      getSolicitudes()
    }
  }
  const handleChange = (e) => {
    setUpdateData({ value: e.target.value })
  }
  const handleChangeMotivoREchazo= (e) => {
    setMotivoRechazo({ value: e.target.value })
  }

  const handleFilter = async (e) => {
    let url = "api/filtro"
    const filtro = {
      value: e.target.value,
    }
    const response = await APISERVICE.post(url, filtro)
    setSolicitudes(response.data)
  }
  const handlePrueba = () => {
    console.log("next")
  }
  useEffect(() => {
    getSolicitudes()
  }, [])
  return (
    <div className="container">
      <div className="d-flex mb-5">
        <h3 className="me-5">Filtro:</h3>
        <CFormSelect
          size="mb"
          style={{ width: "40%" }}
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
          {solicitudes && solicitudes.map((sol) => (
            <CTableRow key={sol.id}>
              <CTableHeaderCell scope="row">{sol.id}</CTableHeaderCell>
              <CTableDataCell>{sol.users?.name}</CTableDataCell>
              <CTableDataCell>{(sol.fecha_hora_reserva).split(' ')[0]}</CTableDataCell>
              <CTableDataCell>{sol.periodos.horaInicio}-{sol.periodos.horaFin}</CTableDataCell>
              <CTableDataCell>{sol.motivo_reserva}</CTableDataCell>
              <CTableDataCell>{sol.estado}</CTableDataCell>
              <CTableDataCell>{sol.aula}</CTableDataCell>

              <CTableDataCell>
                {sol.estado.toLowerCase() === "pendiente" ? (
                  <>
                    <CButton className="me-2" color="primary" onClick={() => onUpdate(sol)}>
                      {<CIcon icon={cilSettings} />}
                    </CButton>
                    <CButton color="info" onClick={() => setVisible(!visible)}>
                      {<CIcon icon={cilCommentSquare} />}
                    </CButton>
                  </>
                ) : (
                  ""
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
            {solicitud ? "Actualizar solicitud" : "Redactar recomendacion"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {solicitud ? (
            <>
              <p>Usuario : {solicitud.users.name}</p>
              <p>Materia : {solicitud.materia.materia}</p>
              <p>Motivo : {solicitud.motivo_reserva}</p>
              <p>Fecha reserva : {solicitud.fecha_hora_reserva.split(" ")[0]}</p>
              <p>Aula : {solicitud.aula}</p>
              <p>Hora de inicio : {solicitud.periodos.horaInicio}</p>
              <p>Hora fin: {solicitud.periodos.horaFin}</p>
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
                ""
              )}
              {error && <p className="text-danger">{error}</p>}
            </>
          ) : (
            <>
              <CFormTextarea
                id="floatingTextarea"
                placeholder="Escribe una sugerencia"
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
            {solicitud ? "Guardar" : "Enviar"}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Solicitudes
