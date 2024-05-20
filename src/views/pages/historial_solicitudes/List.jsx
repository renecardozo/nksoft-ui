import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react"
import GenericTable from "./../../../components/sections/GenericTable.jsx"
import { APISERVICE } from "../../../services/api.service"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function ListUser() {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const headers = [
    {
      id: 1,
      title: "ID",
      key: "id",
    },
    {
      id: 2,
      title: "Usuario",
      key: "user",
      field: (row) => {
        return (row.user.name || "") + " " + (row.user.last_name || "")
      },
    },
    {
      id: 3,
      title: "Fecha",
      key: "fecha_reserva",
    },
    {
      id: 4,
      title: "Periodos",
      key: "periodo",
      field: (row) => {
        return (
          row.periodos && row.periodos.length && (
            <ul>
              {row.periodos.map((periodo) => (
                <li key={periodo.id}>{`${periodo.horaInicio} - ${periodo.horaFin}`}</li>
              ))}
            </ul>
          )
        )
      },
    },
    {
      id: 5,
      title: "Motivo",
      key: "motivo_reserva",
    },
    {
      id: 6,
      title: "Estado",
      key: "estado",
    },
    {
      id: 7,
      title: "Aula",
      key: "aula",
      field: (row) => {
        return row.aula.nombreAulas
      },
    },
  ]
  const getUsers = async () => {
    let url = "api/solicitud_reserva_aula"
    if (localStorage.getItem("user_data")) {
      const user = JSON.parse(localStorage.getItem("user_data"))
      const response = await APISERVICE.get(url + "?id_user=" + user.id)
      setUsers(response)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const updateUser = async (item) => {
    navigate(`/solicitud_reserva_aula/${item.id}/edit`)
  }
  const removeUser = async () => {
    await APISERVICE.delete(`api/solicitud_reserva_aula/${user.id}`)
    getUsers()
    setVisible(false)
    //navigate(`/users/${item.id}/edit`)
  }
  const openModalDelete = async (item) => {
    setUser(item)
    setVisible(true)
  }

  return (
    <CRow>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Eliminar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>Esta seguro de eliminar este usuario </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={() => removeUser()}>
            Si
          </CButton>
        </CModalFooter>
      </CModal>
      <CCol xs={12}>
        <CCard className="mb-4 max-height400">
          <CCardHeader>
            <strong>Historial de Solicitudes</strong>
          </CCardHeader>
          <CCardBody className="overflow-auto p-3">
            {/* <Link to="/users/create" className="btn btn-primary mb-2">
              Crear Usuario
            </Link> */}
            <GenericTable
              headers={headers}
              list={users}
              onEdit={(row) => updateUser(row)}
              onDelete={(row) => openModalDelete(row)}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
