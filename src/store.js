import { legacy_createStore as createStore } from 'redux'
import {
  AGREGAR_FERIADO,
  EDITAR_FERIADO,
  LISTAR_FERIADO,
  BORRAR_FERIADO,
  AGREGAR_MATERIA,
  LISTAR_MATERIA,
  AGREGAR_UNIDAD, 
  LISTAR_UNIDAD
} from './actions'
import { getFeriados } from './views/pages/module-feriados/service'

export const initialState = {
  sidebarShow: true,
  theme: 'light',
  feriados: [],
  unidades: [{
    id: 1,
    nombreUnidades: "Edificio academico II",
    ubicacionUnidades: "ala este",
    horaAperturaUnidades:"6:45",
    horaCierreUnidades: "14:15",
    departamento: "Ninguno"
  },
  {
    id: 1,
    nombreUnidades: "Edificio academico II",
    ubicacionUnidades: "ala este",
    horaAperturaUnidades:"6:45",
    horaCierreUnidades: "14:15",
    departamento: "Ninguno"
  },
 
  {
    id: 1,
    nombreUnidades: "Edificio academico II",
    ubicacionUnidades: "ala este",
    horaAperturaUnidades:"6:45",
    horaCierreUnidades: "14:15",
    departamento: "Ninguno"
  },
  {
    id: 1,
    nombreUnidades: "Edificio academico II",
    ubicacionUnidades: "ala este",
    horaAperturaUnidades:"6:45",
    horaCierreUnidades: "14:15",
    departamento: "Ninguno"
  },
  {
    id: 1,
    nombreUnidades: "Edificio academico II",
    ubicacionUnidades: "ala este",
    horaAperturaUnidades:"6:45",
    horaCierreUnidades: "14:15",
    departamento: "Ninguno"
  }]
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
    case AGREGAR_MATERIA: {
      console.log(' agregarrr')
      return {
        ...state,
        materias: [...state.materias, rest.payload],
      }
    }
    case AGREGAR_UNIDAD:{
      console.log(" agregarrr")
      return {
        ...state,
        unidades: [...state.unidades, rest.payload],
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

      case LISTAR_UNIDAD:
        return state
   
       
    default:
      return state
  }
}