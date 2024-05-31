import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CButton,
} from '@coreui/react';

const Notificacion = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [solicitudes, setSolicitudes] = useState({});
  const [idUsuario, setIdUsuario] = useState('');
  const [userData, setUserData] = useState(null);
  const [aulas, setAulas] = useState({}); // Nuevo estado para almacenar los nombres de las aulas

  const navigate = useNavigate();

  const handleVerDetalles = (id) => {
    navigate('/docente/detallesNotificacion', { state: { id } });
  };

  const fetchNotificaciones = async () => {
    const response = await fetch('http://localhost:8000/api/notificaciones'); // Ajusta la URL de tu API
    const data = await response.json();

    const solicitudesData = {};
    const aulasData = {};
    const filteredNotificaciones = [];

    for (const notificacion of data) {
      if (!solicitudesData[notificacion.id_solicitud]) {
        const solicitud = await fetchSolicitud(notificacion.id_solicitud);
        solicitudesData[notificacion.id_solicitud] = solicitud;

        if (solicitud.id_user === idUsuario) {
          filteredNotificaciones.push(notificacion);

          const aulaId = solicitud.id_aula;
          if (!aulasData[aulaId]) {
            const aula = await fetchAula(aulaId);
            aulasData[aulaId] = aula.nombreAulas;
          }
        }
      }
    }

    setNotificaciones(filteredNotificaciones);
    setSolicitudes(solicitudesData);
    setAulas(aulasData); // Actualizar el estado de aulas
  };

  const fetchSolicitud = async (idSolicitud) => {
    const response = await fetch(`http://localhost:8000/api/solicitud/${idSolicitud}`);
    const data = await response.json();
    return data.data;
  };

  const fetchAula = async (idAula) => {
    const response = await fetch(`http://localhost:8000/api/aula/${idAula}`);
    const data = await response.json();
    return data.data;
  };

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('user_data');
    if (userDataFromStorage) {
      const userData = JSON.parse(userDataFromStorage);
      setUserData(userData);
      setIdUsuario(userData.id);
    }
  }, []);

  useEffect(() => {
    if (idUsuario) {
      fetchNotificaciones();
    }
  }, [idUsuario]);

  return (
    <CContainer className="px-4">
      <CRow>
        <CCol>
          <h1 style={{ fontSize: '1.7rem' }}>Lista de Notificaciones</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}></CCol>
      </CRow>
      <br />
      <CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Solicitud</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {notificaciones.map((notificacion) => (
              <CTableRow key={notificacion.id}>
                <CTableDataCell>Solicitud para el Ambiente {aulas[solicitudes[notificacion.id_solicitud]?.id_aula]}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleVerDetalles(notificacion.id)}>Ver Detalles</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CRow>
    </CContainer>
  );
}

export default Notificacion;