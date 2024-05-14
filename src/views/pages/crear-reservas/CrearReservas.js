import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPeriodos } from './servicios';

function CrearReservas() {
    const [nombre, setNombre] = useState('');
    const [materia, setMateria] = useState('');
    const [grupo, setGrupo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [motivo, setMotivo] = useState(''); // Estado para motivo
    const [fecha, setFecha] = useState('');
    const [horario, setHorario] = useState('');
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

    const handleRegistro = async () => {
        try {
            // Aquí puedes realizar el registro con los períodos seleccionados
            console.log('Períodos seleccionados:', periodosSeleccionados);
            // Limpia los campos después de registrar la reserva
            setNombre('');
            setMateria('');
            setGrupo('');
            setCantidad('');
            setMotivo('');
            setFecha('');
            setHorario('');
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

        // Verifica si el periodo ya ha sido seleccionado
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
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ingrese el nombre del solicitante"
                                    />
                                </div>
                                
                                <div className="form-group mb-3 row">
                                    <div className="col">
                                        <label htmlFor="materia" className="fw-bold">Materia</label>
                                        <input
                                            type="text"
                                            id="materia"
                                            className="form-control"
                                            value={materia}
                                            onChange={(e) => setMateria(e.target.value)}
                                            placeholder="Ingrese la materia a reservar"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="grupo" className="fw-bold">Grupo</label>
                                        <input
                                            type="text"
                                            id="grupo"
                                            className="form-control"
                                            value={grupo}
                                            onChange={(e) => setGrupo(e.target.value)}
                                            placeholder="Ingrese el grupo de la materia"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Aula" className="fw-bold">Aula</label>
                                    <input
                                        type="text"
                                        id="aula"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setAula(e.target.value)}
                                        placeholder="Ingrese el aula que desea reservar"
                                    />
                                </div>
                                <div className="form-group mb-3 row">
                                    <div className="col">
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
                                    <div className="col">
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
                                            <option value="Reunión">Conferencia</option>                                        </select>
                                    </div>
                                </div>
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
                                
                                <div className="form-group mb-3">
                                    <label htmlFor="periodo" className="fw-bold">Período</label>
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
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary mb-3"
                                    onClick={handleAgregarPeriodo}
                                >
                                    Agregar Período
                                </button>
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
