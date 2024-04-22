import axios from 'axios';

// Función para enviar la solicitud de registro de departamento

  export const getUnidad = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/unidades');
      const unidades = response.data;
      
      // Ordenar los departamentos por nombre en orden alfabético
      const unidadesOrdenados = unidades.sort((a, b) => {
        return a.nombreUnidades.localeCompare(b.nombreUnidades);
      });
  
      return unidadesOrdenados;
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
      throw error;
    }
  }