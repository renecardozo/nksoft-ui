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

  