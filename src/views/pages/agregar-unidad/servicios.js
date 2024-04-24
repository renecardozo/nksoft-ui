import axios from 'axios';

// Función para enviar la solicitud de registro de departamento

export const getUnidad = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/unidades');
    const unidades = response.data.map(unidad => ({
      ...unidad,
      nombreDepartamentos: unidad.departamento ? unidad.departamento.nombreDepartamentos : 'Ninguno'
    }));
    // Ordenar las unidades por nombre alfabéticamente
    const unidadesOrdenadas = unidades.sort((a, b) => a.nombreUnidades.localeCompare(b.nombreUnidades));

    return unidadesOrdenadas;
  } catch (error) {
    console.error('Error al obtener las unidades:', error);
    throw error;
  }
}

export const actualizarUnidad = async (unidadId, datosActualizados) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/unidades/${unidadId}`, datosActualizados);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la unidad:', error);
  }
};


export const postAula = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/aulas/post', data);
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar el aula');
  }
};

export const postUnidad = async (data) => {
  const response = await axios.post('http://localhost:8000/api/unidades', data);
  return response.data;
}

//AULAS

export const getAulasPorUnidad = async (unidadId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/aulas/mostrarId/${unidadId}`);
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
    const response = await fetch('http://localhost:8000/api/aulas/registrar', {
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

export const actualizarAula = async (aulaId, datosActualizados) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/aulas/${aulaId}`, datosActualizados);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el aula:', error);
  }
};
    const obtenerIdAulaPorNombre = async (nombreAula) => {
      try {

   const response = await axios.get('http://localhost:8000/api/aulas');
    const aulas = response.data;
    const aulaEncontrada = aulas.find(aula => aula.nombreAulas === nombreAula);
    if (!aulaEncontrada) {
      throw new Error(`No se encontró el aula con el nombre: ${nombreAula}`);
    }

    return aulaEncontrada.id;
  } catch (error) {
    throw new Error('Error al obtener el ID del aula:', error);
  }
};
export const getAulas = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/aulas/mostrar');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las aulas');
  }
};
