import axios from 'axios';

export const getRoles = async () => {
  try {
    const response = await axios.get('/api/roles', {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    throw error; 
  }
};


export const getLogs = async () => {
  try {
    const response = await axios.get('/api/logs'); 
    return response.data;
  } catch (error) {
    console.error('Error al obtener los registros de la bitácora:', error);
    throw error;
  }
};

