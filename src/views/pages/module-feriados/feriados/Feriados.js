import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CCol, CRow, CContainer } from '@coreui/react'
import { getFeriados, getListCodeDates } from '../service'

function Feriados() {
  const [feriados, setFeriados] = useState([])
  const [codes, setCodes] = useState([])
  const describirFeriado = (codigo) => {
    const feriadoEncontrado = codes.find((item) => item.code == codigo)
    return feriadoEncontrado.name || 'No definido'
  }
  const findAll = async () => {
    const response = await getFeriados()
    const codesList = await getListCodeDates()
    setFeriados(response)
    setCodes(codesList)
  }

  useEffect(() => {
    findAll()
  }, [])

  return (
    <CContainer className="px-4">
      <CRow>
        <CCol sm={6} md={8}></CCol>
        <CCol xs={6} md={4}>
          <div className="d-grid">
            <Link to="/administracion/crear-feriados" className="btn btn-primary">
              Agregar
            </Link>
          </div>
        </CCol>
      </CRow>
      <br></br>
      <CRow>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Feriado</th>
              <th scope="col">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {feriados.length ? (
              feriados.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.fecha}</td>
                  <td>
                    <Link to={`/administracion/feriados/${item.id}/details`}>
                      {describirFeriado(item.codigo)}
                    </Link>
                  </td>
                  <td>{item.descripcion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <th>No Hay Feridos</th>
              </tr>
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </CRow>
    </CContainer>
  )
}

export default Feriados
