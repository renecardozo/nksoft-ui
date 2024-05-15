import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cilBook } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody,
  CTable,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

function VerMaterias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Aquí debes implementar la lógica para obtener la lista de materias
    // Puedes hacer una llamada a una API, consultar una base de datos, etc.
    // Por ahora, utilizaremos un arreglo de ejemplo para simular la lista de materias.
    const materiasEjemplo = [
      { id: 1, nombre: 'Física General', codigo: '2006063', grupos: ['C', 'D', 'E'] },
      { id: 2, nombre: 'Álgebra I', codigo: '2008019', grupos: ['10', '14'] },
      // Agrega más materias si es necesario
    ];
    setMaterias(materiasEjemplo);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-between mb-3">
                <h3>Materias</h3>
              </div>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Código</CTableHeaderCell>
                    <CTableHeaderCell>Grupos</CTableHeaderCell>
                    <CTableHeaderCell>Ver Detalles</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {materias.map(materia => (
                    <CTableRow key={materia.id}>
                      <CTableDataCell>{materia.nombre}</CTableDataCell>
                      <CTableDataCell>{materia.codigo}</CTableDataCell>
                      <CTableDataCell>{materia.grupos.join(', ')}</CTableDataCell>
                      <CTableDataCell>
                        <Link
                          to={`/ver-materias/${materia.id}`}
                          className="btn btn-primary ms-2"
                        >
                          <CIcon icon={cilBook} />
                        </Link>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <div className="text-center mt-3">
              <Link to="/" className="btn btn-primary">
                Volver
              </Link>
            </div>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default VerMaterias;
