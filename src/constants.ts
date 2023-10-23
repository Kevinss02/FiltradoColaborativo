import { calculateCosineDistance, calculateEuclideanDistance, calculatePearsonCorrelation } from './services/utils/similarityFunctions'
export const SUPPORTED_METRICS = {
  cp: 'Correlación de Pearson',
  dc: 'Distancia Coseno',
  de: 'Distancia Euclídea'
}

export const SUPPORTED_METRICS_FUNCTIONS = {
  cp: calculateCosineDistance,
  dc: calculateEuclideanDistance,
  de: calculatePearsonCorrelation
}

export const SUPPORTED_PREDICTIONS = {
  ps: 'Predicción Simple',
  dm: 'Diferencia con la media'
}

export const VOICE_FOR_LANGUAGE = {
  en: 'en-GB',
  es: 'es-MX',
  de: 'de-DE'
}

export const AUTO_METRIC = 'cp'
