import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CContainer,
    CButton,
  } from '@coreui/react'
function detallesNotificacion() {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <div className="card-header">
                            <h3 className="mb-0">Notificación</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>Razón de Solicitud: </strong>Examén</p>
                            <p><strong>Ambiente: </strong>624</p>
                            <div className="row">
                                <div className="col-auto">
                                    <p><strong>Materia: </strong>Cálculo</p>
                                </div>
                                <div className="col-auto">
                                    <p><strong>Grupo: </strong>2</p>
                                </div>
                            </div>
                            <p><strong>Fecha de Reserva: </strong>18-05-2024</p>
                            <p><strong>Horario: </strong>14:15-15:45</p>
                            <p><strong>Estado de la solicitud: </strong> Rechazado</p>
                            <p>Debido a que el ambiente solicitado está ocupado, por lo tanto se sugiere al docente usar el ambiente 625</p>
                        </div>
                        
                    </div>
                    <CRow>
                        <CCol>
                            <CButton onClick={() => navigate('/docente/notificacion')} color="primary" className="mt-3">
                            Volver
                            </CButton>
                        </CCol>
                    </CRow>
                </div>    
            </div>
        </div>
    );
}

export default detallesNotificacion;
