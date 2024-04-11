import { legacy_createStore as createStore } from 'redux'
import { AGREGAR_FERIADO, EDITAR_FERIADO, LISTAR_FERIADO, BORRAR_FERIADO } from './actions'
import { getFeriados } from './views/pages/module-feriados/service'

export const initialState = {
  sidebarShow: true,
  theme: 'light',
  feriados: [],
}

export const reducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case AGREGAR_FERIADO:
      return {
        ...state,
        feriados: [...state.feriados, rest.payload],
      }
    case EDITAR_FERIADO: {
      const index = state.feriados.findIndex((feriado) => feriado.id === action.payload.id)
      if (index !== -1) {
        state.feriados[index] = action.payload
      }
      return {
        ...state,
      }
    }
    case LISTAR_FERIADO: {
      getFeriados().then((response) => {
        console.log(response)
      })
      return state
    }
    case BORRAR_FERIADO:
      return {
        ...state,
        feriados: [...state.postList.filter((feriado) => feriado.id !== action.id)],
      }
    default:
      return state
  }
}
