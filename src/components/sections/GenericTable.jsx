import {
  CButton,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

export default function GenericTable({ headers, list, onEdit, onDelete }) {
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            {headers &&
              headers.map((header) => (
                <CTableHeaderCell key={'head' + header.id}>{header.title}</CTableHeaderCell>
              ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {list &&
            list.map((item) => (
              <CTableRow key={'body' + item.id}>
                {headers &&
                  headers.map((header) =>
                    header.key === 'actions' ? (
                      <CTableDataCell key={'body' + header.id + item.id}>
                        <CRow className='mx-2'>
                          <CButton
                            color="warning"
                            variant="outline"
                            className="my-1"
                            onClick={() => onEdit(item)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            color="danger"
                            variant="outline"
                            className="my-1"
                            onClick={() => onDelete(item)}
                          >
                            Eliminar
                          </CButton>
                        </CRow>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell key={'body' + header.id + item.id}>
                        {header.field ? header.field(item) : item[header.key]}
                      </CTableDataCell>
                    ),
                  )}
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </>
  )
}
