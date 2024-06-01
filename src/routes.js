import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const BuscarAulas = React.lazy(() => import('./views/pages/buscar-aulas/BuscarAulas'))
const CrearReservas = React.lazy(() => import('./views/pages/crear-reservas/CrearReservas'))
const Solicitudes = React.lazy(() => import('./views/pages/solicitudes/Solicitudes'))
const HistorialSolicitudes = React.lazy(() => import('./views/pages/historial_solicitudes/List'))
const Administrar = React.lazy(() => import('./views/pages/GestionarDocentes/Administrar'))
const Roles = React.lazy(() => import('./views/pages/usuarios/roles/Role'))
const CrearRoles = React.lazy(() => import('./views/pages/usuarios/roles/RoleForm'))
const EditarRole = React.lazy(() => import('./views/pages/usuarios/roles/RoleForm'))
const Calendario = React.lazy(() => import('./components/calendario/Calendario'))
const AgregarMateria = React.lazy(() => import('./views/pages/agregar-materia/AgregarMateria'))
const verMateria = React.lazy(() => import('./views/pages/GestionarDocentes/ver-materias'))
const notificacion = React.lazy(() => import('./views/pages/notificacion/notificacion'))
const detallesNotificacion = React.lazy(() => import('./views/pages/notificacion/detallesNotificacion'))
const registrarMateria = React.lazy(
  () => import('./views/pages/registrar-materias/registrarMateria'),
)
const AgregarUnidad = React.lazy(() => import('./views/pages/agregar-unidad/AgregarUnidad'))
const registrarUnidad = React.lazy(() => import('./views/pages/registrar-unidad/registrarUnidad'))
const AgregarDepartamento = React.lazy(
  () => import('./views/pages/agregar-departamento/AgregarDepartamento'),
)
const RegistrarDepartamento = React.lazy(
  () => import('./views/pages/registrar-departamentos/registrarDepartamento'),
)
const verAulas = React.lazy(() => import('./views/pages/agregar-unidad/vistaAulas'))
const verMaterias = React.lazy(() => import('./views/pages/GestionarDocentes/ver-materias'))
const bitacora = React.lazy(() => import('./views/pages/bitacora/bitacora'))

const ListUser = React.lazy(() => import('./views/pages/usuarios/users/List.jsx'))
const FormUser = React.lazy(() => import('./views/pages/usuarios/users/Form.jsx'))
import Feriados from './views/pages/module-feriados/feriados/Feriados'
import DetailsFeriado from './views/pages/module-feriados/details-feriado/DetailsFeriado.js'
import Login from './views/pages/login/Login'
import Admin from './views/pages/login/Admin'

//import detallesNotificacion from './views/pages/notificacion/detallesNotificacion.js'

const CrearFeriados = React.lazy(
  () => import('./views/pages/module-feriados/crear-feriados/CreateFeriados'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/reservas/buscar-aulas', name: 'Buscar Aulas', element: BuscarAulas, exact: true },
  { path: '/reservas/crear-reservas', name: 'Solicitar reserva', element: CrearReservas },
  { path: '/configurar/solicitudes', name: 'Solicitudes', element: Solicitudes },
  { path: '/configurar/historial_solicitudes', name: 'Solicitudes', element: HistorialSolicitudes }, 
  { path: '/configurar/administrar', name: 'Docentes', element: Administrar },
  { path: '/configurar/roles', name: 'Roles', element: Roles },
  { path: '/configurar/crear-roles', name: 'Crear Role', element: CrearRoles },
  { path: '/configurar/editar-role/:id', name: 'Editar Role', element: EditarRole },
  { path: '/administracion/calendario', name: 'Calendario', element: Calendario },
  { path: '/administracion/feriados', name: 'Feriados', element: Feriados },
  { path: '/administracion/crear-feriados', name: 'Crear Feriado', element: CrearFeriados },
  { path: '/administracion/agregar-materia', name: 'Agregar Materia', element: AgregarMateria },
  { path: '/administracion/ver-materia', name: 'Ver Materia', element: verMateria },
  { path: '/administracion/feriados/:id/details',name: 'Detalles Feriado', element: DetailsFeriado,},
  { path: '/administracion/registrar-materias',name: 'Agregar Materia',element: registrarMateria, },
  { path: '/docente/detallesNotificacion', name: 'Detalles de Notificacion', element: detallesNotificacion },
  { path: '/docente/notificacion', name: 'Notificaciones', element: notificacion },
  //USUARIOS
  { path: '/users', name: 'Usuarios', element: ListUser },
  { path: '/users/create', name: 'Crear Usuario', element: FormUser },
  { path: '/users/:id/edit', name: 'Editar Usuario', element: FormUser },
  //unidades
  { path: '/administracion/agregar-unidad', name: 'Unidades', element: AgregarUnidad },
  { path: '/administracion/registrar-unidad', name: 'Agregar unidad', element: registrarUnidad },
  { path: '/administracion/Departamentos', name: 'Departamentos', element: AgregarDepartamento },
  { path: '/administracion/registrar-departamentos',name: 'Agregar Departamento',element: RegistrarDepartamento, },
  { path: '/administracion/unidades/:unidadId/aulas', name: 'Aulas', element: verAulas },
  // Login
  { path: '/login', name: 'Login', element: Login, },  
  //formulario
  { path: '/registro-solicitud', name:'Formulario de reserva', element: CrearReservas},
  //materias de docentes
  { path: '/configurar/docentes/:usuarioId/materias', name: 'Materias', element: verMateria },
  { path: '/administracion/bitacora', name:'Bitacora', element: bitacora},

]
export default routes
