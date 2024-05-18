import axios from 'axios';

export const getPeriodos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/periodos');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los periodos:', error);
        throw error;
    }
}
export const getMaterias = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/materias');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        throw error;
    }
}
export const getMateriasGrupos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/materias');
        const materias = response.data;
        
        // Verificar si materias es un array antes de llamar a map
        if (!Array.isArray(materias)) {
            console.error('Error: materias no es un array');
            return []; // Retorna un array vacío o maneja el error según sea necesario
        }

        const grupos = materias.map(materia => ({
            id: materia.id,
            nombre: materia.grupo, // Aquí tomamos directamente el atributo "grupo" de la materia
            materiaId: materia.id
        }));
        return grupos; 
    } catch (error) {
        console.error('Error al obtener los grupos de materias:', error);
        throw error;
    }
}


export const getAulas = async() => {
    try {
      const response = await fetch('http://localhost:8000/api/aulas/mostrar');
      if (!response.ok) {
        throw new Error('Error al obtener las aulas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos de las aulas:', error);
      throw error;
    }
  }
  export const postSolicitud = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/solicitud_reserva_aula', data);
        console.log('Respuesta de la solicitud de reserva:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar la solicitud de reserva:', error);
        throw error;
    }
}


  