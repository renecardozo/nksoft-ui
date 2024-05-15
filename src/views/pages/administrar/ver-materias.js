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

function verMaterias() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Aquí debes implementar la lógica para obtener la lista de usuarios con id_role=2
    // Puedes hacer una llamada a una API, consultar una base de datos, etc.
    // Por ahora, utilizaremos un arreglo de ejemplo para simular la lista de usuarios.
    const usuariosEjemplo = [
      { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com', codigoSis: '12345' },
      { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com', codigoSis: '67890' },
      { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com', codigoSis: '54321' },
    ];
    setUsuarios(usuariosEjemplo);
  }, []);

  const handleVerMaterias = (userId) => {
    // Aquí puedes implementar la lógica para ver las materias del usuario con el userId especificado
    // Por ahora, solo mostraremos un mensaje de ejemplo
    alert(`Ver materias del usuario con ID ${userId}`);
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
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Código SIS</CTableHeaderCell>
                    <CTableHeaderCell>Ver Materias</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usuarios.map(usuario => (
                    <CTableRow key={usuario.id}>
                      <CTableDataCell>{usuario.nombre}</CTableDataCell>
                      <CTableDataCell>{usuario.email}</CTableDataCell>
                      <CTableDataCell>{usuario.codigoSis}</CTableDataCell>
                      <CTableDataCell>
                        <Link
                          to={`/ver-materias/${usuario.id}`}
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

export default verMaterias;
