import {CTableHead,CTableRow,CTableHeaderCell} from '@coreui/react'
const columns = [
  {
    title: "#",
    id: 1,
  },
  {
    title: "Name",
    id: 2,
  },
  {
    title: "State",
    id: 3,
  },
  {
    title: "Acciones",
    id: 4,
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
