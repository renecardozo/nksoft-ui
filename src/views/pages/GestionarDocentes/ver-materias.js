import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cilBook } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'
import { getMaterias, getMateriasGrupos, saveMateriaGrupo } from './servicios'
import Select from 'react-select'

function VerMaterias() {
  const [materias, setMaterias] = useState([])
  const [showEditFields, setShowEditFields] = useState(false)
  const [editableMateria, setEditableMateria] = useState({
    nombre: '',
    codigo: '',
    grupos: '',
  })
  const [materiasGrupos, setMateriasGrupos] = useState([])
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('')
  const [gruposRelacionados, setGruposRelacionados] = useState([])
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('')
  const options = materias.map((materia) => ({
    value: materia.id,
    label: materia.materia,
  }))
  const [codigoMateriaSeleccionada, setCodigoMateriaSeleccionada] = useState('')

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await getMaterias()
        setMaterias(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error al obtener las materias:', error)
        setMaterias([])
      }
    }
    fetchMaterias()
  }, [])

  useEffect(() => {
    const fetchMateriasGrupos = async () => {
      try {
        const data = await getMateriasGrupos()
        setMateriasGrupos(data)
      } catch (error) {
        console.error('Error al obtener las materias y grupos:', error)
      }
    }
    fetchMateriasGrupos()
  }, [])

  useEffect(() => {
    if (materiaSeleccionada) {
      const grupos = materiasGrupos.filter(
        (grupo) => grupo.materiaId === parseInt(materiaSeleccionada),
      )
      setGruposRelacionados(grupos)
      const materiaSeleccionadaObj = materias.find(
        (materia) => materia.id === parseInt(materiaSeleccionada),
      )
      if (materiaSeleccionadaObj) {
        setCodigoMateriaSeleccionada(materiaSeleccionadaObj.codigo)
      }
    } else {
      setGruposRelacionados([])
      setCodigoMateriaSeleccionada('')
    }
  }, [materiaSeleccionada, materias, materiasGrupos])

  const handleAddMateria = () => {
    setShowEditFields(true)
  }

  const handleSave = async () => {
    setShowEditFields(false)
    const selectedMateriaGrupo = {
      materiaId: materiaSeleccionada,
      grupoId: grupoSeleccionado,
    }
    try {
      await saveMateriaGrupo(selectedMateriaGrupo)
      console.log('Materia y grupo guardados exitosamente')
    } catch (error) {
      console.error('Error al guardar la materia y grupo:', error)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Materias</h3>
                <button className="btn btn-primary" onClick={handleAddMateria}>
                  Asignar materia
                </button>
              </div>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Código</CTableHeaderCell>
                    <CTableHeaderCell>Grupos</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {showEditFields && (
                    <CTableRow>
                      <CTableDataCell style={{ width: '40%' }}>
                        <Select
                          options={options}
                          placeholder="Seleccione una materia..."
                          onChange={(selectedOption) => {
                            setMateriaSeleccionada(selectedOption.value)
                          }}
                          menuPosition="fixed"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          placeholder="Código"
                          value={codigoMateriaSeleccionada}
                          disabled
                          onChange={(e) => {
                            /* No necesitas hacer cambios aquí */
                          }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <Select
                          options={gruposRelacionados.map((grupo) => ({
                            value: grupo.id,
                            label: grupo.nombre,
                          }))}
                          placeholder="Seleccione un grupo..."
                          onChange={(selectedOption) => setGrupoSeleccionado(selectedOption.value)} // Actualizar directamente grupoSeleccionado
                          menuPosition="fixed"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <button className="btn btn-primary" onClick={handleSave}>
                          Guardar
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            <div className="text-center mt-3">
              <Link to="/configurar/administrar" className="btn btn-primary">
                Volver
              </Link>
            </div>
          </CCard>
        </div>
      </div>
    </div>
  )
}

export default VerMaterias
