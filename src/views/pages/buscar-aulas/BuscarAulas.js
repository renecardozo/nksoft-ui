import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead' // ES2015
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { getAulasByUnidad, getAllUnidades } from './service'

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

const aulasOptions = [
  { id: 1, label: 'John' },
  { id: 2, label: 'Miles' },
  { id: 3, label: 'Charles' },
  { id: 4, label: 'Herbie' },
]

function BuscarAulas() {
  const [unidad, setUnidad] = useState([])
  const [unidades, setUnidades] = useState([])
  const [aula, setAula] = useState([])
  const [aulas, setAulas] = useState([])
  const [capacidad, setCapacidad] = useState([])
  const [capacidadList, setCapacidadList] = useState([])
  const [fecha, setFecha] = useState(Date.now())
  const [listResult, setListResult] = useState([])
  const onBuscarAulasHandler = (e) => {
    e.preventDefault()
    console.log('buscar')
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
  useEffect(() => {
    getAulas(unidad && unidad[0]?.id)
    getUnidades()
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
                    <th scope="row">{item.unidad}</th>
                    <td>{item.aula}</td>
                    <td>{item.fecha}</td>
                    <td>{item.capacidad}</td>
                    <td>
                      <Link to={'/administracion/reservas'}>Reservar</Link>
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
