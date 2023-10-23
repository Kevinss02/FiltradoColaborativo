import { calculateDotProduct, calculateMagnitude, calculateProductSum, calculateSquaredSum, calculateSum, calculateSquaredDifferences } from './calculateFunctions'

export function calculateCosineDistance (x: Array<number | null>, y: Array<number | null>): number {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Las listas deben tener la misma longitud y no estar vacías')
  }

  const validPairs = x.map((val, i) => (val !== null && y[i] !== null) ? 1 : 0)
  const n = validPairs.reduce((count: number, valid: number) => count + valid, 0)

  if (n === 0) {
    return 0 // No hay pares válidos para calcular. Esto se podría cambiar para que haya un número mínimo de elementos que coinciden.
  }

  const dotProduct = calculateDotProduct(x, y)
  const magnitudeX = calculateMagnitude(x)
  const magnitudeY = calculateMagnitude(y)

  return 1 - dotProduct / (magnitudeX * magnitudeY)
}

export function calculatePearsonCorrelation (x: Array<number | null>, y: Array<number | null>): number {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Las listas deben tener la misma longitud y no estar vacías')
  }

  const validPairs = x.map((val, i) => (val !== null && y[i] !== null) ? 1 : 0)
  const n = validPairs.reduce((count: number, valid: number) => count + valid, 0)

  if (n === 0) {
    return 0 // No hay pares válidos para calcular. Esto se podría cambiar para que haya un número mínimo de elementos que coinciden.
  }

  const sumX = calculateSum(x, y)
  const sumY = calculateSum(y, x)
  const sumXY = calculateProductSum(x, y)
  const sumXSquared = calculateSquaredSum(x, y)
  const sumYSquared = calculateSquaredSum(y, x)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumXSquared - sumX ** 2) * (n * sumYSquared - sumY ** 2))

  if (denominator === 0) {
    return 0 // Evitar la división por cero
  }

  return numerator / denominator
}

export function calculateEuclideanDistance (x: Array<number | null>, y: Array<number | null>): number {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Las listas deben tener la misma longitud y no estar vacías')
  }

  const validPairs = x.map((val, i) => (val !== null && y[i] !== null) ? 1 : 0)
  const n = validPairs.reduce((count: number, valid: number) => count + valid, 0)

  if (n === 0) {
    return 0 // No hay pares válidos para calcular. Esto se podría cambiar para que haya un número mínimo de elementos que coinciden.
  }

  const squaredDifferences = calculateSquaredDifferences(x, y)
  const sumSquaredDifferences = squaredDifferences.reduce((sum, val) => sum + val, 0)

  return Math.sqrt(sumSquaredDifferences)
}
