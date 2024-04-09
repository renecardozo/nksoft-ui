import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APISERVICE } from '../../../../services/api.service';
import { CToaster, CToast, CToastHeader,CToastBody } from '@coreui/react';


export default function RoleForm() {
  const initialValues = {
    roleName: '',
    permissions: [],
  }
  const [formData, setFormData] = useState(initialValues);
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [validationError, setValidationError] = useState({roleName:'',permiso:''});

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
      addToast(mesageToast(response.error));
    }
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, name],
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
    const errors = {};
    if (formData.roleName.trim() === '') {
      errors.roleName = 'El nombre de rol es requerido';
    }
    if (formData.permissions.length === 0) {
      errors.permiso = 'Seleccione al menos un permiso';
    }

    setValidationError(errors); // Update validationErrors

    if (Object.keys(errors).length === 0) {
      createRole(formData);
    }
  
  };
const cancel=()=>{
  navigate('/configurar/roles')
}
  const mesageToast=(message) => (
    <CToast>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <div className="container">
       <CToaster ref={toaster} push={toast} placement="bottom-end" />
      <h2 className="text-center mb-4">Crear Nuevo Rol</h2>
      <form onSubmit={handleSubmit}>
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
              {validationError && (
              <div className="text-danger">{validationError.roleName}</div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p>Permisos:</p>
            <div className="row">
              {permissions?.map((permiso) => (
                <div className="col-md-6 mb-2" key={permiso.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={permiso.name.toLowerCase() + 'Permission'}
                      name={permiso.name.toLowerCase()}
                      checked={formData.permissions[permiso.name.toLowerCase()]}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={permiso.name.toLowerCase() + 'Permission'}
                    >
                      {permiso.name}
                    </label>
                  </div>

                </div>
              ))}
            </div>
            {validationError && (
              <div className="text-danger">{validationError.permiso}</div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary me-5">
              Guardar
            </button>
            <button  className="btn btn-danger text-light" onClick={cancel}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
