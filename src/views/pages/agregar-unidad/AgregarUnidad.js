import React, { useState, useEffect } from 'react';
import { CListGroup, CListGroupItem, CCol, CRow, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react';
import { getUnidad } from './servicios';
import { Link } from 'react-router-dom';
import { getAulasPorUnidad } from './servicios';

const Unidades = () => {
    const [unidades, setUnidades] = useState([]);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);


    useEffect(() => {
        const obtenerUnidades = async () => {
            try {
                const unidadesData = await getUnidad();
                console.log("Datos de unidades:", unidadesData);
                const unidadesConDepartamento = unidadesData.map(unidad => ({
                    ...unidad,
                    nombreDepartamentos: unidad.departamento && unidad.departamento.nombreDepartamentos ? unidad.departamento.nombreDepartamentos : 'Ninguno'
                }));
                const unidadesOrdenadas = unidadesConDepartamento.sort((a, b) => a.nombreUnidades.localeCompare(b.nombreUnidades));
                setUnidades(unidadesOrdenadas);
            } catch (error) {
                console.error('Error al obtener las unidades:', error);
            }
        };
        
        
        obtenerUnidades();
    }, []);
    

    const handleVerAulas = async (unidadId) => {
        try {
            const aulasData = await getAulasPorUnidad(unidadId); 
            console.log('Aulas asociadas a la unidad:', aulasData);
            setUnidadSeleccionada(unidadId); // Guardar la unidad seleccionada
        } catch (error) {
            console.error('Error al obtener las aulas asociadas:', error);
        }
    };

    return (
        <div className="container">
            <CRow>
                <CCol sm={6} md={8}></CCol>
                <CCol xs={6} md={4}>
                    <div className="d-grid">
                        <Link to="/administracion/registrar-unidad" className="btn btn-primary">
                            Unidad nueva
                        </Link>
                    </div>
                </CCol>
            </CRow>
            <CRow className="justify-content-center">
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Lista de Unidades</h3>
                        </CCardHeader>
                        <CCardBody>
                            <CListGroup flush>
                                {unidades.map((unidad) => (
                                    <CListGroupItem key={unidad.id} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Nombre:</strong> {unidad.nombreUnidades}
                                            <br />
                                            <strong>Hora de Apertura:</strong> {unidad.horaAperturaUnidades}
                                            <br />
                                            <strong>Hora de Cierre:</strong> {unidad.horaCierreUnidades}
                                            <br />
                                            <strong>Asociado a:</strong> {unidad.nombreDepartamentos}
                                        </div>
                                        <div className="d-grid">
                                        <Link to={`/administracion/unidades/${unidad.id}/aulas`} className="btn btn-primary" onClick={() => handleVerAulas(unidad.id)}>
    Ver Aulas
</Link>
                                   </div>
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default Unidades;