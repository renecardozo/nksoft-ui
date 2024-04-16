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
