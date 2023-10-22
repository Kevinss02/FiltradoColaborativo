import { useReducer } from 'react'
import { type Metric, type Action, type State, type Prediction } from '../types'

// 1. Create a initialState
const initialState: State = {
  chosenMetric: 'cp',
  predictionType: 'ps',
  neighborsNumber: '1',
  inputMatrix: '',
  resultMatrix: '',
  loading: false
}

// 2. Create a reducer
function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'SET_METRIC') {
    if (state.chosenMetric === action.payload) return state

    const loading = state.inputMatrix !== ''

    return {
      ...state,
      chosenMetric: action.payload,
      resultMatrix: '',
      loading
    }
  }

  if (type === 'SET_PREDICTION') {
    if (state.predictionType === action.payload) return state
    const loading = state.inputMatrix !== ''

    return {
      ...state,
      predictionType: action.payload,
      resultMatrix: '',
      loading
    }
  }

  if (type === 'SET_NEIGHBORS_NUMBER') {
    if (state.neighborsNumber === action.payload) return state

    const loading = state.inputMatrix !== ''

    return {
      ...state,
      neighborsNumber: action.payload,
      resultMatrix: '',
      loading
    }
  }

  if (type === 'SET_INPUT_MATRIX') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      inputMatrix: action.payload,
      resultMatrix: ''
    }
  }

  if (type === 'SET_RESULT_MATRIX') {
    return {
      ...state,
      loading: false,
      resultMatrix: action.payload
    }
  }

  return state
}

export function useStore () {
  // 3. usar el hook useReducer
  const [{
    chosenMetric,
    predictionType,
    neighborsNumber,
    inputMatrix,
    resultMatrix,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const setMetric = (payload: Metric) => {
    dispatch({ type: 'SET_METRIC', payload })
  }

  const setPrediction = (payload: Prediction) => {
    dispatch({ type: 'SET_PREDICTION', payload })
  }

  const setNeighborsNumber = (payload: string) => {
    dispatch({ type: 'SET_NEIGHBORS_NUMBER', payload })
  }

  const setInputMatrix = (payload: string) => {
    dispatch({ type: 'SET_INPUT_MATRIX', payload })
  }

  const setResultMatrix = (payload: string) => {
    dispatch({ type: 'SET_RESULT_MATRIX', payload })
  }

  return {
    chosenMetric,
    predictionType,
    neighborsNumber,
    inputMatrix,
    resultMatrix,
    loading,
    setMetric,
    setPrediction,
    setNeighborsNumber,
    setInputMatrix,
    setResultMatrix
  }
}
