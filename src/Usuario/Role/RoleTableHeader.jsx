import {CTableHead,CTableRow,CTableHeaderCell} from '@coreui/react'
const columns = [
  {
    title: "Name",
    id: 1,
  },
  {
    title: "State",
    id: 2,
  },
  {
    title: "Acciones",
    id: 3,
  },
];
export default function RoleTableHeader() {
  return (
    <CTableHead>
      <CTableRow>
        {columns &&
          columns.map((column) => <CTableHeaderCell key={column.id}>{column.title}</CTableHeaderCell>)}
      </CTableRow>
    </CTableHead>
  );
}
