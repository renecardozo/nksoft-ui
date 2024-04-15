import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { APISERVICE } from '../../../../services/api.service'
import { CToaster, CToast, CToastBody } from '@coreui/react'

export default function RoleForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toaster = useRef()

  const [formData, setFormData] = useState({ roleName: '', permissions: [] })
  const [permissions, setPermissions] = useState([])
  const [validationError, setValidationError] = useState({})
  const [toast, addToast] = useState(null)

  const getRole = async () => {
    let url = `api/role/${id}`
    const response = await APISERVICE.get(url)
    setFormData(response)
  }

  const getPermissions = async () => {
    let url = 'api/permissions'
    const response = await APISERVICE.get(url)
    setPermissions(response)
  }

  const createRole = async (body) => {
    let url = 'api/create'
    const response = await APISERVICE.post(url, body)
    if (response.success) {
      navigate('/configurar/roles')
    } else {
      addToast(mesageToast(response.error))
    }
  }
  const editRole = async (body, id) => {
    let url = `api/editar/${id}`
    const response = await APISERVICE.post(url, body)
    if (response.success) {
      navigate('/configurar/roles')
    } else {
      addToast(mesageToast(response.error))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      const newPermissions = checked
        ? [...formData.permissions, name]
        : formData.permissions.filter((perm) => perm !== name)
      setFormData({
        ...formData,
        permissions: newPermissions,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!formData.roleName.trim()) {
      errors.roleName = 'El nombre del rol es requerido'
    }
    if (!formData.permissions.length) {
      errors.permiso = 'Seleccione al menos un permiso'
    }

    setValidationError(errors)

    if (Object.keys(errors).length === 0) {
      if (id) {
        editRole(formData, id)
        createRole(formData)
      } else {
        createRole(formData)
      }
    }
  }

  const cancel = () => {
    navigate('/configurar/roles')
  }

  const mesageToast = (message) => (
    <CToast autohide={false} visible={true}>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  useEffect(() => {
    if (id) {
      getRole(id)
    }
    getPermissions()
  }, [id])

  return (
    <div className="container">
      <CToaster ref={toaster} push={toast} placement="bottom-end" />
      <h2 className="text-center mb-4">Crear Nuevo Rol</h2>
      <form onSubmit={handleSubmit}>
        {/* Input para nombre del rol */}
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="roleName" className="form-label">
              Nombre del Rol
            </label>
            <input
              type="text"
              className="form-control"
              id="roleName"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
            />
            {validationError.roleName && (
              <div className="text-danger">{validationError.roleName}</div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p>Permisos:</p>
            <div className="row">
              {permissions.map((permiso) => (
                <div className="col-md-6 mb-2" key={permiso.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${permiso.name.toLowerCase()}Permission`}
                      name={permiso.name}
                      checked={formData.permissions.includes(permiso.name)}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${permiso.name.toLowerCase()}Permission`}
                    >
                      {permiso.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {validationError.permiso && (
              <div className="text-danger">{validationError.permiso}</div>
            )}
          </div>
        </div>
        {/* Botones de acción */}
        <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary me-5">
              Guardar
            </button>
            <button className="btn btn-danger text-light" onClick={cancel}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
