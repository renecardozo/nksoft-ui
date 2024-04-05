import { useContext } from 'react'
import Context from './CreateContext'

export const useAppContext = () => {
  return useContext(Context)
}
