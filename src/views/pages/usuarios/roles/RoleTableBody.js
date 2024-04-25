import { CTableBody, CTableRow, CTableDataCell, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

export default function RoleTableBody({ roles, updateStateRole }) {
  const onEdit = (id) => {}
  const onDelete = (id) => {
    updateStateRole(id)
  }
  return (
    <CTableBody>
      {roles &&
        roles.map((role, index) => (
          <CTableRow key={role.id} className="py-5">
            <CTableDataCell className="col-1">{index}</CTableDataCell>
            <CTableDataCell className="col-4">{role.name}</CTableDataCell>
            <CTableDataCell className="col-2">
              {role.state ? (
                <CButton color="success" variant="ghost" onClick={() => onDelete(role.id)}>
                  Activo
                </CButton>
              ) : (
                <CButton color="danger" variant="ghost" onClick={() => onDelete(role.id)}>
                  Inactivo
                </CButton>
              )}
            </CTableDataCell>
            <CTableDataCell className="col-1">
              <Link
                to={`/configurar/editar-role/${role.id}`}
                className="btn btn-outline-warning mb-2"
              >
                Editar
              </Link>
            </CTableDataCell>
          </CTableRow>
        ))}
    </CTableBody>
  )
}
