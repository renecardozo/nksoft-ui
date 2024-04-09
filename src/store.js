import { legacy_createStore as createStore } from 'redux'
import { AGREGAR_FERIADO, EDITAR_FERIADO, LISTAR_FERIADO, BORRAR_FERIADO, AGREGAR_MATERIA,LISTAR_MATERIA } from './actions'

export const initialState = {
  sidebarShow: true,
  theme: 'light',
  feriados: [
    {
      id: 1,
      fecha: '13/4/2024',
      codigo: 'COD-001',
      description: 'Lorem Ipsum has been the industrys',
    },
    {
      id: 2,
      fecha: '13/4/2024',
      codigo: 'COD-002',
      description: 'Lorem Ipsum has been the industrys',
    },
    {
      id: 3,
      fecha: '13/4/2024',
      codigo: 'COD-003',
      description: 'Lorem Ipsum has been the industrys',
    },
  ],

  materias: [
    {
      id: 1,
      departamento: "Sistemas",
      materia:"Elementos",
      codigo: 20100013,
      
    }
  ],
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
    case AGREGAR_MATERIA:{
      console.log(" agregarrr")
      return {
        ...state,
        materias: [...state.materias, rest.payload],
      }
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
    case LISTAR_FERIADO:
      return state

      case LISTAR_MATERIA:
        return state
    case BORRAR_FERIADO:
      return {
        ...state,
        feriados: [...state.postList.filter((feriado) => feriado.id !== action.id)],
      }
    default:
      return state
  }
}
