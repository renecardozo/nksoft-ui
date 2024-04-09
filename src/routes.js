import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BuscarAulas = React.lazy(() => import('./views/pages/buscar-aulas/BuscarAulas'))
const CrearReservas = React.lazy(() => import('./views/pages/crear-reservas/CrearReservas'))
const Solicitudes = React.lazy(() => import('./views/pages/solicitudes/Solicitudes'))
const Administrar = React.lazy(() => import('./views/pages/administrar/Administrar'))
const Calendario = React.lazy(() => import('./components/calendario/Calendario'))
const Feriados = React.lazy(() => import('./views/pages/feriados/Feriados'))
const AgregarMateria = React.lazy(() => import('./views/pages/agregar-materia/AgregarMateria'))
const registrarMateria = React.lazy(() => import('./views/pages/registrar-materias/registrarMateria'))

// const CrearFeriados = React.lazy(() => import('./views/pages/crear-feriados/CreateFeriados'))
import CrearFeriados from './views/pages/crear-feriados/CreateFeriados'
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/reservas/buscar-aulas', name: 'Buscar Aulas', element: BuscarAulas, exact: true },
  { path: '/reservas/crear-reservas', name: 'Crear reservas', element: CrearReservas },
  { path: '/configurar/solicitudes', name: 'Solicitudes', element: Solicitudes },
  { path: '/configurar/administrar', name: 'Administrar', element: Administrar },
  { path: '/administracion/calendario', name: 'Calendario', element: Calendario },
  { path: '/administracion/feriados', name: 'Feriados', element: Feriados },
  { path: '/administracion/crear-feriados', name: 'Crear Feriado', element: CrearFeriados },
  { path: '/administracion/agregar-materia', name: 'Agregar Materia', element: AgregarMateria },
  { path: '/administracion/registrar-materias', name: 'Agregar Materia', element: registrarMateria },
]

export default routes
