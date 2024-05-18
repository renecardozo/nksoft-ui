import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPeriodos, postSolicitud, getMaterias, getMateriasGrupos, getAulas } from './servicios';

function CrearReservas() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [userData, setUserData] = useState(null);
    const [materiasGrupos, setMateriasGrupos] = useState([]); 
    const [materias, setMaterias] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [grupos, setGrupos] = useState([]);
    const [gruposRelacionados, setGruposRelacionados] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(''); 
    const [cantidad, setCantidad] = useState('');
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState('');
    const [aulaSeleccionada, setAulaSeleccionada] = useState(''); // New state for selected classroom
    const [aulasDisponibles, setAulasDisponibles] = useState([]); // New state for available classrooms
    const [periodosSeleccionados, setPeriodosSeleccionados] = useState([]);
    const [periodosDisponibles, setPeriodosDisponibles] = useState([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');

    useEffect(() => {
        const fetchPeriodos = async () => {
            try {
                const data = await getPeriodos();
                const periodosFormateados = data.map((periodo, index) => ({
                    id: index + 1,
                    ...periodo,
                    nombreCompleto: `${periodo.horaInicio} - ${periodo.horaFin}`
                }));
                setPeriodosDisponibles(periodosFormateados);
            } catch (error) {
                console.error('Error al obtener los periodos:', error);
            }
        };

        fetchPeriodos();
    }, []);
    
    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMaterias();
                setMaterias(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Error al obtener las materias:', error);
                setMaterias([]); // Set an empty array on error
            }
        };

        fetchMaterias();
    }, []);
    
    useEffect(() => {
        const fetchMateriasGrupos = async () => { // Cambia a getMateriasGrupos
            try {
                const data = await getMateriasGrupos(); // Usa getMateriasGrupos
                setMateriasGrupos(data);
            } catch (error) {
                console.error('Error al obtener las materias y grupos:', error);
            }
        };

        fetchMateriasGrupos();
    }, []);
    
    useEffect(() => {
        if (materiaSeleccionada) {
            const grupos = materiasGrupos.filter(grupo => grupo.materiaId === parseInt(materiaSeleccionada));
            setGruposRelacionados(grupos);
        } else {
            setGruposRelacionados([]);
        }
    }, [materiaSeleccionada, materiasGrupos]);

    useEffect(() => {
        const fetchAulas = async () => {
            try {
                const data = await getAulas();
                console.log('Datos de aulas obtenidos:', data); // Log the data
                setAulasDisponibles(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Error al obtener las aulas:', error);
                setAulasDisponibles([]); // Set an empty array on error
            }
        };

        fetchAulas();
    }, []);
    
    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user_data');
        if (userDataFromStorage) {
            const userData = JSON.parse(userDataFromStorage);
            setUserData(userData);
            setNombreUsuario(userData.name);
        }
    }, []);

    const handleRegistro = async () => {
        try {
            const data = {
                id_user: userData.id, // Asumiendo que userData contiene la información del usuario
                id_materia: parseInt(materiaSeleccionada),
                id_horario: parseInt(periodoSeleccionado),
                aula: aulaSeleccionada,
                fecha_hora_reserva: fecha,
                cantidad_estudiantes: parseInt(cantidad),
                motivo_reserva: motivo,
                observaciones: document.getElementById('observaciones').value
            };
            await postSolicitud(data);
            // Restablecer los estados después de enviar la solicitud
            setMateriaSeleccionada('');
            setGrupoSeleccionado('');
            setCantidad('');
            setMotivo('');
            setFecha('');
            setAulaSeleccionada('');
            setPeriodosSeleccionados([]);
            alert('Reserva registrada correctamente');
        } catch (error) {
            console.error('Error al registrar la reserva:', error);
            alert('Ocurrió un error al registrar la reserva. Por favor, inténtelo de nuevo.');
        }
    };

    

    const handleAgregarPeriodo = () => {
        if (!periodoSeleccionado) {
            alert('Debe seleccionar un período primero.');
            return;
        }

        if (periodosSeleccionados.some(periodo => periodo.id === parseInt(periodoSeleccionado))) {
            alert('Este período ya ha sido seleccionado.');
            return;
        }

        const periodo = periodosDisponibles.find(p => p.id === parseInt(periodoSeleccionado));
        setPeriodosSeleccionados([...periodosSeleccionados, periodo]);
        setPeriodoSeleccionado('');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <div className="card-header">
                            <h3 className="mb-0">Solicitud de registro de aula</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="nombre" className="fw-bold">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        className="form-control"
                                        value={nombreUsuario}
                                        disabled
                                    />
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="materia" className="fw-bold">Materia</label>
                                            <select
                                                id="materia"
                                                className="form-select"
                                                value={materiaSeleccionada}
                                                onChange={(e) => {
                                                    setMateriaSeleccionada(e.target.value);
                                                    const grupos = materias.find(materia => materia.id === e.target.value)?.grupos || [];        
                                                    setGruposRelacionados(grupos);
                                                }}
                                                placeholder="Seleccione la materia"
                                            >
                                                <option value="">Seleccione la materia</option>
                                                    {Array.isArray(materias) ? (
                                                      materias.map(materia => (
                                                        <option key={materia.id} value={materia.id}>{materia.materia}</option>
                                                         ))
                                                        ) : (
                                                             <  option value="">No hay materias disponibles</option>
                                                        )}

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="grupos" className="fw-bold">Grupos de la materia</label>
                                            <select
                                                id="grupo"
                                                className="form-select"
                                                value={grupoSeleccionado}
                                                onChange={(e) => setGrupoSeleccionado(e.target.value)}
                                                placeholder="Seleccione el grupo"
                                            >
                                                <option value="">Seleccione el grupo</option>
                                                {gruposRelacionados.map(grupo => (
                                                    <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>                                          
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="cantidad" className="fw-bold">Número estimado de estudiantes</label>
                                            <input
                                                type="text"
                                                id="cantidad"
                                                className="form-control"
                                                value={cantidad}
                                                onChange={(e) => setCantidad(e.target.value)}
                                                placeholder="Ingrese el número estimado de estudiantes"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="motivo" className="fw-bold">Motivo</label>
                                            <select
                                                id="motivo"
                                                className="form-select"
                                                value={motivo}
                                                onChange={(e) => setMotivo(e.target.value)}
                                            >
                                                <option value="">Seleccione un motivo</option>
                                                <option value="Clase">Clases</option>
                                                <option value="Examen">Examen</option>
                                                <option value="Reunión">Reunión</option>
                                                <option value="Conferencia">Conferencia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="fecha" className="fw-bold">Fecha</label>
                                            <input
                                                type="date"
                                                id="fecha"
                                                className="form-control"
                                                value={fecha}
                                                onChange={(e) => setFecha(e.target.value)}
                                                min={new Date().toISOString().split("T")[0]} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="aula" className="fw-bold">Aula</label>
                                            <select
                                                id="aula"
                                                className="form-select"
                                                value={aulaSeleccionada}
                                                onChange={(e) => setAulaSeleccionada(e.target.value)}
                                            >
                                                <option value="">Seleccione un aula</option>
                                                {aulasDisponibles.map(aula => (
                                                    <option key={aula.id} value={aula.id}>{aula.nombreAulas}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label htmlFor="periodo" className="fw-bold">Período</label>
                                    <div className="d-flex align-items-center">
                                        <select
                                            id="periodo"
                                            className="form-select"
                                            value={periodoSeleccionado}
                                            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                                        >
                                            <option value="">Seleccione un período</option>
                                            {periodosDisponibles
                                                .filter(periodo => !periodosSeleccionados.some(p => p.id === periodo.id))
                                                .map(periodo => (
                                                    <option key={periodo.id} value={periodo.id}>{periodo.nombreCompleto}</option>
                                                ))}
                                        </select>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleAgregarPeriodo}
                                            style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
                                        >
                                            Agregar Período
                                        </button>
                                    </div>
                                </div>
                                
                                {periodosSeleccionados.length > 0 && (
                                    <div>
                                        <p>Períodos seleccionados:</p>
                                        <ul>
                                            {periodosSeleccionados.map(periodo => (
                                                <li key={periodo.id}>{`${periodo.horaInicio} - ${periodo.horaFin}`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div className="form-group mb-3">
                                    <fieldset>
                                        <legend className="fw-bold">Observaciones</legend>
                                        <div className="form-group mb-3">
                                            <textarea
                                                id="observaciones"
                                                className="form-control"
                                                rows="3"
                                                placeholder="Ingrese observaciones adicionales"
                                            ></textarea>
                                        </div>
                                    </fieldset>
                                </div>
                                
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary me-2"
                                        onClick={handleRegistro}
                                    >
                                        Registrar Reserva
                                    </button>
                                    <Link to="/" className="btn btn-primary">
                                        Volver
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearReservas;
