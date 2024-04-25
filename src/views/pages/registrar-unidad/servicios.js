import axios from 'axios'

export const getUnidad = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/unidades')
    const unidades = response.data.map((unidad) => ({
      ...unidad,
      nombreDepartamento: unidad.departamento ? unidad.departamento.nombreDepartamentos : 'Ninguno',
    }))

    const unidadesOrdenadas = unidades.sort((a, b) =>
      a.nombreUnidades.localeCompare(b.nombreUnidades),
    )

    return unidadesOrdenadas
  } catch (error) {
    console.error('Error al obtener las unidades:', error)
    throw error
  }
}

export const postUnidad = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/unidades', data)
    return response.data.id // Retorna el ID de la unidad creada
  } catch (error) {
    throw new Error('Error al crear la unidad')
  }
}

export const horaInicio = async () => {
  const response = await axios.get('http://localhost:8000/api/periodos/horaApertura')
  return response.data
}
export const horaFin = async () => {
  const response = await axios.get('http://localhost:8000/api/periodos/horaCierre')
  return response.data
}

export const getAulasPorUnidad = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/aulas/mostrar')
    if (!response.ok) {
      throw new Error('Error al obtener las aulas')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const agregarAula = async (nuevaAula) => {
  try {
    const response = await fetch('http://localhost:8000/api/aulas/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaAula),
    })
    if (!response.ok) {
      throw new Error('Error al agregar el aula')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
