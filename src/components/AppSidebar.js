import React, { useEffect, useState } from 'react'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { sygnet } from 'src/assets/brand/sygnet'
import { fcytLogo } from 'src/assets/brand/fcyt-logo'

import navigation from '../_nav'
import { useAppContext } from '../hooks'
let newNavList = navigation
const AppSidebar = () => {
  const {
    state: { sidebarShow, sidebarUnfoldable },
    dispatch,
  } = useAppContext()
  const [navList, setNavList] = useState([])
  useEffect(() => {
    const _nav = () => {
      const user_data = localStorage.getItem('user_data')
      if (user_data !== null) {
        const { permissions, role } = JSON.parse(user_data)
        if (role.name !== 'SuperAdmin') {
          const listPermissions = [...new Set(permissions.map((p) => p.name.split('-')[1]))]
          newNavList = navigation.filter((navItem) => {
            const navFreshed = navItem.name.toLowerCase()
            return listPermissions.includes(navFreshed)
          })
        }
      }
      return newNavList
    }

    setNavList(_nav())
  }, [])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={fcytLogo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navList} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !sidebarUnfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default AppSidebar
