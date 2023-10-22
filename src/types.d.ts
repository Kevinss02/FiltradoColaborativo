import { type SUPPORTED_PREDICTIONS, type SUPPORTED_METRICS } from './constants'

export type Metric = keyof typeof SUPPORTED_METRICS
export type Prediction = keyof typeof SUPPORTED_PREDICTIONS

export interface State {
  chosenMetric: Metric
  predictionType: Prediction
  neighborsNumber: string
  inputMatrix: string
  resultMatrix: string
  loading: boolean
}

export type Action =
  | { type: 'SET_METRIC', payload: Metric }
  | { type: 'SET_PREDICTION', payload: Prediction }
  | { type: 'SET_NEIGHBORS_NUMBER', payload: string }
  | { type: 'SET_INPUT_MATRIX', payload: string }
  | { type: 'SET_RESULT_MATRIX', payload: string }

export enum SectionType {
  Input = 'input',
  Output = 'output',
  Neighbor = 'neighbor'
}
