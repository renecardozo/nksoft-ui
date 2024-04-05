import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilPencil, cilSpeedometer, cilCalendar, cilList } from '@coreui/icons'
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
]

export default _nav
