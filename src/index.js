import React, { useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import 'bootstrap/dist/css/bootstrap.css'
import { initialState, reducer } from './store'

import App from './App'

createRoot(document.getElementById('root')).render(<App />)