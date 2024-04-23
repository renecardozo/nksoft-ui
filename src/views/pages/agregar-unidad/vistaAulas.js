import React, { useState, useEffect } from 'react';
import { CListGroup, CListGroupItem, CCol, 
    CRow,CCardTitle, CCardText, CCard, CTableRow,
    CCardBody, CCardHeader, CButton, CCardGroup, CTableHeaderCell,
 CCardSubtitle, CTableHead,CTableBody } from '@coreui/react';
import { useParams } from 'react-router-dom';
import { getAulasPorUnidad } from './servicios';

const vistaAulas = () => {
    const { unidadId } = useParams();
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        const obtenerAulas = async () => {
            try {
                const aulasData = await getAulasPorUnidad(unidadId); // Llama a la función con el ID de la unidad
                setAulas(aulasData);
            } catch (error) {
                console.error('Error al obtener las aulas:', error);
            }
        };

        obtenerAulas();
    }, [unidadId]);

    return (
        <div className="container">
        <CCard>
        <CCardHeader>
                            <h3>Aulas de la unidad</h3>
                        </CCardHeader>
        <CListGroup>
      
            <CListGroupItem header>
                <div className="row">
                    <div className="col">Nombre del aula</div>
                    <div className="col">Capacidad (alumnos)</div>
                </div>
            </CListGroupItem>
            {aulas.map((aula) => (
                <CListGroupItem key={aula.id}>
                    <div className="row">
                        <div className="col">{aula.nombreAulas}</div>
                        <div className="col">{aula.capacidadAulas}</div>
                    </div>
                </CListGroupItem>
            ))}
        </CListGroup>
        </CCard>
        
    </div>
    );
};

export default vistaAulas;
