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

    const guardarDepartamento = () => {
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
                navigate('/administracion/agregar-departamento')

    
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
                                    <h1>Registrar departamento</h1>

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

                                    <div className="d-grid">
                                        <CButton color="primary" onClick={() => guardarDepartamento()}>
                                            Guardar
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