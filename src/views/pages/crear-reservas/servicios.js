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