import axios from 'axios'

export const login = (codeSis, cii) => {
  const data = {
    code_sis: codeSis,
    ci: cii,
  }
  return axios.post('http://localhost:8000/api/login', data)
}

export const loginAsAdmin = (email, password) => {
  const data = {
    email,
    password,
  }
  return axios.post('http://localhost:8000/api/admin', data)
}
