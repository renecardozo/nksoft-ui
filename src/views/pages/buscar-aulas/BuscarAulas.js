import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead' // ES2015
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { getAulasByUnidad, getAllUnidades, getPeriodos, checkAvailability } from './service'
import { useNavigate } from 'react-router-dom'

import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'

function removeDuplicates(array, key) {
  return array.reduce((uniqueArray, currentItem) => {
    // Check if there is already an object with the same key value in uniqueArray
    const isDuplicate = uniqueArray.some((item) => item[key] === currentItem[key])

    // If not a duplicate, add it to the uniqueArray
    if (!isDuplicate) {
      uniqueArray.push(currentItem)
    }

    return uniqueArray
  }, [])
}

function BuscarAulas() {
  const [unidad, setUnidad] = useState([])
  const [unidades, setUnidades] = useState([])
  const [aula, setAula] = useState([])
  const [aulas, setAulas] = useState([])
  const [capacidad, setCapacidad] = useState([])
  const [capacidadList, setCapacidadList] = useState([])
  const [fecha, setFecha] = useState(Date.now())
  const [listResult, setListResult] = useState([])
  const [periodosSeleccionados, setPeriodosSeleccionados] = useState([])
  const [periodosDisponibles, setPeriodosDisponibles] = useState([])
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('')
  const navigate = useNavigate()
  const onBuscarAulasHandler = async (e) => {
    e.preventDefault()
    console.log('buscar')
    const data = {
      unidadId: unidad[0].id.toString(),
      aulaId: aula[0].id.toString(),
      aula: aula[0].label,
      capacidad: capacidad[0].label,
      fecha: new Date(fecha),
      periodos: periodosSeleccionados.map((item) => item.id),
    }
    try {
      const response = await checkAvailability(data)
      console.log(response)
      const uniqueArray = removeDuplicates(response.rooms, 'id')
      setListResult([...uniqueArray])
    } catch (error) {
      console.log(error)
    }
  }
  const makeNameUnits = (id) => {
    return unidades.find((unit) => unit.id == id).label
  }
  const fetchPeriodos = async () => {
    try {
      const data = await getPeriodos()
      const periodosFormateados = data.map((periodo, index) => ({
        id: index + 1,
        ...periodo,
        nombreCompleto: `${periodo.horaInicio} - ${periodo.horaFin}`,
      }))
      setPeriodosDisponibles(periodosFormateados)
    } catch (error) {
      console.error('Error al obtener los periodos:', error)
    }
  }

  const getAulas = async (unidadId) => {
    const listAulas = await getAulasByUnidad(unidadId)
    setAulas(
      listAulas.map((aula) => {
        return {
          id: aula.id,
          label: aula.nombreAulas,
        }
      }),
    )
    setCapacidadList(
      listAulas.map((aula) => {
        return {
          id: aula.id,
          label: aula.capacidadAulas,
        }
      }),
    )
  }
  const getUnidades = async () => {
    const listUnidades = await getAllUnidades()
    setUnidades(
      listUnidades.map((unidad) => {
        return {
          id: unidad.id,
          label: unidad.nombreUnidades,
        }
      }),
    )
  }
  const onHandlerSelectedUnidad = (selected) => {
    setUnidad(selected)
  }
  const handleAgregarPeriodo = () => {
    if (!periodoSeleccionado) {
      alert('Debe seleccionar un período primero.')
      return
    }

    if (periodosSeleccionados.some((periodo) => periodo.id === parseInt(periodoSeleccionado))) {
      alert('Este período ya ha sido seleccionado.')
      return
    }

    const periodo = periodosDisponibles.find((p) => p.id === parseInt(periodoSeleccionado))
    setPeriodosSeleccionados([...periodosSeleccionados, periodo])
    setPeriodoSeleccionado('')
  }
  const goToBookingRooms = (data) => {
    navigate('/reservas/crear-reservas', { state: { ...data, fecha } })
  }
  useEffect(() => {
    getAulas(unidad && unidad[0]?.id)
    getUnidades()
    fetchPeriodos()
  }, [unidad])
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <h6 className="fw-bold">Busqueda de Aulas</h6>
        </div>
      </div>
      <br></br>
      <CForm onSubmit={(e) => onBuscarAulasHandler(e)}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CFormLabel htmlFor="unidad-list" className="fw-bold">
                Unidades
              </CFormLabel>
              <Typeahead
                id="unidad-list"
                onChange={onHandlerSelectedUnidad}
                options={unidades}
                placeholder="Escoge una unidad..."
                selected={unidad}
                clearButton={true}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CFormLabel htmlFor="aula-list" className="fw-bold">
                Aulas
              </CFormLabel>
              <Typeahead
                id="aula-list"
                onChange={setAula}
                options={aulas}
                placeholder="Escoge una aula..."
                selected={aula}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CFormLabel htmlFor="capacidad-list" className="fw-bold">
                Capacidad
              </CFormLabel>
              <Typeahead
                id="capacidad-list"
                onChange={setCapacidad}
                options={capacidadList}
                placeholder="Escoge la capacidad..."
                selected={capacidad}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CFormLabel htmlFor="fecha" className="fw-bold">
                Fecha
              </CFormLabel>
              <input
                type="date"
                id="fecha"
                className="form-control"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {/* <DatePicker selected={fecha} onChange={(date) => setFecha(date)} /> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <div className="form-group mb-3">
                <label htmlFor="periodo_id" className="fw-bold">
                  Período
                </label>
                <div className="d-flex align-items-center">
                  <select
                    id="periodo_id"
                    className="form-select"
                    value={periodoSeleccionado}
                    onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                  >
                    <option value="">Seleccione un período</option>
                    {periodosDisponibles
                      .filter((periodo) => !periodosSeleccionados.some((p) => p.id === periodo.id))
                      .map((periodo) => (
                        <option key={periodo.id} value={periodo.id}>
                          {periodo.nombreCompleto}
                        </option>
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
                    {periodosSeleccionados.map((periodo) => (
                      <li key={periodo.id}>{`${periodo.horaInicio} - ${periodo.horaFin}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CButton color="primary" type="submit" className="mb-3">
                Buscar
              </CButton>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <CButton color="secondary" type="button" className="mb-3">
                Limpiar
              </CButton>
            </div>
          </div>
        </div>
      </CForm>
      <hr></hr>
      <CContainer className="px-4">
        <CRow>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Unidad</th>
                <th scope="col">Aula</th>
                <th scope="col">Fecha</th>
                <th scope="col">Capacidad</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {listResult.length ? (
                listResult.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{makeNameUnits(item.unidad_id)}</th>
                    <td>{item.nombreAulas}</td>
                    <td>{fecha.toLocaleString()}</td>
                    <td>{item.capacidadAulas}</td>
                    <td>
                      <CButton className="btn btn-primary" onClick={() => goToBookingRooms(item)}>
                        Reservar
                      </CButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No Hay Resultados</th>
                </tr>
              )}
            </tbody>
          </table>
        </CRow>
      </CContainer>
    </div>
  )
}

export default BuscarAulas
