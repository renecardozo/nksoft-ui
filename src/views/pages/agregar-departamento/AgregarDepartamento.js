import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader,CTableDataCell ,CCol, CRow, CForm, CFormInput, CInputGroup, CInputGroupText, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CContainer, CButton } from '@coreui/react';
import { postDepartamento, getDepartamento } from '../agregar-departamento/servicios';
import { useNavigate } from 'react-router-dom';

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [nombreDepartamentos, setNombreDepartamentos] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const findAll = async () => {
    const response = await getDepartamento();
    setDepartamentos(response);
  };

  useEffect(() => {
    findAll();
  }, []);

  const guardarDepartamento = async (e) => {
    e.preventDefault();
  
    if (nombreDepartamentos.trim() === '') {
      alert('Por favor, ingrese un nombre para el departamento.');
      return;
    }
  
    try {
      const listaDepartamentos = await getDepartamento();
      
      const departamentoExistente = listaDepartamentos.find(departamento => departamento.nombreDepartamentos === nombreDepartamentos);
      
      if (departamentoExistente) {
        alert('El nombre del departamento ya está en uso. Por favor, ingrese otro nombre.');
        return;
      }
  
      const nuevoDepartamento = {
        nombreDepartamentos
      };
      await postDepartamento(nuevoDepartamento);
      alert('Departamento registrado con éxito');

      
      await findAll();
      
      setNombreDepartamentos('');
      
      setMostrarFormulario(false);
    } catch (error) {
      alert('Ocurrió un error al intentar guardar el departamento. Por favor, inténtelo de nuevo.');
      console.error('Error al guardar el departamento:', error);
    }
  };
  
  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  return (
    <CContainer className="px-4">
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>Departamentos</h3>
            </CCol>
            <CCol xs="auto" className="ml-auto">
              <CButton color="primary" onClick={handleMostrarFormulario}>Agregar Departamento</CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        {mostrarFormulario && (
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CCol>
                  <CFormInput
                    placeholder="Nombre"
                    autoComplete="nombre"
                    value={nombreDepartamentos}
                    onChange={(e) => setNombreDepartamentos(e.target.value)}
                  />
                </CCol>
                <CCol xs="auto">
                  <CButton color="primary" onClick={(e) => guardarDepartamento(e)}>Registrar</CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        )}
        <CCardBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departamentos.map((departamento, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{departamento.nombreDepartamentos}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default Departamentos;
