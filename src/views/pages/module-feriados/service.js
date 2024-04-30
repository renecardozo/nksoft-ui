import axios from 'axios'

const codigoList = [
  {
    name: 'Feriado Institucional',
    code: 'COD_0001',
    color: 'primary',
  },
  {
    name: 'Feriado Local',
    code: 'COD_0002',
    color: 'info',
  },
  {
    name: 'Feriado Nacional',
    code: 'COD_0003',
    color: 'success',
  },
  {
    name: 'Foraneo',
    code: 'COD_0004',
    color: 'secondary',
  },
]

export const getFeriados = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/event')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const crearFeriados = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/event', data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getListCodeDates = async () => {
  return new Promise((resolve) => resolve(codigoList))
}

export const parserCode = (code) => {
  return new Promise((resolve) => {
    resolve(codigoList.find((item) => item.code === code))
  })
}

export const getTitleFromCode = (code) => {
  return new Promise((resolve) => {
    const item = codigoList.find((item) => item.code === code)
    resolve(item.name)
  })
}

export const getFeriado = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/v1/event/${id}`)
    return data
  } catch (error) {
    console.error('Error fetching item details:', error)
  }
}

export const editFeriado = async (body) => {
  try {
    const { data } = await axios.put(`http://localhost:8000/api/v1/event/${body.id}`, body)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteFeriado = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:8000/api/v1/event/${id}`)
    return data
  } catch (error) {
    console.error(error)
  }
}
