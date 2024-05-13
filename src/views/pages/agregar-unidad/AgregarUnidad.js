import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CTable, CTableDataCell, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';
import { cilPlus, cilRoom, cilPen } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getUnidad, actualizarUnidad, getAulasPorUnidad } from './servicios';
import { Link } from 'react-router-dom';
import { horaFin, horaInicio } from '../registrar-unidad/servicios';

const Unidades = () => {
    const [unidades, setUnidades] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [nombreEditado, setNombreEditado] = useState('');
    const [horaAperturaEditada, setHoraAperturaEditada] = useState('');
    const [horaCierreEditada, setHoraCierreEditada] = useState('');
    const [horasApertura, setHorasApertura] = useState([]); // Estado para almacenar las horas de apertura
    const [horasCierre, setHorasCierre] = useState([]); // Estado para almacenar las horas de cierre

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

    useEffect(() => {
        const cargarHorasDeAperturaYCierre = async () => {
            try {
                const horaInicioData = await horaInicio();
                const horaFinData = await horaFin();
                setHorasApertura(horaInicioData);
                setHorasCierre(horaFinData);
            } catch (error) {
                console.error('Error al cargar las horas de apertura y cierre:', error);
            }
        };
        cargarHorasDeAperturaYCierre();
    }, []);

    const handleEditar = (unidad) => {
        setEditandoId(unidad.id);
        setNombreEditado(unidad.nombreUnidades);
        setHoraAperturaEditada(unidad.horaAperturaUnidades);
        setHoraCierreEditada(unidad.horaCierreUnidades);
    };

    const handleGuardarEdicion = async (unidadId) => {
        // Verificar si el nombre editado ya existe en alguna unidad
        const unidadExistente = unidades.find(unidad => unidad.nombreUnidades === nombreEditado && unidad.id !== unidadId);
        if (unidadExistente) {
            alert('El nombre de la unidad ya está en uso. Por favor, ingrese un nombre diferente.');
            return;
        }
        if (horaAperturaEditada >= horaCierreEditada){
            alert('La hora de cierre debe ser posterior a la hora de apertura, por favor ingrese otra otra');
            return;
        }
        if(nombreEditado === ''){
            alert("Por favor ingrese un nombre");

        }

        try {
            // Actualizar la unidad en el backend
            await actualizarUnidad(unidadId, {
                nombreUnidades: nombreEditado,
                horaAperturaUnidades: horaAperturaEditada,
                horaCierreUnidades: horaCierreEditada
            });

            // Actualizar el estado local de la unidad
            const unidadesActualizadas = unidades.map(unidad => {
                if (unidad.id === unidadId) {
                    return {
                        ...unidad,
                        nombreUnidades: nombreEditado,
                        horaAperturaUnidades: horaAperturaEditada,
                        horaCierreUnidades: horaCierreEditada
                    };
                }
                return unidad;
            });
            setUnidades(unidadesActualizadas);

            // Restablecer los valores de edición
            setEditandoId(null);
            setNombreEditado('');
            setHoraAperturaEditada('');
            setHoraCierreEditada('');

            // Mostrar mensaje de éxito
            alert('Unidad actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la unidad:', error);
            alert('Ocurrió un error al actualizar la unidad. Por favor, inténtelo de nuevo.');
        }
    };

    const renderDepartamentos = (departamentos) => {
        if (!departamentos) {
            return "Ninguno";
        } else {
            return departamentos.map(departamento => departamento.nombreDepartamentos).join(", ");
        }
    };

    const handleVerAulas = async (unidadId) => {
        try {
            const aulasData = await getAulasPorUnidad(unidadId);
            console.log('Aulas asociadas a la unidad:', aulasData);
        } catch (error) {
            console.error('Error al obtener las aulas asociadas:', error);
        }
    };

    const renderRow = (unidad) => {
        const editando = editandoId === unidad.id;
        return (
            <CTableRow key={unidad.id}>
                <CTableDataCell>
                    <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {
                            const unidadesActualizadas = unidades.map(u => {
                                if (u.id === unidad.id) {
                                    return { ...u, habilitado: !u.habilitado };
                                }
                                return u;
                            });
                            setUnidades(unidadesActualizadas);
                        }}
                        disabled={editando}
                    />
                </CTableDataCell>
                <CTableDataCell>{editando ? (
                    <input
                        type="text"
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                    />
                ) : (
                    unidad.nombreUnidades
                )}</CTableDataCell>
                <CTableDataCell>{unidad.nombreDepartamentos}</CTableDataCell>
                <CTableDataCell>
                    {editando ? (
                        <select
                            className="form-select"
                            value={horaAperturaEditada}
                            onChange={(e) => setHoraAperturaEditada(e.target.value)}
                        >
                            <option value="">Seleccionar hora de apertura</option>
                            {horasApertura.map((hora, index) => (
                                <option key={index} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </select>
                    ) : (
                        unidad.horaAperturaUnidades
                    )}
                </CTableDataCell>
                <CTableDataCell>
                    {editando ? (
                        <select
                            className="form-select"
                            value={horaCierreEditada}
                            onChange={(e) => setHoraCierreEditada(e.target.value)}
                        >
                            <option value="">Seleccionar hora de cierre</option>
                            {horasCierre.map((hora, index) => (
                                <option key={index} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </select>
                    ) : (
                        unidad.horaCierreUnidades
                    )}
                </CTableDataCell>
    
                <CTableDataCell>
                    <Link to={`/administracion/unidades/${unidad.id}/aulas`} className="btn btn-primary ms-2" onClick={() => handleVerAulas(unidad.id)}>
                        <CIcon icon={cilRoom} />
                    </Link>
                </CTableDataCell>
                <CTableDataCell>
                    {editando ? (
                        <CButton color="primary" onClick={() => handleGuardarEdicion(unidad.id)}>Guardar</CButton>
                    ) : (
                        <CButton color="primary" onClick={() => handleEditar(unidad)}> <CIcon icon={cilPen} /></CButton>
                    )}
                </CTableDataCell>
            </CTableRow>
        );
    };
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <CCard>
                        <CCardBody>
                            <div className="d-flex justify-content-between mb-3">
                                <h3>Lista de Unidades</h3>
                                <Link to="/administracion/registrar-unidad" className="btn btn-primary">
                                    Agregar Unidad Nueva
                                </Link>
                            </div>
                            <CTable striped bordered responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Habilitado</CTableHeaderCell>
                                        <CTableHeaderCell>Nombre</CTableHeaderCell>
                                        <CTableHeaderCell>Departamento</CTableHeaderCell>
                                        <CTableHeaderCell>Hora de Apertura</CTableHeaderCell>
                                        <CTableHeaderCell>Hora de Cierre</CTableHeaderCell>
                                        <CTableHeaderCell>Ver aulas</CTableHeaderCell>
                                        <CTableHeaderCell>Editar</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {unidades.map((unidad) => renderRow(unidad))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </div>
            </div>
        </div>
    );
};

export default Unidades;
