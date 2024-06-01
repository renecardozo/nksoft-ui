import React, { useEffect, useState } from 'react';
import { getLogs, getRoles } from './servicios'; 
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
} from "@coreui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Bitacora() {
  const [logs, setLogs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFecha, setSelectedFecha] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getLogs();
        setLogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener los registros de la bitácora:', error);
        setLogs([]);
      }
    };

    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        console.log("Roles obtenidos:", data); // Imprimir los roles en la consola
        setRoles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
        setRoles([]);
      }
    };

    fetchLogs();
    fetchRoles();
  }, []);

  const handleUsuarioChange = (e) => {
    setSelectedUsuario(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleFechaChange = (date) => {
    setSelectedFecha(date);
  };

  return (
    <div className="container">
      <CCard>
        <CCardHeader>
          <h4>Bitácora</h4>
        </CCardHeader>
        <CCardBody>
          <div className="row align-items-center">
            <div className="col-md-4 mb-3">
              <CFormSelect value={selectedUsuario} onChange={handleUsuarioChange}>
                <option value="">Usuario</option>
                {/* Aquí irían las opciones específicas para filtrar por usuario */}
              </CFormSelect>
            </div>
            <div className="col-md-4 mb-3">
              <CFormSelect value={selectedRole} onChange={handleRoleChange}>
                <option value="">Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>{role.nombre}</option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-4 mb-3">
              <DatePicker
                className="form-control"
                selected={selectedFecha}
                onChange={handleFechaChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Fecha"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="table-responsive">
            <CTable bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Usuario</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Accion</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {logs.map((log, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{log.fecha}</CTableDataCell>
                    <CTableDataCell>{log.usuario}</CTableDataCell>
                    <CTableDataCell>{log.email}</CTableDataCell>
                    <CTableDataCell>{log.role}</CTableDataCell>
                    <CTableDataCell>{log.accion}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Bitacora;
