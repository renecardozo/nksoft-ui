import axios from 'axios'
export const login = (codeSis, cii) => {
  const data = {
    code_sis: codeSis,
    ci: cii,
  }
  return axios.post(`${process.env.PATH_API}/api/login`, data)
}

export const loginAsAdmin = (email, password) => {
  const data = {
    email,
    password,
  }
  return axios.post(`${process.env.PATH_API}/api/admin`, data)
}
