import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://nksoft.org" target="_blank" rel="noopener noreferrer">
          NK
        </a>
        <span className="ms-1">&copy; 2024 NkSoft S.R.L.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://nksoft.org" target="_blank" rel="noopener noreferrer">
        nksoft Team &amp; Dashboard Template
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
