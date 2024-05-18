import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cilBook } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {CCard,
  CCardBody, CTable, CTableDataCell, CTableBody, CTableHead,
  CTableHeaderCell, CTableRow,
} from '@coreui/react';
import { showDocentes } from './servicios'; 

function VerDocentes() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await showDocentes();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los datos de los docentes:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleVerMaterias = (userId) => {
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-between mb-3">
                <h3>Docentes FCYT</h3>
              </div>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Apellidos</CTableHeaderCell>
                    <CTableHeaderCell>Código SIS</CTableHeaderCell>
                    <CTableHeaderCell>Teléfono</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Ver Materias</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usuarios.map(usuario => (
                    <CTableRow key={usuario.id}>
                      <CTableDataCell>{usuario.name}</CTableDataCell>
                      <CTableDataCell>{usuario.last_name}</CTableDataCell>
                      <CTableDataCell>{usuario.code_sis}</CTableDataCell>
                      <CTableDataCell>{usuario.phone}</CTableDataCell>
                      <CTableDataCell>{usuario.email}</CTableDataCell>
                      <CTableDataCell>
                        <Link
                          to={`/configurar/docentes/${usuario.id}/materias`}
                          className="btn btn-primary ms-2"
                          onClick={() => handleVerMaterias(usuario.id)}
                        >
                          <CIcon icon={cilBook} />
                        </Link>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            {/* <div className="text-center mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
  <Link to="/" className="btn btn-primary">Volver</Link>
</div> */}
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default VerDocentes;
