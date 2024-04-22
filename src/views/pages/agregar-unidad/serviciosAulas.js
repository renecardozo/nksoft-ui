export const getAulasPorUnidad = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/aulas');
      if (!response.ok) {
        throw new Error('Error al obtener las aulas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const agregarAula = async (nuevaAula) => {
    try {
      const response = await fetch('http://localhost:8000/api/aulas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaAula),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el aula');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };