import './scss/style.scss'
import React, { Suspense, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'

// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
import DefaultLayout from './layout/DefaultLayout'
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
import { initialState, reducer } from './store'
import Context from './CreateContext'

import 'bootstrap/dist/css/bootstrap.css'
import Role from './views/pages/usuarios/roles/Role'
// import RoleForm from './Usuario/RoleForm'
import { LISTAR_FERIADO } from './actions'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(state.theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {/* <Route path="/role" element={<RoleForm />} /> */}
            <Route path="/reservacion" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
