import axios from "axios";

export const showDocentes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/docentes');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los docentes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos de los docentes:', error);
      throw error;
    }
  };

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

  // servicios.js
  export const saveMateriaGrupo = async (materiaGrupoData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/docente_materia', materiaGrupoData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar materia y grupo:', error);
      throw error;
    }
  };
  


  