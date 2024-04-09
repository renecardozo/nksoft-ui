import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BuscarAulas = React.lazy(() => import('./views/pages/buscar-aulas/BuscarAulas'))
const CrearReservas = React.lazy(() => import('./views/pages/crear-reservas/CrearReservas'))
const Solicitudes = React.lazy(() => import('./views/pages/solicitudes/Solicitudes'))
const Administrar = React.lazy(() => import('./views/pages/administrar/Administrar'))
const Roles = React.lazy(() => import('./views/pages/usuarios/roles/Role'))
const CrearRoles = React.lazy(() => import('./views/pages/usuarios/roles/RoleForm'))
const Calendario = React.lazy(() => import('./components/calendario/Calendario'))
const Feriados = React.lazy(() => import('./views/pages/feriados/Feriados'))
// const CrearFeriados = React.lazy(() => import('./views/pages/crear-feriados/CreateFeriados'))
import CrearFeriados from './views/pages/crear-feriados/CreateFeriados'
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/reservas/buscar-aulas', name: 'Buscar Aulas', element: BuscarAulas, exact: true },
  { path: '/reservas/crear-reservas', name: 'Crear reservas', element: CrearReservas },
  { path: '/configurar/solicitudes', name: 'Solicitudes', element: Solicitudes },
  { path: '/configurar/administrar', name: 'Administrar', element: Administrar },
  { path: '/configurar/roles', name: 'Roles', element: Roles },
  { path: '/configurar/crear-roles', name: 'Crear Roles', element: CrearRoles },
  { path: '/administracion/calendario', name: 'Calendario', element: Calendario },
  { path: '/administracion/feriados', name: 'Feriados', element: Feriados },
  { path: '/administracion/crear-feriados', name: 'Crear Feriado', element: CrearFeriados },
]

export default routes
