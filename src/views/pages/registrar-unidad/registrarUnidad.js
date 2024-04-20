import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClock, cilUser, cilText, cilListNumbered, cilMap, cilBuilding } from '@coreui/icons'
import { cilCalendar } from '@coreui/icons'
import 'react-datepicker/dist/react-datepicker.css'
//https://github.com/Hacker0x01/react-datepicker
import DatePicker from 'react-datepicker'
import { useAppContext } from '../../../hooks'
import { start } from '@popperjs/core'
import { AGREGAR_MATERIA } from '../../../actions'
import { useNavigate } from 'react-router-dom'

const registrarMateria = () => {

    const navigate = useNavigate()
    const [nombreUnidades, setnombre] = useState('')
    const [departamento, setDepartamento] = useState('')

    const [ubicacionUnidades, setUbicacion] = useState('')
    const [horaAperturaUnidades, setHoraDeApertura] = useState('')
    const [horaCierreUnidades, setHoraDeCierre] = useState('')


    const {
        state: { unidades },
        dispatch,
    } = useAppContext()

    const guardarUnidad = () => {
        console.log('guardar unidad')
        console.log(departamento)
        if (departamento != '' && nombreUnidades != '' && ubicacionUnidades != '' ) {
            
                console.log(departamento)

                const nuevaUnidad = {
                    id: unidades.length + 1,
                    nombreUnidades,
                    departamento,
                    ubicacionUnidades,
                    horaAperturaUnidades,
                    horaCierreUnidades
                }
                dispatch({ type: AGREGAR_UNIDAD, payload: nuevaUnidad })
                navigate('/administracion/agregar-unidad')

    
        } else {
            alert("Llenar todos los campos");
        }

    }

    return (
        <div className="container">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
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
                                            onChange={(e) => setnombre(e.target.value)}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setDepartamento(e.target.value)}
                                        >
                                            <option value="">Ninguno</option>
                                            <option value="1">Quimica</option>
                                            <option value="2">Fisica</option>
                                            <option value="3">Industrial</option>
                                            <option value="4">Sistemas</option>
                                        </select>
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilMap} />
                                        </CInputGroupText>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setUbicacion(e.target.value)}
                                        >
                                            <option value="">Seleccionar ubicación</option>
                                            <option value="ala norte">Ala Norte</option>
                                            <option value="ala sur">Ala Sur</option>
                                            <option value="ala oeste">Ala Oeste</option>
                                            <option value="ala este">Ala Este</option>
                                        </select>
                                    </CInputGroup>


                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilClock} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Hora de apertura"
                                            autoComplete="Hora de apertura"
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
                                            onChange={(e) => setHoraDeCierre(e.target.value)}
                                        />
                                    </CInputGroup>

                                    <div className="d-grid">
                                        <CButton color="primary" onClick={() => guardarUnidad()}>
                                            Registrar
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}


export default registrarMateria