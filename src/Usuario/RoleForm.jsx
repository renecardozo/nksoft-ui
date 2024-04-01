import React, { useState } from "react";

const permisos = [
  {
    id: 1,
    name: "Leer",
  },
  {
    id: 2,
    name: "Escribir",
  },
  {
    id: 3,
    name: "Eliminar",
  },
  {
    id: 4,
    name: "Actualizar",
  },
  {
    id: 5,
    name: "Mover",
  },
  {
    id: 6,
    name: "Registrar",
  },
  {
    id: 7,
    name: "Feriados",
  },
  {
    id: 8,
    name: "Auxiliar",
  },

];

const initialValues = {
  roleName: "",
  permissions: permisos.reduce((acc, permiso) => {
    acc[permiso.name.toLowerCase()] = false;
    return acc;
  }, {}),
};

export default function RoleForm() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        permissions: {
          ...formData.permissions,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // enviamos datos al backend
  };

  return (
    <div className="container mt-5">
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
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p>Permisos:</p>
            <div className="row">
              {permisos?.map((permiso, index) => (
                <div className="col-md-6 mb-2" key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={permiso.name.toLowerCase() + "Permission"}
                      name={permiso.name.toLowerCase()}
                      checked={formData.permissions[permiso.name.toLowerCase()]}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={permiso.name.toLowerCase() + "Permission"}
                    >
                      {permiso.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
