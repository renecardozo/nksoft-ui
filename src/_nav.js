import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilSpeedometer,
  cilCalendar,
  cilList,
  cilPeople,
  cilNoteAdd,
  cilBuilding,
  cilInstitution,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Reservas',
  },
  {
    component: CNavItem,
    name: 'Buscar Aulas',
    to: '/reservas/buscar-aulas',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Crear reservas',
    to: '/reservas/crear-reservas',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Configurar',
  },
  {
    component: CNavItem,
    name: 'Solicitudes',
    to: '/configurar/solicitudes',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Administrar',
    to: '/configurar/administrar',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: '/configurar/roles',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administracion',
  },
  {
    component: CNavItem,
    name: 'Calendario',
    to: '/administracion/calendario',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Feridos',
    to: '/administracion/feriados',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Agregar Materia',
    to: '/administracion/agregar-materia',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Unidades y aulas',
    to: '/administracion/agregar-unidad',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Departamentos',
    to: '/administracion/Departamentos',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  },
]
export default _nav
