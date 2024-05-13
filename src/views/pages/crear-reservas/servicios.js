import axios from 'axios';

export const getPeriodos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/periodos');
        return response.data; // Retorna los datos obtenidos de la solicitud HTTP
    } catch (error) {
        console.error('Error al obtener los periodos:', error);
        throw error;
    }
}
