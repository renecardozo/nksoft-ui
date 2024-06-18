import RoleTableBody from './RoleTableBody'
import RoleTableHeader from './RoleTableHeader'
import { CTable } from '@coreui/react'
// eslint-disable-next-line react/prop-types
export default function RoleTable({ roles, updateStateRole }) {
  return (
    <>
      <CTable>
        <RoleTableHeader />
        <RoleTableBody roles={roles} updateStateRole={updateStateRole} />
      </CTable>
    </>
  )
}
