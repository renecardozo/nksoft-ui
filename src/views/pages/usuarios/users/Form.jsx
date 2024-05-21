import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
} from "@coreui/react"
import { APISERVICE } from "../../../../services/api.service"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
export default function ListUser() {
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState({
    name: "",
    last_name: "",
    email: "",
    ci: "",
    code_sis: "",
    phone: "",
    role_id: "",
  })
  const default_validation = {
    rules: ["required"],
    errors: [],
  }
  const [verify, setVerify] = useState({
    name: { ...default_validation },
    last_name: { ...default_validation },
    email: { ...default_validation },
    ci: { ...default_validation },
    code_sis: { ...default_validation },
    phone: { ...default_validation },
    role_id: { ...default_validation },
  })
  const getRoles = async () => {
    let url = "api/roles"
    const response = await APISERVICE.get(url)
    const result = response.filter((item) => item.id !== 1)
    setRoles(result)
  }
  useEffect(() => {
    if (id) {
      const getUser = async () => {
        let url = `api/users/${id}`
        const response = await APISERVICE.get(url)
        setData({ ...data, ...response })
      }
      getUser()
    }
    getRoles()
  }, [])
  const handleSubmit = async (event, values) => {
    event.preventDefault()
    validateData(values).then((resp) => {
      const service = id
        ? APISERVICE.put(`api/users/${id}`, data)
        : APISERVICE.post("api/users", data)
      service
        .then(() => {
          navigate("/users")
          return true
        })
        .catch(async (error) => {
          const data_error = await error.response.json()
          const validate_data = {}
          for (const key_error of Object.keys(data_error.error)) {
            if (verify[key_error] && data_error.error[key_error].length > 0) {
              validate_data[key_error] = {
                ...verify[key_error],
                errors: data_error.error[key_error],
              }
            }
          }
          setVerify({
            ...verify,
            ...validate_data,
          })
          return false
        })
    })
    return
  }
  const controllerValidationField = (name, value) => {
    const messages = {
      required: "Este campo es requerido",
    }
    let resp = { ...verify[name] }

    if (verify[name]) {
      const item_messages = Object.values(messages)
      resp = {
        ...verify[name],
        errors: verify[name].errors.filter((item) => item_messages.includes(item)),
      }
      if (verify[name].rules && verify[name].rules.length > 0) {
        if (verify[name].rules.includes("required")) {
          if ([null, undefined, ""].includes(value)) {
            resp = {
              ...verify[name],
              errors: resp.errors.concat(messages.required),
            }
          } else {
            resp = {
              ...verify[name],
              errors: resp.errors.filter((item) => item !== messages.required),
            }
          }
        }
      }
    }
    return resp
  }
  const validateData = async (resp) => {
    const validate_data = {}
    for (const name of Object.keys(resp)) {
      validate_data[name] = controllerValidationField(name, resp[name])
    }
    setVerify(validate_data)
    const invalid = Object.keys(validate_data).some(
      (item) => validate_data[item].errors && validate_data[item].errors.length > 0,
    )
    if (invalid) {
      return Promise.reject(false)
    } else {
      return Promise.resolve(true)
    }
  }
  const validOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }
  const lettersOnly = (event) => {
    if (!/^[a-zA-Z]+$/.test(event.key)) {
      event.preventDefault()
    }
  }
  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    const error_field = controllerValidationField(name, value)
    setVerify({
      ...verify,
      [name]: error_field,
    })
    setData({
      ...data,
      [name]: value,
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{id ? "Editar Usuario" : "Crear Usuarios"}</strong>
          </CCardHeader>
          <CCardBody className="overflow-auto p-3">
            <CForm
              className="row g-3 needs-validation"
              noValidate
              onSubmit={(e) => handleSubmit(e, data)}
            >
              <div className="col-6">
                <CFormLabel htmlFor="name">Nombre</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  onKeyPress={lettersOnly}
                  id="name"
                  invalid={verify.name.errors.length > 0}
                  feedbackInvalid={verify.name.errors[0]}
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <CFormLabel htmlFor="last_name">Apellido</CFormLabel>
                <CFormInput
                  type="text"
                  name="last_name"
                  id="last_name"
                  onKeyPress={lettersOnly}
                  invalid={verify.last_name.errors.length > 0}
                  feedbackInvalid={verify.last_name.errors[0]}
                  value={data.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="text"
                  name="email"
                  id="email"
                  invalid={verify.email.errors.length > 0}
                  feedbackInvalid={verify.email.errors[0]}
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <CFormLabel htmlFor="ci">Cedula de Identidad</CFormLabel>
                <CFormInput
                  type="text"
                  name="ci"
                  id="ci"
                  maxLength={12}
                  invalid={verify.ci.errors.length > 0}
                  feedbackInvalid={verify.ci.errors[0]}
                  value={data.ci}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <CFormLabel htmlFor="code_sis">Codigo Sis</CFormLabel>
                <CFormInput
                  type="text"
                  onKeyPress={validOnlyNumbers}
                  maxLength={9}
                  name="code_sis"
                  id="code_sis"
                  invalid={verify.code_sis.errors.length > 0}
                  feedbackInvalid={verify.code_sis.errors[0]}
                  value={data.code_sis}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <CFormLabel htmlFor="phone">Telefono</CFormLabel>
                <CFormInput
                  type="text"
                  name="phone"
                  onKeyPress={(event) => validOnlyNumbers(event)}
                  maxLength={8}
                  id="phone"
                  invalid={verify.phone.errors.length > 0}
                  feedbackInvalid={verify.phone.errors[0]}
                  value={data.phone}
                  onChange={handleInputChange}
                />
              </div>
              {data.role_id !== 1 && (
                <div className="col-12">
                  <CFormLabel htmlFor="role_id">Rol</CFormLabel>
                  <CFormSelect
                    name="role_id"
                    invalid={verify.role_id.errors.length > 0}
                    feedbackInvalid={verify.role_id.errors[0]}
                    value={data.role_id}
                    onChange={handleInputChange}
                  >
                    <option value={""}>Selecciona un rol</option>
                    {roles &&
                      roles.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </CFormSelect>
                </div>
              )}
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Continuar
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
