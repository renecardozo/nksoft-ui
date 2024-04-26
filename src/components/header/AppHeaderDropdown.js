import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilBell, cilEnvelopeOpen, cilTask, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const logout = () => {
    localStorage.removeItem('user_data')
    navigate('/')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          {userData && userData.email}
          <CBadge color="success" className="ms-2">
            Activo
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          {userData && userData.role.name}
        </CDropdownItem>
        <CDropdownItem onClick={() => logout()}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
