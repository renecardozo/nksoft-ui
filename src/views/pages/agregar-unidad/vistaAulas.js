
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCard, CTableDataCell, CCardBody, CCardHeader, CContainer, CRow, CCol, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';
import { getAulasPorUnidad, agregarAula, actualizarAula, getAulas } from './servicios';
import CIcon from '@coreui/icons-react';
import { cilPen } from '@coreui/icons';

const VistaAulas = () => {
    const { unidadId } = useParams();
    const [aulas, setAulas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreNuevaAula, setNombreNuevaAula] = useState('');
    const [capacidadNuevaAula, setCapacidadNuevaAula] = useState('');
    const [aulaEditandoId, setAulaEditandoId] = useState(null); 
    const [nombreAulaEditando, setNombreAulaEditando] = useState('');
    const [capacidadAulaEditando, setCapacidadAulaEditando] = useState('');

    useEffect(() => {
        const obtenerAulas = async () => {
            try {
                if (unidadId) {
                    const aulasData = await getAulasPorUnidad(unidadId);
                    setAulas(aulasData);
                } else {
                    console.error('ID de unidad no válido:', unidadId);
                }
            } catch (error) {
                console.error('Error al obtener las aulas:', error);
            }
        };
    
        if (unidadId !== null) {
            obtenerAulas();
        }
    }, [unidadId]);
    
    const handleMostrarFormulario = () => {
        setMostrarFormulario(true);
    };

    const handleAgregarAula = async () => {
        try {
            const capacidad = parseInt(capacidadNuevaAula);
    
            if (isNaN(capacidad)) {
                alert('Por favor, ingrese una capacidad válida.');
                return;
            }
    
            if (capacidad < 10 || capacidad > 600) {
                alert('Por favor, ingrese una capacidad entre 10 y 600.');
                return;
            }
    
            const todasLasAulas = await getAulas(); // Obtener todas las aulas registradas en la base de datos
            const aulaExistente = todasLasAulas.find(aula => aula.nombreAulas === nombreNuevaAula);
    
            if (aulaExistente) {
                alert('El nombre del aula ya está en uso. Por favor, ingrese un nombre diferente.');
                return;
            }
    
            await agregarAula({
                nombreAulas: nombreNuevaAula,
                capacidadAulas: capacidad.toString(),
                unidad_id: unidadId
            });
            alert('Aula agregada correctamente');
            const aulasData = await getAulasPorUnidad(unidadId);
            setAulas(aulasData);
            setNombreNuevaAula('');
            setCapacidadNuevaAula('');
            setMostrarFormulario(false);
        } catch (error) {
            console.error('Error al agregar el aula:', error);
            alert('Error al agregar el aula. Por favor, inténtelo de nuevo.');
        }
    };
    
    const handleEditarAula = (aulaId) => { 

        const aula = aulas.find(aula => aula.id === aulaId);
        if (aula) {
            setAulaEditandoId(aulaId);
            setNombreAulaEditando(aula.nombreAulas);
            setCapacidadAulaEditando(aula.capacidadAulas);
        } else {
            console.error('No se encontró el aula con el ID proporcionado:', aulaId);
        }
    };

    const handleGuardarEdicionAula = async () => {
        try {
            const capacidad = parseInt(capacidadAulaEditando);
            const todasLasAulas = await getAulas(); // Obtener todas las aulas registradas en la base de datos
            const aulaExistente = todasLasAulas.find(aula => aula.nombreAulas === nombreAulaEditando && aula.id !== aulaEditandoId); // Verificar si el nombre del aula editada ya existe, excluyendo el aula que se está editando
    
            if (aulaExistente) {
                alert('El nombre del aula ya está en uso. Por favor, ingrese un nombre diferente.');
                return;
            }
    
            if (isNaN(capacidad)) {
                alert('Por favor, ingrese una capacidad válida.');
                return;
            }
    
            if (capacidad < 10 || capacidad > 600) {
                alert('Por favor, ingrese una capacidad entre 10 y 600.');
                return;
            }
    
            await actualizarAula(aulaEditandoId, {
                nombreAulas: nombreAulaEditando,
                capacidadAulas: capacidad.toString()
            });
            alert('Aula actualizada correctamente');
            const aulasData = await getAulasPorUnidad(unidadId);
            setAulas(aulasData);
            setAulaEditandoId(null);
            setNombreAulaEditando('');
            setCapacidadAulaEditando('');
        } catch (error) {
            console.error('Error al actualizar el aula:', error);
            alert('Error al actualizar el aula. Por favor, inténtelo de nuevo.');
        }
    };
    
    
    return (
        <CContainer>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol>
                            <h3>Aulas de la unidad</h3>
                        </CCol>
                        <CCol xs="auto" className="ml-auto">
                            <CButton color="primary" onClick={handleMostrarFormulario}>Agregar Aula</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    {mostrarFormulario && (
                        <div className="mb-3">
                            <CRow>
                                <CCol>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del aula"
                                        value={nombreNuevaAula}
                                        onChange={(e) => setNombreNuevaAula(e.target.value)} />
                                </CCol>
                                <CCol>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Capacidad del aula"
                                        value={capacidadNuevaAula}
                                        onChange={(e) => setCapacidadNuevaAula(e.target.value)} />
                                </CCol>
                                <CCol xs="auto">
                                    <CButton color="primary" onClick={handleAgregarAula}>Guardar</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    )}
                    <CTable striped bordered responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Nombre del aula</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Capacidad (alumnos)</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Editar</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {aulas.map((aula, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell scope="row">
                                        {aulaEditandoId === aula.id ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nombreAulaEditando}
                                                onChange={(e) => setNombreAulaEditando(e.target.value)} />
                                        ) : (
                                            aula.nombreAulas
                                        )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {aulaEditandoId === aula.id ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={capacidadAulaEditando}
                                                onChange={(e) => setCapacidadAulaEditando(e.target.value)} />
                                        ) : (
                                            aula.capacidadAulas
                                        )}
                                    </CTableDataCell>
                                    <CTableHeaderCell>
                                        {aulaEditandoId === aula.id ? (
                                            <CButton color="primary" onClick={handleGuardarEdicionAula}>Guardar</CButton>
                                        ) : (
                                            <CButton color="primary" onClick={() => handleEditarAula(aula.id)}><CIcon icon={cilPen} /></CButton>
                                        )}
                                    </CTableHeaderCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default VistaAulas;