import { calculateCosineDistance, calculateEuclideanDistance, calculatePearsonCorrelation } from './services/utils/similarityFunctions'
import { simplePrediction, meanDifferencePrediction } from './services/utils/predictionFunctions'

export const SUPPORTED_METRICS = {
  cp: 'Correlación de Pearson',
  dc: 'Distancia Coseno',
  de: 'Distancia Euclídea'
}

export const SUPPORTED_METRICS_FUNCTIONS = {
  cp: { metric: calculatePearsonCorrelation, sort: sortByGreater },
  dc: { metric: calculateCosineDistance, sort: sortByLower },
  de: { metric: calculateEuclideanDistance, sort: sortByLower}
}

function sortByGreater (arr: {value: number, index: number}[]): {value: number, index: number}[] {
  return arr.sort((a, b) => b.value - a.value)
}

function sortByLower (arr: {value: number, index: number}[]):{value: number, index: number}[] {
  return arr.sort((a, b) => a.value - b.value)
}

export const SUPPORTED_PREDICTIONS = {
  ps: 'Predicción Simple',
  dm: 'Diferencia con la media'
}
export const AUTO_METRIC = 'cp'
