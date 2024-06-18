import React, { Suspense, useEffect, useState, useCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  const user_data = localStorage.getItem('user_data')
  const isAuthenticated = JSON.parse(user_data)
  const allRoutes = routes
  useEffect(() => {
    console.log('aqui tambien para proteger las rutas')
  }, [])
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {allRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={isAuthenticated ? <route.element /> : <Navigate to="/login" />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default AppContent
