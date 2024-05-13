import React, { useState, useEffect } from 'react';
import {CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, 
        CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilClock, cilText, cilBuilding, cilPlus, cilMinus } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { postUnidad, getUnidad, horaInicio, horaFin, getAulasPorUnidad, agregarAula } from './servicios'; 

const RegistrarUnidad = () => {
    const navigate = useNavigate();
    const [nombreUnidades, setNombreUnidades] = useState('');
    const [horaAperturaUnidades, setHoraDeApertura] = useState('');
    const [horaCierreUnidades, setHoraDeCierre] = useState('');
    const [nombreDepartamentos, setNombreDepartamentos] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [aulas, setAulas] = useState([{ nombreAulas: '', capacidadAulas: '' , unidad_id: null}]);
    const [horasApertura, setHorasApertura] = useState([]); 
    const [horasCierre, setHorasCierre] = useState([]);

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/departamentos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDepartamentos(data);
                } else {
                    console.error('Error al obtener departamentos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };
        obtenerDepartamentos();
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

    const guardarUnidad = async () => {
        try {
            // Verificar si se completaron los campos obligatorios
            if (nombreUnidades.trim() === '') {
                alert('Por favor complete el nombre de la unidad');
                return;
            }
            if (horaAperturaUnidades.trim() === '') {
                alert('Por favor seleccione una hora de apertura');
                return;
            }
            if (horaCierreUnidades.trim() === '') {
                alert('Por favor seleccione una hora de cierre');
                return;
            }
            if (horaCierreUnidades.trim() <= horaAperturaUnidades.trim()){
            alert('La hora de cierre debe ser posterior la hora de apertura, por favor seleccione un horario válido ');
                return;
            }

            const unidades = await getUnidad();
            const unidadExistente = unidades.find(unidad => unidad.nombreUnidades === nombreUnidades);
            if (unidadExistente) {
                alert('El nombre de la unidad ya se encuentra registrado, por favor ingrese otro');
                return;
            }
        
            const uniid = await postUnidad({
                nombreUnidades,
                horaAperturaUnidades,
                horaCierreUnidades,
                departamento_id: departamentoSeleccionado ? departamentoSeleccionado.id : null,
            });
        
            const aulasConUnidadId = aulas.map(aula => ({
                ...aula,
                unidad_id: uniid
            }));
        
            await Promise.all(aulasConUnidadId.map(async (aula) => {
                await agregarAula(aula);
            }));
        
            setNombreUnidades('');
            setHoraDeApertura('');
            setHoraDeCierre('');
            setDepartamentoSeleccionado(null);
            setAulas([{ nombreAulas: '', capacidadAulas: '' }]);
        
            alert('Se ha registrado la unidad exitosamente');
        } catch (error) {
            alert('Error al registrar la unidad: ' + error.message);
        }
    };
    
    const agregarNuevaAula = () => {
        setAulas([...aulas, { nombreAulas: '', capacidadAulas: '' }]);
    };

    const eliminarAula = (index) => {
        const nuevasAulas = [...aulas];
        nuevasAulas.splice(index, 1);
        setAulas(nuevasAulas);
    };

    const handleNombreAulaChange = (index, value) => {
        const nuevasAulas = [...aulas];
        nuevasAulas[index].nombreAulas = value;
        setAulas(nuevasAulas);
    };

    const handleCapacidadAulaChange = (index, value) => {
        const nuevasAulas = [...aulas];
        nuevasAulas[index].capacidadAulas = value;
        setAulas(nuevasAulas);
    };

    return (
        <div className="container">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Registrar unidad nueva</h1>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilText} />
                                        </CInputGroupText>
                                            <CFormInput
                                                placeholder="Nombre"
                                                autoComplete="nombre"
                                                value={nombreUnidades}
                                                onChange={(e) => setNombreUnidades(e.target.value)}/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            value={departamentoSeleccionado ? departamentoSeleccionado.id : ''}
                                            onChange={(e) => {
                                            const selectedDeptId = parseInt(e.target.value);
                                            const selectedDept = selectedDeptId !== -1 ? departamentos.find(dep => dep.id === selectedDeptId) : null;
                                            setDepartamentoSeleccionado(selectedDept);
                                         }}>
                                            <option value={-1}>Ninguno</option>
                                            {departamentos.sort((a, b) => a.nombreDepartamentos.localeCompare(b.nombreDepartamentos)).map(dept => (
                                            <option key={dept.id} value={dept.id}>
                                            {dept.nombreDepartamentos}
                                            </option>
                                             ))}
                                        </select>

                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilClock} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            value={horaAperturaUnidades}
                                            onChange={(e) => setHoraDeApertura(e.target.value)}>
                                            <option value="">Seleccionar hora de apertura</option>
                                            {horasApertura.map((hora, index) => (
                                                <option key={index} value={hora}>
                                                    {hora}
                                                </option>
                                            ))}
                                        </select>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilClock} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            value={horaCierreUnidades}
                                            onChange={(e) => setHoraDeCierre(e.target.value)}>
                                            <option value="">Seleccionar hora de cierre</option>
                                            {horasCierre.map((hora, index) => (
                                                <option key={index} value={hora}>
                                                    {hora}
                                                </option>
                                            ))}
                                        </select>
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="primary" onClick={guardarUnidad}>
                                            Registrar
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Agregar aulas</h1>
                                    <CTable striped>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>Nombre del Aula</CTableHeaderCell>
                                                <CTableHeaderCell>Capacidad</CTableHeaderCell>
                                                <CTableHeaderCell></CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {aulas.map((aula, index) => (
                                                <CTableRow key={index}>
                                                    <CTableDataCell>
                                                        <CFormInput
                                                            placeholder={`Nombre del aula ${index + 1}`}
                                                            autoComplete="nombre"
                                                            value={aula.nombreAulas}
                                                            onChange={(e) => handleNombreAulaChange(index, e.target.value)}
                                                        />
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <CFormInput
                                                            placeholder={`Capacidad del aula ${index + 1}`}
                                                            autoComplete="capacidad"
                                                            value={aula.capacidadAulas}
                                                            onChange={(e) => handleCapacidadAulaChange(index, e.target.value)}/>
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <CButton color="danger" onClick={() => eliminarAula(index)}>
                                                            Eliminar
                                                        </CButton>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            ))}
                                        </CTableBody>
                                    </CTable>
                                    <div className="d-grid mt-3">
                                        <CButton color="primary" onClick={agregarNuevaAula}>
                                            <CIcon icon={cilPlus} /> 
                                            Agregar Aula
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};
export default RegistrarUnidad;