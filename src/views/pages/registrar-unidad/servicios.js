import axios from 'axios'
import { createBitacora } from '../bitacora.service'
export const getUnidad = async () => {
  try {
    const response = await axios.get(`${process.env.PATH_API}/api/unidades`)
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
    const response = await axios.post(`${process.env.PATH_API}/api/unidades`, data)
    await createBitacora(data, 'Created', 0)
    return response.data.id // Retorna el ID de la unidad creada
  } catch (error) {
    throw new Error('Error al crear la unidad')
  }
}

export const horaInicio = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/periodos/horaApertura`)
  return response.data
}
export const horaFin = async () => {
  const response = await axios.get(`${process.env.PATH_API}/api/periodos/horaCierre`)
  return response.data
}

export const getAulasPorUnidad = async () => {
  try {
    const response = await fetch(`${process.env.PATH_API}/api/aulas/mostrar`)
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
    const response = await fetch(`${process.env.PATH_API}/api/aulas/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaAula),
    })
    await createBitacora(nuevaAula, 'Created', 0)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
