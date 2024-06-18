import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CTable,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react';
import Select from 'react-select';
import { getMaterias, saveMateriaGrupo, getMateriasDocente } from './servicios';

function VerMaterias() {
  const { usuarioId } = useParams(); 
  const [showAssignFields, setShowAssignFields] = useState(false);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [grupo, setGrupo] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materiasDocente, setMateriasDocente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [materiasCargadas, setMateriasCargadas] = useState(false);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await getMaterias();
        console.log('Materias obtenidas:', data);
        setMaterias(
          data.map((materia) => ({
            value: materia.id,
            label: materia.materia,
            codigo: materia.codigo,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las materias:', error);
        setError('Error al obtener las materias');
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  useEffect(() => {
    const fetchMateriasDocente = async () => {
      try {
        const data = await getMateriasDocente(usuarioId);
        console.log('Materias del docente obtenidas:', data);
        setMateriasDocente(data);
        setMateriasCargadas(true);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las materias del docente:', error);
        setError('Error al obtener las materias del docente');
        setLoading(false);
      }
    };

    fetchMateriasDocente();
  }, [usuarioId]);

  const handleAsignarMateria = () => {
    setShowAssignFields(true);
  };

  const handleSelectChange = (selectedOption) => {
    setMateriaSeleccionada(selectedOption);
  };

  const handleChangeGrupo = (e) => {
    setGrupo(e.target.value);
  };

  const handleGuardar = async () => {
    if (!materiaSeleccionada || !grupo) {
      console.error('Debe seleccionar una materia y proporcionar un grupo');
      return;
    }

    const { value: materia_id, label: materia, codigo } = materiaSeleccionada;
    console.log('Datos a guardar:', usuarioId, materia_id, grupo);

    try {
      await saveMateriaGrupo({
        docente_id: usuarioId,
        materia_id: materia_id,
        grupo: grupo,
      });

      console.log(`Nueva materia ${materia} asignada correctamente para el docente ${usuarioId}`);

      const newMateria = {
        id: Date.now(), // Genera un ID único temporal
        nombre: materiaSeleccionada.label,
        codigo: materiaSeleccionada.codigo,
        grupo: grupo,
      };

      setMateriasDocente([...materiasDocente, newMateria]);

      // Limpiar campos y estados después de guardar
      setMateriaSeleccionada(null);
      setGrupo('');
      setShowAssignFields(false);
    } catch (error) {
      console.error('Error al asignar la nueva materia:', error);
    }
  };

  const handleCancelar = () => {
    setMateriaSeleccionada(null);
    setGrupo('');
    setShowAssignFields(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Materias del docente {usuarioId}</h3>
                <button className="btn btn-primary" onClick={handleAsignarMateria}>
                  Asignar materia
                </button>
              </div>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Código</CTableHeaderCell>
                    <CTableHeaderCell>Grupo</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {showAssignFields && (
                    <CTableRow>
                      <CTableDataCell>
                        <Select
                          name="materia"
                          options={materias}
                          placeholder="Seleccione una materia"
                          onChange={handleSelectChange}
                          value={materiaSeleccionada}
                          menuPosition="fixed" 
                          styles={{
                            menu: (provided) => ({
                              ...provided,
                              width: '100%', 
                              zIndex: 9999, 
                            }),
                            menuList: (provided) => ({
                              ...provided,
                              maxHeight: '200px',
                              overflowY: 'auto', 
                            }),
                          }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          name="codigo"
                          placeholder="Código"
                          value={materiaSeleccionada ? materiaSeleccionada.codigo : ''}
                          disabled
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          name="grupo"
                          placeholder="Grupo"
                          value={grupo}
                          onChange={handleChangeGrupo}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex">
                          <button className="btn btn-primary me-2" onClick={handleGuardar}>
                            Guardar
                          </button>
                          <button className="btn btn-secondary" onClick={handleCancelar}>
                            Cancelar
                          </button>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {materiasDocente.length > 0 ? (
                    materiasDocente.map((materia) => (
                      <CTableRow key={materia.id}>
                        <CTableDataCell style={{ width: '40%' }}>{materia.nombre}</CTableDataCell>
                        <CTableDataCell>{materia.codigo}</CTableDataCell>
                        <CTableDataCell>{materia.grupo}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex">
                            <button className="btn btn-primary me-2" onClick={() => handleEditarMateria(materia.id)}>
                              Editar
                            </button>
                            <button className="btn btn-danger" onClick={() => handleEliminarMateria(materia.id)}>
                              Eliminar
                            </button>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="4" className="text-center">
                        No hay materias asignadas
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            <div className="text-center mt-3 mb-3">
              <Link to="/configurar/administrar" className="btn btn-primary">
                Volver
              </Link>
            </div>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default VerMaterias;
