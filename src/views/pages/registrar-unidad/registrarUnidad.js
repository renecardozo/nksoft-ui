import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilClock, cilText, cilBuilding, cilPlus, cilMinus } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { postUnidad } from './servicios';
import { getDepartamento } from '../agregar-departamento/servicios';

const RegistrarUnidad = () => {
    const navigate = useNavigate();
    const [nombreUnidades, setNombreUnidades] = useState('');
    const [horaAperturaUnidades, setHoraDeApertura] = useState('');
    const [horaCierreUnidades, setHoraDeCierre] = useState('');
    const [nombreDepartamentos, setNombreDepartamentos] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [aulas, setAulas] = useState([{ nombre: '', capacidad: '' }]);

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

    const guardarUnidad = async () => {
        try {
            if (nombreUnidades.trim() === '' || !departamentoSeleccionado || !departamentoSeleccionado.id) {
                alert('Error: llenar todos los campos');
                return;
            }

            const nuevaUnidad = {
                nombreUnidades,
                horaAperturaUnidades,
                horaCierreUnidades,
                departamento_id: departamentoSeleccionado.id,
                aulas: aulas.filter(aula => aula.nombre.trim() !== '' && aula.capacidad.trim() !== '') 
            };

            await postUnidad(nuevaUnidad);
            setNombreUnidades('');
            setHoraDeApertura('');
            setHoraDeCierre('');
            setDepartamentoSeleccionado('');
            setAulas([{ nombre: '', capacidad: '' }]);
        } catch (error) {
            alert(error.message);
        }
    };

    const agregarAula = () => {
        setAulas([...aulas, { nombre: '', capacidad: '' }]);
    };

    const eliminarAula = (index) => {
        const nuevasAulas = [...aulas];
        nuevasAulas.splice(index, 1);
        setAulas(nuevasAulas);
    };

    const handleNombreAulaChange = (index, value) => {
        const nuevasAulas = [...aulas];
        nuevasAulas[index].nombre = value;
        setAulas(nuevasAulas);
    };

    const handleCapacidadAulaChange = (index, value) => {
        const nuevasAulas = [...aulas];
        nuevasAulas[index].capacidad = value;
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

                                    {/* Campos de la unidad */}
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilText} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Nombre"
                                            autoComplete="nombre"
                                            value={nombreUnidades}
                                            onChange={(e) => setNombreUnidades(e.target.value)}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            value={departamentoSeleccionado ? departamentoSeleccionado.id : ''}
                                            onChange={(e) => {
                                                const selectedDept = departamentos.find(dep => dep.id === parseInt(e.target.value));
                                                console.log('Departamento seleccionado:', selectedDept);
                                                setDepartamentoSeleccionado(selectedDept);
                                            }}
                                        >
                                            <option value="">Selecciona un departamento</option>
                                            {departamentos.map(dept => (
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
                                        <CFormInput
                                            placeholder="Hora de apertura"
                                            autoComplete="Hora de apertura"
                                            value={horaAperturaUnidades}
                                            onChange={(e) => setHoraDeApertura(e.target.value)}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilClock} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Hora de cierre"
                                            autoComplete="Hora de cierre"
                                            value={horaCierreUnidades}
                                            onChange={(e) => setHoraDeCierre(e.target.value)}
                                        />
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
                                                            value={aula.nombre}
                                                            onChange={(e) => handleNombreAulaChange(index, e.target.value)}
                                                        />
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <CFormInput
                                                            placeholder={`Capacidad del aula ${index + 1}`}
                                                            autoComplete="capacidad"
                                                            value={aula.capacidad}
                                                            onChange={(e) => handleCapacidadAulaChange(index, e.target.value)}
                                                        />
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
                                        <CButton color="primary" onClick={agregarAula}>
                                            <CIcon icon={cilPlus} /> Agregar Aula
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
