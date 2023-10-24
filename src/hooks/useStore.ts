import { useReducer } from 'react'
import { type Metric, type Action, type State, type Prediction } from '../types'

// 1. Create a initialState
const initialState: State = {
  chosenMetric: 'cp',
  predictionType: 'ps',
  neighborsNumber: '',
  inputMatrix: '',
  resultMatrix: '',
  output: '',
  outputIndex: '0',
  incognitaNumber: '',
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

  if (type === 'SET_OUTPUT') {
    return {
      ...state,
      loading: false,
      output: action.payload
    }
  }

  if (type === 'SET_OUTPUT_INDEX') {
    return {
      ...state,
      loading: false,
      outputIndex: action.payload
    }
  }

  if (type === 'SET_INCOGNITA_NUMBER') {
    return {
      ...state,
      loading: false,
      incognitaNumber: action.payload
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
    incognitaNumber,
    inputMatrix,
    resultMatrix,
    output,
    outputIndex,
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

  const setOutput = (payload: string) => {
    dispatch({ type: 'SET_OUTPUT', payload })
  }

  const setOutputIndex = (payload: string) => {
    dispatch({ type: 'SET_OUTPUT_INDEX', payload })
  }

  const setIncognitaNumber = (payload: string) => {
    dispatch({ type: 'SET_INCOGNITA_NUMBER', payload })
  }

  return {
    chosenMetric,
    predictionType,
    neighborsNumber,
    inputMatrix,
    resultMatrix,
    output,
    outputIndex,
    incognitaNumber,
    loading,
    setMetric,
    setPrediction,
    setNeighborsNumber,
    setInputMatrix,
    setResultMatrix,
    setOutput,
    setOutputIndex,
    setIncognitaNumber,
  }
}
