import RoleTableBody from './RoleTableBody'
import RoleTableHeader from './RoleTableHeader'
import { CTable } from '@coreui/react'
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
